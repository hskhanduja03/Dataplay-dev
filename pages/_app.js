import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "bootstrap/dist/css/bootstrap.css";
import "toastr/build/toastr.min.css";
import "../styles/globals.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Provider } from "react-redux";
import { store } from "../store/index";
import Layout from "./layout";
import Head from "next/head";
import { useEffect } from "react";
import { AnalyticsBrowser } from "@segment/analytics-next";
import NextTopLoader from 'nextjs-toploader';
// Import ThemeProvider
// import Logo from "./components/Logo";

export const analytics = AnalyticsBrowser.load({
  writeKey: "GMuO40IvAPvF74ZCkaLZ9yoJxHjO9M2i",
});

function MyApp({ Component, pageProps }) {


  // Supress errors regarding Image Loading in Console
  if (process.env.NODE_ENV === 'development') {
    const originalWarn = console.warn;
    console.warn = (...args) => {
        if (
            typeof args[0] === 'string' &&
            args[0].includes('Image with src')
        ) {
            return; // Suppress the warning
        }
        originalWarn(...args); 
    };
}
  useEffect(() => {
    AOS.init({
      offset: 100,
    });
  }, []);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const changeFavicon = (e) => {
      // Determine the theme based on the media query
      const theme = e.matches ? "dark" : "light";

      // Specify your favicon URLs
      const faviconURL =
        theme === "dark" ? "/Logo_square.png" : "/Logo_square.png";

      // Find and update the favicon link element
      const linkElement = document.querySelector('link[rel="icon"]');
      if (linkElement) {
        linkElement.href = "/Logo_square.png";
      }
    };

    // Initial check
    changeFavicon(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener("change", changeFavicon);

    // Cleanup the event listener on component unmount
    return () => mediaQuery.removeEventListener("change", changeFavicon);
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <title>
            Dataplay | Data Science Courses, Mock Interviews, and Real-World
            Industry Insights
          </title>
          <link rel="icon" type="image/png" href="/Logo_square.png" />

          {/* Primary meta tags */}
          <meta
            name="title"
            content="Dataplay | Empowering Data Science Careers with Tailored Courses, Daily Practice, and Industry Insights"
          />
          <meta
            name="description"
            content="Never Stop Learning. Dataplay empowers your Data Science career at all levels with tailored courses, daily practice problems, real-world cases, industry insights, and unlimited mock interviews."
          />
          <meta
            name="keywords"
            content="Data Science, Online Courses, Industry Insights, Tailored Courses, Daily Practice, Mock Interviews, Career Development, Data Science Careers, Data Science Jobs"
          />
          <meta name="robots" content="index, follow" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta charSet="UTF-8" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.dataplay.com/" />
          <meta
            property="og:title"
            content="Dataplay | Empowering Data Science Careers with Tailored Courses, Daily Practice, and Industry Insights"
          />
          <meta
            property="og:description"
            content="Never Stop Learning. Empower your Data Science career with tailored courses, daily practice problems, real-world cases, and unlimited mock interviews at Dataplay."
          />
          <meta
            property="og:image"
            content="https://www.dataplay.com/images/og-image.jpg"
          />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://www.dataplay.com/" />
          <meta
            property="twitter:title"
            content="Dataplay | Empowering Data Science Careers with Tailored Courses, Daily Practice, and Industry Insights"
          />
          <meta
            property="twitter:description"
            content="Never Stop Learning. Dataplay empowers your Data Science career at all levels with tailored courses, daily practice problems, real-world cases, industry insights, and unlimited mock interviews."
          />
          <meta
            property="twitter:image"
            content="https://www.dataplay.com/images/twitter-image.jpg"
          />
        </Head>
        <NextTopLoader 
  showSpinner={false} 
  speed={200}           // Increase speed for slower transition (higher value = slower)
  crawlSpeed={300}      // Increase crawl speed for smoother progress effect
  height={5}            // Adjust height to make it look sleeker
  color="#fff"          // Optionally change the color for better visibility
  easing="ease"         // Make the animation smoother
  crawl={true}          // Enables subtle progress even if the page is not loading actively
  template='<div class="bar" role="bar"></div>' 
/>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
