import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { ImageBackground } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef } from 'react';
import { Animated, Linking, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { MovieListTrailers } from '@/features/movies/components';
import { useMovieDetails } from '@/features/movies/hooks';
import { Button, Header, Text } from '@/shared/components/ui';
import { formatRuntime } from '@/shared/utils';

const HEADER_MAX_HEIGHT = 400;
const HEADER_MIN_HEIGHT = Constants.statusBarHeight + 100;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function MovieDetailsScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const router = useRouter();

  const { theme } = useUnistyles();

  const { id } = useLocalSearchParams();

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE / 3],
    extrapolate: 'clamp',
  });

  const contentOpacity = scrollY.interpolate({
    inputRange: [0, 100, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0.7, 0],
    extrapolate: 'clamp',
  });

  const contentScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const contentVisibility = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 0.8, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const {
    movie,
    trailerVideos,
    watchedIcon,
    favoriteIcon,
    isMovieScheduled,
    scheduleButtonIcon,
    scheduleButtonText,
    handleWatched,
    handleFavorite,
    handleSchedule,
  } = useMovieDetails({ movieId: Number(id) });

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      {/* Hero Section */}
      <Animated.View
        style={[
          styles.headerContainer,
          {
            height: headerHeight,
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        <ImageBackground
          source={{
            uri: movie?.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
              : 'https://via.placeholder.com/300x450?text=No+Image',
          }}
          style={styles.heroImage}
        >
          <View style={styles.imageOverlay} />

          <Animated.View
            style={[
              styles.headerContent,
              {
                opacity: contentVisibility,
                transform: [{ scale: contentScale }],
              },
            ]}
          >
            <Animated.View
              style={[
                styles.headerTopContainer,
                {
                  opacity: contentOpacity,
                },
              ]}
            >
              <Header variant="ghost">
                <Header.BackButton />
                <Header.ActionButton />
              </Header>
            </Animated.View>

            <Animated.View
              style={[
                styles.titleOverlay,
                {
                  opacity: contentOpacity,
                },
              ]}
            >
              <Text variant="heading" size="xl" color="white">
                {movie?.title}
              </Text>

              <View style={styles.infoContainer}>
                <View style={styles.yearBadge}>
                  <Text variant="heading" size="md" color="white">
                    {new Date(movie?.release_date ?? '').getFullYear()}
                  </Text>
                </View>
              </View>
            </Animated.View>
          </Animated.View>
        </ImageBackground>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
      >
        <View style={{ height: HEADER_MAX_HEIGHT }} />

        <View style={styles.content}>
          {/* Genres Section */}
          <View style={styles.genresContainer}>
            <MaterialCommunityIcons name="circle" size={10} color={theme.colors.text} />
            <Text variant="heading" size="md">
              {movie?.genres.map((genre) => genre.name).join(' | ')}
            </Text>
          </View>

          {/* Runtime Section */}
          <View style={styles.statsContainer}>
            <Button
              variant="outline"
              size="xs"
              onPress={() => Linking.openURL(movie?.homepage ?? '')}
            >
              <Button.Label>Site Oficial</Button.Label>
            </Button>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="star" size={16} color={theme.colors.warning} />
              <Text variant="body" size="sm" color="muted">
                {movie?.vote_average.toFixed(1)}
              </Text>
            </View>

            <View style={styles.statItem}>
              <MaterialCommunityIcons name="clock" size={16} color={theme.colors.muted} />
              <Text variant="body" size="sm" color="muted">
                {formatRuntime(movie?.runtime ?? 0)}
              </Text>
            </View>
          </View>

          {/* Synopsis Section */}
          <View style={styles.synopsisContainer}>
            <Text variant="heading" size="md">
              Sinopse
            </Text>
            <Text variant="body" size="sm">
              {movie?.overview}
            </Text>
          </View>

          {/* Trailers Section */}
          <MovieListTrailers videos={trailerVideos ?? []} />
        </View>
      </Animated.ScrollView>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonScheduleContainer}>
          <Button
            size="lg"
            onPress={() =>
              isMovieScheduled
                ? handleSchedule(new Date(), new Date())
                : router.push(`/schedule/${movie?.id}`)
            }
          >
            <Button.Icon>
              <MaterialCommunityIcons
                name={scheduleButtonIcon}
                size={20}
                color={theme.colors.white}
              />
            </Button.Icon>
            <Button.Label>{scheduleButtonText}</Button.Label>
          </Button>
        </View>
        <Button
          variant="outline"
          type="primary"
          size="lg"
          onPress={() => movie && handleWatched(movie)}
        >
          <Button.Icon>
            <MaterialCommunityIcons name={watchedIcon} size={24} color={theme.colors.primary} />
          </Button.Icon>
        </Button>
        <Button
          variant="outline"
          type="primary"
          size="lg"
          onPress={() => movie && handleFavorite(movie)}
        >
          <Button.Icon>
            <MaterialCommunityIcons name={favoriteIcon} size={24} color={theme.colors.primary} />
          </Button.Icon>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerTopContainer: {
    paddingTop: Constants.statusBarHeight,
  },
  titleOverlay: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xl,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  content: {
    backgroundColor: theme.colors.background,
    gap: theme.spacing['2xl'],
    paddingTop: theme.spacing.xl,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xl,
  },
  yearBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.muted,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.full,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
  synopsisContainer: {
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
  buttonContainer: {
    padding: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xl,
  },
  buttonScheduleContainer: {
    flex: 1,
  },
}));
