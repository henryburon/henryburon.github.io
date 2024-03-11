---
layout: post
title:  "Mobile Exploration Robot with Auxiliary Drone [In Progress]"
categories: [Python, ROS2, Embedded Systems]
image: assets/images/terraflight_1.png
featured: true
hidden: true
---

Python, ROS2, Embedded Systems

![terraflight1](/assets/gifs/terraflight_1.gif)  
First differential-driving test.

## Overview [In Progress]

<u>This post will be completed on March 16, 2024.</u>

I am in the process of building a **mobile exploration robot** from the ground up. The robot has a variety of sensing capabilities, including an IntelRealsense Depth camera and a LiDAR module, which, together, allow it to live stream video and build a map of its environment with slam_toolbox.

In addition, the robot carries a drone on its top platform, which it is able to deploy from the field. The drone, which also live streams video, is controlled via teleoperation, but is able to autonomously land itself on the mobile chassis which it localizes using AprilTags.

**GitHub**: [https://github.com/henryburon/terra-flight](https://github.com/henryburon/terra-flight)


<div style="background-color: white; height: 1px;"></div>

The robot is built with a Raspberry Pi 4 and is fully controlled using ROS2 in Python.

![terraflight1](/assets/images/terraflight_slam_1.png)
Preliminary image from the base station. View a frame from the rover's live stream and the map it has started to build. The top "No Image" is the drone's feed, which was not flying at the time. Note: this was in a room with many chairs and table legs.  
  

![terraflight2](/assets/images/terraflight_2.jpg)
Wiring and electronics.