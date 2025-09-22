import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button, Input } from '@/shared/components/ui';

type SearchHeaderProps = {
  search: string;
  onSearch: (search: string) => void;
};

export function SearchHeader({ search, onSearch }: SearchHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.inputContainer}>
        <Input value={search} onChangeText={onSearch} placeholder="Buscar filme" size="md" />
      </View>
      <Button variant="outline" color="muted" size="md" onPress={() => router.back()}>
        <Button.Label>Cancelar</Button.Label>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  header: {
    padding: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  inputContainer: {
    flex: 1,
  },
}));
