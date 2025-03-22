import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter, Route, Routes } from "react-router";
import Chat from "./routes/chat";
import Overview from "./routes/overview";
import Home from "./routes/home";
import useVersion from "./hooks/use-version";
import '@rainbow-me/rainbowkit/styles.css';

import {
    darkTheme,
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { anvil } from 'wagmi/chains';
import Navbar from "@/components/navbar";
import Video from "@/routes/videos";

const customAnvil = {
    ...anvil,
    rpcUrls: {
        default: {
            http: ["http://127.0.0.1:8546"],
        },
    },
};

const config = getDefaultConfig({
    appName: 'Foom Avatars',
    projectId: 'YOUR_PROJECT_ID',
    chains: [customAnvil],
    ssr: false,
});


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Number.POSITIVE_INFINITY,
        },
    },
});

function App() {
    useVersion();
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme()}>
                    <div
                        className="dark antialiased"
                        style={{
                            colorScheme: "dark",
                        }}
                    >
                        <BrowserRouter>
                            <TooltipProvider delayDuration={0}>
                                <Navbar />
                                <SidebarProvider>
                                    <AppSidebar />
                                    <SidebarInset>
                                        <div className="flex flex-1 flex-col gap-4 size-full container">
                                            <Routes>
                                                <Route path="/" element={<Home />} />
                                                <Route
                                                    path="chat/:agentId"
                                                    element={<Chat />}
                                                />
                                                <Route
                                                    path="settings/:agentId"
                                                    element={<Overview />}
                                                />
                                                <Route
                                                    path="videos"
                                                    element={<Video />}
                                                />
                                            </Routes>
                                        </div>
                                    </SidebarInset>
                                </SidebarProvider>
                                <Toaster />
                            </TooltipProvider>
                        </BrowserRouter>
                    </div>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default App;
