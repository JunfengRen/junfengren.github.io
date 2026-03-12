---
layout: page
title: Jetson-Based Autonomous Driving System
description: Embedded autonomous driving platform integrating perception, planning, and control on NVIDIA Jetson
img: assets/img/6.jpg
importance: 1
category: engineering
related_publications: false
---

## Overview

This project was completed in **2023 during my undergraduate studies** and implements a **miniature autonomous driving system** deployed on an **NVIDIA Jetson embedded AI platform**. The goal of the project was to design a **complete perception–planning–control pipeline** capable of running in real time on an embedded GPU while integrating **multi‑modal sensing**.

The vehicle platform integrates a **forward-facing RGB camera and a radar sensor**, enabling the system to combine visual perception with distance sensing for more robust environment understanding.

The vehicle is equipped with a forward-facing camera and executes autonomous driving behaviors including:

- traffic light recognition
- obstacle detection using **camera–radar fusion**
- lane following
- crosswalk-aware speed control
- rule-based path planning

The project focuses on integrating **deep learning perception with classical control algorithms** under the computational constraints of an embedded system.

---

## System Pipeline

The system follows a typical autonomous driving architecture:

Perception → Environment Representation → Behavior Planning → Vehicle Control

At each control cycle the system performs the following steps:

1. Capture camera image
2. Run perception models to detect traffic lights and obstacles
3. Extract lane geometry using computer vision
4. Estimate vehicle deviation from lane center
5. Generate steering and speed commands
6. Send control signals to the vehicle controller

This pipeline runs entirely on the **Jetson onboard computer**, enabling real-time autonomous operation.

---

## Hardware Platform

The autonomous vehicle platform consists of:

- **NVIDIA Jetson embedded GPU module** for perception inference
- monocular RGB camera for visual perception
- **millimeter-wave radar sensor for distance measurement and obstacle detection**
- motor driver and steering controller
- onboard microcontroller for low-level actuator control

The Jetson device performs all perception and planning computations, while the microcontroller executes the final motor commands.

---

## Perception Module

The perception module processes images from the onboard camera to detect key driving cues.

### Traffic Light Recognition

Traffic lights are detected using a lightweight deep learning object detection model based on **YOLOv5‑Nano**.

Training pipeline:

- custom dataset of traffic light images
- data augmentation including brightness variation and scaling
- training using PyTorch

For embedded deployment, the model was optimized using:

- **TensorRT inference acceleration**
- model layer fusion
- reduced input resolution

The network outputs bounding boxes and class labels for:

- red light
- yellow light
- green light

The detected signal state is used to determine whether the vehicle should stop or continue driving.

---

### Obstacle Detection

Obstacle detection uses the same YOLO detection framework to identify objects located in front of the vehicle.

Detected objects are projected into the vehicle coordinate frame using camera geometry. If an obstacle appears within a predefined safety region, the planner reduces speed or stops the vehicle.

This module enables reactive collision avoidance.

---

### Radar-Based Distance Sensing

To improve robustness under lighting variations and to provide reliable distance estimation, a **millimeter‑wave radar sensor** was integrated into the perception system.

Radar measurements provide direct range information to nearby objects. These measurements are fused with camera-based detections by associating radar returns with detected bounding boxes in the image.

The fusion process includes:

- projecting radar detections into the camera coordinate frame
- associating radar points with detected objects
- using radar range measurements to refine obstacle distance estimation

This **camera–radar fusion** improves obstacle detection reliability and enables safer braking behavior compared with purely vision-based perception.

---

## Sensor Fusion

To combine the complementary strengths of vision and radar sensing, a lightweight **camera–radar fusion module** was implemented.

The camera provides rich semantic information (object category and image location), while radar provides reliable **distance measurements** that are robust to lighting conditions.

The fusion process follows three main steps:

**1. Coordinate Alignment**

Radar detections are first transformed into the camera coordinate frame using the calibrated extrinsic parameters between the radar and camera sensors.

**2. Association Between Radar Returns and Visual Detections**

For each object detected by the YOLO network, nearby radar points are associated with the bounding box region in the image. This establishes a correspondence between the visual detection and radar measurement.

