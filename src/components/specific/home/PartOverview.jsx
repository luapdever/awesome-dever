import gsap from "gsap";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

import styles from "../../../../styles/specific/home/partOverview.module.css";
import real1 from "../../../assets/img/awesome/realisations/header_img.jpg";
import real2 from "../../../assets/img/awesome/realisations/header_img_old.jpg";
import { skillList } from "../../../rawDatas/skill";

function PartOverview() {
	const downImg = (e) => {
		gsap.to(e.target, {
			y: window.innerHeight + 10,
			opacity: 0,
			height: 0
		})
	}

  return (
    <>
      <div className={styles.partOverview}>
        <section>
          <div className={styles.partImg}>
            <img 
							className={styles.imgLeft}
							onClick={downImg}
              src={real1.src}
              alt={"THREE DEVER IMG 1"}
            />
          </div>
          <div className={styles.partLink}>
            <Link href={"/my-portfolio"}>
              Overview
            </Link>
            <a
              href="https://three.luap-dever.me"
              target={"_blank"}
              rel="noreferrer"
              onClick={(e) => {
                e.preventDefault();
                toast.info("The 3D view will be available soon. See you later 😇")
              }}
            >
              3D View
            </a>
          </div>
        </section>
        <section>
          <div className={styles.partLink}>
						<p>In this portfolio, you can see the achievements in some technologies or tools like : </p>
            <div>
								{skillList.map((skill, index) => (
									<a
										key={"Skill "+index}
										href={"https://www.google.com/search?q="+skill.search}
										target={"_blank"}
                    rel="noreferrer"
									>
										{skill.label}
									</a>
								))}
						</div>
          </div>
          <div className={styles.partImg}>
            <img
							className={styles.imgRight}
							onClick={downImg}	
              src={real2.src}
              alt={"THREE DEVER IMG 2"}
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default PartOverview;
