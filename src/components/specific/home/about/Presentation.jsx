import React from 'react'
import styles from '../../../../../styles/specific/home/about/presentation.module.css'
import luap from '../../../../assets/img/awesome/luap.jpg'
import luap2 from '../../../../assets/img/awesome/luap2.jpg'
import { FaFacebook, FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

function Presentation() {
  return (
    <div className={styles.present}>
        <div className={styles.imgLuap}>
            <img
                className={styles.imgLeft}
                src={luap2.src}
                alt={"LUAP DEVER IMG 1"}
            />
            <img
                className={styles.imgRight}
                src={luap.src}
                alt={"LUAP DEVER IMG 2"}
            />
        </div>
        <div>
            <h1>Paul M. ZANNOU</h1>
            <div>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit voluptatem qui, recusandae sequi quos reiciendis veritatis, necessitatibus, facilis consequuntur beatae fugiat? Sapiente animi repudiandae molestias laborum voluptatum iste nostrum ea?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, rerum doloremque incidunt eius odio accusamus eligendi temporibus in architecto quae earum iusto omnis nemo iste explicabo beatae commodi dolorum a.
                </p>
                <p className={styles.mediaSocials}>
                    <button><FaGithub /></button>
                    <button><FaLinkedinIn /></button>
                    <button><FaFacebook /></button>
                    <button><FaTwitter /></button>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Presentation