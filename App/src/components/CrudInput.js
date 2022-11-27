import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CrudInput = ({ value, setValue, placeholder, secureTextEntry, text }) => {
  return (
    <View style={styles.container}>
       <Text style={styles.texto}>{text}: </Text> 
      <TextInput  
                
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        margin: 20,
        borderBottomWidth: 1,
        width: '50%',
    },
    input: {
        marginTop: 10,
        fontWeight: 'bold',
        color: "#849376",
        width: '90%'
    },
    texto:{
        fontWeight: 'bold',
        fontSize: 15,
        color: '#849376'
    },
    


})



export default CrudInput