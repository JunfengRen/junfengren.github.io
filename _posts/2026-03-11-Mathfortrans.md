---
layout: post
title: "Mathematical Foundations for Transformers"
description: "Detailed study notes on the mathematics behind Transformer models, including attention, softmax, positional encoding, optimization, and efficient token computation."
tags: [transformers, math, deep-learning, research-notes]
categories: research-notes
---

As I continue studying modern computer vision and large-scale perception models, I have become increasingly convinced that understanding Transformers requires more than memorizing architecture diagrams.  
At its core, the Transformer is a **mathematical system** built from linear algebra, probability, optimization, matrix calculus, and numerical stability principles.

This note summarizes the mathematical foundations that are especially important for understanding **Transformer models**, including self-attention, multi-head attention, positional encoding, normalization, optimization, and efficient token computation.

---

# 1. Why Transformers Are a Mathematical Model

A Transformer layer is not merely a stack of engineering modules. It is a composition of:

- linear projections
- similarity computation
- probability normalization
- weighted aggregation
- nonlinear transformation
- residual optimization

In compact form, the core attention operation is

$$
\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

This single equation already contains several mathematical ideas:

- matrix multiplication for feature interaction
- inner products as similarity measures
- scaling for variance control
- softmax for probability normalization
- weighted sums for information aggregation

To understand Transformers well, one must unpack the mathematics hidden inside this formula.

---

# 2. Linear Algebra of Transformer Representations

Transformers operate on a sequence of token embeddings.  
Suppose the input sequence contains $n$ tokens, and each token is represented by a $d$-dimensional vector. Then the full input can be written as

$$
X \in \mathbb{R}^{n \times d}
$$

where each row corresponds to one token embedding.

---

## 2.1 Token Embeddings as Vectors

Each token embedding can be viewed as a point in a high-dimensional vector space:

$$
x_i \in \mathbb{R}^d
$$

The Transformer does not process tokens independently. Instead, it maps them into new spaces and lets them interact.

From a linear algebra point of view, the Transformer repeatedly performs:

1. linear projection into new subspaces  
2. similarity measurement between projected vectors  
3. weighted recombination of token features

This is one reason why concepts such as **span, basis, rank, orthogonality, and low-rank approximation** are so relevant.

---

## 2.2 Linear Projections to Query, Key, and Value Spaces

Given the input matrix $X$, the model computes

$$
Q = XW_Q, \qquad K = XW_K, \qquad V = XW_V
$$

where

$$
W_Q, W_K \in \mathbb{R}^{d \times d_k}, \qquad W_V \in \mathbb{R}^{d \times d_v}
$$

These are linear transformations. They project the original token features into three different representation spaces:

- **Query space**: what information a token is asking for  
- **Key space**: what information a token offers  
- **Value space**: the actual content to be aggregated

Mathematically, this is similar to applying different learned bases to the same data matrix.

---

## 2.3 Inner Products as Similarity

Attention scores are computed by the matrix product

$$
S = QK^T
$$

where

$$
S_{ij} = q_i^T k_j
$$

Each entry measures the similarity between query $q_i$ and key $k_j$.

This is simply a dot product, but dot products in high-dimensional spaces have geometric meaning:

$$
q_i^T k_j = \|q_i\|\,\|k_j\|\cos \theta
$$

So attention is fundamentally based on **angles and magnitudes in vector space**.

When two vectors are well aligned, their similarity score is high. When they are orthogonal, their score is near zero.

---

## 2.4 Weighted Aggregation as Linear Combination

After normalization, attention produces weights $a_{ij}$. The output token is

$$
o_i = \sum_{j=1}^{n} a_{ij} v_j
$$

Thus, each output token is a **linear combination** of value vectors.

This is important: the Transformer does not create information from nowhere. It recombines existing token information through learned weights.

In matrix form,

$$
O = AV
$$

where $A$ is the attention matrix after softmax normalization.

So attention can be interpreted as a learned, data-dependent linear operator acting on the value matrix.

---

# 3. Scaled Dot-Product Attention

The standard attention formula is

$$
\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

Each part has a precise mathematical purpose.

---

## 3.1 Why Divide by $\sqrt{d_k}$?

Assume the entries of $q_i$ and $k_j$ are independent random variables with mean $0$ and variance $1$. Then their dot product

$$
q_i^T k_j = \sum_{t=1}^{d_k} q_{it} k_{jt}
$$

has variance roughly proportional to $d_k$.

That means when $d_k$ becomes large, the raw attention scores can grow too large in magnitude. This causes softmax to become overly sharp, which in turn makes optimization unstable.

By scaling with $\sqrt{d_k}$,

$$
\frac{q_i^T k_j}{\sqrt{d_k}}
$$

