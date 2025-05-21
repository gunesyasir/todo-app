import { Stack, Link } from 'expo-router';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';

export default function TaskScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="Home" />
        {/*<Link href={{ pathname: '/tasks', params: { name: 'Dan' } }} asChild>*/}
        {/*  <Button title="Show Details" />*/}
        {/*</Link>*/}
      </Container>
    </>
  );
}
