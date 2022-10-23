import React from 'react'
import styles from '../../../../styles/specific/portfolio/index.module.css'
import Content from './Content'

function Portfolio() {
  return (
    <div className={styles.portfolio}>
        <div className={styles.deviceShape}>
            <div className={styles.content}>
                <Content />
            </div>
            <div className={styles.powerBtn}></div>
        </div>
    </div>
  )
}

export default Portfolio