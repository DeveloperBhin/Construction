import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'


const TabLayout = () => {
  return (
    <Tabs>
    
      
      <Tabs.Screen name='Home'/>
      <Tabs.Screen name='Docs'/>
      <Tabs.Screen name='Reports'/>
      <Tabs.Screen name='Tasks'/>
      <Tabs.Screen name='profile'/>

      
      </Tabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({})