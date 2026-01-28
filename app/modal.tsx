import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import Screen from '@/components/Screen';
import Text from '@/components/Text';

export default function ModalScreen() {
  return (
    <Screen style={styles.container}>
      <Text i18nKey="modal.title" size="large" style={styles.title} />
      <Link href="/" dismissTo style={styles.link}>
        <Text i18nKey="modal.goHome" color="inverted" />
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
