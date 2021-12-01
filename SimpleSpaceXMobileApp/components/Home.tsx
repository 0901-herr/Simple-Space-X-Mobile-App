import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, FlatList, ListRenderItem, TextInput, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { gql, useQuery } from '@apollo/client'

import { RootStackParamList } from '../types';
import { RocketInventoryData } from '../assets/data/rocketData';
import { RocketInventory } from '../assets/data/rocketData';
import { Dimensions } from 'react-native'; 

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import colors from '../assets/colors/colors';
import RocketListItem from './RocketListItem';

const windowWidth = Dimensions.get('window').width;
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export interface TaskState {
    task: string
}

const ROCKETS_DATA = gql`
  query GetRockets {
    rockets {
        id
        active
        country
        name
        type
        description
    }
  }
`;

const Home: React.FC<HomeProps> = ({navigation}) => {
    const { loading, data, error } = useQuery<RocketInventoryData>(ROCKETS_DATA);

    if (loading) return <View><Text>Loading...</Text></View>
    if (error) return <View><Text>{error}</Text></View>
    
    const [rocketData, setRocketData] = useState<RocketInventoryData>();
    const [searchText, setSearchText] = useState<string>();
    const [filteredRocketData, setFilteredRocketData] = useState<RocketInventory[]>();

    // search function
    const searchFilterFunction = (searchText: string) => {
        setSearchText(searchText) 
        setRocketData(data)
        console.log("searching...")
        // console.log(rocketData)
        let filteredData = rocketData?.rockets.filter(function (item) {
            return item.name.includes(searchText);
        }); 

        for(let i = 0; i < 4; i++) {
            console.log(rocketData?.rockets[i].name)
        }
 
        // console.log(filteredData);
        setFilteredRocketData(filteredData);  
      };
    
    // render rocket list items
    const renderRocketListItem: ListRenderItem<RocketInventory> = ({ item, index }) => (
        <RocketListItem 
            rocketDetails={item}
            index={index}
            rocketListLength={searchText && filteredRocketData ? filteredRocketData.length : (data==null ? 0 : data.rockets.length)}
            onPress={() => 
                navigation.navigate('Details', {
                    rocketDetails: item,
                    index: index
                })
            }
        />
    );

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
            <View style={styles.container}>
                <SafeAreaView>
                    <FlatList
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        numColumns={2}
                        data={filteredRocketData && (searchText!=null && searchText.length > 0) ? filteredRocketData : data?.rockets}
                        renderItem={renderRocketListItem}
                        keyExtractor={item => item.id}
                        style={styles.flatListView}

                        ListHeaderComponent = {
                            <>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.largeTitle}>Spaceships</Text>
                                </View>
                            <View style={styles.divider} />
                            
                            <View style={styles.searchWrapper}>
                                <View style={styles.input}>
                                    <Image source={require('../assets/images/search.png')} style={styles.searchIcon}/>
                                    <TextInput
                                        onChangeText={text => searchFilterFunction(text)}
                                        value={searchText}
                                        placeholder="search rockets"
                                        style={styles.textInput}
                                    />
                                </View> 
                                <View style={styles.filterWrapper}>
                                    <TouchableOpacity onPress={handlePresentModalPress}> 
                                        <View style={styles.filterLocationWrapper}>
                                            <Text style={styles.filterLocation}>location</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>  
                            </>
                        }
                    />
                </SafeAreaView>

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
    flatListView: {
        height: '100%',
    },

    searchWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 20,
        paddingVertical: 8,
        paddingHorizontal: 15, 
        borderRadius: 60,
        backgroundColor: '#E5E5E5',
        width: windowWidth*0.55,
        alignItems: 'center',
    },
    textInput: {
        marginLeft: 12,
        width: windowWidth*0.4,
    },
    searchIcon: {
        width: 12,
        height: 12,
    },
    filterWrapper: {
        marginTop: 20,
        marginRight: 20,
    },
    filterLocationWrapper: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        width: windowWidth*0.225,
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 60,
        alignItems: 'center',
    },
    filterLocation: {
        fontSize: 12,
        color: colors.black,
    },

    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },    
})
 
export default Home;