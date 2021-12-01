import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { RootStackParamList } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dimensions } from 'react-native'; 

import colors from '../assets/colors/colors';
import rocketImage from '../assets/images/rocketImage';
import { imageSelect } from './RocketListItem';

const height = Dimensions.get('window').height;
 
export type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const Details: React.FC<DetailsProps> = ( {route, navigation}: DetailsProps) => {
    const item = route.params;
    return (  
        <View style={styles.container}>
            {/* Upper background */}
            <ImageBackground source={imageSelect(item.rocketDetails.name)} style={styles.backgroundImage}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../assets/images/left-arrow.png')} style={styles.arrowBack}/>
                </TouchableOpacity>
            </ImageBackground>
            
            {/* Lower details */}
            <View style={styles.infoWrapper}>
                <View style={styles.titlesWrapper}>
                    <Text style={styles.rocketTitle}>{item.rocketDetails.name}</Text>
                    <Text style={styles.rockerType}>{item.rocketDetails.type}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.topInfoWrapper}>
                    <Text style={styles.rocketLocation}>{item.rocketDetails.country}</Text>
                    <Text style={styles.rocketType}>{item.rocketDetails.type}</Text>
                </View>
                <Text style={styles.rocketDescription}>{item.rocketDetails.description}</Text>
            </View>
       </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },

    // Upper part image background
    backgroundImage: {
        height: height * 0.5,
        justifyContent: 'space-between',
    },
    arrowBack: {
        width: 20,
        height: 20,
        marginLeft: 20,
        marginTop: 60,
    },

    // Lower part detail descriptions
    titlesWrapper: {
        marginHorizontal: 20,
        marginVertical: 20,
        // marginBottom: height * 0.28,
    },
    rocketTitle: {
        fontSize: 30,
        color: colors.black,
        fontWeight: 'bold',
    },
    rockerType: {
        fontSize: 16,
        color: colors.black,
        marginTop: 10, 
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.lightgray,
        marginHorizontal: 16,
    },
    infoWrapper: {
        flex: 1,
        backgroundColor: colors.white,
        marginTop: -20,
        borderRadius: 25,
        paddingTop: 10,
    },
    topInfoWrapper: {
        flexDirection: 'row',
        marginVertical: 20,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    rocketLocation: {
        width: '50%',
        fontSize: 18,
    },
    rocketType: {
        width: '50%',
        fontSize: 18,
    },
    rocketDescription: {
        marginHorizontal: 20,
        paddingTop: 10,
    },
});
 
export default Details;