we keep the variance under control. This improves numerical stability and prevents gradients from becoming excessively peaky or too small.

So the scaling factor is not decorative; it is a variance normalization trick.

---

## 3.2 Attention Weights as Probabilities

For a fixed query token $i$, the attention weights are

$$
a_{ij} = \frac{\exp(s_{ij})}{\sum_{m=1}^{n} \exp(s_{im})}
$$

where

$$
s_{ij} = \frac{q_i^T k_j}{\sqrt{d_k}}
$$

This means:

- $a_{ij} \ge 0$
- $\sum_j a_{ij} = 1$

So each row of the attention matrix can be interpreted as a probability distribution over source tokens.

This is one of the bridges between **linear algebra and probability** inside the Transformer.

---

## 3.3 Attention Matrix Structure

Define

$$
A = \mathrm{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)
$$

Then

$$
A \in \mathbb{R}^{n \times n}
$$

and each row sums to one.

The matrix $A$ tells us how information flows across the sequence. In practice:

- diagonal-dominant patterns often indicate local self-focus  
- block patterns may indicate phrase-level grouping  
- sparse patterns may indicate selective interaction  
- long-range patterns may capture global dependency

This is why attention maps are often used for interpretation, though one should resist treating them as magical truth machines.

---

# 4. Multi-Head Attention

Instead of using a single attention map, Transformers use multiple heads:

$$
\mathrm{head}_i = \mathrm{Attention}(Q_i, K_i, V_i)
$$

and then concatenate the outputs:

$$
\mathrm{MHA}(X)=\mathrm{Concat}(\mathrm{head}_1,\dots,\mathrm{head}_h)W_O
$$

---

## 4.1 Why Multiple Heads?

If a single head uses one similarity pattern, multiple heads allow the model to learn different interaction subspaces.

Mathematically, each head has its own projection matrices:

$$
Q_i = XW_Q^{(i)}, \quad K_i = XW_K^{(i)}, \quad V_i = XW_V^{(i)}
$$

This means each head performs attention in a different learned subspace.

Different heads may specialize in:

- local context  
- long-range dependency  
- syntactic relation  
- geometric correspondence  
- cross-view interaction

In computer vision Transformers, different heads may also attend to different spatial structures or object regions.

---

## 4.2 Rank and Expressivity

Multi-head attention can be understood as improving expressivity by combining multiple low-dimensional attention operations.

Instead of one large attention mechanism in a single space, the model learns several smaller relational maps and then fuses them.

This is related to a broader mathematical idea: representing a complex operator as a sum or concatenation of simpler operators.

---

# 5. Softmax and Numerical Stability

Softmax turns scores into normalized positive weights:

$$
\mathrm{softmax}(z_i)=\frac{e^{z_i}}{\sum_j e^{z_j}}
$$

However, exponentials are numerically unstable when $z_i$ is large.

---

## 5.1 Log-Sum-Exp Trick

A standard stable implementation uses

$$
\mathrm{softmax}(z_i)=\frac{e^{z_i-m}}{\sum_j e^{z_j-m}}, \qquad m = \max_j z_j
$$

because subtracting the maximum does not change the output distribution:

$$
\frac{e^{z_i}}{\sum_j e^{z_j}} = \frac{e^{z_i-m}}{\sum_j e^{z_j-m}}
$$

This prevents overflow.

---

## 5.2 Gradient of Softmax

The derivative of softmax has a special coupled structure:

$$
\frac{\partial \sigma_i}{\partial z_j} = \sigma_i(\delta_{ij}-\sigma_j)
$$

where $\delta_{ij}$ is the Kronecker delta.

This tells us that changing one score affects all output probabilities. Softmax is therefore not elementwise independent; it is a normalized competition mechanism.

This coupled derivative is one reason attention training can be sensitive to large logits.

---

# 6. Positional Encoding and Sequence Geometry

Self-attention itself is permutation-equivariant. If we reorder the tokens and reorder queries, keys, and values in the same way, attention alone cannot know which token came first.

Therefore, Transformers need positional information.

---

## 6.1 Sinusoidal Positional Encoding

The original Transformer uses

$$
PE(pos,2i)=\sin\left(\frac{pos}{10000^{2i/d}}\right)
$$

$$
PE(pos,2i+1)=\cos\left(\frac{pos}{10000^{2i/d}}\right)
$$

These encodings provide a deterministic map from token position to a vector.

Why sine and cosine? Because they provide:

- multi-scale frequency components  
- smooth positional variation  
- relative position recoverability through linear operations

This is a neat example of Fourier-flavored mathematics quietly sneaking into deep learning.

---

## 6.2 Relative Position and Translation Structure

