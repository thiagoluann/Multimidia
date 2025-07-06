import Header from '@/components/header';
import ContentInfo from '@/components/contentInfo';
import PlayerControls from '@/components/playerControls';
import './globals.css';


export default function Home() {
  return (
    <div className="player-container">
      <Header />
      <ContentInfo />
      <PlayerControls />
      <div className="watermark">Disney+</div>
    </div>
  );
}
