import { Image, StyleSheet, Text, View, useWindowDimensions, TouchableOpacity, ScrollView, Picker, Modal, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import User from '../../../assets/images/User.png';
import CrudInput from '../../components/CrudInput';
import CustomButton from '../../components/CustomButton';
import EraseButton from '../../components/EreaseButton';
import Back from '../../../assets/images/Back.png';
import { Context } from '../../context/authContext';
import api from '../../api';



const UserPacienteHome = ({navigation}) => {
    const { state, dispatch } = useContext(Context)
    const [modal, setModal] = useState(false);
    const [test, setTest] = useState('ababublé');
    const [patients, setPatients] = useState();
     const [exams, setExams] = useState([]);

    
     
    useEffect(() => {
        
        const onScreenLoad = async () => {
            console.log(state.idPatient)
            const list = await api.get('/patient/findByPatient', {
                params: {
                    idPatient: state.idPatient,
                }
            })
            
            setPatients(list.data.patients)
            dispatch({ type: "update", payload: false })
            
            console.log(patients.name)
            onScreenLoad()
        }
            
        const ExameFind = async () => {
            const list = await api.get('/exam/findExam', {
                params: {
                    idPatient: state.idPatient.id,
                }
            })
            
            setExams(list.data.exams)
            dispatch({ type: "update", payload: false })

            console.log(exams)
            
        }
        ExameFind()
 
    } , [state.update]
    )

    const OnseeExam = async (item) => {
        await dispatch({type: 'setExam', payload: item});

         setSeeExam(true)
         console.log(state.nameMedic)
         
     }

     
    const { height } = useWindowDimensions();
    
   
    const [seeExam, setSeeExam] = useState(false );
    const [name, setName] = useState(state.idPatient.name );
    const [cpf, setCpf] = useState(state.idPatient.cpf);
    const [rg, setRg] = useState(state.idPatient.rg);
    const [telefone, setTelefone] = useState(state.idPatient.telefone);
    const [cEmergencia, setCEmergencia] = useState(state.idPatient.contatoEmergencia);
    const [DTnascimento, setDTnascimento] = useState(state.idPatient.DTNascimento);
    const [nomePlanoSaude, setNomePlanoSaude] = useState(state.idPatient.nomePlanoSaude);
    const [numeroCadastro, setNumeroCadastro] = useState(state.idPatient.numeroCadastro);
    const [validadePlanoSaude, setvalidadePlanoSaude] = useState(state.idPatient.validadePlanoSaude);
    const [cep, setCep] = useState(state.idPatient.cep);
    const [numeroResidencial, setNumeroResidencial] = useState(state.idPatient.numeroResidencia);
    const [complemento, setComplemento] = useState(state.idPatient.complemento);
    const [bairro, setBairro] = useState(state.idPatient.bairro);
    const [rua, setRua] = useState(state.idPatient.rua);
    const [estado, setEstado] = useState(state.idPatient.estado);
    const [cidade, setCidade] = useState(state.idPatient.cidade);

    const [recebeSangue, setRecebeSangue] = useState(state.idPatient.podeReceberSangue);
    const [tpSanguineo, setTpSanguineo] = useState(state.idPatient.tipoSanguineo);
    const [doaOrgaos, setDoaOrgaos] = useState(state.idPatient.doadorOrgao);
    const [fumante, setFumante] = useState(state.idPatient.fumante);

    const [doencaCronica, setDoencaCronica] = useState(state.idPatient.nameChronicDisease);
    const [alergia, setAlergia] = useState(state.idPatient.nameAllergy);
    const [deficiencia, setDeficiencia] = useState(state.idPatient.nameDeficiency);
    const [cirurgia, setCirurgia] = useState(state.idPatient.nameCirurgy);
    const [altura, setAltura] = useState(state.idPatient.altura);
    const [peso, setPeso] = useState(state.idPatient.peso);
    const [id, setID] = useState(state.idPatient.id);

    const [dtExame, setDtExame] = useState();
    const [nameMedic, SetNameMedic] = useState();
    const [description, SetDescription] = useState();

    


     const onModPress = async() => {
        try {
            const alter = await api.post(`/patient/updatePatient${state.idPatient.id}`, {
            idUser: state.idUser,
            name: name,
            rg: rg,
            cpf: cpf,
            altura: altura,
            peso: peso,
            telefone: telefone,
            contatoEmergencia: cEmergencia,
            telefone: telefone,
            DTNascimento: DTnascimento,
            nomePlanoSaude: nomePlanoSaude,
            numeroCadastro: numeroCadastro,
            validadePlanoSaude: validadePlanoSaude,
            cep: cep,
            tipoSanguineo: tpSanguineo,
            numeroResidencia: numeroResidencial,
            complemento: complemento,
            estado: estado,
            cidade: cidade,
            podeReceberSangue: recebeSangue,
            tipoSanguine: tpSanguineo,
            doadorOrgao: doaOrgaos,
            fumante: fumante,
            nameChronicDisease: doencaCronica,
            nameAllergy: alergia,
            nameDeficiency: deficiencia,
            nameCirurgy: cirurgia,
            bairro: bairro,
            rua: rua,
                params: {
                    id: state.idPatient,
                  }
            })
            if(alter){
            console.log("Obrigado pela alteração")}
            window.location.reload(true)
        } catch (error) {
        }
    }


    const delet = async() => {
        const result = await api.delete(`/patient/deletePatient:${state.idPatient.id}`, {
                idPatient: state.idPatient.id,
    
           }).then(
            window.location.reload(true)
            ).catch((error) => {    
            console.log(error)
                
            })
    }
   

    const deletExam = async() => {
        const result = await api.delete(`/exam/deleteExam:${state.idExam}`, {
             idExam: state.idExam,
 
        }).then(
        window.location.reload(true)
         ).catch((error) => {    
         console.log(error)
 
         })
          
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
                    
                    <Text style={styles.ModalText}> Tem certeza que deseja excluir este paciente ({state.idPatient.name})?</Text>
                    
                    <View style={styles.ModalButton}> 
                    <CustomButton text={'Sim'} onPress={delet} />
                    <EraseButton text={'Não'} onPress={() => setModal(false)}/>
                    </View>
                </View>
            </View>
        </Modal>    
        

        <Modal 
        visible={seeExam}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setModal(false)}
        >
            <View style={styles.ModalView}> 
                <View style={styles.ModalInside}>
                    
                    <Text style={styles.ModalText}> {state.dateExame}</Text>

                    <View style={styles.ModalMid}>
                        <CrudInput
                        text={'Nome do Médico'}
                        value={state.nameMedic}
                        />
                        <Text style={styles.texto123}>
                            Descrição:
                        </Text>
                        <Text style={styles.texto123}>
                            {state.description}
                        </Text>
                    </View>

                    <View style={styles.ModalButton}> 
                    
                    <EraseButton text={'Excluir'} onPress={deletExam}/>
                    <EraseButton text={'Fechar'} onPress={() => setSeeExam(false)}/>
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
    <Text style={styles.textoId}>ID: {state.idPatient.id} </Text>
    <TouchableOpacity style={styles.Img1} onPress={() => navigation.navigate('Home')}> 
    <Image
        source={Back}
        style={[styles.logo, { height: height * 0.09 }]}
        resizeMode="contain"
    />
    </TouchableOpacity>
    </View>
</View>

<ScrollView style={styles.Scroll}     
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}> 

    <View style={styles.Boxes}> 
    <View style={styles.Box}>
        <View style={styles.Title}>
            <Text style={styles.texto}> Informações Pessoais </Text>
        </View>
        <CrudInput placeholder={""} text={"Nome"} value={name} setValue={setName} /> 
        <CrudInput placeholder={""} text={"CPF"} value={cpf} setValue={setCpf}/> 
        <CrudInput placeholder={""} text={"RG"}  value={rg} setValue={setRg}/>
        <CrudInput placeholder={""} text={"Data de nascimento"} value={DTnascimento} setValue={setDTnascimento}/> 
        <CrudInput placeholder={""} text={"Telefone"} value={telefone} setValue={setTelefone}/> 
        <CrudInput placeholder={""} text={"Contato de emergência"} value={cEmergencia} setValue={setCEmergencia}/> 
    </View>
    <View style={styles.Box}>
    <View style={styles.Title}>
    <Text style={styles.texto}> Plano de Saúde</Text>
    </View>
        <CrudInput placeholder={""} text={"Nome Plano de Saúde"} value={nomePlanoSaude} setValue={setNomePlanoSaude}/> 
        <CrudInput placeholder={""} text={"Número de cadastro"} value={numeroCadastro} setValue={setNumeroCadastro}/> 
        <CrudInput placeholder={""} text={"Validade do Plano de Saúde"} value={validadePlanoSaude} setValue={setvalidadePlanoSaude}/> 

    </View>
    
    <View style={styles.Box}>
    <View style={styles.Title}>
    <Text style={styles.texto}> Informações Residenciais</Text>
    </View>
        <CrudInput placeholder={""} text={"Cep"} value={cep} setValue={setCep}/> 
        <CrudInput placeholder={""} text={"Estado"} value={estado} setValue={setEstado}/>
        <CrudInput placeholder={""} text={"Cidade"} value={cidade} setValue={setCidade}/>
        <CrudInput placeholder={""} text={"Bairro"} value={bairro} setValue={setBairro}/>
        <CrudInput placeholder={""} text={"Rua"} value={rua} setValue={setRua}/> 
        <CrudInput placeholder={""} text={"Número da residência"} value={numeroResidencial} setValue={setNumeroResidencial}/> 
        <CrudInput placeholder={""} text={"Complemento"} value={complemento} setValue={setComplemento}/> 
    </View>
    <View style={styles.Box}>
    <View style={styles.Title}>
    <Text style={styles.texto}> Informações Médicas</Text>
    </View>
        <CrudInput placeholder={""} text={"Altura"} value={altura} setValue={setAltura}/> 
        <CrudInput placeholder={""} text={"Peso"} value={peso} setValue={setPeso}/> 

        <CrudInput placeholder={""} text={"Doenças Crônicas"} value={doencaCronica} setValue={setDoencaCronica}/> 
        <CrudInput placeholder={""} text={"Alergia"} value={alergia} setValue={setAlergia}/> 
        <CrudInput placeholder={""} text={"Cirurgia"} value={cirurgia} setValue={setCirurgia}/> 
        <CrudInput placeholder={""} text={"Deficiência"} value={deficiencia} setValue={setDeficiencia}/> 

        <CrudInput placeholder={""} text={"doador de orgãos"} value={doaOrgaos} setValue={setDoaOrgaos}/> 
        <CrudInput placeholder={""} text={"Pode Receber sangue"} value={recebeSangue} setValue={setRecebeSangue}/> 
        <CrudInput placeholder={""} text={"Tipo Sanguineo"} value={tpSanguineo} setValue={setTpSanguineo}/> 
        <CrudInput placeholder={""} text={"Fumante"} value={fumante} setValue={setFumante}/> 
    </View>

    <View style={styles.Box}>
    <View style={styles.Title}>
    <Text style={styles.texto}> Exames</Text>
    </View>
        <FlatList    
                style = {{marginTop: 20}}
                 horizontal={false} 
                data={exams}
                renderItem={({ item }) => {
                    return (
             
                         <CustomButton text={item.title} onPress={( ) => {
                            dispatch({type: 'setExam', payload: item})
                         setSeeExam(true)}}/>
                        
                           
                    )
                }
                }
                keyExtractor={(item) => item.id}
            />
    </View>




    </View>
        
        
    
    </ScrollView>

    <View style={styles.bottom}>

   <CustomButton text={"Modificar"} onPress={onModPress}/>

   <EraseButton text={"Excluir"} onPress={() => setModal(true)}/>
   </View>


</View>

  )

}



