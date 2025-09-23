import FontAwesome from '@expo/vector-icons/FontAwesome';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider } from 'expo-sqlite';
import { Suspense, useEffect } from 'react';
import { Text } from 'react-native';
import Toast from 'react-native-toast-message';

import 'react-native-reanimated';

import { queryClient } from '@/core/api/config';
import { migrate } from '@/core/database/config/migrate';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <SQLiteProvider databaseName="flickcrush.db" onInit={migrate} useSuspense>
          <RootLayoutNav />

          <Toast />
        </SQLiteProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="browser-movies" />
      <Stack.Screen name="movie" />
    </Stack>
  );
}
