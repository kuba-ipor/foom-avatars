import { ContentWithUser } from "@/components/chat";
import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogTitle, DialogContent, DialogTrigger, DialogHeader, DialogFooter } from "@/components/ui/dialog";

interface Props {
    message: ContentWithUser;
}

const PublishButton = ({ message }: Props) => {
    return (
        <Dialog>
            <DialogTrigger>
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
                        Publish Albert's answer and get viral
                    </DialogTitle>
                    <DialogDescription>
                        Review content and sign the transaction
                    </DialogDescription>
                    <div className="relative">
                        <img
                            className="py-4"
                            src="/avatars/albert-einstein/albert-einstein.png"
                            alt="Albert Einstein"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-black/50 p-4">
                            <p>
                                {message.text}
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="default"
                        >
                            Confirm and publish
                        </Button>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default PublishButton;
