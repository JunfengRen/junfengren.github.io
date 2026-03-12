---
layout: page
title: NAO Robot Autonomous Ball Search and Kick System
description: Embodied intelligence project implementing autonomous ball search and kicking on NAO humanoid robots for robotic soccer competitions
img: assets/img/1.jpg
importance: 1
category: engineering
related_publications: false
---

## Overview

This project was completed in **2022** during my undergraduate studies as part of a robotics team participating in a **NAO robot soccer competition**. My role in the team was to implement the **autonomous perception–action pipeline that allows the robot to independently search for the ball, approach it, and execute a kick**.

The system is an example of an **Embodied AI system**, where perception, decision-making, and motor control must operate together in a closed loop. The robot continuously observes the environment through its onboard camera, processes visual information to detect the ball, decides how to move, and controls its joints to walk and kick.

The core challenge is integrating **real-time computer vision, robot locomotion control, and behavior planning** under hardware constraints.

---

## System Pipeline

The implemented system follows a classical robotics pipeline:

Perception → State Estimation → Behavior Strategy → Motion Control → Execution

The robot repeatedly performs the following loop:

1. Capture image from the NAO camera
2. Detect and localize the soccer ball
3. Estimate the ball position relative to the robot
4. Decide the next behavior state
5. Execute walking or kicking motion

This closed-loop architecture enables the robot to autonomously interact with the environment.

---

## Computer Vision Module

The perception module runs on the NAO onboard processor and processes images from the robot's RGB camera.

### Ball Detection

A lightweight vision pipeline was designed to detect the soccer ball in real time:

1. **Color Space Conversion**  
   Images are converted from RGB to **HSV color space**, which is more robust to lighting variation.

2. **Color Segmentation**  
   Thresholding is applied to extract candidate regions corresponding to the orange soccer ball.

3. **Morphological Filtering**  
   Morphological operations (erosion and dilation) are applied to remove noise and smooth the detected regions.

4. **Contour Detection**  
   Contours are extracted using OpenCV, and candidate regions are filtered based on:
   - contour area
   - circularity
   - aspect ratio

5. **Ball Position Estimation**  
   The center of the detected contour is used to estimate the ball location in the image plane.

### Distance Estimation

The distance to the ball is estimated using a **pinhole camera model**:

$$
Z = \frac{fH}{h}
$$

where

- $f$ is the camera focal length
- $H$ is the real ball diameter
- $h$ is the detected ball height in pixels

This provides an approximate distance estimate that is sufficient for navigation and kicking.

---

## Behavior Strategy

A **finite state machine (FSM)** was implemented to control the robot behavior. The main states include:

**Search State**

If the ball is not detected, the robot performs an active search behavior:

- rotating the head horizontally to scan the field
- rotating the body in place to expand the search area

**Approach State**

Once the ball is detected, the robot moves toward it while maintaining visual tracking.

The robot adjusts its heading angle based on the horizontal position of the ball in the image.

**Alignment State**

Before kicking, the robot performs fine alignment so that the ball is located in front of the kicking foot.

**Kick State**

When the ball is within a predefined distance threshold, the robot triggers the kicking motion.

State transitions are determined based on:

- ball detection confidence
- estimated distance
- relative angle to the ball

---

## Motion Control

The robot locomotion and kicking behaviors are implemented using the **NAOqi motion control framework**.

### Walking Control

The NAO walking module allows control of robot velocity using:

```
setWalkTargetVelocity(x, y, theta)
```

where

- `x` controls forward velocity
- `y` controls lateral motion
- `theta` controls rotation

The robot approaches the ball using proportional control:

$$
\theta = k_p \cdot x_{ball}
$$

where $x_{ball}$ is the horizontal offset of the ball in the image.

### Head Motion Control

The robot's head joints are controlled to perform visual scanning using:

```
setAngles("HeadYaw", angle, speed)
```

This allows the robot to actively search for the ball when it is lost.

### Kicking Motion

The kicking behavior is implemented using predefined **joint trajectories** for the hip, knee, and ankle joints.

The kicking sequence includes:

1. shift body weight to support leg
2. lift kicking leg
3. swing forward to strike the ball
4. return to balanced stance

Trajectory timing is tuned to maintain robot stability during the motion.

---

## Technical Stack

**Hardware Platform**

- NAO humanoid robot
- onboard RGB camera
- inertial measurement unit (IMU)
- joint encoders

**Software Framework**

- NAOqi robot control framework
- Python / C++ APIs

**Libraries**

- OpenCV for computer vision

**Core Techniques**

- HSV color segmentation
- contour detection
- geometric distance estimation
- finite state machine behavior control
- proportional heading control
- humanoid locomotion control

---

## Outcome

The system successfully enabled the NAO robot to autonomously:

- detect the soccer ball in real time
- actively search for the ball when it is lost
- navigate toward the ball
- perform a stable kicking motion

This project provided hands-on experience with **real-world embodied AI systems**, combining perception algorithms, robot control, and behavior design in a physical robotic platform. It also established my early interest in autonomous systems and intelligent perception, which later led to my research in autonomous driving perception and collaborative multi-agent systems.
