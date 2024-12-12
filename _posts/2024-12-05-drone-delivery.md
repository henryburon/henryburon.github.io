---
layout: post
title:  "Drone-Based Delivery System"
categories: [ROS2, LoRa, Embedded Systems]
image: assets/gifs/drone_delivery.gif
featured: false
hidden: false
---

**<span style="color:rgb(0, 30, 80)">ROS2, LoRa, Embedded Systems</span>**

<iframe width="90%" height="441" src="https://www.youtube.com/embed/1bbPotnd48Q?si=MclOsE42RdgTv6PT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Overview  

I built a drone-based delivery system that delivers a package via tether. The package--in the form of a small mobile robot--stabilizes itself during descent, and has the ability to release itself from the tether and drive along the ground towards its destination.

<p align="center">
  <img src="/assets/images/situational_diagram.png" width="550" />
</p>
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


Mention that drone was built by Marno.