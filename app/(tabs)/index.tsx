import { AddNoteModal } from '@/components/AddNote';
import { DateCard, DateList } from '@/components/DateList';
import { EmptyState } from '@/components/EmptyState';
import { LoadingState } from '@/components/LoadingState';
import { NavBar } from '@/components/NavBar';
import { NoteCard } from '@/components/NoteCard';
import { API_URL } from '@/constants';
import { FABState, INote } from '@/types';
import { apiClient } from '@/utils/api-client';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Image, StyleSheet, Platform, Text, ScrollView, SafeAreaView, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



export default function HomeScreen() {

  const { data: notes, isLoading, error, isError, refetch } = useQuery<INote[]>({
    queryKey: ['notes'],
    queryFn: async () => {
      const res = await apiClient.get(API_URL + '/notes');
      console.log({ res: res.data.data })
      return res.data.data
    }
  });


  const addNoteBottomSheetRef = useRef<BottomSheet>(null);
  const recordingBottomSheetRef = useRef<BottomSheet>(null);
  const [fabState, setFabState] = useState<FABState>('idle');

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleFABPress = () => {
    switch (fabState) {
      case 'idle':
        setFabState('addNote');
        addNoteBottomSheetRef.current?.expand();
        break;
      case 'addNote':
        addNoteBottomSheetRef.current?.close();
        setFabState('idle');
        break;
      case 'reviewRecord':
        // recordingBottomSheetRef.current?.close();
        setFabState('idle');
        break;

    }
  };

  const handleFABLongPress = () => {
    if (fabState === 'idle') {
      setFabState('recording');
      // recordingBottomSheetRef.current?.expand();
    }
  }


  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        {/* <KeyboardAvoidingView
   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
   > */}
        <View className='h-full'>
        <View className='flex justify-between px-4 py-8 flex-row items-center'>
            <Text className='text-2xl'>Morning, Prince</Text>
            <Link href={"/(auth)/login"}>
              <View className='w-10 h-10 rounded-full bg-black'>

              </View>
            </Link>
          </View>
        <ScrollView className='fkex-1'>
          {/* <View className='m-4 p-4 py-7 rounded-lg bg-gray-300'>
        <Text className='text-lg'>Your mood is great today!</Text>
        <Text>Keep it in your mind to have a great day!</Text>
      </View> */}
          <View className='pt-1'>
            {/* <Text className='ml-6 mb-3'>Your Diary {fabState}</Text> */}
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToEnd> */}
            <DateList />
            {/* </ScrollView> */}
          </View>
          <View className='py-6 pb-20 flex px-2'>
            {
              !isLoading && notes && notes.length > 0 ? notes?.map((note, idx) => (

                <NoteCard key={note.title + idx} title={note.title} content={note.content} isLast={idx + 1 === notes.length} />
              )) : null
            }
            {isError || (!isLoading && notes?.length === 0) ?
              (<EmptyState />) : null
            }
            {isLoading ? <LoadingState /> : null}
          </View>

        </ScrollView>

        </View>
        <BottomSheet
          ref={recordingBottomSheetRef}
          snapPoints={['30%']}
          enablePanDownToClose
          onClose={() => setFabState('idle')}
          index={-1}
        >
          <BottomSheetView>
            <View className="p-6">
              <View className="items-center">
                <Text className="text-xl font-semibold mb-4">
                  {fabState === 'recording' ? "Recording..." : "Recording Complete"}
                </Text>
                {fabState === 'recording' ? (
                  <View className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                ) : (
                  <Text className="text-gray-500">
                    Tap to save or swipe down to discard
                  </Text>
                )}
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>

        <AddNoteModal
          ref={addNoteBottomSheetRef}
          handleClose={() => {
            addNoteBottomSheetRef.current?.close();
            setFabState('idle');
            refetch()
          }}
        />
        {/* </KeyboardAvoidingView> */}
        <NavBar
          fabState={fabState}
          handlePress={handleFABPress}
          handleLongPress={handleFABLongPress}
          handlePressOut={() => {
            if (fabState === 'recording') {
              setFabState('reviewRecord');
            }
          }}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
