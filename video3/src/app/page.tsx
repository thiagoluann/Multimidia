import VideoPlayer from '../components/VideoPlayer';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Reprodutor de Vídeo</h1>
      <VideoPlayer />
    </main>
  );
}
