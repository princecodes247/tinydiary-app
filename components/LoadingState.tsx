import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export const LoadingState = () => (
  <View className="p-4">
  <View className="animate-pulse ">
    <View className="bg-gray-200 p-6 rounded ml-12 gap-6">
    <View className="h-4 bg-gray-100 rounded w-3/4" />
    <View className="h-4 bg-gray-100 rounded" />
    <View className="h-4 bg-gray-100 rounded w-1/2" />
    </View>
  </View>
</View>
  );