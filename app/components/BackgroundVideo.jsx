import React from 'react';
import styles from './BackgroundVideo.module.css';

const BackgroundVideo = ({ src }) => {
  return (
    <div className={styles.videoContainer}>
      <video autoPlay loop muted className={styles.video}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundVideo;
