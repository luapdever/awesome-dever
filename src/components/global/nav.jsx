import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import dever from '../../assets/img/icons/DEVER.svg'
import styles from '../../../styles/global/nav.module.css'

function NavBar() {
  const navbar = useRef();
  const [isFixed, setFixedState] = useState(false);

  const handleScroll = (e) => {
    if(scrollY > 250) {
      return setFixedState(true)
    }
    return setFixedState(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [])

  return (
    <>
      <div ref={navbar} className={styles.navbar + " " + (isFixed && styles.navbar_fixed)}>
        <Link href={"/"}>
          <section>
            <div className={styles.logo_dever}>
              <Image src={dever} alt="Luap Dever logo" title="Luap Dever" width={50} height={50} />
            </div>
            <h2>DEVER</h2>
          </section>
        </Link>
        <nav>
          <Link href={"/"}>Home</Link>
          <Link href={"/my-portfolio"}>Overview</Link>
          <Link href={"/#aboutMe"}>About me</Link>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
