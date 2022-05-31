/**
 * Componente contiene los campos de texto para el login del usuario
 */

import React, { useState } from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import { useNavigation } from '@react-navigation/native';

import UserNameInput from '../../elements/inputs/UserNameInput'
import PasswordInput from '../../elements/inputs/PasswordInput'
import PrincipalButton from '../../elements/buttons/PrincipalButton'

// Componente que implementa la logica necesaria para el login del usuario
const LoginForm = ({ setLoginData }) => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    // Metodo para enviar la petición de login
    const onLogin = () => {
        navigation.navigate('Control')
        //TODO: Implementar consumo del Login
    }

    return (
        <View style={styles.loginContainer}>
            {/* Componente par aingreso de texto */}
            <UserNameInput
                GetValue={setUserName}
                Title="Nombre de Usuario"
                Placeholder="Ingrese su Usuario" />
            {/* Componente par aingreso de texto tipo contraseña */}
            <PasswordInput
                GetValue={setPassword}
                Title="Contraseña"
                Placeholder="Ingrese su Contraseña" />
            {/* Boton de acción para llamar al Login */}
            <PrincipalButton
                onClickAction={onLogin}
            />
        </View>
    )
}

// Variable que contiene los estilos de la vista
const styles = StyleSheet.create({
    loginContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LoginForm