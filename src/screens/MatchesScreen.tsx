import { StyleSheet, Text, View } from 'react-native';
import { MatchesList } from '../components/MatchesList';

// Экран «Матчи тура» — задание в README.md, часть 1.
export function MatchesScreen() {
  return (
    <View style={styles.container}>
      <MatchesList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
