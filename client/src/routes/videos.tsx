import { useQuery } from "@tanstack/react-query";
import PageTitle from "@/components/page-title";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { getShortVideos, getVideoLikesAndComments } from "@/lib/getVideos";

export default function Video() {
  const query = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const videoIds = await getShortVideos();
      const stats = await getVideoLikesAndComments(videoIds);
      return stats;
    },
  });

  const videos = query.data;

  return (
    <div className="flex flex-col gap-4 h-full p-4">
      <PageTitle title="Published videos" />
      <div className="flex gap-4">
        {videos?.map(({ comments, likes, viewCount, videoId }) => {
          return (
            <Card key={videoId}>
              <CardContent className="px-0">
                <div className="w-[180px] h-[320px] mx-auto">
                  <iframe
                    width="180"
                    height="320"
                    src={`https://www.youtube.com/embed/${videoId}?controls=0&fs=0`}
                    allowFullScreen
                  />
                </div>
              </CardContent>
              <CardContent>
                <ul className="text-xs text-muted-foreground">
                  <li className="flex gap-2 justify-between">
                    <span>likes:</span>
                    <span>{likes}</span>
                  </li>
                  <li className="flex gap-2 justify-between">
                    <span>comments:</span>
                    <span>{comments}</span>
                  </li>
                  <li className="flex gap-2 justify-between">
                    <span>views:</span>
                    <span>{viewCount}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
