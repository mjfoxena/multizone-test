import type { AppProps } from "next/app";
import "../styles/globals.scss";

import EnvirionmentContextProvider from "../contexts/EnvironmentContext";
import PaymentContextProvider from "../contexts/PaymentContext";
import ProgressBarContextProvider from "../contexts/progressBar";

import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import GTMBody from "../components/GTMBody";
import GTMHead from "../components/GTMHead";
import CommonFooter from "../components/molecules/CommonFooter";
import { NavbarPages } from "../components/molecules/NavbarPages";
import NavbarContextProvider from "../contexts/NavbarContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  // const cashfreeURL = `https://sdk.cashfree.com/js/ui/2.0.0/cashfree.${publicRuntimeConfig.paymentMode || 'prod'}.js`;
  // const cashfreeURL = `https://sdk.cashfree.com/js/ui/2.0.0/cashfree.${publicRuntimeConfig.paymentMode}.js`;
  const cashfreeURL = `https://sdk.cashfree.com/js/ui/2.0.0/cashfree.prod.js`;
  useEffect(() => {
    // @ts-ignore
    document
      .querySelectorAll<HTMLLinkElement>("link[rel='preload'][as='style']")
      .forEach((link) => (link.onload = () => (link.rel = "stylesheet")));
  }, []);

  const router = useRouter();
  const { pathname } = router;

  let country: string = "";

  useEffect(() => {
    if (typeof router.query.country === "string") {
      country = router.query.country;
    }
    console.log("Country:", country);
  }, [router.query.country]);

  const ImplicitFooter = ["/enquiry"];
  return (
    <>
      <GTMHead />
      <GTMBody />
      <Script
        // @ts-ignore
        src="/js/ganalytics.js"
        strategy={"beforeInteractive"}
      />
      <Script
        strategy={"afterInteractive"}
        type="text/javascript"
        id="cashfree-script-loader"
        async
        defer
        src={cashfreeURL}
      />
      <Script
        id="fs-chat-bot"
        src="//in.fw-cdn.com/30608722/331016.js"
        data-chat="true"
      />

      <EnvirionmentContextProvider>
        <QueryClientProvider client={queryClient}>
          <NavbarContextProvider
            deviceType={pageProps.deviceType}
            country={pageProps?.country || ""}
            referrer={pageProps?.referrer || ""}
          >
            <PaymentContextProvider reload={true}>
              <ProgressBarContextProvider>
                <div
                  style={{
                    overflowX: "hidden",
                  }}
                >
                  {pathname !== '/signin' && <NavbarPages />}
                  <Component {...pageProps} />
                  {ImplicitFooter.includes(router.asPath) && <CommonFooter />}
                </div>
              </ProgressBarContextProvider>
            </PaymentContextProvider>
          </NavbarContextProvider>
        </QueryClientProvider>
      </EnvirionmentContextProvider>
    </>
  );
}