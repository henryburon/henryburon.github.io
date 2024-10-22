---
layout: post
title:  "Internship at NASA Jet Propulsion Laboratory (JPL)"
categories: [C++, ROS Noetic, OpenCV, Eigen]
image: assets/gifs/niosh_robot.gif
featured: yes
hidden: true
---

**<span style="color:rgb(0, 30, 80)">C++, ROS Noetic, OpenCV, Eigen</span>**

<p align="center">
   <img src="/assets/gifs/niosh.gif" alt="NIOSH Robot" width="90%" />
   <br>
   <em>Testing the robot in the Mars Yard.</em>
</p>

*Note: JPL cleared this content for public release.*

# Overview

I worked as a Robotics Software Intern at NASA's Jet Propulsion Laboratory in the Robotic Mobility group (347F) during Summer 2024.

I primarily developed ROS C++ packages to support the control of the NIOSH robot, a mobile robot designed to operate in the hazardous terrain of coal mines.

The robot itself is rather unique--it's made up of two rigid bodies that are joined by a single linkage. The connection points are actuated, meaning the robot can change its kinematic configuration in response to its environment or a specific task. This enables the robot to operate in configurations like side-by-side or leader-follower, each of which has different advantages such as increased stability or a slimmer profile.

<div style="background-color: white; height: 1px;"></div>

# Projects

#### IMU-Based Rollover-Risk Detection

<p align="center">
   <img src="/assets/gifs/rollover_risk.gif" alt="Rollover Risk Detection" width="40%" />
   <img src="/assets/images/rollover_risk.png" alt="Rollover Risk Detection" width="40%" />
</p>

I developed a simulation-based empirical method to asses the robot's risk of tipping in any given state, where the state is defined by its kinematic configuration and the tilt of each body.  

The algorithm models the [support polygon](https://en.wikipedia.org/wiki/Support_polygon){:target="_blank"} of the robot, along with the ground-plane projection of the its center of mass (yellow circle). As the center of mass projection approaches the edge of the support polygon, it indicates a decrease in the robot's stability.

#### Robot Path Projection Lines

<p align="center">
   <img src="/assets/gifs/proj_lines.gif" alt="Robot Path Projection Lines" width="49%" />
   <img src="/assets/images/proj_lines.png" alt="Robot Path Projection Lines" width="45%" />
</p>

I developed an algorithm that generates path projection lines based on the camera's intrinsic parameters and the robot's configuration, with the lines representing the robot's width on the ground plane. The system used a two-camera setup with a stitched video feed, and factors such as each camera's yaw, pitch, field of view (FOV), and height are parameterized in the calculation.

#### Configuration Manager


<p align="center">
   <img src="/assets/gifs/config_manager.gif" alt="Robot Path Projection Lines" width="60%" />
   <img src="/assets/images/niosh_kinematics.png" alt="Robot Path Projection Lines" width="29.2%" />
</p>

I developed a configuration manager that allows the robot to efficiently change its kinematic configuration during operation.

The algorithm abstracts the robot's non-intuitive kinematics from the operator and prioritizes a small operational footprint during the transition.

<p align="center">
   <img src="/assets/images/niosh_terrain.png" alt="SLAM" width="80%" />
</p>