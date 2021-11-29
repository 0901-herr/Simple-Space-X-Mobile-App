import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import colors from '../assets/colors/colors';

type RocketListProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const RocketListItem: React.FC<RocketListProps> = () => {
  return (
    <TouchableOpacity> 
      <View style={styles.itemWrapper}>
          <Image source={{ uri: "sdf" }} style={styles.image} />

          <View style={styles.titlesWrapper}>
            <Text style={styles.title}></Text>
            <View style={styles.subtitleWrapper}>
                <Text style={styles.location}></Text>
                <Text style={styles.type}></Text>
            </View>
          </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemWrapper: {
    marginHorizontal: 20,
    marginTop: 32,
    flexDirection: 'column',
    alignItems: 'center',
    width: 130,
  },
  image: {
    height: 112.5,
    width: 130,
  },
  titlesWrapper: {
    marginTop: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'flex-start',
  },
  subtitleWrapper: {
    marginTop: 8,
  },
  location: {
    fontSize: 9,
    color: colors.black,
    alignItems: 'flex-start',
  },
  type: {
    fontSize: 9,
    color: colors.lightgray,
    alignItems: 'flex-end',
  },
})

export default RocketListItem
