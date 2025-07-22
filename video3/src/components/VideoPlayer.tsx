'use client';
import React, { useRef, useState, useEffect } from 'react';

export default function VideoPlayer() {
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
  }, []);

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
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <video
        ref={videoRef}
        src="/videos/Video.mp4"
        width="640"
        height="360"
        style={{ backgroundColor: 'black', borderRadius: '8px' }}
      />

      <div style={{ marginTop: '10px' }}>
        <button onClick={skipBackward} style={buttonStyle}>⏪</button>
        <button onClick={togglePlayPause} style={buttonStyle}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button onClick={skipForward} style={buttonStyle}>⏩</button>
        <button onClick={toggleMute} style={buttonStyle}>
          {isMuted ? '🔇' : '🔊'}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          style={{ verticalAlign: 'middle', marginLeft: '10px' }}
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <span style={{ fontFamily: 'monospace', marginRight: '8px' }}>
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          style={{ width: '300px', verticalAlign: 'middle' }}
        />
        <span style={{ fontFamily: 'monospace', marginLeft: '8px' }}>
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  margin: '0 5px',
  padding: '8px 12px',
  fontSize: '20px',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#202020',
  color: 'white',
  cursor: 'pointer',
};
