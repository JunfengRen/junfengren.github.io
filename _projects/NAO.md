---
layout: page
title: NAO Robot Soccer System
description: Embodied AI project using NAO humanoid robots for autonomous soccer playing
img: assets/img/1.jpg
importance: 1
category: engineering
related_publications: false
---

## Overview

This project was completed in **2022** during my undergraduate studies.  
The goal was to design and implement an **embodied intelligence system** using the **NAO humanoid robot platform** to participate in a robotic soccer competition.

The system integrates **computer vision, motion control, and decision-making algorithms** to allow the robot to autonomously detect the ball, localize itself on the field, and execute kicking actions.

---

## System Architecture

The system consists of three main modules:

**1. Vision Perception**

The robot uses its onboard camera to detect the soccer ball and field markers.  
Computer vision algorithms were implemented to:

- Detect the ball in real time
- Estimate its relative position
- Track the ball during movement

**2. Motion Control**

Based on the detected ball position, the robot performs:

- walking and turning motions  
- alignment with the ball  
- kicking actions toward the goal  

These behaviors were implemented using NAO's motion control APIs.

**3. Game Strategy**

A simple decision-making logic was designed to control the robot's behavior during the match, including:

- searching for the ball when it is lost
- approaching the ball
- positioning before kicking
- executing the kick toward the goal

---

## Technical Components

The project combines multiple areas of robotics and AI:

- **Computer Vision** for object detection and localization  
- **Robot Motion Control** using NAO's locomotion system  
- **Behavior Programming** for decision-making during gameplay  
- **Embodied AI** integration of perception and action  

---

## Outcome

The system successfully demonstrated an autonomous robotic soccer pipeline including:

- real-time ball detection
- motion planning toward the ball
- automated kicking actions

This project was my **first experience combining perception, control, and decision-making in an embodied system**, which later influenced my interest in **autonomous systems and intelligent perception**.
