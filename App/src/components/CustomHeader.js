import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import Logo from '../../assets/images/Logo.png';
import Gear from '../../assets/images/Gear.png';
import { Entypo } from '@expo/vector-icons';
import { Context } from '../context/authContext';


const CustomHeader = ({onPress, exit}) => {
  const { state, dispatch } = useContext(Context)

    const { height } = useWindowDimensions();

  return (
    <View style={styles.top}>
        <View style={styles.img}> 
          <Image
                source={Logo}
                style={[styles.logo, { height: height * 1 }]}
                resizeMode="contain"
            />
            </View>
            <TouchableOpacity onPress={onPress} style={styles.gear}>
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
  )
}



const styles = StyleSheet.create({
    top:{
        backgroundColor:"#849376",
        flex: 1,
        flexDirection: 'row',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      },
      logo: {
        marginBottom: 20,
        width: '100%',
        maxWidth: 550,
        maxHeight: 125,
    },
    gear:{
        position: 'absolute',
        width: 60,
        height: 50,
        left: 10,
    },
    img:{
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    sair:{
      position: 'absolute',
      width: 60,
        height: 50,
        right: 10,
    }
})
export default CustomHeader