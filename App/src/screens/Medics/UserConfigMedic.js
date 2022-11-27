import { Image, StyleSheet, Text, View, useWindowDimensions, TouchableOpacity, Modal, ScrollView } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import User from '../../../assets/images/User.png';
import CrudInput from '../../components/CrudInput';
import CustomButton from '../../components/CustomButton';
import EraseButton from '../../components/EreaseButton';
import Back from '../../../assets/images/Back.png';
import { Context } from '../../context/authContext';
import api from '../../api';

const UserConfigMedic = ({navigation}) => {
    const { state,dispatch } = useContext(Context)
    const { height } = useWindowDimensions();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [crm, setCrm] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState();
    
    const [id, setId] = useState(state.idUser);
    const [modal, setModal] = useState(false);
    const [medic, setMedic] = useState();
    useEffect(() => {

        const onScreenLoad = async () => {
            
       
            const list = await api.get('/medic/findMedic', {
                params: {
                    idMedic: state.idUser,
                }
            })
            
            setMedic(list.data.medics)
            dispatch({ type: "update", payload: false })

            console.log(list)
            setEmail(list.data.medic[0].email)
            setName(list.data.medic[0].name)
            setCpf(list.data.medic[0].cpf)
            setCrm(list.data.medic[0].crm)
            
    }

        onScreenLoad()
      }, [state.update]
      )

    const delet = async() => {
        console.log(state.idUser)
       const result = await api.delete(`/medic/deleteMedic:${id}`, {
        params: {
            id: state.idUser,
          }
       }).then(
        dispatch({ type: 'logOut' })
       
        ).catch((error) => {
        console.log(error)

        })
         
    }
    const onModPress = async() => {
        try {
            const alter = await api.post(`/medic/updateMedic/${id}`, {
                email: email,
                password: password,
                name: name,
                admin: state.isAdmin,
                crm: crm,
                cpf: cpf,
                params: {
                    id: state.idUser,
                  }
            })
            if(alter){
            console.log("Obrigado pela alteração")}
            navigation.navigate('MedicHome')
        } catch (error) {
        }
    }
    
  return (
    
<View style={styles.view}>
   
        <Modal 
        visible={modal}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setModal(false)}
        >
            <View style={styles.ModalView}> 
                <View style={styles.ModalInside}>
                    
                    <Text style={styles.ModalText}> Tem certeza que deseja excluir sua conta ?</Text>
                    
                    <View style={styles.ModalButton}> 
                    <CustomButton text={'Sim'} onPress={delet} />
                    <EraseButton text={'Não'} onPress={() => setModal(false)}/>
                    </View>
                </View>
            </View>
        </Modal>    
        <View style={styles.top}> 
 
 <View style={styles.Img2}> 
     <Image
     source={User}
     style={[styles.logo, { height: height * 0.15 }]}
     resizeMode="contain"
 />
 </View>
 <TouchableOpacity style={styles.Img1} onPress={() => navigation.navigate('MedicHome')}> 
 <Image
     source={Back}
     style={[styles.logo, { height: height * 0.2 }]}
     resizeMode="contain"
 />

 </TouchableOpacity>
</View>
<View style={styles.Mid}> 

 <View style={styles.Box}>
    
    
 <CrudInput placeholder={""} text={"Nome"}
     value={name}
     setValue={setName}
     > </CrudInput>
     <CrudInput placeholder={""} text={"Email"}
     value={email}
     setValue={setEmail}
     > </CrudInput>
        <CrudInput placeholder={""} text={"CRM"}
     value={crm}
     setValue={setCrm}
     > </CrudInput>
      <CrudInput placeholder={""} text={"CPF"}
     value={cpf}
     setValue={setCpf}
     > </CrudInput>
     <CrudInput placeholder={"******"} text={"Senha"}
     value={password}
     setValue={setPassword}
     secureTextEntry={true}
     > </CrudInput>
 </View>
 <View style={styles.bottom}>
<CustomButton text={"Modificar"} onPress={onModPress}/>
<EraseButton text={"Excluir"} onPress={() => setModal(true)}/>
</View>
    
</View>
</View>
  )
}



const styles = StyleSheet.create({
    view:{
        flex:1,
        backgroundColor: "#F7EDDB",
        
    },
    ModalView:{ 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)'

    },
    ModalInside:{
        flex: 0.4,
        width: '80%',
        height: '20%',
        backgroundColor: "#F7EDDB",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 30
    },
    ModalText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#849376',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'    
    },
    ModalButton:{
        flex: 0.8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    top:{
        flex: 1,
        height: '25%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"#849376",
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    Mid:{
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
        },
    Box:{
        marginTop: '5%',
        width: '80%',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#474F3F"
    },
    bottom:{
        flex: 1,
        width: '100%',
        justifyContent: "center",
        alignItems: 'center'
    },
    Img1:{
        position: 'absolute',
        width: 50,
        height: 50,
        top: 1,
        left: 30,
    },
    Img2:{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems:"center"
        
    },
    logo: {
        marginBottom: 20,
        width: '100%',
        maxWidth: 550,
        maxHeight: 350,
    },
})
export default UserConfigMedic