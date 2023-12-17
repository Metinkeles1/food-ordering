import "slick-carousel/slick/slick.css";
import Layout from "../Layout/Layout";
import { Provider } from "react-redux";
import store from "../redux/store";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import NProgress from "nprogress";
import "../styles/globals.css";
import "nprogress/nprogress.css";
import "slick-carousel/slick/slick-theme.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <div className='pt-[88px]'>
            <ToastContainer />
            <Component {...pageProps} />
          </div>
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
