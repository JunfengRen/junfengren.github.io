---
layout: page
title: "Federated Learning for Medical Image Segmentation with Domain Generalization"
description: "Federated medical image segmentation with domain generalization and style transfer"
img: assets/img/2.jpg
importance: 1
category: research
related_publications: false
---

## Overview

This project explores **Federated Learning for Medical Image Segmentation under Domain Shift**, which we refer to as **FedDG (Federated Domain Generalization)**.

In real-world medical imaging scenarios, data collected from different hospitals often exhibit **significant domain differences** due to variations in imaging devices, acquisition protocols, and patient populations. At the same time, privacy regulations prevent hospitals from sharing raw medical data.

To address these challenges, this project investigates a **federated learning framework that combines domain generalization techniques**, enabling multiple institutions to collaboratively train segmentation models **without sharing their raw datasets**.

---

## Method Overview

The proposed **FedDG framework** integrates federated learning with domain generalization techniques to improve model robustness across heterogeneous medical datasets.

The key ideas include:

- **Federated Training:** multiple clients (e.g., hospitals) train local models and share model updates instead of raw data.
- **Domain Style Transfer:** style transformation techniques are introduced to reduce domain discrepancies between datasets.
- **Feature Alignment:** representation learning strategies are used to align feature distributions across clients.
- **Collaborative Optimization:** a central server aggregates model parameters to produce a globally generalized model.

---

## Framework Pipeline

The overall pipeline of the FedDG framework is illustrated below.

<img src="/assets/img/2.jpg" alt="FedDG Framework Pipeline" style="width:100%; border-radius:8px; margin-top:10px;">

The pipeline contains the following steps:

1. Each medical institution trains a **local segmentation model** using its private dataset.
2. **Domain style augmentation** is applied to simulate cross-hospital variations.
3. Feature representations are aligned to improve cross-domain robustness.
4. Model parameters are periodically uploaded to a **central federated server**.
5. The server performs **model aggregation** and distributes the updated global model back to all clients.

This process repeats iteratively until convergence.

---

## Experimental Results

The proposed FedDG framework was evaluated on multi-domain medical imaging datasets.

The results demonstrate that:

- Federated training enables collaborative learning **without sharing sensitive data**.
- Domain generalization techniques significantly improve **cross-domain segmentation performance**.
- The model achieves improved **generalization ability on unseen domains** compared with standard federated learning baselines.

Example experimental results are shown below.

<img src="/assets/img/3.jpg" alt="FedDG Experimental Results" style="width:100%; border-radius:8px; margin-top:10px;">

---

## Technical Components

This project integrates several research areas:

- **Federated Learning**
- **Medical Image Segmentation**
- **Domain Generalization**
- **Style Transfer**
- **Cross-domain Representation Learning**

---

## Impact

The FedDG framework demonstrates how **privacy-preserving collaborative learning** can be applied to medical imaging while maintaining strong generalization performance across heterogeneous data sources.

This project strengthened my interest in **distributed learning, domain adaptation, and robust perception systems**, which later influenced my research direction in collaborative perception and autonomous systems.
