'use client';

import { useState } from 'react';

export default function PlayerControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const totalSeconds = 23 * 60 + 45;

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
    const title = document.querySelector('.content-title') as HTMLElement;
    title.style.textShadow = isPlaying
      ? '0 0 10px rgba(0, 0, 0, 0.8)'
      : '0 0 15px rgba(0, 168, 232, 0.7)';
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const newProgress = (clickX / container.clientWidth) * 100;
    setProgress(newProgress);

    const currentTime = Math.floor((newProgress / 100) * totalSeconds);
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    const formatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    document.querySelectorAll('.time-display, .time-info span:first-child').forEach(el => {
      el.textContent = formatted;
    });
  };

  return (
    <div className="player-controls">
      <div className="progress-container" onClick={handleProgressClick}>
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="controls-row">
        <div className="playback-controls">
          <div className="main-control">
            <i className="fas fa-step-backward"></i>
          </div>
          <div className="main-control play-btn" onClick={togglePlay}>
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </div>
          <div className="main-control">
            <i className="fas fa-step-forward"></i>
          </div>
        </div>

        <div className="time-info">
          <span>0:00</span>
          <span>/</span>
          <span>23:45</span>
        </div>

        <div className="secondary-controls">
          <i className="fas fa-closed-captioning"></i>
          <i className="fas fa-cog"></i>
          <div className="fullscreen-btn">
            <div className="quality-badge">HD</div>
            <i className="fas fa-expand"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
