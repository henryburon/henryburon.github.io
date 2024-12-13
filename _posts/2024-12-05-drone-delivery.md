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
4. [Acknowledgements](#acknowledgements)

## System

Quickly delivering small quantities of medical or emergency supplies over distance can be the difference between life or death. Drones are uniquely capable of handling this task. However, those with sufficient payload capacity are often large, dangerous in crowded areas, and ill-suited for operation in constrained environments.

My project aims to address these challenges by offering a safer and more adaptable solution.

The system consists of three main parts:
1. Drone and winch
2. Mobile package robot
3. Base station

#### Drone and Winch

My system uses a heavy-payload drone, along with a custom-built winch. The drone was built by <a href="https://marnonel6.github.io/projects/0-autonomous-px4-drone" target="_blank">Marno Nel</a>. The drone's size (specifically, the space underneath) and lifting capacity provide the primary constraints for this project.

The winch, fixed to the underbelly of the drone, allows the robot to be deployed--lowered with a tether--from approximately 10m in the air. The winch system is controlled and powered by the drone's existing components, however it communicates with the base station via an added LoRa module.

<p align="center">
   <img src="/assets/images/winch_cad.png" width="500" />
   <br>
   <em>Custom winch design in CAD</em>
</p>

#### Mobile Package Robot

The mobile robot carries a small quantity of medical or emergency supplies. It is lowered from the drone by tether, and can detach itself from this tether without human assistance. Once on the ground, it can drive closer to the target, taking advantage of its small form factor to enter constrained and crowded environments. The side-mounted propellers can be used to stabilize itself during descent, allowing the robot to safely deliver the medical supplies in a range of environments.

<p align="center">
   <img src="/assets/images/droid_closed.jpg" width="45%" />
   <img src="/assets/images/droid_open.jpg" width="45%" />
   <br>
   <em>Mobile package robot</em>
</p>

<p align="center">
   <img src="/assets/gifs/tether_mechanism.gif" width="500" />
   <br>
   <em>Tether mechanism in action</em>
</p>

<p align="center">
   <img src="/assets/gifs/robot_stabilization.gif" width="700" />
   <br>
   <em>Active stabilization demo</em>
</p>

#### Base Station

The base station simply consisted of a LoRa module connected to a computer. It allows the operator to receive status updates in real-time and send commands.

<p align="center">
   <img src="/assets/images/dd_base_station.jpg" width="500" />
   <br>
   <em>Base Station (R)</em>
</p>


## Communication Architecture

Reliable communication over distance is critical for a drone-based robotic delivery system.

<p align="center">
   <img src="/assets/images/comm_diag_1.png" width="600" />
</p>

LoRa, short for Long Range, is a low-power, wide-area network communication protocol designed for wireless communication over long distances.

It operates in sub-gigahertz radio frequency bands (i.e. 433 MHz, 915 MHz) and is well-suited for low-power, low-throughput applications. LoRa achieves this using chirp spread spectrum (CSS) modulation, a frequency spreading method that allows for better resistance to interference and signal degradation over long distances. For these reasons, I used [LoRa modules](https://www.adafruit.com/product/3072) to facilitate the communication between the different parts of the system.


## Design

I built the mobile package robot, the winch system, and the base station from scratch.

<p align="center">
   <img src="/assets/images/elec_diag_1.png" width="600" />
</p>

The winch system electronics consist of a high-torque servo motor and LoRa module. It is connected to the drone's power supply.

## Acknowledgements

Thanks to Matt, Davin, Shail, and Marno for your help in this project.