import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import { Icon } from '@/components/Icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ color }) => <Icon size={28} name="work" color={color} />,
        }}
      />
      <Tabs.Screen
        name="mercado"
        options={{
          title: 'Mercado',
          tabBarIcon: ({ color }) => <Icon size={28} name="timeline" color={color} />,
        }}
      />
    </Tabs>
  );
}
