// Example testing sketch for various DHT humidity/temperature sensors
// Written by ladyada, public domain

// REQUIRES the following Arduino libraries:
// - DHT Sensor Library: https://github.com/adafruit/DHT-sensor-library
// - Adafruit Unified Sensor Lib: https://github.com/adafruit/Adafruit_Sensor

#include "DHT.h"

#define DHTPIN 2     
#define DHTTYPE DHT11   

#define MOISTUREPIN A0

DHT dht(DHTPIN, DHTTYPE);

float normalizeMoistureReading(float reading) {
  //0 no moisture, 1 most moisture
  return 1 - (double) reading /  1023;
}

void setup() {
  Serial.begin(9600);

  dht.begin();
}



void loop() {
  // Wait a few seconds between measurements.
  delay(2000);


  

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)

  float moistureReading = analogRead(MOISTUREPIN);

  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();


  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  if (isnan(moistureReading)) {
    Serial.println(F("Failed to read from Moisture sensor!"));
    return;
  }

  Serial.print(F("moisture: "));

  Serial.println(normalizeMoistureReading(moistureReading));

  Serial.print(F("humidity: "));
  Serial.println(h);
  Serial.print(F("temperature: "));
  Serial.println(t);
}
