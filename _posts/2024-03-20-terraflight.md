---
layout: post
title:  "Mobile Exploration Robot with Auxiliary Drone"
categories: [Python, ROS2, Embedded Systems, Multi-Robot System, Autonomous Flight]
image: assets/gifs/rover_roaming.gif
featured: true
hidden: true
---

Python, ROS2, Embedded Systems, Multi-Robot System, Autonomous Flight

<iframe width="90%" height="441" src="https://www.youtube.com/embed/72QHhtjNWzE?si=BSeyyCFr5hVDhiTT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Overview

*Terraflight* is a ROS2-controlled mobile exploration robot built from the ground up. The custom-built rover carries a drone that can be deployed from the field during operation.  

The robot streams live video from both the rover and drone, and also uses a LiDAR module to perform SLAM and map its environment. The entire system is controlled and monitored from a base station. 

The drone is primarily teleoperated, but is able to autonomously re-land on the rover. The drone localizes the rover with AprilTags, after which the user is able to call the autonomous landing service with the joystick controller.

**GitHub Source Code**: [https://github.com/henryburon/terra-flight](https://github.com/henryburon/terra-flight)

<div style="background-color: white; height: 1px;"></div>

## Contents

1. [Structure](#structure)
2. [Features](#features)
   - [Drone](#drone)
   - [SLAM](#slam)
   - [Base Station](#base-station)
3. [Design](#design)
   - [Electrical](#electrical)
   - [Mechanical](#mechanical)

<div style="background-color: white; height: 1px;"></div>

## Structure

The robot is built with a Raspberry Pi 4 and is fully controlled using ROS2 in Python.

![control_architecture](/assets/images/terraflight_control_architecture.png)
<small> Figure 1. Block diagram representing a simplified view of the robot's control and communication architecture within the ROS2 framework.</small>

Due to the computational limitations of the onboard Raspberry Pi 4, which functions as the robot's central processing unit, the architecture is designed to delegate computation and data processing to the base station and reduce the Pi's overall processing responsibilities when that is not possible. This necessity accounts for the low frequency of the robot's camera feed (2 Hz).

View the [source code](https://github.com/henryburon/terra-flight) for more information on the ROS2 packages that make up this project.

<div style="background-color: white; height: 1px;"></div>

## Features

#### Drone
The rover carries a [DJI Tello drone](https://store.dji.com/product/tello?vid=38421) on its top platform throughout operation, and is capable of remotely deploying it from the field. The drone is teleoperated via joystick commands from the user, but is capable of autonomously re-landing on the rover after it locates the rover during flight.

<!-- <p align="center">
  <img src="/assets/images/not_located1.png" width="255" />
  <img src="/assets/images/located1.png" width="255" /> 
  <img src="/assets/images/not_located2.png" width="255" />
</p> -->

<p align="center">
   <img src="/assets/images/three_images.png" width="1000" />
</p>
<small>  Figure 2. Drone camera feed as it locates the rover.</small>

The drone uses AprilTags on the right, left, and back of the chassis to localize the rover. Once spotted, the user is able to call the autonomous landing service which directs the drone to follow the most recent transform between itself and the rover, adjusting for the location of the specific tag it saw. The drone also displays the time since the last reading, and the update status bar trends towards red as the drone goes longer without an update.

<p align="center">
  <img src="/assets/images/located2.png" width="475" />
</p>

<small>  Figure 3. Drone locating the rover via the right tag.</small>

The rover can be located from any of its three AprilTags, and the drone adjusts its autonomous re-landing flight plan to ensure it lands on the rover facing forward.

#### SLAM

The robot uses a LiDAR module mounted on the top of the rover to perform 2D SLAM and estimate its pose as it creates a map of the environment.

<p align="center">
<img src="/assets/images/slam_hallway2.png" width="675" />
</p>
<small> Figure 4. Map created in a hallway at Northwestern's Tech Institute.</small>

The robot uses SLAM Toolbox. The odometry tf frame is calculated based on wheel velocities.

#### Base Station

The base station, operated via joystick inputs, is the primary control hub issuing movement commands and processing incoming data. It provides a dynamic interface that offers real-time video stream from the rover and drone, while simultaneously showing the map being built as the robot navigates and explores its environment.

<p align="center">
   <img src="/assets/images/base_station1.jpg" width="645" />
</p>
<small> Figure 5. The base station during operation. Hardware includes a laptop, USB WiFi adapter, and joystick controller.</small>


As long as the base station is connected to both the Tello drone's WiFi network and a network configured to facilitate ROS2 discovery, the robot can be operated anywhere.

<p align="center">
   <img src="/assets/images/base_station2.png" width="945" />
</p>
<small> Figure 6. Screenshot from the base station's interface. Top left: Drone camera. Bottom left: Rover camera. Right: SLAM.</small>

<div style="background-color: white; height: 1px;"></div>

## Design

*Terraflight* was built from scratch.

#### Electrical

<p align="center">
   <img src="/assets/images/electrical_diagram1.png" width="545" />
</p>
<small> Figure 7. Electrical block diagram.</small>

14.8V main bus. The power system allows the user to power the Raspberry Pi 4 individually when providing software updates.

#### Mechanical

<p align="center">
   <img src="/assets/images/mechanical_terraflight.png" width="750" />
</p>
<small> Figure 8. Labeled image of *Terraflight*. </small>

The rover's drive train was inspired by [NASA's Open Source JPL Rover](https://github.com/nasa-jpl/open-source-rover/tree/master/mechanical).