**3. Position Estimation**

Given the radar range measurement \(r\) and the horizontal angle \(\theta\) relative to the vehicle, the object position in the vehicle coordinate frame is estimated as:

$$
X = r \cos(\theta)
$$

$$
Y = r \sin(\theta)
$$

where

- \(X\) represents the forward distance
- \(Y\) represents the lateral offset from the vehicle center

These fused position estimates are then used by the planning module to determine whether an obstacle lies within the vehicle's safety region.

By combining camera detection with radar distance sensing, the system achieves more reliable obstacle localization than purely vision-based perception, especially in challenging lighting conditions.

---

## Lane Detection

Lane geometry is extracted using a classical computer vision pipeline.

The algorithm consists of the following steps:

1. **Perspective Transformation**  
   A homography transform converts the camera image into a bird's-eye-view representation.

2. **Edge Detection**  
   Canny edge detection identifies lane boundaries.

3. **Region of Interest Selection**  
   Only the road area is processed to reduce noise.

4. **Hough Transform Line Detection**  
   The Hough transform extracts candidate lane lines.

5. **Lane Model Fitting**  
   Detected lines are fitted using a polynomial model to estimate the lane center.

The lateral deviation between the vehicle center and lane center is computed and used for steering control.

---

## Behavior Planning

Driving decisions are implemented using a **rule-based behavior planner**.

The planner integrates information from perception modules and selects appropriate driving actions.

Key decision rules include:

**Traffic Light Rule**

- Red light → vehicle stops
- Green light → vehicle proceeds

**Obstacle Rule**

- obstacle detected in front region → reduce speed or stop

**Lane Following Rule**

- maintain vehicle alignment with the detected lane center

**Crosswalk Rule**

- when crosswalk pattern detected → reduce speed

This rule-based system provides interpretable behavior suitable for small-scale autonomous platforms.

---

## Vehicle Control

Vehicle motion is controlled using a feedback controller that converts perception outputs into steering and velocity commands.

### Steering Control

Steering is computed using a **proportional control law** based on lane deviation:

$$
\delta = k_p \cdot e
$$

where

- $e$ is the lateral distance from lane center
- $\delta$ is the steering command
- $k_p$ is a control gain

This controller continuously corrects the vehicle heading to stay centered in the lane.

### Speed Control

Vehicle speed is adjusted according to environment conditions:

- normal cruising speed during lane following
- reduced speed near crosswalks
- full stop when traffic light is red

Speed commands are transmitted from the Jetson system to the motor controller via serial communication.

---

## Embedded Optimization

To ensure real-time performance on the Jetson platform, several optimizations were implemented:

- TensorRT inference acceleration for YOLO
- reduced neural network input resolution
- asynchronous perception and control threads
- GPU utilization monitoring and tuning

These optimizations enabled stable real-time inference and control.

---

## Technical Stack

**Hardware**

- NVIDIA Jetson embedded GPU platform
- monocular RGB camera
- motor driver and steering actuator

**Software**

- Python
- PyTorch
- TensorRT

**Computer Vision**

- YOLOv5‑Nano object detection
- Canny edge detection
- Hough transform
- perspective transformation

**Autonomous Driving Algorithms**

- lane detection and center estimation
- rule-based behavior planning
- proportional steering control

---

## Outcome

The system successfully demonstrated a complete embedded autonomous driving pipeline capable of:

- detecting traffic lights in real time
- recognizing obstacles and avoiding collisions
- performing stable lane following
- slowing down at crosswalks

All perception and planning modules run on the **Jetson embedded platform**, demonstrating the feasibility of integrating deep learning perception with classical control in a resource-constrained autonomous driving system.

This project was completed during my **undergraduate studies in 2023** and represents my first full implementation of an embedded autonomous driving pipeline integrating **multi-modal perception, behavior planning, and vehicle control**. Working on this system sparked my strong interest in **autonomous driving and intelligent perception systems**, which later motivated my decision to pursue graduate research in **autonomous driving perception and collaborative multi-agent perception systems**.