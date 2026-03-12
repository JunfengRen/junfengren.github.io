---
layout: page
title: "Scheduling Optimization Design of IoT Embedded System Based on Improved RMS Algorithm"
description: "Research project on task scheduling optimization for IoT embedded systems using an improved RMS algorithm"
img: ""
importance: 1
category: research
related_publications: false
---

## Overview

This project was conducted while I was working as a **research assistant in the IoT Engineering Laboratory at Shandong University of Science and Technology**, and resulted in a research paper titled **"Scheduling Optimization Design of IoT Embedded System Based on Improved RMS Algorithm"**.

The project focuses on **real-time task scheduling in IoT embedded systems**, where multiple tasks with different execution requirements must share limited computational resources while still meeting timing constraints. In practical IoT environments, such as smart manufacturing, system workloads can vary dynamically, making conventional fixed-priority scheduling insufficient for robust real-time performance.

To address this problem, the project proposes an **Improved Rate Monotonic Scheduling (RMS) algorithm** that enhances the traditional RMS strategy by incorporating both **task execution characteristics** and **deadline urgency** into priority assignment. The goal is to improve **task completion efficiency, deadline satisfaction, and resource utilization** in dynamic IoT embedded systems.

---

## Research Problem

In IoT embedded systems, task scheduling is a core systems problem. A scheduler must determine which task should execute at each time step while balancing several objectives:

- meeting task deadlines
- reducing average task completion time
- maximizing CPU utilization
- maintaining system stability under dynamic workloads

Traditional **Rate Monotonic Scheduling (RMS)** is a classical fixed-priority real-time scheduling algorithm. However, in dynamic IoT scenarios, task arrivals and workloads may vary over time, which can lead to:

- inefficient priority assignment
- deadline violations
- reduced overall resource utilization

This project studies how to improve RMS for the specific context of **IoT embedded systems with dynamic workloads**.

---

## System Model

The experimental system is modeled as an IoT-enabled embedded environment inspired by a **smart manufacturing scenario**. The system includes sensors, actuators, and computational nodes coordinated by a central controller.

Three representative tasks were considered in the paper:

### Task 1: Sensor Data Collection

- Execution time: $C_1 = 6$
- Period: $T_1 = 20$

This task is responsible for collecting sensor data from the manufacturing environment.

### Task 2: Data Processing and Analysis

- Execution time: $C_2 = 12$
- Period: $T_2 = 40$

This task processes sensor measurements and performs data analysis.

### Task 3: Actuator Control

- Execution time: $C_3 = 4$
- Period: $T_3 = 15$

This task executes control commands for actuators based on processed data.

These tasks represent a typical embedded IoT workload containing sensing, computation, and control.

---

## Improved RMS Algorithm

The proposed method extends the traditional RMS algorithm by introducing a more adaptive priority assignment strategy.

### Original RMS Principle

In classical RMS, task priorities are assigned according to fixed task characteristics, and tasks with higher priority are always scheduled first. This works well under ideal periodic conditions, but becomes less effective in dynamic environments.

### Improved Scheduling Idea

The key idea of the proposed algorithm is to integrate **deadline proximity** into priority adjustment. In addition to the original RMS-style priority basis, tasks that are closer to their deadlines receive higher urgency.

This makes the scheduler more responsive to real-time changes in system state.

Conceptually, the improved scheduler considers two factors:

1. **Task execution characteristics**
2. **Remaining time before deadline**

Thus, tasks with both high urgency and significant execution demand can be prioritized more effectively.

---

## Scheduling Objective

The scheduling objective is to optimize system performance under real-time constraints. The project evaluates the algorithm using three main metrics:

### Average Task Completion Time

This measures the average time required to complete scheduled tasks. Lower values indicate more efficient execution.

### Deadline Violation Rate

This measures how often tasks miss their deadlines. Lower values indicate better real-time reliability.

### System Resource Utilization

This measures CPU usage efficiency. Higher utilization indicates better resource allocation, provided deadlines are still satisfied.

---

## Experimental Evaluation

A simulation-based experimental framework was built to compare the **Improved RMS algorithm** with the **traditional RMS algorithm** under different workload and system conditions.

The experiments evaluate scheduling behavior in multiple scenarios with varying:

- task workloads
- system load levels
- dynamic task conditions

The results reported in the paper show that the improved scheduling strategy consistently outperforms the conventional RMS algorithm.

### Representative Experimental Results

| Scenario | Algorithm | Avg. Task Completion Time (ms) | Deadline Violation Rate (%) | System Resource Utilization (%) |
|---------|-----------|-------------------------------:|----------------------------:|--------------------------------:|
| 1 | Improved RMS | 45 | 2 | 75 |
| 1 | Traditional RMS | 52 | 5 | 70 |
| 2 | Improved RMS | 68 | 4 | 63 |
| 2 | Traditional RMS | 76 | 8 | 58 |
| 3 | Improved RMS | 92 | 6 | 57 |
| 3 | Traditional RMS | 105 | 12 | 52 |
| 4 | Improved RMS | 78 | 5 | 65 |
| 4 | Traditional RMS | 88 | 9 | 60 |

These results show that the proposed method achieves:

- lower average task completion time
- fewer deadline violations
- better system resource utilization

compared with the traditional RMS scheduler.

---

## Key Technical Contributions

This project involved several important technical components:

### Real-Time Scheduling Design

Designed an improved scheduling mechanism for embedded IoT tasks by incorporating deadline urgency into RMS-based priority assignment.

### System-Level Performance Analysis

Evaluated the scheduling algorithm using multiple system metrics, including latency, deadline satisfaction, and CPU utilization.

### IoT Embedded Workload Modeling

Constructed representative task models for sensing, data processing, and actuator control in a smart manufacturing setting.

### Comparative Experimental Validation

Compared the proposed method against the traditional RMS algorithm under multiple experimental scenarios to validate performance gains.

---

## Technical Stack

This project integrates techniques from embedded systems and real-time scheduling:

• **Embedded Systems:** IoT task scheduling for sensing, processing, and control

• **Real-Time Scheduling:** RMS and improved fixed-priority scheduling

• **System Modeling:** smart manufacturing task modeling

• **Performance Evaluation:** task completion time, deadline violation rate, CPU utilization

• **Implementation / Simulation:** scheduling simulation and comparative analysis

---

## Publication Outcome

This work resulted in a research paper:

**Junfeng Ren**, *Scheduling Optimization Design of IoT Embedded System Based on Improved RMS Algorithm*, IEEE 2023.

---

## Impact

This project provided my early research experience in **embedded systems, real-time scheduling, and system-level optimization**, and helped me understand how algorithm design and performance evaluation can be combined to solve practical engineering problems.

Working on this project strengthened my interest in **efficient intelligent systems and real-world perception-and-control pipelines**, which later influenced my transition toward graduate research in **autonomous driving perception and collaborative multi-agent systems**.

---
