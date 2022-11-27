import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity, Picker, TextInput, ScrollView } from "react-native";
import React, { useState } from 'react';
import { useEffect } from "react";
import Logo from '../../assets/images/Logo.png';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import * as Animatable from 'react-native-animatable';
import api from "../api";
import { Entypo } from "@expo/vector-icons";

const RegisterMedic = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [crm, setCrm] = useState('');
    const [admin, setAdmin] = useState('');
    const { height } = useWindowDimensions();
    const [selectedValue, setSelectedValue] = useState("");
    const [hide, setHide] = useState(true);
    const [eye, setEye] = useState('eye-with-line')
   
   
    const onRegisterMedicPressed = async () => {
        try {
           
              const RegistrarMedic = await api.post("/medic/registerMedic", {
            email: email,
            name: name,
            password: password,
            crm: crm,
            cpf: cpf,
            admin: true
        })
            console.log(RegistrarMedic)
            if(RegistrarMedic){
                navigation.navigate('Login')
            }
        } catch (error) {
            
        }
      
    }
    
    useEffect(() => {
        const isMedic = async () => {
            const medic = await selectedValue;
            if (medic) {
               if(medic == "N"){
                navigation.navigate("RegisterUser")
                setSelectedValue('')
               }
               else{

               }
            } 
            else {
                
            }
        };
        isMedic();
   
    }, [selectedValue]);


    return (
        <View style={styles.view}>
            <View style={styles.top}> 
            <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            />

        <ScrollView style={styles.Scroll}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        > 
            <View View style={styles.top}>
            <CustomInput
                placeholder="Name"
                value={name}
                setValue={setName}
            />
 
            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
            />

            <CustomInput
                placeholder="Senha"
                value={password}
                setValue={setPassword}
                password={true}
                eye={eye}
                secureTextEntry={hide}
                onPress={() => {
                    if(hide == true){
                        setEye('eye')

                    }
                    else{
                        
                        setEye('eye-with-line')
                    }
                    setHide(!hide)
                }}
            />
            <CustomInput
                placeholder="Crm"
                value={crm}
                setValue={setCrm}
            />
            <CustomInput
                placeholder="Cpf"
                value={cpf}
                setValue={setCpf}
            />
            <Picker
                style={styles.select}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                <Picker.Item style={styles.text} label="Médico" value="S" />
                <Picker.Item style={styles.text} label="Usuário" value="N" />
                
            </Picker>
            </View>
            </ScrollView>
            </View>

            <Animatable.View animation="slideInUp"
            duration={500}
            style={styles.bottom}> 
            <CustomButton text="Register" onPress={onRegisterMedicPressed} />
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={styles.Text}>
                    Já tem uma conta?{" "}
                    <Text style={styles.loginText}>Faça o login</Text>
                </Text>
            </TouchableOpacity>
            </Animatable.View>
        </View>
    )
};
 
const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor:"#849376"
    },
    top:{
        flex: 4,
        width: "100%",
        alignItems: "center"
    },
    bottom:{
        flex: 1,
        width: "100%",
        backgroundColor: "#F7EDDB",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems:"center",
        justifyContent:"center"
    },
    logo: {
        marginBottom: 20,
        width: '100%',
        maxWidth: 550,
        maxHeight: 350,
    },
    loginText: {
        fontWeight: "bold",
        color: "#8E83E0"
      },
      Text:{
          color: "#849376"
      },
    select:{
        backgroundColor: '#F7EDDB',
        width: '80%',
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#616f53',
        borderRadius: 10,
        height: 50,
        color: "#849376",
        fontWeight: "bold",
        textAlign: "center",
    },
    Scroll:{
        flex: 1,
        width: "100%",

    },

});
 

export default RegisterMedic;