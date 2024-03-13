import ErrorPageContent from "@/components/ErrorPageContent";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import { AppState, AppProvider } from "@/context/AppContext";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const initialContextValue: AppState = {
    username: null,
    watchingFilms: [],
    myList: [],
  };

  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, []);

  if (pageProps.error) {
    return (
      <AppProvider initialState={initialContextValue}>
        <Layout>
          <ErrorPageContent />
        </Layout>
      </AppProvider>
    );
  }

  return (
    <AppProvider initialState={initialContextValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}
