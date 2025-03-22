import axios from 'axios';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = "UC0xvbovA-yPEsL995jkW_oQ"

interface VideoSearchResult {
    id: {
        videoId?: string;
    };
}

interface VideoStatistics {
    likeCount?: string;
    commentCount?: string;
    viewCount?: string;
}

interface VideoItem {
    id: string;
    statistics: VideoStatistics;
}

/**
 * Get a list of short video IDs from a channel.
 */
async function getShortVideos(): Promise<string[]> {
    try {
        const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'id',
                channelId: CHANNEL_ID,
                maxResults: 50,
                type: 'short',
                key: YOUTUBE_API_KEY,
                order: 'date'
            }
        });

        // Extract the video IDs
        return (data.items || [])
            .filter((item: VideoSearchResult) => item.id?.videoId)
            .map((item: VideoSearchResult) => item.id.videoId as string);

    } catch (e) {
        console.error("Error fetching data:", e);
        return [];
    }
}

/**
 * Get like counts and comment counts for a list of video IDs.
 * Returns a dict mapping videoId -> {likes: number, comments: number}.
 */
async function getVideoLikesAndComments(videoIds: string[]): Promise<{
    videoId: string;
    likes: number;
    comments: number;
    viewCount: number;
}[]> {
    const { data } = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
            part: 'statistics',
            id: videoIds.join(','),
            key: YOUTUBE_API_KEY
        }
    });

    return data.items.map((item: VideoItem) => {
        console.log({ item })
        const videoId = item.id;
        const stats = item.statistics;

        return {
            videoId,
            likes: parseInt(stats.likeCount || '0', 10),
            comments: parseInt(stats.commentCount || '0', 10),
            viewCount: parseInt(stats.viewCount || '0', 10)
        };
    });
}

export { getShortVideos, getVideoLikesAndComments }; 