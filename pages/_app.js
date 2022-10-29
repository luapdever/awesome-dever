import Head from "next/head";
import { Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TheFooter from "../src/components/global/footer";
import NavBar from "../src/components/global/nav";
import "../styles/keyframes.css";
import "../styles/globals.css";
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Cursor from "../src/components/global/cursor";
import { Router } from "next/router";


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    Router.events.on("routeChangeStart", (url)=>{
      console.log("route is changing")
    }) 
  }, [])

  return (
    <>
      <Suspense fallback={<p>Loading</p>}>
        <Cursor />
        <NavBar />
        <Component {...pageProps} />
        <ToastContainer />
        <TheFooter />
      </Suspense>
    </>
  );
}

export default MyApp;
