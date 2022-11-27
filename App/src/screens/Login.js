import { StyleSheet, TouchableOpacity, View, Image, useWindowDimensions, Text, TextInput } from "react-native";
import React, { useContext, useState } from 'react';
import Logo from '../../assets/images/Logo.png';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import * as Animatable from 'react-native-animatable';
import { Context } from "../context/authContext";
import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";

const Login = ({ navigation }) => {
    
    const {dispatch} = useContext(Context)
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [password, setPassword] = useState('');
    const [hide, setHide] = useState(true);
    const [eye, setEye] = useState('eye-with-line')
    const [bgColor, setBgColor] = useState('#849376')
    const onLoginPressed = async() => {
       
       
        try {
            const authData = await api.post('/loginUser', {
                email: email,
                password: password,
            })
            console.log(authData)
            if(authData.status === 200){
                await AsyncStorage.setItem('token', authData.data.token)   
                    dispatch({type:'logIn', payload: true})     
                  
            }
        } catch (error) {
            try {
                const authData = await api.post('/loginMedic', {
                    email: email,
                    password: password,
                })
                console.log(authData)
                if(authData.status === 200){
                    await AsyncStorage.setItem('token', authData.data.token)   
                        dispatch({type:'logIn', payload: true})     
                         
                }
            } catch (error) {
                alert("O E-mail ou senha estão incorretos")
                setBgColor('#91322a')
                setPassword('')
                setError(true)
            }
        }
        
     
    }
        


const { height } = useWindowDimensions();

    return (
        <View style={styles.container}>
            
            <View style={styles.Top}>
            <Image
                source={Logo}
                style={[styles.logo, { height: height * 1 }]}
                resizeMode="contain"
            />


                 <View style={[{borderColor: bgColor}, styles.containerInput]}>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={'Email'}
                style={ styles.input}
                secureTextEntry={false}
            />
            
        </View>

        <View style={[{borderColor: bgColor}, styles.containerInput]}>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder={'Senha'}
                style={styles.input}
                secureTextEntry={hide}
            />
            <Entypo
                  name={eye}
                  size={40}
                  style={{ position: "absolute", right: 1 }}
                  onPress={() => {
                    if(hide == true){
                        setEye('eye')

                    }
                    else{
                        
                        setEye('eye-with-line')
                    }
                    setHide(!hide)
                }
                }
                  color="#849376"
                 
              />
        </View>
        { !error? null : (
                  <Text style={styles.Erro}> Erro, email ou senha inválidos</Text>
            ) } 

            </View>
            <Animatable.View animation="slideInUp"
            duration={1000}
            style={styles.Bottom}>
            <CustomButton text="Login" onPress={onLoginPressed} />

        <TouchableOpacity
            onPress={() => navigation.navigate("RegisterUser")}>
        <Text style={styles.Text}>
            Não tem uma conta?{" "}
                <Text style={styles.createAccountText}>
                    Crie uma
                    </Text>
                    </Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        width: "100%",
        backgroundColor:"#849376"
        
    },
    logo: {
        marginBottom: 20,
        width: '100%',
        maxWidth: 550,
        maxHeight: 350,
    },
    Top:{
        flex: 3,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        
    },
    Bottom:{
        flex: 1,
        width: "100%",
        backgroundColor: "#F7EDDB",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems:"center",
        justifyContent:"center"
        
    },
    createAccountText:{
        color: "#8E83E0"
    },
    Text:{
        color: "#849376"
    },
    containerInput: {
        backgroundColor: '#F7EDDB',
        width: '80%',
        marginVertical: 5,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row"
    },
    input: {
        
        width: '100%',
        padding: 15,
        fontWeight: 'bold',
        textAlign: "center",
        color: "#849376"
    },
    Erro:{
        fontSize: 17,
        color: '#91322a'
    }
});

export default Login;