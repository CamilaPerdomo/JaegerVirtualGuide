// Importacion de librerias necesarias
#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ArduinoJson.h>

#include <WebSocketsClient.h>
#include <SocketIOclient.h>

#include <Hash.h>

ESP8266WiFiMulti WiFiMulti;
SocketIOclient socketIO;

#define USE_SERIAL Serial

// Variables globalesdel aplicativo
char* HOST_SOCKET = "animalgeek.sytes.net"; // Servidor del websocket
int PORT_SOCKET = 10019; // Puerto del Websocket
char* PARAMS_SOCKET = "/socket.io/?EIO=4"; // URL de websocket
char* SSID_WIFI = "HGP"; // SSID del wifi
char* PASS_WIFI = "hgp081593"; // Contraseña de WiFi

String action_id = ""; // Status global del aplicativo
#define DER 5 // Salidas de NodeMCU => Cables: Verde
#define IZQ 4 // Salidas de NodeMCU => Cables: Naranja
#define LED 2 // Salidas de NodeMCU => Cables: LED

//------------- SOCKET CONTROL DE EVENTOS ----------------------------------------
void socketIOEvent(socketIOmessageType_t type, uint8_t* payload, size_t length) {
  StaticJsonDocument<1024> dd;
  String str = "";
  int len = (int) length;
  int maxL = 100;

  if (0 < len && len < maxL) {
    // Tipo de Eventos para el websocket
    switch (type) {
      case sIOtype_DISCONNECT:
        USE_SERIAL.printf("[IOc] Disconnected!\n");
        digitalWrite(LED, LOW);
        break;
      case sIOtype_CONNECT:
        USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);
        digitalWrite(LED, HIGH);
        socketIO.send(sIOtype_CONNECT, "/");
        break;
      case sIOtype_EVENT:
        USE_SERIAL.printf("[IOc] get event: %s\n", payload);
        str = (char*)payload;
        action_id = str.substring(11, 12);

        USE_SERIAL.print(action_id);
        break;
      case sIOtype_ACK:
        USE_SERIAL.printf("[IOc] get ack: %u\n", length);
        hexdump(payload, length);
        break;
      case sIOtype_ERROR:
        USE_SERIAL.printf("[IOc] get error: %u\n", length);
        hexdump(payload, length);
        break;
      case sIOtype_BINARY_EVENT:
        USE_SERIAL.printf("[IOc] get binary: %u\n", length);
        hexdump(payload, length);
        break;
      case sIOtype_BINARY_ACK:
        USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
        hexdump(payload, length);
        break;
    }
  }
}

//------------- SETUP DEL CHALECO ----------------------------------------
void setup() {
  // Se ajustan los pines como salida
  pinMode(DER, OUTPUT);
  pinMode(IZQ, OUTPUT);
  pinMode(LED, OUTPUT);

  USE_SERIAL.begin(115200);
  USE_SERIAL.setDebugOutput(true);

  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();

  // Se da una espera para el inicio del codigo
  for (uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }

  // Se realiza la conexión con el WiFi
  if (WiFi.getMode() & WIFI_AP) {
    WiFi.softAPdisconnect(true);
  }

  WiFiMulti.addAP(SSID_WIFI, PASS_WIFI);

  while (WiFiMulti.run() != WL_CONNECTED) {
    delay(100);
  }

  String ip = WiFi.localIP().toString();
  USE_SERIAL.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

  // Se inicializa el websocket
  socketIO.begin(HOST_SOCKET, PORT_SOCKET, PARAMS_SOCKET);

  // Se ajusta el marco de los eventos
  socketIO.onEvent(socketIOEvent);
}

//------------- LOOP ----------------------------------------
void loop() {
  // Se realzia el ciclo para el validar el estado y escuchar el socket
  translate_action();
  socketIO.loop();
}

// Comandos del Socket para acciones en el aplicativo
//1 -> Izq
//3 -> Der
//2 -> Avanzar
//9 -> PARAR

//------------- ACCIONES ----------------------------------------
// Variables globales para acciones
unsigned long messageTimestamp = 0;
uint64_t now = millis();

// Detecta el estado actual y corre las actividades puntuales
void translate_action() {
  now = millis();

  if (action_id == "1") {
    left_action();
  } else if (action_id == "3") {
    rigth_action();
  } else if (action_id == "2") {
    start_action();
  } else if (action_id == "9") {
    stop_action();
  } else {
    messageTimestamp = now;
    digitalWrite(DER, LOW);
    digitalWrite(IZQ, LOW);
  }
}

// Se debe indicar Mover Izquierda
void left_action() {
  Serial.println("LEFT!");

  if (now - messageTimestamp > 500) {
    messageTimestamp = now;
    digitalWrite(IZQ, HIGH);
  } else if (now - messageTimestamp > 100) {
    digitalWrite(IZQ, LOW);
  }
}

// Se debe indicar Mover Derecha
void rigth_action() {
  Serial.println("RIGTH!");

  if (now - messageTimestamp > 500) {
    messageTimestamp = now;
    digitalWrite(DER, HIGH);
  } else if (now - messageTimestamp > 100) {
    digitalWrite(DER, LOW);
  }
}

// Se debe indicar Detenerse
void stop_action() {
  Serial.println("STOP!");

  if (now - messageTimestamp > 2000) {
    digitalWrite(DER, LOW);
    digitalWrite(IZQ, LOW);
  } else if (now - messageTimestamp > 500) {
    digitalWrite(DER, HIGH);
    digitalWrite(IZQ, HIGH);
  }
}

// Se debe indicar Caminar
void start_action() {
  Serial.println("START!");

  if (now - messageTimestamp > 1000) {
    messageTimestamp = now;
    digitalWrite(DER, HIGH);
    digitalWrite(IZQ, HIGH);
  } else if (now - messageTimestamp > 100) {
    digitalWrite(DER, LOW);
    digitalWrite(IZQ, LOW);
  }
}
