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
import FilterItem from './FilterItem';
import WelcomePopUp from './WelcomePopUp';

const windowWidth = Dimensions.get('window').width;
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export interface TaskState {
    task: string
}

const ROCKETS_DATA = gql`
  query GetRockets {
    rockets {
        active
        boosters
        country
        description
        diameter {
            meters
        }
        height {
            meters
        }
        mass {
            kg
        }
        name
        success_rate_pct
        type
    }
  }
`;

const Home: React.FC<HomeProps> = ({navigation}) => {
    const { loading, data, error } = useQuery<RocketInventoryData>(ROCKETS_DATA);

    const [rocketData, setRocketData] = useState<RocketInventoryData>();
    const [searchText, setSearchText] = useState<string>();
    const [filteredRocketData, setFilteredRocketData] = useState<RocketInventory[]>();
    const [locationFilterData, setLocationFilterData] = useState<string[]>();

    // search function
    const searchFilterFunction = (searchText: string) => {
        setSearchText(searchText) 
        setRocketData(data)
        
        let filteredData = rocketData?.rockets.filter(function (item) {
            return item.name.includes(searchText) || item.country.includes(searchText);
        }); 

        setFilteredRocketData(filteredData);  
    };
    
    const locationFilterFunction = (filterLocation: string) => {
        setRocketData(data)
        setSearchText(filterLocation) 

        let filteredData = rocketData?.rockets.filter(function (item) {
            return item.country.includes(filterLocation);
        }); 

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

      // filter options
      const renderLocationFilter: ListRenderItem<string> = ({ item }) => (
          <View>
            <TouchableOpacity onPress={() => locationFilterFunction(item)}>    
                <FilterItem  
                    filterItemData={item}
                />
            </TouchableOpacity>
           <View style={styles.bottomViewDivider} />
        </View>
    );

    const getFilterLocation = () => {
        let filterLocations: string[] = [] 
        if (data != null) {
            for (let i = 0; i < data.rockets.length; i++) { 
                if (!filterLocations.includes(data.rockets[i].country)) {
                    console.log(data.rockets[i].country);
                    filterLocations.push(data.rockets[i].country)
                }
            }
        }
        console.log(filterLocations);
        setLocationFilterData(filterLocations);
    }

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['25', '30%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        getFilterLocation();
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    

    if (loading) return <View><Text>Loading...</Text></View>
    if (error) return <View><Text>{error}</Text></View>
    
    return (  
        <BottomSheetModalProvider>
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
                    <WelcomePopUp />
                </SafeAreaView>
        
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    style={styles.bottomSheet}
                    >
                    <View style={styles.bottomSheetContainer}>
                        <Text style={styles.bottomViewLargeTitle}>Location</Text>
                        <FlatList
                            data={locationFilterData}
                            renderItem={renderLocationFilter}
                            keyExtractor={(item) => item}
                            showsHorizontalScrollIndicator={false}
                            style={styles.bottomSheetFlatListView}
                        />
                    </View>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
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

    bottomSheetContainer: {
        flex: 1,
        alignItems: 'center',
    },    

    bottomSheet: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
    bottomViewLargeTitle: {
        width: windowWidth*0.9,
        alignItems: 'flex-start',
        marginTop: 15,
        fontSize: 20,
        fontWeight: "bold",
    },
    bottomSheetFlatListView: {
        flexDirection: 'column',
        marginTop: 15,
    },
    bottomViewDivider: {
        height: StyleSheet.hairlineWidth,
        width: windowWidth * 0.9,
        backgroundColor: colors.darkGray,
        marginHorizontal: 16,
        marginTop: 15,
    }
})
 
export default Home;