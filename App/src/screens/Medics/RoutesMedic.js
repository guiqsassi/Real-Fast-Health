import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MedicHome from './MedicHome';
import UserConfigMedic from './UserConfigMedic'
import MedicPacienteHome from './MedicPacienteHome'

const Stack = createNativeStackNavigator();


const RoutesMedic = ({ navigation }) => {

    return (
      
        <Stack.Navigator screenOptions={{ headerShown: false }} >
    
                <Stack.Screen name="MedicHome" component={MedicHome} />
                <Stack.Screen name="MedicPacienteHome" component={MedicPacienteHome} />
                <Stack.Screen name="UserConfigMedic" component={UserConfigMedic} />

            
    </Stack.Navigator>
    )
}

export default RoutesMedic

