import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View, ScrollView } from 'react-native';

export function Header({title}: {title: string}) {


  return (
    <View className="flex-row items-center mb-8">
    <TouchableOpacity onPress={() => {
      router.back()
    }} className="mr-4">
      <Ionicons name="arrow-back" size={24} color="gray" />
    </TouchableOpacity>
    <Text className="text-2xl font-semibold">{title}</Text>
  </View>
  );
}
