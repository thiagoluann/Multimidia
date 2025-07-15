import Header from '@/components/header';
import ContentInfo from '@/components/contentInfo';
import PlayerControls from '@/components/playerControls';
import LikeButton from '@/components/LikeButton';
import VideoPlayer from '@/components/VideoPlayer';
import './globals.css';


export default function Home() {
  return (
    <div className="player-container">
      <Header />
      <ContentInfo />
      <PlayerControls />
      <VideoPlayer /> {/* 👈 Aqui adicionamos o vídeo com botão Play/Pause */}
      <LikeButton />
      <div className="watermark">Disney+</div>
    </div>
  );
}

