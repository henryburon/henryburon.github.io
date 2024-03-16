---
layout: post
title:  "Mobile Exploration Robot with Auxiliary Drone"
categories: [Python, ROS2, Embedded Systems, Multi-Robot System, Autonomous Flight]
image: assets/gifs/terraflight.gif
featured: true
hidden: true
---

Python, ROS2, Embedded Systems, Multi-Robot System, Autonomous Flight

<iframe width="90%" height="441" src="https://www.youtube.com/embed/72QHhtjNWzE?si=BSeyyCFr5hVDhiTT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Overview

Terraflight is a ROS2-controlled **mobile exploration robot** built from the ground up. The custom-built rover carries a drone that can be deployed from the field during operation.  

The robot **live streams video** from both the rover and drone and also uses a LiDAR module to **perform SLAM and map its environment**. The entire system is controlled and monitored from a base station. 

The drone is controlled via teleoperation, but is able to autonomously re-land on the rover. The drone localizes the rover with AprilTags, after which the user can trigger the autonomous landing service.

The robot uses SLAM Toolbox to build a map of its environment.

**GitHub**: [https://github.com/henryburon/terra-flight](https://github.com/henryburon/terra-flight)

<div style="background-color: white; height: 1px;"></div>

## Structure

The robot is built with a Raspberry Pi 4 and is fully controlled using ROS2 in Python.

![control_architecture](/assets/images/terraflight_control_architecture.png)

This block diagram represents a simplified view of the robot's control and communication architecture within the ROS2 framework. It illustrates the flow of data between various components and nodes, including the base station, on-robot components, and visualization tools.

Due to the computational constraints of the onboard Raspberry Pi 4, which functions as the robot's central processing unit, the architecture is designed to delegate computation and data processing to the base station, and reduce the processing responsibilities when that is not possible. This necessity accounts for the relatively low frequency of the robot's camera feed.

<div style="background-color: white; height: 1px;"></div>

## Features

#### Drone
The rover carries a Tello drone as it explores and is capable of deploying it from the field. The drone is controlled via a joystick controller attached to the base station, but is capable of autonomously re-landing on top of the rover's chassis.

<p float="left">
  <img src="/assets/images/not_located1.png" width="235" />
  <img src="/assets/images/located1.png" width="235" /> 
  <img src="/assets/images/not_located2.png" width="235" />
</p>

The drone uses AprilTags to locate the rover. When the autonomous landing service is triggered, the drone follows the transform between itself and the AprilTag, adjusting for its position on the chassis. The drone also displays the time since the last reading. The update status bar trends towards red as the drone goes longer without an update.

<p align="center">
  <img src="/assets/images/located2.png" width="475" />
</p>

The rover can be located from any of its three AprilTags, and the drone adjusts its autonomous re-landing flight plan to ensure it lands on the rover facing forward.

#### SLAM

The robot uses a LiDAR module mounted on the rover to perform SLAM and estimate its pose as it creates a map of its environment.

<img src="/assets/images/slam_map_hallway.png" width="975" />

The robot uses SLAM Toolbox. This map was created in a hallway at Northwestern's Technological Institute.

#### Base Station

The base station, operated via joystick inputs, is the primary control hub issuing movement commands and processing incoming data.

<p align="center">
   <img src="/assets/images/base_station1.jpg" width="645" />
</p>

As long as the base station is connected to both the Tello drone's WiFi network and a network configured to facilitate ROS2 discovery, it can be operated anywhere--inside or outside.

<p align="center">
   <img src="/assets/images/base_station2.png" width="945" />
</p>

The base station node provides a dynamic interface that offers real-time video stream from the rover and drone, while simultaneously building a map as the rover navigates and explores its environment.

## Design

This robot was built and programmed completely from scratch.

#### Electrical

<p align="center">
   <img src="/assets/images/electrical_diagram1.png" width="545" />
</p>