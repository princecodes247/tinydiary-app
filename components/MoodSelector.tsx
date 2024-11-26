import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { MOOD_CATEGORIES } from '../constants/moods'; // Adjust the import path as necessary
import { Ionicons } from '@expo/vector-icons';
import { TMood } from '@/types';

export const MoodSelector = ({ onSelect, onClose, initialMood = null }) => {
    const [selectedMood, setSelectedMood] = useState<TMood | null>(initialMood);
    const [showMoodSelector, setShowMoodSelector] = useState(false);
    setShowMoodSelector
    const [recentMoods] = useState([
      { emoji: "😊", label: "Content", value: "content", timestamp: "2h ago" },
      { emoji: "✨", label: "Inspired", value: "inspired", timestamp: "Yesterday" },
      { emoji: "😴", label: "Tired", value: "tired", timestamp: "2 days ago" }
    ]);
  
    const handleMoodSelect = (mood: TMood) => {
      setSelectedMood(mood);
      onSelect(mood);
      onClose();
    };
  
    return (
      <View>
           <TouchableOpacity
             onPress={() => setShowMoodSelector(true)}
             className="flex flex-row items-center gap-2 mb-4 p-2 rounded-lg hover:bg-gray-50"
           >
             <Text className="text-2xl">
               {selectedMood ? selectedMood.emoji : "😶"}
             </Text>
             <Text className="text-gray-600">
               {selectedMood ? selectedMood.label : "Add mood"}
             </Text>
           </TouchableOpacity>
      </View>
    );
  };

//   <View className="flex-1 bg-black bg-opacity-25">
//   <View className="bg-white rounded-t-xl shadow-xl">
//     {/* Header */}
//     <View className="flex flex-row items-center justify-between p-4 border-b">
//       <Text className="text-lg font-semibold">How are you feeling?</Text>
//       <TouchableOpacity onPress={onClose} className="p-2">
//         <Ionicons name='close' className="h-5 w-5 text-gray-500" />
//       </TouchableOpacity>
//     </View>

//     <ScrollView className="p-4 space-y-6 max-h-[70vh]">
//       {/* Recent Moods */}
//       <View>
//         <Text className="text-sm font-medium text-gray-500 mb-2">Recent</Text>
//         <View className="flex flex-row space-x-4">
//           {recentMoods.map((mood) => (
//             <TouchableOpacity
//               key={`${mood.value}-${mood.timestamp}`}
//               onPress={() => handleMoodSelect(mood)}
//               className="flex flex-col items-center"
//             >
//               <Text className="text-2xl mb-1">{mood.emoji}</Text>
//               <Text className="text-xs text-gray-500 flex items-center">
//                 <Ionicons name='time' className="h-3 w-3 mr-1" />
//                 {mood.timestamp}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* All Moods */}
//       <View className="space-y-6">
//         {MOOD_CATEGORIES.map((category) => (
//           <View key={category.category}>
//             <Text className="text-sm font-medium text-gray-500 mb-2">
//               {category.category}
//             </Text>
//             <View className="grid grid-cols-4 gap-4">
//               {category.moods.map((mood) => (
//                 <TouchableOpacity
//                   key={mood.value}
//                   onPress={() => handleMoodSelect(mood)}
//                   className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50"
//                 >
//                   <Text className="text-2xl mb-1">{mood.emoji}</Text>
//                   <Text className="text-xs text-gray-600">{mood.label}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   </View>
// </View>