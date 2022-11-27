import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity, Picker, ScrollView } from "react-native";
import React, { useState, useContext } from 'react';
import User from '../../../assets/images/User.png';
import Back from '../../../assets/images/Back.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import * as Animatable from 'react-native-animatable';
import { Context } from "../../context/authContext";
import api from "../../api";
import CustomInputAddButton from '../../components/CustomInputAddButton'

const RegisterPaci = ({navigation}) => {

    const { state, dispatch } = useContext(Context)
    const [idUser, setidUser] = useState(state.idUser);
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
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

    
    const [doencaCronicaInput, setDoencaCronicaInput] = useState('');
    const [alergiaInput, setAlergiaInput] = useState('');
    const [deficienciaInput, setDeficienciaInput] = useState('');
    const [cirurgiaInput, setCirurgiaInput] = useState('');

    const [doencaCronica, setDoencaCronica] = useState('');
    const [alergia, setAlergia] = useState('');
    const [deficiencia, setDeficiencia] = useState('');
    const [cirurgia, setCirurgia] = useState('');
    const { height } = useWindowDimensions();
    
    const onRegisterPressed = async () => {
        try {
              const Register = await api.post("/patient/registerPatient", {
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
            rua: rua,
            bairro: bairro
        })
            console.log(Register)
            if(Register){
                window.location.reload(true);
                navigation.navigate('Home')
            }
        } catch (error) {
            console.log(state.idUser)
        }
      
    }
    const onCepRegister = async () => {
        try {
              const list = await api.get(`https://viacep.com.br/ws/${cep}/json`) 
             
            
            setRua(list.data.logradouro)
            setCidade(list.data.localidade)
            setBairro(list.data.bairro)
            setEstado(list.data.uf)
            
          
        } catch (error) {
            
        }
      
    }

  return (
    <View style={styles.view}>

    <View style={styles.top}> 

    <View style={styles.Img2}> 
    <Image
        source={User}
        style={[styles.logo, { height: height * 0.15 }]}
        resizeMode="contain"
    />
     <TouchableOpacity style={styles.Img1} onPress={() => navigation.navigate('Home')}> 
    <Image
        source={Back}
        style={[styles.logo, { height: height * 0.05 }]}
        resizeMode="contain"
    />
    </TouchableOpacity>
    </View>
    </View>



    < View style={styles.Mid}>

    <ScrollView style={styles.Scroll}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
   > 
    <View style={styles.Mid}>


        <Text H1 style={styles.sepText}> Informações Pessoais</Text>
    <CustomInput
        placeholder="Name"
        value={name}
        setValue={setName}
    />

    <CustomInput
        placeholder="CPF"
        value={cpf}
        setValue={setCpf}
    >       
    </CustomInput>

    <CustomInput
        placeholder="Rg"
        value={rg}
        setValue={setRg}
    />

    <CustomInput
        placeholder="Data de nascimento"
        value={DTnascimento}
        setValue={setDTnascimento}
    />
    
    <CustomInput
        placeholder="Telefone"
        value={telefone}
        setValue={setTelefone}
    />

    <CustomInput
        placeholder="Contato de emergência"
        value={cEmergencia}
        setValue={setCEmergencia}
    />

    <Text H1 style={styles.sepText}> Plano de Saúde</Text>

    <CustomInput
        placeholder="Nome Plano de Saúde"
        value={nomePlanoSaude}
        setValue={setNomePlanoSaude}
    />
    <CustomInput
        placeholder="Número de cadastro"
        value={numeroCadastro}
        setValue={setNumeroCadastro}
    />
    
    <CustomInput
        placeholder="Validade do Plano de Saúde"
        value={validadePlanoSaude}
        setValue={setvalidadePlanoSaude}
    />
    <Text H1 style={styles.sepText}> Informações Resideciais</Text>

    <CustomInputAddButton
        placeholder="Cep"
        value={cep}
        setValue={setCep}
        onPress={ onCepRegister } 
    />  
    <CustomInput
        placeholder="Rua"
        value={rua}
        setValue={setRua}
    />
       <CustomInput
        placeholder="Bairro"
        value={bairro}
        setValue={setBairro}
    /> 
    <CustomInput
        placeholder="Estado"
        value={estado}
        setValue={setEstado}
    />
    <CustomInput
        placeholder="Cidade"
        value={cidade}
        setValue={setCidade}
    />   

   <CustomInput
        placeholder="Número da residência"
        value={numeroResidencial}
        setValue={setNumeroResidencial}
    />
   <CustomInput
        placeholder="Complemento"
        value={complemento}
        setValue={setComplemento}
    />

    <Text H1 style={styles.sepText}> Informações Medicas</Text>

    <CustomInput
        placeholder="Altura"
        value={altura}
        setValue={setAltura}
    />

    <CustomInput
        placeholder="Peso"
        value={peso}
        setValue={setPeso}
    />

    <Picker
     style={styles.select}
        selectedValue={recebeSangue}
        onValueChange={(itemValue, itemIndex) => setRecebeSangue(itemValue)}
        >
        <Picker.Item label={"Pode receber Sangue?"} enabled={false} />
        <Picker.Item style={styles.text} label="Sim" value={"Sim"} />
        <Picker.Item style={styles.text} label="Não" value={"Não"} />
    </Picker>

    <Picker
     style={styles.select}
        selectedValue={tpSanguineo}
        onValueChange={(itemValue, itemIndex) => setTpSanguineo(itemValue)}
        >
        <Picker.Item label={"Tipo Sanguineo"} enabled={false} />
        <Picker.Item style={styles.text} label="A+" value={"A+"} />
        <Picker.Item style={styles.text} label="A-" value={"A-"} />
        <Picker.Item style={styles.text} label="B+" value={"B-"} />
        <Picker.Item style={styles.text} label="AB+" value={"AB+"} />
        <Picker.Item style={styles.text} label="AB-" value={"AB-"} />
        <Picker.Item style={styles.text} label="O+" value={"O+"} />
        <Picker.Item style={styles.text} label="O-" value={"O-"} />
    </Picker>

    <Picker
     style={styles.select}
        selectedValue={doaOrgaos}
        onValueChange={(itemValue, itemIndex) => setDoaOrgaos(itemValue)}
        >
        <Picker.Item label={"Doador de Orgãos?"} enabled={false} />
        <Picker.Item style={styles.text} label="Sim" value={"Sim"} />
        <Picker.Item style={styles.text} label="Não" value={"Não"} />
    </Picker>

    <Picker
     style={styles.select}
        selectedValue={fumante}
        onValueChange={(itemValue, itemIndex) => setFumante(itemValue)}
        >
        <Picker.Item label={"É fumante?"} enabled={false} />
        <Picker.Item style={styles.text} label="Sim" value={"Sim"} />
        <Picker.Item style={styles.text} label="Não" value={"Não"} />
    </Picker>

    <CustomInputAddButton
        placeholder="Doença Crônica"
        value={doencaCronicaInput}
        setValue={setDoencaCronicaInput}
        onPress={() => {
             if(doencaCronica == '') {
                setDoencaCronica(doencaCronica + doencaCronicaInput)
                setDoencaCronicaInput('')
            }
             else{
                setDoencaCronica(doencaCronica + ', ' + doencaCronicaInput)
                setDoencaCronicaInput('')
             }          
    }}    
    />
    <CustomInputAddButton
        placeholder="Alergia"
        value={alergiaInput}
        setValue={setAlergiaInput}
        onPress={() => {
            if(alergia == '') {
                setAlergia(alergia + alergiaInput)
                setAlergiaInput('')
            }
            else{
               setAlergia(alergia + ', ' + alergiaInput)
               setAlergiaInput('')
            }          
   }}    
    />
    <CustomInputAddButton
        placeholder="Deficiência"
        value={deficienciaInput}
        setValue={setDeficienciaInput}
        onPress={() => {
            if(deficiencia == '') {
                setDeficiencia(deficiencia + deficienciaInput)
                setDeficienciaInput('')
            }
            else{
               setDeficiencia(deficiencia + ', ' + deficienciaInput)
               setDeficienciaInput('')
            }          
   }}    
    />
    <CustomInputAddButton
        placeholder="Cirurgia"
        value={cirurgiaInput}
        setValue={setCirurgiaInput}
        onPress={() => {
            if(cirurgia == '') {
                setCirurgia(cirurgia + cirurgiaInput)
                setCirurgiaInput('')
            }
            else{
               setCirurgia(cirurgia + ', ' + cirurgiaInput)
               setCirurgiaInput('')
            }          
   }}    
    />
    
    
     </View>
   </ScrollView>
</View>
    

    <Animatable.View animation="slideInUp"
    duration={500}
    style={styles.bottom}> 

    <CustomButton text="Cadastrar" onPress={onRegisterPressed} />
    
    </Animatable.View>
</View>

)}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor:"#849376"
    },
    top:{
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
    },
    Mid:{
        flex: 3,
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
      color: "#6200ee",
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
    Img1:{
        top: 10,
        width: 50,
        height: 50,
        position: "absolute",
        left: 30,
    },
    Img2:{
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
        
    },
    Scroll:{
        flex: 1,
        width: "100%",

    },
    sepText:{
        fontSize: 20,
        marginTop: 20,
        marginBottom: 40,
        color:  "#F7EDDB",
        fontWeight: "bold",
    },
   
    add:{
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    }
})

export default RegisterPaci