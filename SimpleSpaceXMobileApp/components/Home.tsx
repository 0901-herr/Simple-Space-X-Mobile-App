import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import colors from '../assets/colors/colors';

// export interface HomeProps {
//     navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>
// }

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

// define type of Home -> it is a Functional Components of type HomeProps
const Home: React.FC<HomeProps> = ({navigation}) => {
    return (  
        <View style={styles.container}>
            <Text>Hello</Text>
            <Button onPress={() => navigation.navigate('Details')} title="Click me"/>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        color: colors.white,
    }
})
 
export default Home;