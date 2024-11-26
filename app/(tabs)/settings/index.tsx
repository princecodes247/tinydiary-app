import { Image, StyleSheet, Platform, Text, ScrollView, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/Header';

export default function SettingsScreen() {
  const isPro = false; // This would come from your auth/subscription state
  const userName = "Prince"; // This would come from your auth state

  const settingsOptions: {
    title: string;
    icon: (typeof Ionicons)["name"];
    items: {
        label: string;
        icon: string;
    }[];
}[] = [
    {
      title: 'Account',
      icon: 'person-outline',
      items: [
        { label: 'Notifications', icon: 'notifications-outline' },
        { label: 'Privacy', icon: 'lock-closed-outline' }
      ]
    },
    {
      title: 'Preferences',
      icon: 'settings-outline', 
      items: [
        { label: 'Theme', icon: 'color-palette-outline' },
        // { label: 'Language', icon: 'language-outline' },
        { label: 'Export Data', icon: 'download-outline' }
      ]
    },
    {
      title: 'Support',
      icon: 'help-circle-outline',
      items: [
        // { label: 'Help Center', icon: 'information-circle-outline' },
        { label: 'Contact Us', icon: 'mail-outline' },
        { label: 'About', icon: 'alert-circle-outline' }
      ]
    }
  ];

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <ScrollView>
          <View className="px-4 py-8">
           <Header title='Settings'/>

            {/* Profile Section */}
            <View className="mb-8 bg-gray-50 p-4 rounded-xl">
              <View className="flex-row items-center">
                <View className="w-16 h-16 rounded-full bg-gray-200 mr-4" />
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-xl font-medium">{userName}</Text>
                    {isPro && (
                      <View className="ml-2 px-2 py-1 bg-blue-100 rounded-full">
                        <Text className="text-xs text-blue-600 font-medium">PRO</Text>
                      </View>
                    )}
                  </View>
                  {!isPro && (
                    <TouchableOpacity className="mt-2">
                      <Text className="text-blue-500 font-medium">Upgrade to Pro</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            
            {settingsOptions.map((section, index) => (
              <View key={index} className="mb-8">
                <View className="flex-row items-center mb-4">
                  <Ionicons name={section.icon} size={24} color="gray" />
                  <Text className="text-lg font-medium ml-2">{section.title}</Text>
                </View>
                
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity 
                    key={itemIndex}
                    className="flex-row items-center justify-between py-4 px-2 border-b border-gray-200"
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={item.icon} size={20} color="gray" />
                      <Text className="ml-3 text-gray-800">{item.label}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="gray" />
                  </TouchableOpacity>
                ))}
              </View>
            ))}

            <TouchableOpacity className="mt-4 py-4 px-2">
              <Text className="text-red-500 text-center">Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
