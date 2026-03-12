---
layout: page
title: Embedded Face Recognition Access Control System
description: Edge AI access control system with lightweight face recognition on STM32 microcontrollers
img: assets/img/4.jpg
importance: 1
category: engineering
related_publications: false
---

## Overview

This project was completed in **2023 as my undergraduate thesis project** and focuses on designing a **resource‑efficient edge AI system for face recognition–based access control**. The goal was to deploy a **complete perception–decision–control pipeline directly on embedded hardware**, enabling real‑time identity verification without relying on heavy cloud computation.

Unlike conventional access control systems that depend on server-side inference, this project demonstrates how **deep learning models can be optimized and deployed directly on microcontrollers**. The system integrates **embedded AI inference, IoT communication, and mobile device management**, forming a full edge computing architecture for intelligent access control.

The project combines techniques from **embedded systems, computer vision, TinyML, and IoT networking**, and was implemented on an **STM32-based embedded platform** with wireless connectivity and mobile control.

---

## System Architecture

The system follows a typical **edge AI architecture**, consisting of three main components:

1. **Edge AI Face Recognition Module (STM32)**
2. **Wireless Communication Module (ESP8266)**
3. **Android Remote Management Application**

The architecture enables local perception and decision making at the edge while allowing remote monitoring through cloud services.

<img src="/assets/img/4.jpg" alt="System Architecture" style="width:100%; border-radius:8px; margin-top:10px;">

At runtime, the system operates as follows:

1. A camera captures a face image at the access terminal.
2. The STM32 microcontroller performs **on-device face recognition inference**.
3. The identity verification result determines whether the door lock is triggered.
4. Recognition events and device status are transmitted to the cloud through Wi-Fi.
5. The Android application allows remote monitoring and user management.

This pipeline demonstrates a complete **edge perception–decision–communication loop** implemented on resource-constrained hardware.

---

## Edge AI Face Recognition

A major challenge of this project was enabling deep learning–based face recognition on a **microcontroller with extremely limited compute and memory resources**.

To address this constraint, a **lightweight face embedding network derived from MobileFaceNet** was designed and optimized for embedded deployment.

### Model Design

The face recognition pipeline consists of three stages:

1. **Face Detection** – locate the face region in the captured image.
2. **Feature Embedding Extraction** – compute a compact identity representation.
3. **Similarity Matching** – compare embeddings against registered users.

Given a face image $x$, the neural network produces an embedding vector:

$$
\mathbf{f}(x) \in \mathbb{R}^d
$$

Identity verification is performed using cosine similarity between embeddings:

$$
\text{sim}(x_i, x_j) = \frac{\mathbf{f}(x_i)^T \mathbf{f}(x_j)}{\|\mathbf{f}(x_i)\| \, \|\mathbf{f}(x_j)\|}
$$

If the similarity exceeds a predefined threshold, the identity is considered a match.

### Embedded Optimization

To make the model deployable on STM32 hardware, several **TinyML optimization techniques** were applied:

• **Model pruning** to remove redundant weights

• **INT8 quantization** to reduce model size and memory usage

• **TensorFlow Lite Micro deployment** for microcontroller inference

• **Fixed‑point arithmetic optimization** to accelerate computation

These optimizations reduced both **memory footprint and inference latency**, enabling real-time face recognition on a microcontroller platform.

---

## IoT Communication

To enable remote monitoring and control, the system integrates an **ESP8266 Wi‑Fi module** that connects the embedded device to the cloud.

Communication functions include:

• uploading recognition events and system logs

• synchronizing user identity data

• remote device status monitoring

The communication protocol is implemented through the **Baidu Cloud IoT platform**, which provides device authentication, message routing, and scalable cloud connectivity.

The embedded device communicates with the cloud using lightweight **MQTT-based messaging**, allowing efficient data transmission under limited network bandwidth.

---

## Android Remote Management Application

An **Android mobile application** was developed to remotely manage the access control system.

The mobile client provides the following functionalities:

• remote door control

• device status monitoring

• user identity registration

• cloud-based event logging

The Android application communicates with the embedded system through the **Baidu IoT cloud service**, forming a full **edge–cloud–mobile interaction loop**.

Example system interface and application results are shown below.

<img src="/assets/img/5.jpg" alt="Android Application Interface and System Results" style="width:100%; border-radius:8px; margin-top:10px;">

---

## Key Technical Challenges

Developing an AI system on microcontroller hardware introduces several engineering challenges.

### Real-Time Inference on Microcontrollers

STM32 processors have extremely limited compute capability and memory. Running neural networks therefore required **aggressive model compression and efficient inference frameworks**.

### Memory Constraints

Microcontrollers typically provide only a few hundred kilobytes of RAM. Model architecture and tensor memory allocation had to be carefully optimized to fit within these constraints.

### Edge–Cloud Communication

Reliable communication between embedded devices and cloud services required lightweight protocols and robust device authentication.

### System Integration

The project required integrating **computer vision, embedded firmware, wireless networking, and mobile development**, forming a complete intelligent system rather than an isolated algorithm.

---

## Technical Stack

This project integrates multiple technical domains:

• **Embedded Systems:** STM32 microcontrollers

• **Edge AI / TinyML:** TensorFlow Lite Micro

• **Computer Vision:** face recognition and feature embedding

• **Model Compression:** pruning and quantization

• **IoT Communication:** ESP8266 Wi‑Fi + MQTT

• **Cloud Platform:** Baidu Cloud IoT

• **Mobile Development:** Android application

---

## Impact

This project demonstrates how **deep learning perception models can be deployed on resource‑constrained edge devices**, enabling intelligent systems that operate with **low latency, improved privacy, and reduced cloud dependency**.

Working on this project sparked my interest in **efficient AI systems and real‑world perception deployment**, which later influenced my research direction toward **efficient perception architectures and collaborative multi‑agent systems in autonomous driving**.

---
