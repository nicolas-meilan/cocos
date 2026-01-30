import { Stack } from 'expo-router';

const ModalLayout = () => {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="search"
        options={{
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
};

export default ModalLayout;
