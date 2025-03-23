import { foomGeniusAnswerAbi } from "@/abi/FoomGeniusAnswer";
import { ContentWithUser } from "@/components/chat";
import { FoomAvatarImage } from "@/components/foom-avatar-image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogTitle, DialogContent, DialogTrigger, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import axios from "axios";
import { CircleXIcon, LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";

interface Props {
    question: ContentWithUser;
    answer: ContentWithUser;
}

const PUBLISH_ANSWER_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const PublishButton = ({ question, answer }: Props) => {
    const { writeContractAsync } = useWriteContract();
    const { address } = useAccount();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const { connectModalOpen, openConnectModal } = useConnectModal();

    const handlePublish = async () => {
        setIsProcessing(true);
        try {
            await writeContractAsync({
                address: PUBLISH_ANSWER_ADDRESS,
                abi: foomGeniusAnswerAbi,
                functionName: "publishAnswer",
                args: [answer.text],
            });

            await axios.post(import.meta.env.VITE_MAKE_WEBHOOK_PUBLISH_ANSWER, {
                question: question.text,
                message: answer.text,
                accountAddress: address,
                avatarName: answer.user,
            });
        } catch (error) {
            console.error({ error });
            setIsError(true);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Dialog modal={connectModalOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="border-green-500 text-green-500"
                >
                    Publish
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Publish answer and get viral
                    </DialogTitle>
                    <DialogDescription>
                        Review content and sign the transaction
                    </DialogDescription>
                    <div className="relative">
                        <FoomAvatarImage name={answer.user} className="py-4" />
                        {isProcessing && (
                            <div className="absolute bottom-0 top-0 left-0 right-0 flex items-center justify-center">
                                <LoaderCircleIcon className="animate-spin" />
                            </div>
                        )}
                        {isError && (
                            <div className="absolute bottom-0 top-0 left-0 right-0 flex items-center justify-center">
                                <div className="flex items-center gap-2 text-destructive-foreground bg-destructive rounded-full p-2">
                                    <CircleXIcon />
                                    <p>Error</p>
                                </div>
                            </div>
                        )}
                        <div className="absolute bottom-0 left-0 w-full bg-black/50 p-4">
                            <p className="text-xs text-muted-foreground">
                                {answer.text}
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        {address ? (
                            <Button
                                variant="default"
                                onClick={handlePublish}
                                disabled={isProcessing}
                            >
                                {isProcessing && (
                                    <LoaderCircleIcon className="animate-spin" />
                                )}
                                Confirm and publish
                            </Button>
                        ) : (
                            <Button
                                variant="default"
                                onClick={openConnectModal}
                            >
                                Connect wallet
                            </Button>
                        )}
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default PublishButton;