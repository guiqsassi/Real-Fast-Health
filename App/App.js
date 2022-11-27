import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Context, Provider } from './src/context/authContext';


import Login from './src/screens/Login';
import RegisterUser from './src/screens/RegisterUser';
import ValidateToken from './src/screens/ValidateToken';
import RegisterMedic from './src/screens/RegisterMedic'
import RoutesMedic from './src/screens/Medics/RoutesMedic';
import RoutesUser from './src/screens/Logged/RoutesUser';

const Stack = createNativeStackNavigator();

const App = () => {
  const { state } = useContext(Context);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        {state.Loading ? (
      <Stack.Screen name="ValidateToken" component={ValidateToken} />
        ) : state.isAdmin ? (
          <Stack.Screen name="RoutesMedic" component={RoutesMedic} />
            ) :
            (
          state.isLogged ? (
            <>
              <Stack.Screen name="ValidateToken" component={ValidateToken} />
              <Stack.Screen name="RoutesUser" component={RoutesUser} />   
            </>
          ): state.isAdmin ? (
            <Stack.Screen name="MedicHome" component={MedicHome} />
              )
          : (
            <>
              <Stack.Screen name="Login" component={Login} /> 
              <Stack.Screen name="RegisterUser" component={RegisterUser} />
              <Stack.Screen name="RegisterMedic" component={RegisterMedic} />
            </>
          )
        )
        }


      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  App: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default () => {
  return (
    <Provider>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </Provider>
  );
};
