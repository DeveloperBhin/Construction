import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'


const TabLayout = () => {
  return (
    <Tabs>
    
      <Tabs.Screen name='profile'/>
      <Tabs.Screen name='Home'/>
      <Tabs.Screen name='Docs'/>
      
      </Tabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({})