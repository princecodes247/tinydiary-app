
import { useSession } from '@/contexts/auth';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Platform, Text, ScrollView, SafeAreaView, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useSession();

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <View
       >
          <View className='flex flex-col justify-between px-4 py-8 items-center'>
            <Text className='text-2xl font-semibold'>Login</Text>
            {/* <Text 
        className='text-center'
        
        ></Text> */}
          </View>
          <View className='p-4 mx-4 gap-6 h-full'>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='p-4 gap-6'>
              <View>
                <Text>Email</Text>
                <TextInput className='bg-gray-200 p-3 rounded border'
                value={email}
                onChangeText={text => setEmail(text)}
                />
              </View>
              <View>
                <Text>Password</Text>

                <TextInput  
                className='bg-gray-200 p-3 rounded border'  
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
              />
              </View>
              <View>
                <TouchableOpacity className='border p-4'
                onPress={() => {
                  signIn({email, password})
                  router.replace('/');
                }}
                >
                  <Text className='text-center'>Submit</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity 
                // onPress={() => navigation.navigate('Register')}
                className='mt-4 text-gray-700 underline'
                >
        <Text 
        className='text-center'
        
        >Don't have an account? Register here</Text>
      </TouchableOpacity> */}
              </View>
              <Text className='text-center'>or sign up with</Text>

              <View className='flex-row gap-2'>
                <TouchableOpacity className='border border-gray-300 p-4 flex-1 rounded-lg'>
                  <Text className='text-center'></Text>
                </TouchableOpacity>
                <TouchableOpacity className='border border-gray-300 p-4 flex-1 rounded-lg'>
                  <Text className='text-center'></Text>
                </TouchableOpacity>
                <TouchableOpacity className='border border-gray-300 p-4 flex-1 rounded-lg'>
                  <Text className='text-center'></Text>
                </TouchableOpacity>

              </View>

            </KeyboardAvoidingView>
          </View>

        </View>

      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
