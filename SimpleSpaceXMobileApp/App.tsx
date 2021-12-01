import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native' 
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';


import Home from './components/Home';
import Details from './components/Details';
import colors from './assets/colors/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

function App() {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
  }, []);

  return (
    <ApolloProvider client={client}>   
      {/* <BottomSheetModalProvider> */}
      <NavigationContainer>
      {/* <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        /> */}
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
          <Stack.Screen name="Details" component={Details} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>

      {/* <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    >
                    <View style={styles.contentContainer}>
                        <Text>Awesome 🎉</Text>
                    </View>
                </BottomSheetModal> */}
      {/* </BottomSheetModalProvider> */}
    </ApolloProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
}, 
});
