/*
This example uses FreeRTOS softwaretimers as there is no built-in Ticker library
*/

#include <WiFi.h>
extern "C"
{
#include "freertos/FreeRTOS.h"
#include "freertos/timers.h"
}
#include <AsyncMqttClient.h>
#include <DHTesp.h>
#include <ArduinoOTA.h>

#define WIFI_SSID "Zaicon"
#define WIFI_PASSWORD "zizo1976"

#define MQTT_HOST IPAddress(192, 168, 1, 130)
#define MQTT_PORT 1883

AsyncMqttClient mqttClient;
TimerHandle_t mqttReconnectTimer;
TimerHandle_t wifiReconnectTimer;
DHTesp dht;
ComfortState cf;

int fanPowerPin = 14;
int mq2DigitalPin = 16;
int dhtPin = 17;
int mainLightPin = 25;
int doorPin = 26;
int tvPin = 32;
int airConditionPin = 33;
int mq2Pin = 35;

void connectToWifi()
{
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
}

void connectToMqtt()
{
  Serial.println("Connecting to MQTT...");
  mqttClient.connect();
}

void WiFiEvent(WiFiEvent_t event)
{
  Serial.printf("[WiFi-event] event: %d\n", event);
  switch (event)
  {
  case SYSTEM_EVENT_STA_GOT_IP:
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    connectToMqtt();
    break;
  case SYSTEM_EVENT_STA_DISCONNECTED:
    Serial.println("WiFi lost connection");
    xTimerStop(mqttReconnectTimer, 0); // ensure we don't reconnect to MQTT while reconnecting to Wi-Fi
    xTimerStart(wifiReconnectTimer, 0);
    break;
  }
}

void onMqttConnect(bool sessionPresent)
{
  Serial.println("Connected to MQTT.");
  Serial.print("Session present: ");
  Serial.println(sessionPresent);
  uint16_t packetIdSub = mqttClient.subscribe("dia-room", 2);
  mqttClient.subscribe("dia-room/mainLight/command", 1);
  mqttClient.subscribe("dia-room/door/command", 1);
  mqttClient.subscribe("dia-room/tv/command", 1);
  mqttClient.subscribe("dia-room/airCondition/command", 1);
  mqttClient.subscribe("dia-room/fanPower/command", 1);

  Serial.print("Subscribing at QoS 2, packetId: ");
  Serial.println(packetIdSub);
  mqttClient.publish("Dia/Room", 0, true, "test 1");
  Serial.println("Publishing at QoS 0");
  uint16_t packetIdPub1 = mqttClient.publish("Dia/Room", 1, true, "test 2");
  Serial.print("Publishing at QoS 1, packetId: ");
  Serial.println(packetIdPub1);
  uint16_t packetIdPub2 = mqttClient.publish("dia-room/controller/status", 1, true, "online");

  Serial.print("Publishing at QoS 2, packetId: ");
  Serial.println(packetIdPub2);
}

void onMqttDisconnect(AsyncMqttClientDisconnectReason reason)
{
  Serial.println("Disconnected from MQTT.");

  if (WiFi.isConnected())
  {
    xTimerStart(mqttReconnectTimer, 0);
  }
}

void onMqttSubscribe(uint16_t packetId, uint8_t qos)
{
  Serial.println("Subscribe acknowledged.");
  Serial.print("  packetId: ");
  Serial.println(packetId);
  Serial.print("  qos: ");
  Serial.println(qos);
}

void onMqttUnsubscribe(uint16_t packetId)
{
  Serial.println("Unsubscribe acknowledged.");
  Serial.print("  packetId: ");
  Serial.println(packetId);
}

