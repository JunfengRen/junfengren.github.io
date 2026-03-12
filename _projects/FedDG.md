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

This project was completed as a **course research project during the first year of my master's program** and investigates **federated learning for medical image segmentation under domain shift**, which we refer to as **FedDG (Federated Domain Generalization)**.

In real-world medical imaging scenarios, datasets collected from different hospitals often exhibit **significant domain discrepancies** due to variations in imaging devices, acquisition protocols, and patient populations. At the same time, strict privacy regulations prevent institutions from directly sharing raw medical data.

This project explores how **federated learning combined with domain generalization techniques** can enable collaborative training of medical segmentation models while preserving data privacy. The goal is to improve the **generalization ability of segmentation models across heterogeneous medical domains**.

---

## System Architecture

The proposed framework follows a **federated learning architecture** consisting of multiple distributed clients and a central aggregation server.

Each participating hospital (client) trains a local segmentation model using its private dataset. Instead of sharing raw medical images, each client only uploads **model parameters or gradients** to the central server.

The server performs global model aggregation and sends the updated parameters back to all clients.

<!--#<img src="/assets/img/2.jpg" alt="FedDG Framework Pipeline" style="width:100%; border-radius:8px; margin-top:10px;">-->

This distributed training paradigm allows institutions to collaboratively train a shared model while maintaining strict **data privacy and regulatory compliance**.

---

## Medical Image Segmentation Model

The base segmentation model used in this project follows a **U-Net–style encoder–decoder architecture**, which is widely used for biomedical image segmentation.

Given an input medical image

$$
X \in \mathbb{R}^{H \times W \times C}
$$

the segmentation network predicts a pixel-wise label map

$$
Y \in \mathbb{R}^{H \times W}
$$

where each pixel corresponds to a semantic class (e.g., organ, lesion, or background).

The training objective minimizes the segmentation loss:

$$
\mathcal{L}_{seg} = - \sum_{i} y_i \log \hat{y}_i
$$

where

- $y_i$ represents the ground-truth label
- $\hat{y}_i$ represents the predicted probability

---

## Federated Optimization

The project implements a standard **Federated Averaging (FedAvg)** optimization strategy.

During each training round:

1. The server distributes the current global model to all clients.
2. Each client performs several steps of local gradient updates using its private dataset.
3. Updated model parameters are transmitted back to the server.
4. The server aggregates the parameters to update the global model.

The aggregation rule follows

$$
\theta^{t+1} = \sum_{k=1}^{K} \frac{n_k}{N} \theta_k^t
$$

where

- $K$ is the number of clients
- $n_k$ is the dataset size of client $k$
- $N = \sum_k n_k$
- $\theta_k^t$ is the model trained at client $k$

This approach enables distributed training while keeping raw medical data localized.

---

## Domain Generalization

A key challenge in federated medical learning is **cross-domain distribution shift**.

To improve model robustness, this project introduces domain generalization strategies including:

### Domain Style Transfer

Image style augmentation is applied to simulate appearance variations across hospitals. Style transformation encourages the model to learn **domain-invariant representations** rather than overfitting to specific imaging characteristics.

### Feature Distribution Alignment

Feature alignment techniques are used to reduce the discrepancy between feature distributions extracted from different clients. This helps the global model learn more **domain-agnostic representations**.

These mechanisms improve the model's ability to generalize to **previously unseen medical domains**.

---

## Experimental Results

The FedDG framework was evaluated on **multi-domain medical imaging datasets** representing data from different institutions.

The results demonstrate that:

- Federated learning enables **privacy-preserving collaborative training**.
- Domain generalization improves **cross-domain segmentation performance**.
- The proposed framework achieves stronger **generalization on unseen domains** compared with standard federated learning baselines.

Example experimental results are shown below.

<!--<img src="/assets/img/3.jpg" alt="FedDG Experimental Results" style="width:100%; border-radius:8px; margin-top:10px;">-->

---

## Key Technical Challenges

### Data Privacy and Distributed Training

Medical datasets cannot be shared directly across institutions. Federated learning provides a solution but introduces challenges such as communication overhead and distributed optimization stability.

### Domain Shift Across Hospitals

Differences in imaging protocols can cause severe performance degradation when models trained on one dataset are applied to another.

### Communication Efficiency

Frequent model synchronization between clients and the central server can introduce communication costs. Efficient training strategies are required to maintain scalable distributed learning.

---

## Technical Stack

This project integrates several research areas:

• **Federated Learning:** distributed optimization with FedAvg

• **Medical Image Segmentation:** U-Net–based architectures

• **Domain Generalization:** style transfer and feature alignment

• **Deep Learning Frameworks:** PyTorch

• **Medical Imaging Processing:** data augmentation and preprocessing

---

## Impact

This project provided practical experience with **federated learning, distributed model training, and cross-domain generalization in medical imaging**. It also strengthened my interest in **robust perception models and collaborative learning systems**, which later influenced my research direction toward **efficient multi-agent perception and collaborative autonomous systems**.

---
