import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadUser } from './authSlice'
import { Stack } from 'expo-router'

const AppWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser()) // Load user data upon app start
  }, [dispatch]);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}

export default AppWrapper

