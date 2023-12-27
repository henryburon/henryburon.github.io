---
layout: post
title:  "Rapidly-Exploring Random Tree (RRT)"
categories: [Path Planning, Python, RRT]
image: assets/gifs/RRT.GIF
featured: true
hidden: true
---

Path Planning, Python, RRT


<iframe width="100%" height="441" src="https://www.youtube.com/embed/x5AmgLBkSXQ?si=LW6sG8rTdrXVrDQt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Overview

**Goal**: Implement the RRT path-planning algorithm.

**GitHub**: [https://github.com/henryburon/path-planning/tree/main/path_planning](https://github.com/henryburon/path-planning/tree/main/path_planning/RRT)

**Process**:

This is an implementation of the Rapidly-Exploring Random Tree (RRT), a fundamental path planning algorithm in robotics.

An RRT consists of a set of vertices, which represent configurations in some domain D and edges, which connect two vertices. The algorithm randomly builds a tree in such a way that, as the number of vertices and *n* increases to &#8734;, the vertices are uniformly distributed across the domain D.

In this implementation, the RRT algorithm uses two key components:

1. **Tree Data Structure**: The RRT algorithm maintains a tree data structure to explore and represent the configuration space efficiently. Each node in the tree corresponds to a specific vertex, and edges between nodes represent feasible transitions.
2. **State Machine**: To control the decision-making process during tree expansion and exploration, I employed a state machine to guide the algorithm's behavior.

The inputs are as follows:

* **q_init**: initial configuration  
* **K**: max vertices in RRT  
* **delta**: incremental distance  
* **domain**: the planning domain  

The algorithm begins by randomely creating the obstacles, initializing the goal (and checking it's in an acceptable location), and initializing the matplotlib plot. It then enters the main *process*, which repeats up to **K** times. 

Every iteration, the algorithm:
1. Finds a random configuration (random coordinate within the domain).
2. Identifies the closest existing vertex.
3. Calculates the direction of the random configuration.
4. Plans a new vertex delta (1) in the direction of the random configuration.
5. Checks if the planned vertex collides with an obstacle, and either returns to Step 1 if needed, or continues if there will not be a collision.
6. Checks if the goal can be spotted (straight line, no obstacles) from the newest vertex. If so, a flag is activated and the algorithm ends.
7. Updates the tree with the newest child vertex.

The RRT is then animated with matplotlib.





