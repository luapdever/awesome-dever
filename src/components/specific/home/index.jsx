import React, { useEffect } from "react";
import { toast } from "react-toastify";
import styles from '../../../../styles/specific/home/index.module.css'
import PartOverview from "./PartOverview";
import AboutMe from "./AboutMe";

function HomePage() {
  const notify = () => {
    const width = window.innerWidth;

    if(width < 900) {
      setTimeout(() => toast("The best experience is on big screen."), 2000)
    }
  }

  // useEffect(() => {
  //   notify();
  // }, [])

  return (
    <>
      <PartOverview />
      <AboutMe />
    </>
  );
}

export default HomePage;
