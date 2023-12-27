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