void onMqttMessage(char *topic, char *payload, AsyncMqttClientMessageProperties properties, size_t len, size_t index, size_t total)
{

  Serial.println("Publish received.");
  Serial.print("  topic: ");
  Serial.println(topic);
  Serial.print("  qos: ");
  Serial.println(properties.qos);

  Serial.print("  retain: ");
  Serial.println(properties.retain);

  Serial.print("  total: ");
  Serial.println(total);
  Serial.print("  payload: ");
  Serial.println(payload);

  if (strcmp(topic, "dia-room/mainLight/command") == 0)
  {
    if (strcmp(payload, "on") == 0)
    {
      digitalWrite(mainLightPin, HIGH);
      mqttClient.publish("dia-room/mainLight/status", 2, true, "on");
    }
    else
    {
      digitalWrite(mainLightPin, LOW);
      mqttClient.publish("dia-room/mainLight/status", 2, true, "off");
    }
  }

  if (strcmp(topic, "dia-room/door/command") == 0)
  {
    if (strcmp(payload, "on") == 0)
    {
      digitalWrite(doorPin, HIGH);
      mqttClient.publish("dia-room/door/status", 2, true, "on");
    }
    else
    {
      digitalWrite(doorPin, LOW);
      mqttClient.publish("dia-room/door/status", 2, true, "off");
    }
  }

  if (strcmp(topic, "dia-room/tv/command") == 0)
  {
    if (strcmp(payload, "on") == 0)
    {
      digitalWrite(tvPin, HIGH);
      mqttClient.publish("dia-room/tv/status", 2, true, "on");
    }
    else
    {
      digitalWrite(tvPin, LOW);
      mqttClient.publish("dia-room/tv/status", 2, true, "off");
    }
  }

  if (strcmp(topic, "dia-room/fanPower/command") == 0)
  {
    if (strcmp(payload, "on") == 0)
    {
      digitalWrite(fanPowerPin, HIGH);
      mqttClient.publish("dia-room/fanPower/status", 2, true, "on");
    }
    else
    {
      digitalWrite(fanPowerPin, LOW);
      mqttClient.publish("dia-room/fanPower/status", 2, true, "off");
    }
  }

  if (strcmp(topic, "dia-room/airCondition/command") == 0)
  {
    if (strcmp(payload, "on") == 0)
    {
      digitalWrite(airConditionPin, HIGH);
      mqttClient.publish("dia-room/airCondition/status", 2, true, "on");
    }
    else
    {
      digitalWrite(airConditionPin, LOW);
      mqttClient.publish("dia-room/airCondition/status", 2, true, "off");
    }
  }
}

// if ((String)topic == "dia-room/mainLight/value" && (String)payload == "on")
// {
//   digitalWrite(mainLightPin, HIGH);
//   mqttClient.publish("dia-room/mainLight/value", 3, true, "on");
//   Serial.println("Turning on main light");
// }
// else if ((String)topic == "dia-room/mainLight/value" && (String)payload == "off")
// {
//   digitalWrite(mainLightPin, LOW);
//   mqttClient.publish("dia-room/mainLight/value", 3, true, "off");
//   Serial.println("Turning off main light");
// }

