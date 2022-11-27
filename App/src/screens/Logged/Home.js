import { View, Text, Image, StyleSheet, TouchableOpacity,  useWindowDimensions, ScrollView, FlatList} from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import SelectUsuario from '../../components/SelectUsuario'
import CustomHeader from '../../components/CustomHeader';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { Context } from '../../context/authContext';
import api from '../../api';

const Home = ({navigation}) => {

  const { state, dispatch } = useContext(Context)

  const [patients, setPatients] = useState({});
  
 

  const seePatient = async (item) => {
   await dispatch({type: 'setPatient', payload: item});
    navigation.navigate('UserPacienteHome')
    console.log(state.idPatient)
    
}

  useEffect(() => {
  const onScreenLoad = async () => {
      const list = await api.get('/patient/findByUser', {
        params: {
          idUser: state.idUser,
        }
      })
     
      setPatients(list.data.patients)
      dispatch({type: "update", payload: false})
      
    }
    onScreenLoad();
}, [state.update]
)
      
  return (
    
    <View style={styles.container}>
    <CustomHeader onPress={() => navigation.navigate("UserConfig")}>

    </CustomHeader>
    <View style={styles.Mid}>

    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      > 
    <View style={styles.selecionar}>

        <FlatList  
                  horizontal={false} 
                  numColumns={2}
                  contentContainerStyle = {{alignItems: 'center', justifyContent: 'space-around'}}
                  data={patients}
                renderItem={({ item }) => {
                    return (
                        
                      <SelectUsuario  name={item.name}
                      onPress={() => seePatient(item)}
                      />
                           
                    )
                }
                }
                keyExtractor={(item) => item.id}
            />
        
    </View>
</ScrollView>  
      
  


    </View>
     
    <View style={styles.bottom}>
    <TouchableOpacity style={styles.addPac}
    onPress={() => navigation.navigate("RegisterPaci")}
    >
        <Text style={styles.Text}> Adcionar Paciente </Text>
        <Image source={{
              uri:
                'https://developerplus.com.br/wp-content/uploads/2021/12/plus_icon.png',
            }}
            style={styles.floatingButtonStyle}
              />
          
     
    </TouchableOpacity>
    </View> 
  
  
    </View>
    
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F7EDDB',
  },
  Titulo:{
    color: "white",
    fontSize: 30,
    
  },
  Mid:{
    flex: 5.5,
    marginTop: 30,
  },
  bottom:{
    flex: 1,
    alignItems: "center"
  },

  Image:{
    flex:0.3,
    backgroundColor: "gray", 
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    
  },
  Info:{
    flex:1,

  },

  subtexto:{
    marginLeft: 5,
  },
  floatingButtonStyle: {
  resizeMode: 'contain',
  width: 70,
  height: 70,
  },
  
  addPac:{
    position: 'absolute',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  selecionar:{
    marginTop: 50, 
    width: "100%",
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  Text:{
    textAlign: 'center',
    justifyContent: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#849376',
},
})

export default Home