'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import VideoPlayer from '@/components/VideoPlayer';
import VideoList from '@/components/VideoList';

const videoList = [
  {
    src: '/videos/Video1.mp4',
    title: 'Rap do Maito Gai',
    description: 'Um dos melhores já produzidos.',
  },
  {
    src: '/videos/Video2.mp4',
    title: 'Rap do Roronoa Zoro',
    description: 'Rap sensacional.',
  },
  {
    src: '/videos/Video3.mp4',
    title: 'Rap do Itachi Uchiha',
    description: 'Rap incrivelmente perfeito.',
  },
];

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState(videoList[0]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <Header />

      <div className="w-full max-w-4xl">
        <VideoList videos={videoList} onSelect={setSelectedVideo} />

        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
          <p className="text-gray-300">{selectedVideo.description}</p>
        </div>

        <div className="mt-6">
          <VideoPlayer videoSrc={selectedVideo.src} />
        </div>
      </div>
    </div>
  );
}