In many vision and language models, relative position matters more than absolute position.

A relative positional scheme lets the attention score depend not only on content, but also on token offset:

$$
s_{ij} = \frac{q_i^T k_j}{\sqrt{d_k}} + b_{i-j}
$$

where $b_{i-j}$ is a learned relative bias.

This is especially useful when local neighborhoods and relative geometry matter, such as in images, videos, and BEV representations.

---

# 7. Matrix Calculus for Attention and Backpropagation

Training Transformers requires differentiating through matrix operations.

---

## 7.1 Gradient Through Linear Projection

Suppose

$$
Q = XW_Q
$$

Then a loss $L$ depending on $Q$ produces gradients

$$
\frac{\partial L}{\partial W_Q} = X^T \frac{\partial L}{\partial Q}
$$

and

$$
\frac{\partial L}{\partial X} = \frac{\partial L}{\partial Q} W_Q^T
$$

This pattern appears repeatedly in Transformer backpropagation.

---

## 7.2 Gradient Through Attention Scores

Let

$$
S = \frac{QK^T}{\sqrt{d_k}}
$$

Then gradients flow backward through both $Q$ and $K$ because similarity depends on both.

If we denote

$$
G_S = \frac{\partial L}{\partial S}
$$

then

$$
\frac{\partial L}{\partial Q} = \frac{1}{\sqrt{d_k}} G_S K
$$

$$
\frac{\partial L}{\partial K} = \frac{1}{\sqrt{d_k}} G_S^T Q
$$

This shows that attention learning is inherently relational: each token's gradient depends on interactions with many others.

---

## 7.3 Jacobian View of Transformer Blocks

A Transformer block is a composition of multiple operations:

$$
X \rightarrow Q,K,V \rightarrow S \rightarrow A \rightarrow O \rightarrow \text{MLP} \rightarrow Y
$$

The full Jacobian is a product of intermediate Jacobians. In practice, automatic differentiation computes this efficiently, but mathematically it is still the chain rule in disguise.

---

# 8. Layer Normalization and Residual Connections

Modern Transformers rely heavily on residual connections and normalization.

---

## 8.1 Residual Mapping

Given an input $x$ and a sublayer $F(x)$, the residual update is

$$
y = x + F(x)
$$

The key benefit is gradient preservation. The derivative is

$$
\frac{dy}{dx} = I + \frac{\partial F}{\partial x}
$$

So even if $\frac{\partial F}{\partial x}$ becomes small, the identity path helps gradients pass through deep networks.

This is one reason deep Transformers remain trainable.

---

## 8.2 Layer Normalization

Given feature vector $x \in \mathbb{R}^d$, layer normalization computes

$$
\mu = \frac{1}{d}\sum_{i=1}^{d} x_i
$$

$$
\sigma^2 = \frac{1}{d}\sum_{i=1}^{d} (x_i-\mu)^2
$$

and outputs

$$
\mathrm{LN}(x) = \gamma \odot \frac{x-\mu}{\sqrt{\sigma^2+\epsilon}} + \beta
$$

This normalizes features per token and stabilizes optimization.

---

## 8.3 Pre-Norm vs Post-Norm

Two common Transformer designs are:

**Post-norm:**

$$
y = \mathrm{LN}(x + F(x))
$$

**Pre-norm:**

$$
y = x + F(\mathrm{LN}(x))
$$

Pre-norm is often easier to optimize in deep Transformers because gradient flow is more stable.

---

# 9. Feed-Forward Networks and Nonlinearity

After attention, each token passes through a positionwise feed-forward network:

$$
\mathrm{FFN}(x)=W_2\phi(W_1x+b_1)+b_2
$$

where $\phi$ is usually ReLU or GELU.

This module adds nonlinear transformation capacity. Attention mixes information across tokens, while the feed-forward network transforms features within each token.

In many ways, attention handles **communication**, while FFN handles **computation**.

---

# 10. Complexity of Self-Attention

One major mathematical issue in Transformers is complexity.

For sequence length $n$, the attention score matrix is

$$
QK^T \in \mathbb{R}^{n \times n}
$$

So both memory and computation scale as

$$
\mathcal{O}(n^2)
$$

This becomes expensive for long sequences, high-resolution images, videos, or dense BEV tokens.

---

## 10.1 Why Efficient Attention Matters

In vision and autonomous driving, token count can become large because of:

- image patches  
- multi-view tokens  
- temporal memory tokens  
- BEV queries  
- collaborative messages from multiple agents

This is why efficient attention, token pruning, and token merging become mathematically meaningful rather than merely fashionable buzz-chatter.

---

## 10.2 Low-Rank Intuition

If the attention matrix can be approximated by low-rank structure,

$$
A \approx UV^T
$$

