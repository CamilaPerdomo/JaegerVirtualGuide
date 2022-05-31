/**
 * Componente para la transmisión de imagen desde un movil popr websocket
 */

// Importación de librerias necesarias
import 'react-native-reanimated'
import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import LoadingView from 'react-native-loading-view'
import rfs from 'react-native-fs';
import io from 'socket.io-client'
import { useKeepAwake } from '@sayem314/react-native-keep-awake';

const App = () => {
  // Configuración del websocket
  const socket = io('http://animalgeek.sytes.net:10019');
  const devices = useCameraDevices('wide-angle-camera')
  const device = devices.back

  // Referencia de la camara
  const cam = useRef(null);

  // Hook para evitar el apagado de la camara
  useKeepAwake();

  // Intervalo para realizar el envio de la imagen hacia el soccket
  setInterval(() => {
    cam?.current?.takeSnapshot({
      quality: 50,
      skipMetadata: true
    })
      .then(image => {
        rfs.readFile(image.path, 'base64')
          .then(result => {
            socket.emit('jeager-video', result)
          })
      })
      .catch(err => {
        console.log('Error ===> ', err)
      })
  }, 1)

  // Pantalla de carga
  if (device == null) return <LoadingView loading={true} />

  // Camara par ala transmición de imagen
  return (
    <Camera
      ref={cam}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true} />
  )
};

export default App;