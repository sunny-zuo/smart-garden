<center><img src="https://raw.githubusercontent.com/sunny-zuo/smart-garden/master/app/assets/icon.png" alt="SmartGardenLogo" width="200"/></center>
<h1 align="center">SmartGarden</h1>
<h4 align="center">A smart plant care system built in React Native and Node.js</h4>
<p align="center">
    <img
      alt="node:>=14.0"
      src="https://img.shields.io/badge/node-%3E=14.0-blue.svg?style=flat-square"
    />
    <img
      alt="python:?3.7+"
      src="https://img.shields.io/badge/python-3.7+-blue.svg?style=flat-square"
    />
    <img 
        alt="License: MIT" 
        src="https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square" 
    />
  </a>
</p>


<p align="center">
  <a href="#overview">Overview</a> • <a href="#screenshots">Screenshots</a> • <a href="#hardware-requirements">Hardware Requirements</a> • <a href="#installation">Installation</a> • <a href="#authors">Authors</a> • <a href="#credits">Credits</a> • <a href="#license">License</a>
</p>

## Overview

SmartGarden is a smart plant management and monitoring system that enables users to take care of their plants remotely via a mobile app. The system utilizes various sensors and pumps controlled by an Arduino to measure various plant health metrics (moisture, brightness, humidity, temperature) and to remotely water the plant when needed. The Arduino sends data and receives commands from an Node.js server hosted on a headless Raspberry Pi via a serial port. The Raspberry Pi uses a camera to measure the height of the plant, and to display the latest image to the user. Data is stored in a MongoDB database, and the React Native app displays all of the data by fetching from a REST API on the server built with Express.

This project was built for the University of Waterloo SE 101 final project.

## Screenshots

<img src="img/screenshot1.png" width="300px"/>
<img src="img/screenshot2.png" width="300px"/>

## Hardware Requirements

* Arduino Uno
* Raspberry Pi running Raspberry Pi OS
* DHT series Temperature/Humidity Sensor
* Arduino Soil Moisture Sensor

## Installation

### Server

SmartGarden requires at least version 14.x of [Node.js](https://nodejs.org/en/) (which comes with [npm](http://npmjs.com/)) and Python version 3.7+ installed on the server. Begin by installing and starting the server:

```cmd
# Clone this repository
$ git clone https://github.com/sunny-zuo/smart-garden.git

# Navigate into the server folder of the repository
$ cd smart-garden/server

# Install JS dependencies
$ npm install

# Install Python dependencies
$ cd camera
$ python3 -m pip install -r requirements.txt
$ cd ..

# Run the server
$ npm start
```

### Arduino

Configure pin numbers in `arduino/main/main.ino` and upload the sketch to the Ardunio.

### App

The app is built with [Expo](https://expo.io/). With Expo installed, from the root directory of the repository:
```cmd
# Navigate into the app folder of the repository
$ cd app

# Install dependencies
$ npm install

# Run the app
$ npm start
```

## Authors

* [Sunny Zuo](https://github.com/sunny-zuo), [Elena Pan](https://github.com/elena-pan), [Umut Emre](https://github.com/umutcanemre), [Chris Fang](https://github.com/AntiChange) and Dhananjay Patki

## Credits

* Plant icon by Pixel perfect from [Flaticon](https://www.flaticon.com/free-icon/plant_892926)


## License

This project is licensed under the terms of the MIT license.