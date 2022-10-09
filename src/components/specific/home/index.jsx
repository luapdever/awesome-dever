import React from "react";
import { toast } from "react-toastify";
import styles from '../../../../styles/specific/home/index.module.css'
import PartOverview from "./PartOverview";
import AboutMe from "./AboutMe";

function HomePage() {
  const notify = () => toast("Wow so easy!");

  return (
    <>
      <PartOverview />
      <AboutMe />
    </>
  );
}

export default HomePage;
