'use client';
import { useRef, useState } from 'react';

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <video
        ref={videoRef}
        width={640}
        height={360}
        controls={false}
        src="/video.mp4"
      />
      <button
        onClick={togglePlay}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isPlaying ? 'Pausar' : 'Reproduzir'}
      </button>
    </div>
  );
}
