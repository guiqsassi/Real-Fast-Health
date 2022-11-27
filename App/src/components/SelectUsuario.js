import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, Image } from 'react-native'
import React from 'react'
import User from '../../assets/images/User.png';


const SelectUsuario = ({name, onPress}) => {

    const { height } = useWindowDimensions();
    

  return (
    <TouchableOpacity style={styles.Pacientes} onPress={onPress}>
        <Image
                source={User}
                style={[styles.logo, { height: height * 1 }]}
                resizeMode="contain"
            />
        <Text style={styles.Texto}> {name}</Text>

    </TouchableOpacity>

  )
}



const styles = StyleSheet.create({
    Pacientes:{
      marginLeft: 10,
        marginBottom: 30,
        borderColor: "black",
        borderWidth: 1,
        height: 200,
        width: 150,
        backgroundColor: "#9EB08D",
        alignItems: 'center',
        borderRadius: 20
      },
      logo: {
        marginTop: 20,
        width: '100%',
        maxWidth: 300,
        maxHeight: 100,
        
    },
    Texto:{
        marginTop: 10,
        fontSize: 20,
        color: "#F7EDDB",
        fontWeight: "bold"
      },
    Texto2:{   
        fontSize: 15,
        color: "#F7EDDB",
        fontWeight: 'bold'
      },
})

export default SelectUsuario