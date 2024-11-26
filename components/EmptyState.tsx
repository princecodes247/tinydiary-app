import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export const EmptyState = () => (
    <View className="flex flex-col items-center gap-4 p-8">
      <Ionicons name="pencil" className="w-12 h-12 text-gray-400" />
      <Text>Start Your First Entry</Text>
      <Text>Capture your thoughts in 280 characters or less</Text>
      <TouchableOpacity 
    //   onClick={openEntryModal}
      >
        <Text>Write Now</Text>
      </TouchableOpacity>
    </View>
  );