import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';


export function NoteCard({ title = "", content = "", createdAt, isLast }: { title?: string; content: string; createdAt?: Date; isLast: boolean }) {
  const colors = [
    'bg-blue-50', 'bg-green-50', 'bg-purple-50', 
    'bg-pink-50', 'bg-yellow-50', 'bg-orange-50'
  ];
  let seed = (title ?? "").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) 
    + content.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  if(createdAt) {
    seed += createdAt.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }
  const randomColor = colors[seed % colors.length];

  return (
    <View className="flex flex-row">
      <View className="mr-3 ml-1 items-center pt-3">
        <View className="w-2 h-2 rounded-full relative z-10 bg-gray-200" />
        {!isLast && <View className="w-[1px] -mb-3 flex-1 bg-gray-200 -mt-1" />}
      </View>
      <Link href={"/(tabs)/note/3"} className="flex-1 mb-4">
      {/* <View className={`rounded-lg p-6 ${randomColor} border border-gray-200`}></View> */}
        <View className={`rounded-lg p-4 ${randomColor} border border-gray-100 w-full`}>
          <Text className="text-lg font-medium mb-2">{title.length > 0 ? title : "Random Thoughts"}</Text>
          <Text className="text-gray-500 leading-6 mb-3">
            {content}
          </Text>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-gray-400 text-sm">07:23 AM</Text>
            <Text className="text-gray-500">Buidl</Text>
          </View>
        </View>
      </Link>
    </View>
  );
}
