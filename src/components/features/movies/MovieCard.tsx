import React from 'react';

import { SizeToken } from '@/theme';
import { Card } from '../../ui';

interface MovieCardProps {
  movie: any;
  size?: Extract<SizeToken, 'sm' | 'md' | 'lg'>;
  onPress?: (movie: any) => void;
}

export function MovieCard({ movie, size = 'sm', onPress }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <Card onPress={() => onPress?.(movie)}>
      <Card.Image size={size} uri={imageUrl} />
    </Card>
  );
}
