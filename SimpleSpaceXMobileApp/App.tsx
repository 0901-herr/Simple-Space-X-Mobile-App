import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import 'react-native-gesture-handlers'

import { NavigationContainer } from '@react-navigation/native' 
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import WelcomePopUp from './components/WelcomePopUp'; 

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
  return (
    // <>
    //  {showWelcomePopUp && <WelcomePopUp handleDone={handleWelcomePopUpFinish} />}
    //  {!showWelcomePopUp && 
        <ApolloProvider client={client}>   
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
              <Stack.Screen name="Details" component={Details} options={{headerShown: false}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </ApolloProvider>
    //  }
    // </>
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
