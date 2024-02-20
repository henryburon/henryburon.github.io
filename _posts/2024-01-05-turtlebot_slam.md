---
layout: post
title:  "SLAM from Scratch (C++) [Current]"
categories: [C++, ROS2, Unit Testing, CMake]
image: assets/gifs/red_slam.gif
featured: true
hidden: true
---

C++, ROS2, Unit Testing, CMake

![SLAM](/assets/images/slam_env.png)

# Overview

I am currently implementing a SLAM algorithm from scratch through several ROS2 packages and a custom C++ library.

**GitHub**: [https://github.com/henryburon/ekf-slam-turtlebot](https://github.com/henryburon/ekf-slam-turtlebot)

**`turtlelib`** is a C++ library for handling SE(2) math and other turtlebot-related calculations.  
**`nuturtle_description`** is a ROS2 package that dispalys turtlebot3 models in RViz.  
**`nusim`** is a ROS2 package that provides a simulated environment for the robots.  


## Details

<div style="background-color: white; height: 1px;"></div>


**`turtlelib`**

Designed to facilitate geometric computations and two-dimensional rigid body transformations. Provided functionalities include:  
* Point, vector, and twist manipulation
* SVG-based visualization
* Operator overloading

All functions are tested using the Catch2 unit test framework.

<div style="background-color: white; height: 1px;"></div>

**`nuturtle_description`**    

Builds turtlebot models with imported meshes in URDF; displays in RViz. Option to display all four models, or just one.

Launch with:

```
ros2 launch nuturtle_description load_one.launch.py
```

<div style="background-color: white; height: 1px;"></div>

**`nusim`**  

ROS2 C++ node that provides a simulated environment for the robot. Launches RViz and displays walls, obstacles, and a single red robot. User can configure launch parameters in basic_world.yaml.

## Future Work

This project is currently in progress. I will soon be finishing the EKF SLAM algorithm and implementing it on a robot in the physical world.