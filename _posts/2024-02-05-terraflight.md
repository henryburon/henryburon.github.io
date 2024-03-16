---
layout: post
title:  "Mobile Exploration Robot with Auxiliary Drone"
categories: [Python, ROS2, Embedded Systems]
image: assets/images/terraflight_1.png
featured: true
hidden: true
---

Python, ROS2, Embedded Systems

<iframe width="90%" height="441" src="https://www.youtube.com/embed/72QHhtjNWzE?si=BSeyyCFr5hVDhiTT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Overview

Terraflight is a ROS2-controlled **mobile exploration robot** build from the ground up. The custom-built rover carries a drone that can be deployed from the field during operation.  

The robot **live streams video** from both the rover and drone and also uses a LiDAR module to **perform SLAM and map its environment**. The entire system is controlled and monitored from a base station. 

The drone is controlled via teleoperation, but is able to autonomously re-land on the rover. The drone localizes the rover with AprilTags, after which the user can trigger the autonomous landing service.

The robot uses SLAM Toolbox to build a map of its environment.

**GitHub**: [https://github.com/henryburon/terra-flight](https://github.com/henryburon/terra-flight)

<div style="background-color: white; height: 1px;"></div>

## Structure

The robot is built with a Raspberry Pi 4 and is fully controlled using ROS2 in Python.

![control_architecture](/assets/images/terraflight_control_architecture.png)

This block diagram represents a simplified view of the robot's control and communication architecture within the ROS2 framework. It illustrates the flow of data between various components and nodes, including the base station, on-robot components, and visualization tools.

Due to the computational constraints of the onboard Raspberry Pi 4, which functions as the robot's central processing unit, the architecture is designed to delegate computation and data processing to the base station, and reduce the processing responsibilities when not possible. This necessity accounts for the relatively low frequency of the robot's camera feed.

<div style="background-color: white; height: 1px;"></div>

## Features

#### Drone
The rover carries a Tello drone as it explores and is capable of deploying it from the field. The drone is controlled via a joystick controller attached to the base station, but is capable of autonomously re-landing on the rover's roof.

#### SLAM


#### Base Station