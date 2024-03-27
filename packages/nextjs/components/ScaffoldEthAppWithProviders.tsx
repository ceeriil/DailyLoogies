"use client";

import { useEffect } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <>
      <div className="flex flex-col min-h-screen app">
        <Header />
        <main className="relative flex flex-col flex-1">{children}</main>
      </div>
      <Footer />
      <Toaster />
    </>
  );
};

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  /*   const { resolvedTheme } = useTheme();
   */ /*   const isDarkMode = resolvedTheme === "light";
  const [mounted, setMounted] = useState(false); */

  /*   useEffect(() => {
    setMounted(true);
  }, []); */

  const subgraphUri = "https://api.studio.thegraph.com/proxy/64348/dailyloogies/0.0.4";
  const apolloClient = new ApolloClient({
    uri: subgraphUri,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig config={wagmiConfig}>
        <ProgressBar />
        <RainbowKitProvider chains={appChains.chains} avatar={BlockieAvatar} theme={lightTheme()}>
          <ScaffoldEthApp>{children}</ScaffoldEthApp>
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
};
