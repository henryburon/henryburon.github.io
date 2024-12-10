---
layout: post
title:  "Drone-Based Delivery System [In Progress]"
categories: [ROS2, LoRa, Embedded Systems]
image: assets/gifs/drone_delivery.gif
featured: false
hidden: false
---

**<span style="color:rgb(0, 30, 80)">ROS2, LoRa, Embedded Systems</span>**

<p align="center">
   <img src="/assets/images/ugv1.png" width="800" />
</p>
<center><small>TODO: Video Demonstration</small></center>

## Overview  

I built a drone-based delivery system that delivers a package via tether. The package--in the form of a small mobile robot--stabilizes itself during descent, and has the ability to release itself from the tether and drive along the ground towards its destination.

**GitHub Source Code:** [https://github.com/henryburon/drone-delivery](https://github.com/henryburon/drone-delivery)

<div style="background-color: white; height: 1px;"></div>

## Contents

1. [System](#system)
   - [Drone and Winch](#drone-and-winch)
   - [Mobile Package Robot](#mobile-package-robot)
   - [Base Station](#base-station)
2. [Communication Architecture](#communication-architecture)
3. [Design](#design)
   - [Electrical](#electrical)
   - [Mechanical](#mechanical)
4. [Acknowledgements](#acknowledgements)

## System

Quickly delivering small quantities of medical or emergency supplies over distance can be the difference between life or death. Drones are uniquely capable of handling this task. However, those with sufficient payload capacity are often large, dangerous in crowded areas, and ill-suited for operation in constrained environments.

My project aims to address these challenges by offering a safer and more adaptable solution.

The system consists of three main parts:
1. Drone with winch
2. Mobile package robot
3. Base station

#### Drone and Winch

#### Mobile Package Robot

#### Base Station

TODO: Describe each part in detail. Include images.

## Communication Architecture

Reliable communication over distance is critical for this system.

<p align="center">
   <img src="/assets/images/comm_diag_1.png" width="600" />
</p>

TODO: Describe LoRa communication and why I chose it for this application.

## Design

TODO: Sentence or two about overall design.

#### Electrical

<p align="center">
   <img src="/assets/images/elec_diag_1.png" width="600" />
</p>

TODO

#### Mechanical

TODO

## Acknowledgements

TODO: Marno, Davin, Matt