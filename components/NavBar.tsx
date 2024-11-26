import { FABState } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View, ScrollView } from 'react-native';


const getFABIcon = (state: FABState) => {
  switch (state) {
    case 'recording':
      return 'mic';
    case 'addNote':
    case 'reviewRecord':
      return 'checkmark';
    default:
      return 'add';
  }
}

export function NavBar({
  fabState,
  handlePress,
handleLongPress,
handlePressOut,

}: {
  fabState: FABState
  handlePress: () => void
handleLongPress: () => void
handlePressOut: () => void
}) {


  return (
    <View className='absolute bottom-8 left-4 right-4'>
    <View className='bg-white rounded-full h-16 border border-gray-200 flex-row justify-around items-center px-4 '>
      <Link href={"/"} suppressHighlighting={true}>
        <Ionicons name="home-outline" size={24} color="gray" />
      </Link>
      
      <Link href={"/"} suppressHighlighting={true}>
        <Ionicons name="calendar-outline" size={24} color="gray" />
      </Link>

      <TouchableOpacity 
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressOut={handlePressOut}
        className={`
          rounded-full  w-[50px] bg-gray-100 h-[50px] 
          flex justify-center items-center
          ${fabState === 'recording' && "relative z-[999999999]"}
        `}
      >
        <Ionicons 
          name={getFABIcon(fabState)} 
          size={28} 
          color="gray" 
        />
      </TouchableOpacity>

      <Link href={"/"} suppressHighlighting={true}>
        <Ionicons name="stats-chart-outline" size={24} color="gray" />
      </Link>
      
      <Link href={"/settings"}>
        <Ionicons name="person-outline" size={24} color="gray" />
      </Link>
    </View>
  </View>
  );
}