const styles = StyleSheet.create({
    view:{
        flex:1,
        backgroundColor: "#F7EDDB",
    },
    top:{
        flex: 0.4,
        height: '15%',
        width: '100%',
        backgroundColor:"#849376",
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    Boxes:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        
        },
    Box:{
        marginTop: '10%',
        width: '80%',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#474F3F"
    },
 
    bottom:{
        flex: 0.4,
        width: '100%',
        justifyContent: "center",
        alignItems: 'center'
    },
    Img1:{
        width: 50,
        height: 10,
        top: 1,
        left: 30,
        position: 'absolute'
    },
    Img2:{
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
        
    },
    logo: {
        marginBottom: 20,
        width: '100%',
        maxWidth: 550,
        maxHeight: 350,
    },
    Scroll:{
        flex: 1,
        width: '100%',
        marginTop: 10,
    },
    Title:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    texto:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#849376',
        marginTop: 10,
    },
    textoId:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#F7EDDB',
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
    ModalView:{ 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)'

    },
    ModalInside:{
        flex: 0.4,
        width: '80%',
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
    ModalMid:{
        flex: 0.5,
        width: '100%',

    },
    ModalButton:{
        flex: 0.4   ,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    BoxFlat:{
        marginTop: '10%',
        width: '100%',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#474F3F"
    },
    texto123:{
        marginLeft: 20,
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#849376'
    }
})
export default UserPacienteHome
