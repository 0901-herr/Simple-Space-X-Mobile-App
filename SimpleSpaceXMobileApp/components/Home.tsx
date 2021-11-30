import React, { useRef, useMemo, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, FlatList, ListRenderItem } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { gql, useQuery } from '@apollo/client'

import { RootStackParamList } from '../types';
import colors from '../assets/colors/colors';
import RocketListItem from './RocketListItem';
import rocketData from '../assets/data/rocketData';
import { IRocket } from '../assets/data/rocketData'
import { RocketInventoryData } from '../assets/data/rocketData';
import { RocketInventory } from '../assets/data/rocketData';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const GET_ROCKETS = gql`
  query GetRockets($rockets: RocketInventory) {
    rocketInventory(rockets: $rockets) {
        id
        active
        country
        name
        type
        description
    }
  }
`;

const ListHeader = () => (
    <>
      <View style={styles.titleWrapper}>
          <Text style={styles.largeTitle}>Spaceships</Text>
        </View>
      <View style={styles.divider} />
    </>
)

// define type of Home -> it is a Functional Components of type HomeProps
const Home: React.FC<HomeProps> = ({navigation}) => {
    const { loading, data, error } = useQuery<RocketInventoryData>(
        GET_ROCKETS
    );
    
    if (loading) return <View><Text>Loading...</Text></View>
    if (error) return <View><Text>{error}</Text></View>
    
    const renderRocketListItem: ListRenderItem<RocketInventory> = ({ item }) => (
        <RocketListItem 
            rocketDetails={item}
            onPress={() => 
                navigation.navigate('Details', {
                    rocketDetails: item,
                })
            }
        />
    );

    return (  
        <View style={styles.container}>
            <SafeAreaView>
                <FlatList
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    numColumns={2}
                    data={data?.rocketInventory}
                    renderItem={renderRocketListItem}
                    keyExtractor={item => item.id}

                    ListHeaderComponent={<ListHeader />}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        color: colors.white,
    },
    titleWrapper: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    largeTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.lightgray,
        marginHorizontal: 16,
        marginTop: 16,
    },
})
 
export default Home;