---
layout: post
title:  "Mobile Exploration Robot with Auxiliary Drone [In Progress]"
categories: [Python, ROS2, Embedded Systems]
image: assets/images/terraflight_1.png
featured: true
hidden: true
---

Python, ROS2, Embedded Systems

![terraflight1](/assets/gifs/terraflight_1.gif)

## Overview [In Progress]

I am in the process of building a mobile exploration robot from the ground up. The robot is designed to stream live video to a base station (a laptop) and deploy an auxiliary drone from its top platform. Upon the drone's deployment, the live video feed switches to the drone's camera.

**GitHub**: [https://github.com/henryburon/terra-flight](https://github.com/henryburon/terra-flight)


<div style="background-color: white; height: 1px;"></div>


The robot is currently operated via teleoperation. However, plans are underway to incorporate a LiDAR module, which will enable the robot to have autonomous path planning capabilities.

The robot is powered by a Raspberry Pi 4 and is fully controlled using ROS2.

![terraflight2](/assets/images/terraflight_2.jpg)