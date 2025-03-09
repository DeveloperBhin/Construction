import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Tabs ,Stack} from 'expo-router'
import { Ionicons } from '@expo/vector-icons';


function TabLayout() {
  return (
    <>
    <Tabs screenOptions={{ headerShown: false }}>



      <Tabs.Screen name='Home' options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
      }} />
      <Tabs.Screen name='Docs' options={{
        tabBarLabel: 'Docs',
        tabBarIcon: ({ color, size }) => <Ionicons name="document-text" color={color} size={size} />,
      }} />
      <Tabs.Screen name='Reports' options={{
        tabBarLabel: 'Reports',
        tabBarIcon: ({ color, size }) => <Ionicons name="" color={color} size={size} />,
      }} />
      <Tabs.Screen name='Tasks' options={{
        tabBarLabel: 'Tasks',
        tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
      }} />
      <Tabs.Screen name='profile' options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} /> 
      }} />


    </Tabs>
    
  </>
  );
}

export default TabLayout;

const styles = StyleSheet.create({})