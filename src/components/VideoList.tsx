interface Props {
  videos: { src: string; title: string; description: string }[];
  onSelect: (video: { src: string; title: string; description: string }) => void;
}

export default function VideoList({ videos, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {videos.map((video, index) => (
        <div
          key={index}
          onClick={() => onSelect(video)}
          className="cursor-pointer bg-gray-800 p-4 rounded hover:bg-gray-700 transition"
        >
          <h3 className="text-lg font-semibold">{video.title}</h3>
          <p className="text-gray-400 text-sm">{video.description}</p>
        </div>
      ))}
    </div>
  );
}
