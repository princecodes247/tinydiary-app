import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { Link } from 'expo-router';
import { PropsWithChildren, RefObject, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View, Image, Alert, Keyboard } from 'react-native';
import React, { forwardRef } from 'react';
import { MoodSelector } from './MoodSelector';
import * as ImagePicker from 'expo-image-picker';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { BottomSheetTextInputProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput';
import { closeKeyboard } from '@/utils';
import { apiClient } from '@/utils/api-client';

type AddNoteModalProps = {
  handleClose: () => void
}

export const AddNoteModal = forwardRef<BottomSheet, AddNoteModalProps>(({
  handleClose
}, ref) => {
  const textInputRef = useRef(null)
  const [selectedFolder, setSelectedFolder] = useState("")
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDetails, setNoteDetails] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const mutation = useMutation({
    mutationFn: async (newNote: {
      title: string;
      content: string;
    }) => {
      const res = await apiClient.post('/notes', newNote);
      console.log({res})
      return res
    },
    onMutate: () => {
      setIsPending(true)
    },
    onSettled: (data) => {
      console.log({data})
      setIsPending(false)
    },
    onSuccess: (data) => {
      console.log({data})
      closeKeyboard()
      handleClose()
    },
    onError: (err) => {
      console.log({err})
    }
  })

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newImages = result.assets.map(asset => asset.uri);
      setImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  const removeImage = (uri: string) => {
    setImages(images.filter(image => image !== uri));
  };

  const createNote = () => {
    mutation.mutate({
      title: noteTitle,
     content: noteDetails
    })
    
  }

  return (
    <BottomSheet
      ref={ref}
      snapPoints={['40%']}
      enablePanDownToClose
      index={-1}
      bottomInset={100}
      detached
      style={{
        marginHorizontal: 10,
        borderRadius: 20,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.25,
        
        shadowRadius: 4,
        elevation: 5,
      }}
      backgroundStyle={{
        borderWidth: 1,
        borderColor: "#e5e7eb"
      }}
      onClose={() => {
        closeKeyboard()
        handleClose()
      }}
      
      keyboardBlurBehavior="restore"
    >
      <BottomSheetView>
        <View className="p-6">
          <View className="flex flex-row justify-between items-center mb-6">
            <BottomSheetTextInput
              className="bg-transparent text-2xl flex-1 rounded-lg"
              placeholder="Title?"
              placeholderTextColor="#666"
              value={noteTitle}
              onChangeText={(text) => {
                setNoteTitle(text);
              }}
              readOnly={mutation.isPending}

            />
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          
         <View className='bg-gray-100 rounded-lg p-4 mb-2'>
          <TouchableOpacity 
            activeOpacity={1}
            onPress={() => {
              // textInputRef.current?.focus();
            }}
          >
            <BottomSheetTextInput
              ref={textInputRef}
              className="min-h-[100px]"
              placeholder="Write your thoughts..."
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              value={noteDetails}
              onChangeText={(text) => {
                setNoteDetails(text);
              }}
              readOnly={mutation.isPending}
            />
            <View className="flex flex-row flex-wrap">
              {images.map((image, index) => (
                <View key={index} className="relative mr-2 mb-2">
                  <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                  <TouchableOpacity onPress={() => removeImage(image)} className="absolute top-1 right-1 bg-red-500 rounded-full p-1">
                    <Ionicons name="close" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </TouchableOpacity>
         </View>
<View className='flex flex-row justify-between items-center mb-6 pl-2'>
          
          <TouchableOpacity onPress={pickImages} className="">
              <Ionicons name="image-outline" size={18} color="gray" className="ml-auto" />
              {/* <Text className="text-blue-500">Add Images</Text> */}
          </TouchableOpacity>

<Text className={`${noteDetails.length > 80 ? 'text-red-500' : 'text-gray-500'}`}>
            {noteDetails.length}/80
          </Text>
</View>

          <View className="mb-4 flex flex-row items-center">
            <TouchableOpacity 
              className="flex-1 flex-row items-center p-3 bg-gray-100 rounded-lg"
              onPress={() => {
                // Show folder selection modal/sheet
                const folders = ['Personal', 'Work', 'Family', 'Health'];
                Alert.alert(
                  'Select Folder',
                  '',
                  folders.map(folder => ({
                    text: folder,
                    onPress: () => setSelectedFolder(folder)
                  })),
                  { cancelable: true }
                );
              }}
            >
              <Ionicons name="folder-outline" size={20} color="gray" className="mr-2" />
              <Text className="text-gray-600 ml-2">
                {selectedFolder || 'Select Folder'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="gray" className="ml-auto" />
            </TouchableOpacity>
           
          </View>
          
          <TouchableOpacity disabled={mutation.isPending} onPress={createNote} className="flex justify-center items-center p-4 rounded bg-blue-500">

              <Text className="text-white">{isPending? "Creating..." : "Create"}</Text>
          </TouchableOpacity>
          
          {/* <MoodSelector onClose={() => {}} onSelect={() => {}}/> */}
        
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});
