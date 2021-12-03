import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native' 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ApolloProvider } from '@apollo/client';
import { RootStackParamList } from './types';
import client from './services/spaceXclient';

import Home from './components/Home';
import Details from './components/Details';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <ApolloProvider client={client}>   
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
          <Stack.Screen name="Details" component={Details} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
