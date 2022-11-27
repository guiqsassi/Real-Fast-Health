import { StyleSheet, Text, View, useWindowDimensions, Image, Pressable, TouchableOpacity } from 'react-native'
import React, {useContext, useState} from 'react'
import CustomInput from '../../components/CustomInput'
import Logo from '../../../assets/images/Logo.png';
import Gear from '../../../assets/images/Gear.png';
import { Entypo } from '@expo/vector-icons';
import { Context } from '../../context/authContext';
import api from '../../api';

const MedicHome = ({navigation}) => {

  
    const { state, dispatch } = useContext(Context)
    const { height } = useWindowDimensions();
    
    const [id, setId] = useState('')
    
    
    const BuscarPaciente = async () => {
      await dispatch({type:"setPatient", payload: id})
      navigation.navigate('MedicPacienteHome')
    }

  return (
    <View style={styles.container}>
        <View style={styles.top}>  
             <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            />
             <TouchableOpacity onPress={() => {navigation.navigate("UserConfigMedic")}} style={styles.gear}>
              <Image
                source={Gear}
                style={[styles.logo, { height: height * 0.09 }]}
                resizeMode="contain"
            /> 
            </TouchableOpacity>
            <View style={styles.sair}> 
            <Entypo
                    name='log-out'
                    size={50}
                    style={{ margin: 10 }}
                    onPress={() => dispatch({ type: 'logOut' })}
                    color="white"
                />
              </View>
        </View> 
        <View style={styles.Mid}>
            <Text style={styles.texto}> ID do Paciente:</Text>
            <CustomInput
            placeholder='ID Paciente'
            value={id}
            setValue={setId}
            />
         <Pressable onPress={() => BuscarPaciente()} style={styles.ButtonContainer}>
            <Text style={styles.text}>
                Buscar Paciente
            </Text>
        </Pressable>


            
        </View>
    </View>
  )
}

export default MedicHome

const styles = StyleSheet.create
({
    container:{
        flex: 1,
        backgroundColor:"#849376",
      },
      top:{
        flex: 1,
        alignItems: 'center',

      },
      gear:{
        position: 'absolute',
        width: 60,
        height: 50,
        left: 10,
    },
      logo: {
        marginBottom: 20,
        width: '100%',
        maxWidth: 550,
        maxHeight: 350,
    },
    Mid:{
        flex: 3,
        marginTop: 100,
        alignItems: 'center'
    },
    texto:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#F7EDDB'
    },
    ButtonContainer: {
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
    },
    sair:{
        position: 'absolute',
        width: 60,
          height: 50,
          right: 10,
      }
})