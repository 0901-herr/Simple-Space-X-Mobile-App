import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, ImageBackground } from 'react-native';
import { Dimensions } from 'react-native'; 
import { color } from 'react-native-reanimated';
import colors from '../assets/colors/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WelcomePopUp: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(true);

    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
            <View style={styles.centeredView}>
                <ImageBackground source={require('../assets/images/welcome-bg.png')} style={styles.backgroundImage}>
                    <View style={styles.welcomeTextWrapper}>
                        <Text style={styles.modalTitle}>Welcome</Text>
                        <Text style={styles.modalText}>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
                        </Text>
                    </View>
                    <Pressable
                        style={[styles.buttonStart]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.buttonStartText}>Let's start</Text>
                    </Pressable>
                </ImageBackground>  
            </View>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      backgroundImage: {
        overflow: 'hidden',
        width: windowWidth*0.9,
        height: windowHeight*0.48,
        backgroundColor: "white",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 2
        },
        borderRadius: 30,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      welcomeTextWrapper: {
        marginRight: windowWidth*0.2,
      },
      modalTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.white,
        marginTop: 60,
        marginHorizontal: 20,
      },
      modalText: {
        fontSize: 12,
        color: colors.white,
        marginTop: 20,
        marginHorizontal: 20,
      },
      buttonStart: {
        marginTop: 100,
        marginHorizontal: 20,
        width: windowWidth*0.45,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: colors.white,
        padding: 10,
        paddingVertical: 12,
        elevation: 2,
        alignItems: 'center',
      },
      buttonStartText: {
          fontSize: 14,
          textAlign: 'center',
          color: colors.white,
        //   fontWeight: 'bold',
      }    
  });
  
  export default WelcomePopUp;