void setup()
{
  pinMode(mainLightPin, OUTPUT);
  pinMode(doorPin, OUTPUT);
  pinMode(fanPowerPin, OUTPUT);
  pinMode(tvPin, OUTPUT);
  pinMode(airConditionPin, OUTPUT);

  pinMode(mq2DigitalPin, INPUT_PULLUP);
  Serial.begin(115200);
  Serial.println();
  Serial.println();

  mqttReconnectTimer = xTimerCreate("mqttTimer", pdMS_TO_TICKS(2000), pdFALSE, (void *)0, reinterpret_cast<TimerCallbackFunction_t>(connectToMqtt));
  wifiReconnectTimer = xTimerCreate("wifiTimer", pdMS_TO_TICKS(2000), pdFALSE, (void *)0, reinterpret_cast<TimerCallbackFunction_t>(connectToWifi));

  WiFi.onEvent(WiFiEvent);

  mqttClient.onConnect(onMqttConnect);
  mqttClient.onDisconnect(onMqttDisconnect);
  mqttClient.onSubscribe(onMqttSubscribe);
  mqttClient.onUnsubscribe(onMqttUnsubscribe);

  mqttClient.onMessage(onMqttMessage);
  mqttClient.setServer(MQTT_HOST, MQTT_PORT);
  mqttClient.setWill("dia-room/controller/status", 1, true, "offline");
  mqttClient.setClientId("dia-room-controller");
  mqttClient.setKeepAlive(7);

  dht.setup(dhtPin, DHTesp::DHT11);
  Serial.println("DHT initiated");

  connectToWifi();
  ArduinoOTA
      .onStart([]()
               {
      String type;
      if (ArduinoOTA.getCommand() == U_FLASH)
        type = "sketch";
      else // U_SPIFFS
        type = "filesystem";

      // NOTE: if updating SPIFFS this would be the place to unmount SPIFFS using SPIFFS.end()
      Serial.println("Start updating " + type); })
      .onEnd([]()
             { Serial.println("\nEnd"); })
      .onProgress([](unsigned int progress, unsigned int total)
                  { Serial.printf("Progress: %u%%\r", (progress / (total / 100))); })
      .onError([](ota_error_t error)
               {
      Serial.printf("Error[%u]: ", error);
      if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
      else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
      else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
      else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
      else if (error == OTA_END_ERROR) Serial.println("End Failed"); });

  ArduinoOTA.begin();
}

bool getTemperature()
{
  // Reading temperature for humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (it's a very slow sensor)
  TempAndHumidity newValues = dht.getTempAndHumidity();
  // Check if any reads failed and exit early (to try again).
  if (dht.getStatus() != 0)
  {
    Serial.println("DHT11 error status: " + String(dht.getStatusString()));
    return false;
  }

  float heatIndex = dht.computeHeatIndex(newValues.temperature, newValues.humidity);
  float dewPoint = dht.computeDewPoint(newValues.temperature, newValues.humidity);
  // float cr = dht.getComfortRatio(cf, newValues.temperature, newValues.humidity);

  String comfortStatus;
  switch (cf)
  {
  case Comfort_OK:
    comfortStatus = "OK";
    break;
  case Comfort_TooHot:
    comfortStatus = "Too Hot";
    break;
  case Comfort_TooCold:
    comfortStatus = "Too Cold";
    break;
  case Comfort_TooDry:
    comfortStatus = "Too Dry";
    break;
  case Comfort_TooHumid:
    comfortStatus = "Too Humid";
    break;
  case Comfort_HotAndHumid:
    comfortStatus = "Hot & Humid";
    break;
  case Comfort_HotAndDry:
    comfortStatus = "Hot & Dry";
    break;
  case Comfort_ColdAndHumid:
    comfortStatus = "Cold & Humid";
    break;
  case Comfort_ColdAndDry:
    comfortStatus = "Cold & Dry";
    break;
  default:
    comfortStatus = "Unknown:";
    break;
  };

  // Serial.println(" T:" + String(newValues.temperature) + " H:" + String(newValues.humidity) + " I:" + String(heatIndex) + " D:" + String(dewPoint) + " " + comfortStatus);

  mqttClient.publish("dia-room/temperature/value", 2, false, String(newValues.temperature).c_str());
  mqttClient.publish("dia-room/humidity/value", 2, false, String(newValues.humidity).c_str());
  mqttClient.publish("dia-room/comfort/value", 2, false, comfortStatus.c_str());

  return true;
}
void getGasLevel()
{
  int mq2SensorValue = analogRead(mq2Pin);
  int mq2DigitalPinValue = digitalRead(mq2DigitalPin);

  mqttClient.publish("dia-room/gas/value", 2, false, String(mq2SensorValue).c_str());
  mqttClient.publish("dia-room/gas/status", 2, false, String(mq2DigitalPinValue).c_str());
}

void loop()
{
  ArduinoOTA.handle();
  getTemperature();
  getGasLevel();

  delay(3000);
}