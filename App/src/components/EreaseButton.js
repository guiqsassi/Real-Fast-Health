import {Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
 
const EreaseButton = ({ onPress, text }) => {
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
        backgroundColor: '#f86b4a',
        width: '60%',
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        borderRadius: 10
    },
    text: {
        padding: 15,
        fontWeight: 'bold',
        color: 'white',
    }
})
 
export default EreaseButton;