then one may reduce computation and memory cost.

This links Transformers to SVD, matrix factorization, and low-rank approximation.

Such ideas appear in:

- linear attention  
- kernelized attention  
- Nyström approximation  
- token merging and compression

---

# 11. Token Merging and Mathematical Compression

This section is especially relevant for efficient vision Transformers and for my broader research interests.

Suppose there are many tokens with similar representations. Instead of processing them independently, we may merge them to reduce redundancy.

---

## 11.1 Similarity-Based Token Reduction

If tokens $x_i$ and $x_j$ are similar under some metric, then we may replace them by a merged token

$$
\tilde{x} = \alpha x_i + (1-\alpha)x_j
$$

for some weight $\alpha \in [0,1]$.

This is mathematically a low-dimensional compression step.

The design question becomes: what similarity should define mergeability?

Possible criteria include:

- cosine similarity  
- Euclidean distance  
- attention response similarity  
- task-aware importance  
- temporal novelty

---

## 11.2 Information Preservation

A useful mathematical viewpoint is that token merging should minimize loss of task-relevant information. One may write an abstract objective such as

$$
\min_{\mathcal{M}} \; \mathcal{L}_{task}(\mathcal{M}(X)) + \lambda \cdot \mathcal{C}(\mathcal{M}(X))
$$

where

- $\mathcal{M}$ is the merge operator  
- $\mathcal{L}_{task}$ measures downstream distortion  
- $\mathcal{C}$ measures compute or communication cost

This is closely related to efficient Transformer design and also to communication-aware perception systems.

---

# 12. Optimization of Transformer Training

Training Transformers introduces several optimization challenges.

---

## 12.1 Adam and AdamW

Transformers are typically trained with Adam-style optimizers:

$$
m_t = \beta_1 m_{t-1} + (1-\beta_1)g_t
$$

$$
v_t = \beta_2 v_{t-1} + (1-\beta_2)g_t^2
$$

with update

$$
\theta_{t+1} = \theta_t - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t}+\epsilon}
$$

AdamW decouples weight decay from gradient normalization, which often improves optimization behavior.

---

## 12.2 Learning Rate Warmup

At the beginning of training, gradients can be unstable. Warmup uses a gradually increasing learning rate:

$$
\eta_t = \eta_{max} \cdot \frac{t}{T_{warmup}}, \qquad t \le T_{warmup}
$$

This prevents early optimization explosions.

---

## 12.3 Sharp vs Flat Minima

As in other deep models, Transformer optimization also interacts with the geometry of the loss landscape.

A sharp minimum corresponds to large curvature, while a flat minimum tends to be more robust to perturbation. In practice, batch size, weight decay, normalization, and optimizer choice all influence this geometry.

---

# 13. Probabilistic Interpretation of Attention

Although attention is often introduced algebraically, there is also a probabilistic perspective.

For each query token, the attention weights form a categorical distribution over source tokens:

$$
a_i = (a_{i1}, a_{i2}, \dots, a_{in})
$$

with

$$
\sum_j a_{ij}=1
$$

Thus one may view attention as a soft probabilistic routing mechanism.

Low-entropy attention corresponds to focused selection. High-entropy attention corresponds to diffuse aggregation.

The entropy of one attention row is

$$
H(a_i) = -\sum_j a_{ij}\log a_{ij}
$$

This can be useful when analyzing sparsity, certainty, and routing behavior in Transformer models.

---

# 14. Connections to Vision Transformers

For vision models, images are split into patches, and each patch is treated as a token.

If an image of size $H \times W$ is partitioned into patches of size $P \times P$, then the number of tokens is

$$
N = \frac{HW}{P^2}
$$

As image resolution increases, token count grows quickly, and attention cost becomes significant.

This is one reason why patch size, hierarchical design, sparse attention, and token merging matter so much in vision Transformers.

For autonomous driving perception, the challenge becomes even larger because one may have:

- multi-camera image tokens  
- temporal memory tokens  
- BEV query tokens  
- collaborative tokens from neighbor agents

So the mathematics of efficient Transformers is directly relevant to scalable perception systems.

---

# 15. Closing Remarks

Transformers are elegant because they reduce complex sequence reasoning to a small collection of mathematical primitives:

- linear projection  
- dot-product similarity  
- softmax normalization  
- weighted aggregation  
- residual optimization  
- nonlinear feature transformation

Behind the shiny architecture diagrams, the real machinery is mathematics.

For me, understanding these foundations is important not only for reading Transformer papers, but also for building efficient perception systems in computer vision and autonomous driving.  
In particular, ideas such as **attention sparsification, low-rank approximation, token merging, and task-aware compression** are mathematically grounded extensions of the same Transformer principles.