import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home'
import UserConfig from './UserConfig'
import RegisterPaci from './RegisterPaci'
import UserPacienteHome from './UserPacienteHome'

const Stack = createNativeStackNavigator();


const RoutesUser = ({ navigation }) => {

    return (
      
        <Stack.Navigator screenOptions={{ headerShown: false }} >
    
                 <Stack.Screen name="Home" component={Home} />
                 <Stack.Screen name="UserPacienteHome" component={UserPacienteHome} />
                <Stack.Screen name="UserConfig" component={UserConfig} />
                <Stack.Screen name="RegisterPaci" component={RegisterPaci} />
            
    </Stack.Navigator>
    )
}

export default RoutesUser

