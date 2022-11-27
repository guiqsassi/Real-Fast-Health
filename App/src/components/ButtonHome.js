import {Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
 
const ButtonHome = ({ onPress, text }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>
        </Pressable>
    )
}
 
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7EDDB',
        width: '60%',
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        borderRadius: 10
    },
    text: {
        padding: 15,
        fontWeight: 'bold',
        color: "#849376"
    }
})
 
export default ButtonHome;