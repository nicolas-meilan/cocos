import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import Icon from '@/components/Icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarShowLabel: true,
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

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 12,
    height: 80,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tabBarItem: {
    marginRight: 8,
    borderRadius: 20,
    paddingHorizontal: 0,
    marginTop: 0,
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 8,
  },
});
