import React, { setState } from 'react';
import { View } from 'react-native';
import io from 'socket.io-client';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';

const SendImage = () => {
  const [status, setStatus] = setState('Conectando Socket');

  const sockey = io('http://animalgeek.sytes.net:10019');

  const configuration = { "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] };
  const pc = new RTCPeerConnection(configuration);

  let isFront = true;
  mediaDevices.enumerateDevices().then(sourceInfos => {
    console.log(sourceInfos);
    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
        videoSourceId = sourceInfo.deviceId;
      }
    }
    mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 640,
        height: 480,
        frameRate: 30,
        facingMode: (isFront ? "user" : "environment"),
        deviceId: videoSourceId
      }
    })
      .then(stream => {
        // Got stream!
      })
      .catch(error => {
        // Log error
      });
  });

  return (<View>
    
  </View>)

}

export default SendImage;