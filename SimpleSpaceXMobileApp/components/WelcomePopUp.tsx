import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, ImageBackground } from 'react-native';
import { Dimensions } from 'react-native'; 

import colors from '../assets/colors/colors';
import welcomeText from '../assets/data/welcomeData';


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
            setModalVisible(!modalVisible);
          }}
        >
            <View style={styles.centeredView}>
                <ImageBackground source={require('../assets/images/welcome-bg.png')} style={styles.backgroundImage}>
                    <View style={styles.welcomeTextWrapper}>
                        <Text style={styles.modalTitle}>Welcome</Text>
                        <Text style={styles.modalText}>{welcomeText}</Text>
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
        borderRadius: 30,
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
        width: windowWidth*0.38,
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
      }    
  });
  
  export default WelcomePopUp;