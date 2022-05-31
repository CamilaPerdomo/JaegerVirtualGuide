/**
 * AppRoute es un componente encargado de la navegación del aplicativo
 */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from '../page/LoginPage'
import ControlPage from '../page/ControlPage'

// Creación del componente necesario para manejar la navegación
const AppRoute = () => {
    // Creamos un elemento Stack que permite acumular las vistas para la navegación
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {/* Crea el contenedor de la pantalla de Login con orientacion Vertical */}
                <Stack.Screen
                    name="Login"
                    component={LoginPage}
                    options={{
                        orientation: 'portrait_up',
                        headerShown: false
                    }}
                />
                {/* Crea el contenedor de la pantalla de Control con orientacion Horizontal */}
                <Stack.Screen
                    name="Control"
                    component={ControlPage}
                    options={{
                        orientation: 'landscape',
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppRoute