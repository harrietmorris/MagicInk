
import React from 'react'
import { Redirect } from 'expo-router'
import { LogBox } from 'react-native';

const index = () => {
  LogBox.ignoreAllLogs();
  
  return (
    <Redirect href="/loginScreen"></Redirect>
  )
}

export default index