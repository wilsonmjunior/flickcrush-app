import { useRouter } from 'expo-router';
import { useMemo } from 'react';

import {
  useGetIsFavoriteMovie,
  useGetIsWatchedMovie,
  useGetMovieDetails,
  useGetMovieVideos,
} from '@/core/api/queries';
import { useFavoriteMovie } from '@/features/favorites/hooks';
import { useScheduleMovie } from '@/features/schedule/hooks';
import { useWatchedMovie } from '@/features/watched/hooks';
import { formatTimeToString } from '@/shared/utils';

interface UseMovieDetailsProps {
  movieId: number;
}

export function useMovieDetails({ movieId }: UseMovieDetailsProps) {
  const router = useRouter();

  // Data fetching
  const { data: movie } = useGetMovieDetails(movieId);
  const { data: movieVideos } = useGetMovieVideos(movieId);
  const { data: isWatchedMovie, refetch: refetchIsWatchedMovie } = useGetIsWatchedMovie(movieId);
  const { data: isFavoriteMovie, refetch: refetchIsFavoriteMovie } = useGetIsFavoriteMovie(movieId);

  const { handleConfirmSchedule, scheduleButtonIcon, scheduleButtonText, isMovieScheduled } =
    useScheduleMovie(movie);

  const { handleFavorite, favoriteIcon } = useFavoriteMovie(isFavoriteMovie ?? false);
  const { handleWatched, watchedIcon } = useWatchedMovie(isWatchedMovie ?? false);

  const trailerVideos = useMemo(() => {
    return movieVideos?.results.filter((video) => video.type === 'Trailer');
  }, [movieVideos]);

  const handleSchedule = (selectedTime: Date, selectedDate: Date) => {
    const timeString = formatTimeToString(selectedTime);
    handleConfirmSchedule(selectedDate, timeString);
    router.back();
  };

  return {
    // Data
    movie,
    movieVideos,
    isWatchedMovie,
    isFavoriteMovie,
    trailerVideos,

    // Icons
    watchedIcon,
    favoriteIcon,

    // Handlers
    handleWatched,
    handleFavorite,

    // Refetch functions
    refetchIsWatchedMovie,
    refetchIsFavoriteMovie,

    // Schedule
    isMovieScheduled,
    scheduleButtonIcon,
    scheduleButtonText,
    handleSchedule,
  };
}
