'use client';
import React, { useRef, useState, useEffect } from 'react';

interface Props {
  videoSrc: string;
}

export default function VideoPlayer({ videoSrc }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoSrc]);

  const togglePlayPause = () => {
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

  const skipForward = () => {
    if (videoRef.current) videoRef.current.currentTime += 10;
  };

  const skipBackward = () => {
    if (videoRef.current) videoRef.current.currentTime -= 10;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) videoRef.current.volume = newVolume;
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-center">
      <video
        key={videoSrc} // força recarregar ao trocar vídeo
        ref={videoRef}
        src={videoSrc}
        width="640"
        height="360"
        className="bg-black rounded-lg"
      />

      <div className="flex gap-2 mt-4">
        <button onClick={skipBackward} className={btnStyle}>⏪</button>
        <button onClick={togglePlayPause} className={btnStyle}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button onClick={skipForward} className={btnStyle}>⏩</button>
        <button onClick={toggleMute} className={btnStyle}>
          {isMuted ? '🔇' : '🔊'}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24"
        />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <span className="font-mono text-sm">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="w-64"
        />
        <span className="font-mono text-sm">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

const btnStyle = 'bg-gray-800 px-3 py-2 rounded text-white hover:bg-gray-700';
