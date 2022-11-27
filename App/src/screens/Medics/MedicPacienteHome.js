import { Image, StyleSheet, Text, View, useWindowDimensions, TouchableOpacity, ScrollView, Picker, Modal, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import User from '../../../assets/images/User.png';
import CrudInput from '../../components/CrudInput';
import CustomButton from '../../components/CustomButton';
import EraseButton from '../../components/EreaseButton';
import Back from '../../../assets/images/Back.png';
import { Context } from '../../context/authContext';
import api from '../../api';

const MedicPacienteHome = ({ navigation }) => {
    const { state, dispatch } = useContext(Context)
    const [patients, setPatients] = useState([]);
    const [exams, setExams] = useState({});


    const { height } = useWindowDimensions();

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cEmergencia, setCEmergencia] = useState('');
    const [DTnascimento, setDTnascimento] = useState('');
    const [nomePlanoSaude, setNomePlanoSaude] = useState('');
    const [numeroCadastro, setNumeroCadastro] = useState('');
    const [validadePlanoSaude, setvalidadePlanoSaude] = useState('');
    const [cep, setCep] = useState('');
    const [numeroResidencial, setNumeroResidencial] = useState('');
    const [complemento, setComplemento] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [recebeSangue, setRecebeSangue] = useState('');
    const [tpSanguineo, setTpSanguineo] = useState('');
    const [doaOrgaos, setDoaOrgaos] = useState('');
    const [fumante, setFumante] = useState('');

    const [doencaCronica, setDoencaCronica] = useState('');
    const [alergia, setAlergia] = useState('');
    const [deficiencia, setDeficiencia] = useState('');
    const [cirurgia, setCirurgia] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [idUser, setIdUser] = useState('');

    const [dtExame, setDtExame] = useState('');
    const [titleExame, setTitleExame] = useState('');
    const [description, setDescription] = useState('');
    const [seeExam, setSeeExam] = useState(false );
    const [modal, setModal] = useState(false);
    const [modalError, setModalError] = useState(false);
   
    useEffect(() => {
       
        
       
        const onScreenLoad = async () => {
          
            const list = await api.get('/patient/findByPatientM', {
            
                params: {
                idPatient: state.idPatient,
              }
           
            })
            if(list.data.patients.length == 0){
                setModalError(true)
            }
            else{
            setPatients(list.data)
            console.log(list.data.patients)

            dispatch({type: "update", payload: false})
            setName(list.data.patients[0].name)
            setCpf(list.data.patients[0].cpf)
            setRg(list.data.patients[0].rg)
            setTelefone(list.data.patients[0].telefone)
            setCEmergencia(list.data.patients[0].contatoEmergencia)
            setDTnascimento(list.data.patients[0].DTNascimento)
            setNomePlanoSaude(list.data.patients[0].nomePlanoSaude)
            setNumeroCadastro(list.data.patients[0].numeroCadastro)
            setvalidadePlanoSaude(list.data.patients[0].validadePlanoSaude)
            setTpSanguineo(list.data.patients[0].tipoSanguineo)
            setNumeroResidencial(list.data.patients[0].numeroResidencia)
            setComplemento(list.data.patients[0].complemento)
            setBairro(list.data.patients[0].bairro)
            setRua(list.data.patients[0].rua)
            setCidade(list.data.patients[0].cidade)
            setEstado(list.data.patients[0].estado)
            setRecebeSangue(list.data.patients[0].podeReceberSangue)
            setDoaOrgaos(list.data.patients[0].doadorOrgao)
            setFumante(list.data.patients[0].fumante)
            setDoencaCronica(list.data.patients[0].nameChronicDisease)
            setDeficiencia(list.data.patients[0].nameDeficiency)
            setAlergia(list.data.patients[0].nameAllergy)
            setDeficiencia(list.data.patients[0].nameDeficiency)
            setAltura(list.data.patients[0].altura)
            setCep(list.data.patients[0].cep)
            setPeso(list.data.patients[0].peso)
            setDeficiencia(list.data.patients[0].nameDeficiency)
            setIdUser(list.data.patients[0].idUser)
        
   
    } }

        const ExameFind = async () => {
            const list = await api.get('/exam/findExam', {
                params: {
                    idPatient: state.idPatient,
                }
            })
            
            setExams(list.data.exams)
            dispatch({ type: "update", payload: false })

            console.log(list)
            
        }

        onScreenLoad()
        ExameFind()
   
      }, [state.update]
      )
   
      const deletExam = async() => {
        const result = await api.delete(`/exam/deleteExam:${state.idExam}`, {
             idExam: state.idExam,
 
        }).then(
        window.location.reload(true)
         ).catch((error) => {    
         console.log(error)
 
         })
          
     }



    const onRegisterPressed = async () => {
        try {
            const RegisterExam = await api.post("/exam/registerExam", {
                idPatient: state.idPatient,
                nameMedic: state.name,
                dateExam: dtExame,
                title: titleExame,
                description: description,
            })
            console.log(RegisterExam)
            if (RegisterExam) {
                setModal(false)
                window.location.reload(true);
            }
        } catch (error) {

        }

    }
    const onModPress = async() => {
        try {
            const alter = await api.post(`/patient/updatePatient${state.idPatient}`, {
            idUser: idUser,
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
            rua: rua,
            bairro: bairro,
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
                params: {
                    id: state.idPatient,
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
                    <View style={styles.ModalInside1}>
                        <View style={styles.modalTitle}> 
                        <Text style={styles.ModalText}> Cadastro de exame</Text>
                        </View>
                        <View style={styles.inputs}>
                        <CrudInput value={titleExame} setValue={setTitleExame} text={'Titulo'} />
                            <CrudInput value={dtExame} setValue={setDtExame} text={'Data do exame'} />
                            <CrudInput value={description} setValue={setDescription} text={'Descrição'} />
                        </View>

                        <View style={styles.ModalButton}>
                            <CustomButton text={'Cadastrar'} onPress={onRegisterPressed} />
                            <EraseButton text={'Não'} onPress={() => setModal(false)} />
                        </View>
                    </View>
                </View>
            </Modal>

            
        <Modal 
        visible={seeExam}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setSeeExam(false)}
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

              
        <Modal 
        visible={modalError}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setModalError(false)}
        >
            <View style={styles.ModalView}> 
                <View style={styles.ModalInside}>
                    
                    <Text style={styles.ModalText}> Erro</Text>
                    <Text style={styles.ModalText}> paciente não encontrado</Text>
             

                    <View style={styles.ModalButton}> 
                    <EraseButton text={'Voltar'} onPress={() => navigation.navigate('MedicHome')}/>
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
                    <Text>{}</Text>
                    <TouchableOpacity style={styles.Img1} onPress={() => navigation.navigate('MedicHome')}>
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
                <View style={styles.Mid}>

                    <View style={styles.Box}>
                        <View style={styles.Title}>
                            <Text style={styles.texto}> Informações Pessoais</Text>
                        </View>
                        <CrudInput placeholder={""} text={"Nome"} value={name} setValue={setName} />
                        <CrudInput placeholder={""} text={"CPF"} value={cpf} setValue={setCpf} />
                        <CrudInput placeholder={""} text={"RG"} value={rg} setValue={setRg} />
                        <CrudInput placeholder={""} text={"Data de nascimento"} value={DTnascimento} setValue={setDTnascimento} />
                        <CrudInput placeholder={""} text={"Telefone"} value={telefone} setValue={setTelefone} />
                        <CrudInput placeholder={""} text={"Contato de emergência"} value={cEmergencia} setValue={setCEmergencia} />
                    </View>
                    <View style={styles.Box}>
                        <View style={styles.Title}>
                            <Text style={styles.texto}> Plano de Saúde</Text>
                        </View>
                        <CrudInput placeholder={""} text={"Nome Plano de Saúde"} value={nomePlanoSaude} setValue={setNomePlanoSaude} />
                        <CrudInput placeholder={""} text={"Número de cadastro"} value={numeroCadastro} setValue={setNumeroCadastro} />
                        <CrudInput placeholder={""} text={"Validade do Plano de Saúde"} value={validadePlanoSaude} setValue={setvalidadePlanoSaude} />

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
                        <CrudInput placeholder={""} text={"Altura"} value={altura} setValue={setAltura} />
                        <CrudInput placeholder={""} text={"Peso"} value={peso} setValue={setPeso} />

                        <CrudInput placeholder={""} text={"Doenças Crônicas"} value={doencaCronica} setValue={setDoencaCronica} />
                        <CrudInput placeholder={""} text={"Alergia"} value={alergia} setValue={setAlergia} />
                        <CrudInput placeholder={""} text={"Cirurgia"} value={cirurgia} setValue={setCirurgia} />
                        <CrudInput placeholder={""} text={"Deficiência"} value={deficiencia} setValue={setDeficiencia} />
                        <CrudInput placeholder={""} text={"doador de orgãos"} value={doaOrgaos} setValue={setDoaOrgaos}/> 
        <CrudInput placeholder={""} text={"Pode Receber sangue"} value={recebeSangue} setValue={setRecebeSangue}/> 
        <CrudInput placeholder={""} text={"Tipo Sanguineo"} value={tpSanguineo} setValue={setTpSanguineo}/> 
        <CrudInput placeholder={""} text={"Fumante"} value={fumante} setValue={setFumante}/> 
                    </View>

                
    <View style={styles.BoxFlat}>
    <View style={styles.Title}>
    <Text style={styles.texto}> Exames</Text>
    </View>
        <FlatList    
                style = {{marginTop: 20,}}
     
                 horizontal={false} 
                data={exams}
                renderItem={({ item }) => {
                    return (
             
                         <CustomButton text={item.title} onPress={( ) => {
                            dispatch({type: 'setExam', payload: item})
                         setSeeExam(true)
                         console.log(state.nameMedic)}}/>
                        
                           
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
                <CustomButton text={"Novo Exame"} onPress={() => setModal(true)} />
              
            </View>


        </View>

    )

}



const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: "#F7EDDB",
    },
    top: {
        flex: 0.4,
        height: '15%',
        width: '100%',
        backgroundColor: "#849376",
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    Mid: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Box: {
        marginTop: '10%',
        width: '80%',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#474F3F"
    },
    bottom: {
        flex: 0.5,
        width: '100%',
        justifyContent: "center",
        alignItems: 'center'
    },
    Img1: {
        width: 50,
        height: 10,
        top: 1,
        left: 30,
        position: 'absolute'
    },
    Img2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"

    },
    logo: {
        marginBottom: 20,
        width: '100%',
        maxWidth: 550,
        maxHeight: 350,
    },
    Scroll: {
        flex: 1,
        width: '100%',
        marginTop: 10,
    },
    Title: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    texto: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#849376',
        marginTop: 10,
    },
    select: {
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
        flex: 0.7,
        width: '80%',
        height: '20%',
        backgroundColor: "#F7EDDB",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 30
    },
    ModalInside1:{
        flex: 0.7,
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
    ModalMid:{
        flex: 0.7,
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
        width: '80%',
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
    },
      inputs: {
        flex: 1,
        width: '100%',
        marginTop: '10%',
        justifyContent: 'center'
    },
    modalTitle:{
        flex: 0.1,
        width: '100%',
        justifyContent:'flex-start',
        alignItems: 'center'
    }
})
export default MedicPacienteHome
