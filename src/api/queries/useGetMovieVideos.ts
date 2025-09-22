import { useQuery } from '@tanstack/react-query';

import { getMovieVideos } from '../clients';

const tmdbMovieVideosKey = 'Tmdb:MovieVideos';

export function useGetMovieVideos(movieId: number) {
  return useQuery({
    queryKey: [tmdbMovieVideosKey, movieId],
    queryFn: () => getMovieVideos(movieId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
