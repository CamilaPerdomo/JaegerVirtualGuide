/**
 * Componente que permite el logueo de un usuario pr medio de Username y Contraseña
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import LoginForm from '../components/LoginComponents/LoginForm';

// Crea el compónente de Login para permitir el ingreso del usuario
function LoginPage({ setIsLogin, setUserData }) {
  const [loginData, setLoginData] = useState(undefined);

  return (
    <View style={styles.containerLogin}>
      {/* Logo de la app */}
      <Image
        style={styles.logo}
        resizeMode="cover"
        source={require('../assets/images/Logo.png')}
      />
      {/* Formulario para el login */}
      <LoginForm
        setLoginData={setLoginData}
      />
    </View>
  );
}

// Variable que contiene los estilos de la vista
const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: 200,
    height: 200,
  },
});

export default LoginPage;
