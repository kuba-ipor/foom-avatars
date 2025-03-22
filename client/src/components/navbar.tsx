import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
    return (
        <div className="fixed top-0 right-0 w-full flex justify-end items-center p-4 z-50">
            <ConnectButton  />
        </div>
    );
}