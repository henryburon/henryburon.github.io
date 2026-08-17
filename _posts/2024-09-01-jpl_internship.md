---
layout: post
title:  "Internship at NASA Jet Propulsion Laboratory (JPL)"
categories: [C++, ROS Noetic, OpenCV, Eigen]
thumbnail: assets/gifs/niosh_robot.mp4
description: "Robotics software for hazardous-terrain navigation in JPL's Robotic Mobility group, cleared for public release."
featured: true
featured_order: 4
---


<figure>
  <video poster="/assets/gifs/niosh.jpg" autoplay loop muted playsinline preload="metadata" aria-label="NIOSH Robot">
    <source src="/assets/gifs/niosh.mp4" type="video/mp4">
  </video>
  <figcaption>Testing the robot in the Mars Yard.</figcaption>
</figure>

*Note: JPL cleared this content for public release.*

See story on the MSR website: <a href="https://www.mccormick.northwestern.edu/robotics/inside-our-program/stories/2024/navigating-hazardous-terrain-at-nasas-jet-propulsion-laboratory.html" target="_blank">Navigating Hazardous Terrain at NASA's Jet Propulsion Laboratory</a>

## Overview

I worked as a Robotics Software Intern at NASA's Jet Propulsion Laboratory in the Robotic Mobility group (347F) during Summer 2024.

I primarily developed ROS C++ packages to support the control of the NIOSH robot, a mobile robot designed to operate in the hazardous terrain of coal mines.

The robot itself is rather unique--it's made up of two rigid bodies that are joined by a single linkage. The connection points are actuated, meaning the robot can change its kinematic configuration in response to its environment or a specific task. This enables the robot to operate in configurations like side-by-side or leader-follower, each of which has different advantages such as increased stability or a slimmer profile.

---

## Projects

#### IMU-Based Rollover-Risk Detection

<p align="center">
   <video poster="/assets/gifs/rollover_risk.jpg" autoplay loop muted playsinline preload="metadata" aria-label="Rollover Risk Detection">
    <source src="/assets/gifs/rollover_risk.mp4" type="video/mp4">
  </video>
   <img src="/assets/images/rollover_risk.png" alt="Rollover Risk Detection" />
</p>

I developed a simulation-based empirical method to asses the robot's risk of tipping in any given state, where the state is defined by its kinematic configuration and the tilt of each body.  

The algorithm models the [support polygon](https://en.wikipedia.org/wiki/Support_polygon){:target="_blank"} of the robot, along with the ground-plane projection of the its center of mass (yellow circle). As the center of mass projection approaches the edge of the support polygon, it indicates a decrease in the robot's stability.

#### Robot Path Projection Lines

<p align="center">
   <video poster="/assets/gifs/proj_lines.jpg" autoplay loop muted playsinline preload="metadata" aria-label="Robot Path Projection Lines">
    <source src="/assets/gifs/proj_lines.mp4" type="video/mp4">
  </video>
   <img src="/assets/images/proj_lines.png" alt="Robot Path Projection Lines" />
</p>

I developed an algorithm that generates path projection lines based on the camera's intrinsic parameters and the robot's configuration, with the lines representing the robot's width on the ground plane. The system used a two-camera setup with a stitched video feed, and factors such as each camera's yaw, pitch, field of view (FOV), and height are parameterized in the calculation.

#### Configuration Manager


<p align="center">
   <video poster="/assets/gifs/config_manager.jpg" autoplay loop muted playsinline preload="metadata" aria-label="Robot Path Projection Lines">
    <source src="/assets/gifs/config_manager.mp4" type="video/mp4">
  </video>
   <img src="/assets/images/niosh_kinematics.png" alt="Robot Path Projection Lines" width="29.2%" />
</p>

I developed a configuration manager that allows the robot to efficiently change its kinematic configuration during operation.

The algorithm abstracts the robot's non-intuitive kinematics from the operator and prioritizes a small operational footprint during the transition.

<figure>
  <img src="/assets/images/niosh_terrain.jpg" alt="SLAM" />
</figure>