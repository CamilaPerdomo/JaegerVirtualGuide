/* eslint-disable react/jsx-filename-extension */
/**
 * Componente que permite visualizar y controlar el Jaeger
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import io from 'socket.io-client';

// Componente que renderiza los controles
function ControlPage() {
  const navigation = useNavigation();
  const socket = io('http://animalgeek.sytes.net:10019');

  // Estados de los controles
  const [image, setImage] = useState('');

  // Metodo para realizar el deslogueo
  const onLogOut = () => {
    navigation.navigate('Login');
  };

  // Metodo para ejecutar la acción de DETENERSE
  const stopAction = () => {
    console.log('FINISH!');
    socket.emit('jeager', '0');
  };

  // Metodo para ejecutar la acción de AVANZAR
  const startJaeger = () => {
    console.log('START!');
    stopAction();
    socket.emit('jeager', '2');
  };

  // Metodo para ejecutar la acción de PARAR
  const stopJaeger = () => {
    console.log('STOP!');
    stopAction();
    socket.emit('jeager', '9');
  };

  // Metodo para ejecutar la acción de ir a la IZQUIERDA
  const leftJaeger = () => {
    console.log('LEFT!');
    socket.emit('jeager', '1');
  };

  // Metodo para ejecutar la acción de ir a la DERECHA
  const rightJaeger = () => {
    console.log('RIGHT!');
    socket.emit('jeager', '3');
  };

  // Metodo para escuchar la transmisión de video
  socket.on('jeager-video', (data) => {
    if (data.length > 0) {
      setImage(`data:image/jpeg;base64,${data}`);
    }
  });

  return (
    <View style={styles.container}>
      {/* Spinner que indica el estado de la conexión */}
      {image.length < 0
        ? (
          <>
            <ActivityIndicator
              animating
              size="large"
              color="#3333EEAA"
            />
            <Text style={styles.textBlack}>
              Esperando imagen del Jaeger
            </Text>
          </>
        ) : (
          {/* Componente para mostrar la transmisión de imagen */}
          <Image
            style={{
              height: 300,
              width: 150,
            }}
            source={{ uri: image }}
          />
        )}
      {/* Boton para el logout del usuario */}
      <View style={styles.containerLogout}>
        <TouchableOpacity
          style={styles.boton}
          onPress={onLogOut}
        >
          <AntDesign name="logout" size={40} color="#8C8C8C" />
        </TouchableOpacity>
      </View>
      {/* Contenedor para los botones de Iniciar y Detenerse */}
      <View style={styles.moveControl}>
        <TouchableOpacity
          style={styles.botonStart}
          onPressIn={startJaeger}
        >
          <FontAwesome5 name="running" size={25} color="#EEE" />
          <Text style={styles.textStyle}>
            Iniciar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonStop}
          onPressIn={stopJaeger}
        >
          <IconFontAwesome name="hand-stop-o" size={40} color="#EEE" />
          <Text style={styles.textStyle}>
            PARA!
          </Text>
        </TouchableOpacity>
      </View>
      {/* Contenedor para los botones de Izq y Der */}
      <View style={styles.sideControl}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={leftJaeger}
          onPressOut={stopAction}
        >
          <AntDesign name="caretleft" size={80} color="#ACACAC" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPressIn={rightJaeger}
          onPressOut={stopAction}
        >
          <AntDesign name="caretright" size={80} color="#ACACAC" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Variable que contiene los estilos de la vista
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2FFFF',
  },
  containerLogout: {
    position: 'absolute',
    top: 5,
    left: 15,
  },
  button: {
    backgroundColor: '#77777733',
    width: 100,
    padding: 10,
    margin: 10,
    borderRadius: 100,
  },
  moveControl: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 50,
    bottom: 25,
  },
  sideControl: {
    position: 'absolute',
    flexDirection: 'row',
    right: 70,
    bottom: 50,
  },
  botonStart: {
    backgroundColor: '#6DD93BAA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    margin: 20,
    width: 70,
    height: 70,
  },
  botonStop: {
    backgroundColor: '#CE3403AA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    margin: 20,
    width: 100,
    height: 100,
  },
  textStyle: {
    color: '#eee',
  },
  textBlack: {
    color: '#777',
  },
});

export default ControlPage;
