---
layout: page
title: Jetson-Based Autonomous Driving System
description: Embedded autonomous driving platform with perception and planning on NVIDIA Jetson
img: assets/img/6.jpg
importance: 1
category: engineering
related_publications: false
---

## Overview

This project implements a **miniature autonomous driving system** built on an **NVIDIA Jetson embedded AI platform**.  
The system integrates **visual perception, object detection, traffic light recognition, and path planning**, enabling an autonomous vehicle to navigate in a structured environment.

The goal of this project was to design a **real-time perception and control pipeline** capable of running entirely on an embedded GPU platform.

---

## System Architecture

The system consists of four major modules:

1. **Traffic Light Recognition**
2. **Obstacle Detection**
3. **Path Planning**
4. **Crosswalk-aware Speed Control**

The overall autonomous driving setup is shown below.

<img src="/assets/img/6.jpg" alt="Autonomous Driving System" style="width:100%; border-radius:8px; margin-top:10px;">

---

## Perception Module

The perception system runs on the **NVIDIA Jetson platform**, which provides GPU acceleration for deep learning inference.

Two perception tasks were implemented:

### Traffic Light Recognition

A lightweight object detection model based on **YOLOv5-Nano** was trained to detect traffic lights in real time.  
The model was optimized for embedded deployment using:

- Model pruning
- TensorRT acceleration
- Reduced input resolution for real-time inference

The system can recognize **red, yellow, and green lights**, enabling the vehicle to react accordingly.

### Obstacle Detection

For obstacle detection, the same **YOLO-based detection pipeline** was used to identify objects in front of the vehicle.  
Detected obstacles are converted into spatial constraints used by the planning module.

---

## Path Planning

The vehicle navigation logic is implemented through a **lightweight rule-based planning algorithm**.

Key components include:

- Lane following based on **classical computer vision lane detection**
- Direction decision at intersections
- Dynamic path adjustment when obstacles are detected

The planning module generates steering and velocity commands for the vehicle controller.

---

## Crosswalk Detection and Speed Control

To improve driving safety, the system also detects **pedestrian crosswalks** using image-based pattern recognition.

When a crosswalk is detected:

- The vehicle **automatically reduces speed**
- The controller ensures smooth deceleration
- The system resumes normal speed after passing the crosswalk

This module improves safety behavior in urban driving scenarios.

---

## Experimental Results

The system demonstrates the following capabilities:

- Real-time **traffic light recognition**
- Robust **obstacle detection**
- Stable **lane following and navigation**
- Automatic **speed reduction near crosswalks**

All perception and control algorithms run directly on the **Jetson embedded platform**, enabling real-time autonomous driving behavior.

---

## Technical Components

This project integrates several technical domains:

- **Embedded AI (NVIDIA Jetson)**
- **Deep Learning Object Detection (YOLOv5-Nano)**
- **Computer Vision for Lane Detection**
- **Autonomous Navigation Algorithms**
- **Real-time Embedded Systems**

---

## Impact

This project provided hands-on experience with **autonomous driving perception and planning pipelines** on embedded hardware.  
It strengthened my interest in **autonomous systems, real-time perception, and efficient AI deployment**, which later motivated my research in collaborative perception and autonomous driving.