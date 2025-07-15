'use client';

import { useRef, useState } from 'react';

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;

    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <video
        ref={videoRef}
        width="720"
        height="400"
        style={{ borderRadius: '12px', boxShadow: '0 0 15px rgba(0,0,0,0.6)' }}
        controls={false}
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>
      <br />
      <button
        onClick={togglePlay}
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: isPlaying ? '#c0392b' : '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        {isPlaying ? 'Pausar' : 'Reproduzir'}
      </button>
    </div>
  );
}
