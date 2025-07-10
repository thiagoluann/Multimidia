'use client';

import { useState } from 'react';

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(prev => !prev);
  };

  return (
    <button
      onClick={toggleLike}
      style={{
        marginTop: '20px',
        background: liked ? '#00a8e8' : '#444',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '10px',
        fontSize: '18px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {liked ? '❤️ Curtido' : '🤍 Curtir'}
    </button>
  );
}
