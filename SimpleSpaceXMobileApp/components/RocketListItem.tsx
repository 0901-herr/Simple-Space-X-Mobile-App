import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import colors from '../assets/colors/colors';
import { RocketInventory } from '../assets/data/rocketData';
import rocketImage from '../assets/images/rocketImage';

export type RocketListItemProps = {
  rocketDetails: RocketInventory,
  index: number,
  rocketListLength: number,
  onPress: () => void; 
};

export const imageSelect = (network: string) => {
  const networkArray: Record<string, ImageSourcePropType>  = {
    'Falcon 1': rocketImage.image['Falcon 1'],
    'Falcon 9': rocketImage.image['Falcon 9'],
    'Falcon Heavy': rocketImage.image['Falcon Heavy'],
    'Starship': rocketImage.image['Starship']
  };

  return networkArray[network];
};

const RocketListItem: React.FC<RocketListItemProps> = (item) => {
  return (
    <TouchableOpacity onPress={item.onPress}> 
      <View style={styles.itemWrapper}>
          <Image source={imageSelect(item.rocketDetails.name)} style={styles.image}/>
          <View style={styles.titlesWrapper}>
            <Text style={styles.title}>{item.rocketDetails.name}</Text>
            <View style={styles.subtitleWrapper}>
              <View style={styles.locationWrapper}>
                <Image source={require('../assets/images/map.png')} style={styles.locationIcon}/>
                <Text style={styles.location}>{item.rocketDetails.country}</Text>
              </View>
            </View>
          </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemWrapper: {
    marginTop: 35,
    flexDirection: 'column',
    marginHorizontal: 33,
  },

  image: {
    height: 112.5,
    width: 130,
    borderRadius: 10,
  },

  titlesWrapper: {
    marginTop: 14,
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'flex-start',
  },

  subtitleWrapper: {
    width: 130,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  type: {
    fontSize: 11,
    color: colors.darkGray,
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: 'center',
  },
  locationIcon: {
    width: 11,
    height: 11,
    marginRight: 6,
  },
  location: {
    fontSize: 11,
    color: colors.darkGray,
  },
  
})

export default RocketListItem
