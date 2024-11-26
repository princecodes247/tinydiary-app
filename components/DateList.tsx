import { API_URL } from '@/constants';
import { apiClient } from '@/utils/api-client';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View, ScrollView } from 'react-native';

export function DateList() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState<Date[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const { data: notes, isLoading, error, isError, refetch } = useQuery({
    queryKey: ['note-dates'],
    queryFn: async () => {
      const res = await apiClient.get(API_URL + '/notes/dates');
      console.log({ res: res.data.data })
      return res.data.data
    }
  });


  useEffect(() => {
    // Generate dates for the next 30 days
    const dateArray = [];
    for (let i = -2; i <= 0; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dateArray.push(date);
    }
    setDates(dateArray);
  }, []);

  // Scroll to selected date on mount
  useEffect(() => {
    
    setTimeout(() => {
        if (scrollViewRef.current) {
        console.log("mark")
        scrollViewRef?.current.scrollToEnd({
          animated: true
        });
      }
      }, 0);
  }, []);

  return (
    <View className="px-4">
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="flex"
        snapToInterval={80}
      >
        <View className="flex flex-row py-4">
   {  dates.length > 7 && (
    <Link href={"/"}>
    <View 
     className={"flex items-center justify-center mx-1.5 px-4 py-3 rounded-2xl bg-gray-50 border-gray-100 border"}
     style={{
       minWidth: 70
     }}
   >
     <Text 
       className="text-xs font-medium mb-1 text-gray-400"
     >
       {/* {month} */}
       See
     </Text>
     <Text 
       className="text-xl font-bold mb-0.5 text-gray-700"
     >
       {/* {day} */}
       More
     </Text>
     <Text 
       className="text-xs font-medium mb-1 text-gray-400"
     >
       {/* {weekday} */}
       Entries
     </Text>
   </View></Link>
   )}
          {dates.map((date, index) => (
            <DateCard
              key={index}
              date={date}
              isSelected={date.toDateString() === selectedDate.toDateString()}
              isToday={date.toDateString() === new Date().toDateString()}
              onSelect={() => setSelectedDate(date)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export function DateCard({ 
  date, 
  isSelected, 
  isToday,
  onSelect 
}: { 
  date: Date; 
  isSelected: boolean;
  isToday: boolean;
  onSelect: () => void;
}) {
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate().toString();
  const weekday = date.toLocaleString('default', { weekday: 'short' });

  return (
    <TouchableOpacity 
      onPress={onSelect}
      className={`
        flex items-center justify-center mx-1.5 px-4 py-3 rounded-2xl
        ${
          isSelected 
          ? 'bg-blue-50 border-blue-200'  :
          isToday 
          ? 'border-blue-500' 
            : 'bg-gray-50 border-gray-100'
        } border
      `}
      style={{
        minWidth: 70
      }}
    >
      <Text 
        className={`text-xs font-medium mb-1 ${
          isSelected ? 'text-blue-500' : 'text-gray-400'
        }`}
      >
        {month}
      </Text>
      <Text 
        className={`text-xl font-bold mb-0.5 ${
          isSelected ? 'text-blue-600' : 'text-gray-700'
        }`}
      >
        {day}
      </Text>
      <Text 
        className={`text-xs font-medium ${
          isSelected ? 'text-blue-500' : 'text-gray-400'
        }`}
      >
        {weekday}
      </Text>
    </TouchableOpacity>
  );
}
