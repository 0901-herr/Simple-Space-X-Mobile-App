import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import colors from '../assets/colors/colors';
import { IRocket } from '../assets/data/rocketData';
import { RocketInventory } from '../assets/data/rocketData';

export type RocketListItemProps = {
  rocketDetails: RocketInventory,
  onPress: () => void; 
};

const RocketListItem: React.FC<RocketListItemProps> = (item) => {
  return (
    <TouchableOpacity onPress={item.onPress}> 
      <View style={styles.itemWrapper}>
          {/* <Image source={item.rocketDetails.image} style={styles.image}/> */}

          <View style={styles.titlesWrapper}>
            <Text style={styles.title}>{item.rocketDetails.name}</Text>
            <View style={styles.subtitleWrapper}>
              <Text style={styles.type}>{item.rocketDetails.type}</Text>

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
    marginTop: 12,
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'flex-start',
  },

  subtitleWrapper: {
    width: 130,
    marginTop: 8,
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
