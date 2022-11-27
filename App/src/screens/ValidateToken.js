import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react';
import { ActivityIndicator, View, StyleSheet, Image, Text, useWindowDimensions } from 'react-native';
import Logo from '../../assets/images/Logo.png';
import { Context } from '../context/authContext';

import api from '../api';

const ValidateToken = ({ navigation }) => {
    const { state, dispatch } = useContext(Context);
    setTimeout(() => {
        const validateToken = async () => {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                try {
                    const data = await api.get('/user', {
                        headers: {
                            token: token
                        }
                    });
                    await dispatch({ type: 'verify', payload: data.data.authData })
                    navigation.navigate("RoutesUser")
                } catch (error) {
                    console.log(error)
                    dispatch({ type: 'logIn', payload: false })
                }
            } else {
                dispatch({ type: 'logIn', payload: false })
            }
        };
        validateToken();
    }, 500);

    const { height } = useWindowDimensions();

    return (
            
        <View style={styles.container}>
            <Image
                source={Logo}
                style={[styles.logo, { height: height * 10 }]}
                resizeMode="contain"
            />
            <ActivityIndicator color="white" size={45} /> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"#849376"
    },
    logo: {
        width: '100%',
        maxWidth: 550,
        maxHeight: 350,
    },
    text:{
        marginBottom: 40,
        fontSize: 25,
        color: "#F7EDDB",
        fontFamily: "newCourier"
    }

})

export default ValidateToken