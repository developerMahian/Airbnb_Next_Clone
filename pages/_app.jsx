import { useState } from "react";
import Router from "next/router";

import { QueryClient, QueryClientProvider } from "react-query";
import ProgressBar from "@badrap/bar-of-progress";

import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/globals.css";

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.info = () => {};
  console.error = () => {};
  console.debug = () => {};
}

const progress = new ProgressBar({
  size: 5,
  delay: 80,
  color: "#ef4444",
  className: "z-50",
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const MyApp = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
