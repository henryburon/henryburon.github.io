---
layout: post
title:  "Internship at NASA Jet Propulsion Laboratory (JPL)"
categories: [C++, ROS Noetic, OpenCV, Eigen]
image: assets/gifs/niosh_robot.gif
featured: false
hidden: false
---

**<span style="color:rgb(0, 30, 80)">C++, ROS Noetic, OpenCV, Eigen</span>**

<p align="center">
   <img src="/assets/images/niosh_terrain.png" alt="SLAM" width="80%" />
</p>

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

I developed a simulation-based, empirical calculation to asses the robot's risk of tipping at any given state, where state is defined by the robot's kinematic configuration and tilt.

The algorithm models the support polygon of the bodies, along with the ground-plane projection of the robot's Center of Mass (yellow circle). As the CoM's projection approaches the edge of the support polygon, the robot's stability decreases. 

#### Robot Path Projection Lines

<p align="center">
   <img src="/assets/gifs/proj_lines.gif" alt="Robot Path Projection Lines" width="49%" />
   <img src="/assets/images/proj_lines.png" alt="Robot Path Projection Lines" width="45%" />
</p>

Path projection lines that generate based on the camera's intrinsic parameters along with the robot's configuration. The lines represent the robot's width. The robot used a two-camera setup and stitched video image. The yaw and pitch of each camera is taken into consideration during the calculation.

#### Configuration Manager


<p align="center">
   <img src="/assets/gifs/config_manager.gif" alt="Robot Path Projection Lines" width="60%" />
   <img src="/assets/images/niosh_kinematics.png" alt="Robot Path Projection Lines" width="29.2%" />
</p>

I developed a configuration manager that allows the robot to efficiently change its kinematic configuration during operation.

The algorithm abstracts the robot's non-intuitive kinematics from the operator and prioritizes a small operational footprint during the transition.