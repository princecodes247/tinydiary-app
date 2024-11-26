import { DateCard, DateList } from '@/components/DateList';
import { Header } from '@/components/Header';
import { NoteCard } from '@/components/NoteCard';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Image, StyleSheet, Platform, Text, ScrollView, SafeAreaView, View, TouchableOpacity } from 'react-native';


export default function SingleNoteScreen() {
  return (
    <SafeAreaView>
    <ScrollView>
    <View className='mb-4 p-2'>
   
    <Header title='Random Thoughts'/>
    </View>

    <View className='p-6 pt-0'>

    <View className='flex flex-row items-center pb-4 border-b border-gray-300 justify-between'>
        <Text className='text-md text-gray-700'>07:23 AM</Text>
        <Text className='text-lg'>Buidl</Text>
        </View>
      <View className='py-6'>
      <Text className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod perferendis quasi aliquid pariatur qui assumenda eius?</Text>

      </View>
    </View>
    </ScrollView>
   
    </SafeAreaView>
  );
}
