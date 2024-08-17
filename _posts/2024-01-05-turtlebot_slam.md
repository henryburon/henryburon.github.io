---
layout: post
title:  "Extended Kalman Filter SLAM from Scratch"
categories: [C++, ROS2, Unit Testing, CMake]
image: assets/gifs/red_slam.gif
featured: false
hidden: false
---

C++, ROS2, Unit Testing, CMake

<!-- ![SLAM](/assets/images/slam_env.png) -->

![SLAM](/assets/images/slam_img.png)

# Overview


I implemented an Extended Kalman filter (EKF) SLAM algorithm from scratch through several ROS2 packages and a custom C++ library.

In the above image, there are three simulated turtlebots. The **red** turtlebot represents the ground truth, the **blue** is the odometry estimate, and the **green** is the estimate with SLAM. As can be seen, the estimate with SLAM performs much better than the estimate with just odometry.

**GitHub**: [https://github.com/ME495-Navigation/slam-project-henryburon](https://github.com/ME495-Navigation/slam-project-henryburon)

**`turtlelib`** is a C++ library for handling SE(2) math and other turtlebot-related calculations.  
**`nusim`** is a ROS2 package that provides a simulated environment for the robots.  
**`nuturtle_description`** is a ROS2 package that dispalys turtlebot3 models in RViz.  
**`nuturtle_control`** controls the robot in simulation and the physical world.  
**`nuslam`** implements EKF SLAM to estimate the robot's pose.  

<!-- ## Extended Kalman Filter SLAM

EKF SLAM estimates the robot's pose (position and orientation) as it constructs a map of its environment.

The algorithm works by -->




## Implementation Details

<div style="background-color: white; height: 1px;"></div>

**`turtlelib`**

Designed to facilitate geometric computations and two-dimensional rigid body transformations. Provided functionalities include:  
* Point, vector, and twist manipulation
* SVG-based visualization
* Operator overloading

All functions are tested using the Catch2 unit test framework.

<div style="background-color: white; height: 1px;"></div>

**`nusim`**  

ROS2 C++ node that provides a simulated environment for the robot. Launches RViz and displays walls, obstacles, and a single red robot. User can configure launch parameters in basic_world.yaml.

<div style="background-color: white; height: 1px;"></div>

**`nuturtle_description`**    

Builds turtlebot models with imported meshes in URDF; displays in RViz. Option to display all four models, or just one.

<div style="background-color: white; height: 1px;"></div>

**`nuturtle_control`**

Computes and publishes the odometry the turtlebot based on the joint states of its wheels. Controls movement of the turtlebot robot based on velocity commands and sensor data from the robot's wheel encoders. 

<div style="background-color: white; height: 1px;"></div>

**`nuslam`**

Implements EKF SLAM for the turtlebot, a differential-drive robot. The node estimates the robot's pose and the positions of obstacles in the environment by combining odometry data from the robot's wheel encoders with simulated sensor data from obstacles in the environment.

The estimates odometry, path, and obstacles are published for visualization.