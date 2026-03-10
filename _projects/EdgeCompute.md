---
layout: page
title: Embedded Face Recognition Access Control System
description: Lightweight edge AI system for real-time face recognition on STM32 microcontrollers
img: assets/img/4.jpg
importance: 1
category: engineering
related_publications: false
---

## Overview

This project focuses on building a **lightweight edge AI access control system** based on an **STM32 embedded development board**.  
The system performs **real-time face recognition directly on-device**, enabling secure and low-latency identity verification without relying on heavy cloud computation.

The project integrates **embedded AI inference, IoT connectivity, and mobile remote control**, forming a complete edge computing solution for intelligent access management.

---

## System Architecture

The system consists of three major components:

1. **Edge AI Face Recognition Module**
2. **IoT Communication Module**
3. **Android Remote Control Application**

The overall system architecture is illustrated below.

<img src="/assets/img/4.jpg" alt="System Architecture" style="width:100%; border-radius:8px; margin-top:10px;">

---

## Edge AI Face Recognition

To enable face recognition on resource-constrained hardware, a **lightweight CNN-based face embedding model derived from MobileFaceNet** was implemented and optimized for embedded inference.

Key optimizations include:

- **Model pruning** to remove redundant parameters  
- **INT8 quantization** to reduce memory footprint  
- **TensorFlow Lite Micro deployment** for embedded inference  
- **Optimized fixed-point operations** for STM32 processors  

These optimizations allow the model to run efficiently on the **STM32 microcontroller with limited memory and compute resources**, enabling real-time face recognition directly at the edge.

---

## IoT Communication

The system integrates an **ESP8266 Wi-Fi module** to enable communication with the cloud.

Functions include:

- Uploading recognition results and device status  
- Remote device monitoring  
- Cloud-based message exchange  

The communication is implemented through **Baidu Cloud IoT platform**, allowing secure and scalable device connectivity.

---

## Android Remote Control Application

An **Android application** was developed to remotely manage the access control system.

The app provides:

- Real-time monitoring of device status  
- Remote door control  
- User management and identity registration  
- Cloud-based communication with the embedded device

The Android client communicates with the edge device through the **Baidu Cloud IoT service**, enabling remote access management from mobile devices.

---

## Experimental Results

The system successfully demonstrates:

- **Real-time face recognition on STM32 edge hardware**
- **Stable cloud communication via ESP8266**
- **Remote device control through Android application**

Example system results are shown below.

<img src="/assets/img/5.jpg" alt="System Results" style="width:100%; border-radius:8px; margin-top:10px;">

---

## Technical Components

This project integrates multiple technical domains:

- **Embedded Systems (STM32)**
- **Edge AI / TinyML**
- **Lightweight CNN Models**
- **IoT Communication (ESP8266)**
- **Mobile Application Development (Android)**

---

## Impact

This project demonstrates how **AI inference can be deployed directly on resource-constrained embedded devices**, enabling intelligent edge computing systems with low latency and strong privacy protection.

The experience gained from this project strengthened my interest in **efficient AI systems and real-world intelligent perception**, which later influenced my research in efficient perception frameworks and collaborative systems.
