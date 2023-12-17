---
layout: post
title:  "Polyglotbot: A 7 DoF Robot Arm that Writes Translated Text and Speech"
categories: [ROS2, MoveIt, RViz]
image: assets/gifs/polyglotbot.GIF
featured: true
hidden: true
---

ROS2, MoveIt, RViz

<iframe width="100%" height="441" src="https://www.youtube.com/embed/nJnL6ji5LQk?si=367q6W7z9r8T-e2h" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Overview

**Goal**: Develop a ROS2 package that uses a 7 DoF Framka Emika Panda robotic arm to write translated text and speech on a whiteboard.

**GitHub**: [https://github.com/ME495-EmbeddedSystems/final-project-dkoh555](https://github.com/ME495-EmbeddedSystems/final-project-dkoh555)

**Teammates**: Allen Liu, Kassidy Shedd, Megan Black, Damien Koh

**Process**:

1. **Calibrate**
    * The robot uses an Intel Realsense camera to acquire the location of three AprilTags, which, together, are used to constrain the plane of the whiteboard.
    * The distance and orientation of the whiteboard is made public through a custom message type on a ROS2 topic.
    * Using the known transform between the camera link and the robot arm's base link, the updated configuration (Pose) of the whiteboard is extrapolated into the frame of reference of the end-effector and is used to position the pen when writing.

2. **Detect Text**
    * By default, the robot then enters the "Detecting" state, in which it waits for a human to enter the frame and start writing on the whiteboard.
    * Using the YOLOv8 deep learning model, the robot recognizes once a human has entered the frame and then left.
    * Next, the robot uses the PaddleOCR library to detect the text written on the whiteboard and pass it along, without any processing, as a string. The desired language is written as a short language code (e.g. "en" for English) above the unknown word(s).
    * Alternatively, instead of writing a word on the whiteboard, the user could call the *speech* service which activates the microphone as an input. The user then simply speaks out loud, and the word(s) are passed along as a string from there. By default, the desired language for speech is set to English.

3. **Translate Text**
    * The next stage of the pipeline is the translation node which takes in both the desired language and the string of the unknown word(s).
    * The translation node uses the Google Translate API and can translate to and from 50+ languages.
    * The output of this step is a fully-translated string of text.

4. **Text to Waypoints**
    * The *string2waypoints* node uses matplotlib to convert each character to a series of waypoints--passed along as *Point* messages--which can then be followed by the robot arm.

5. **Waypoints to Movement**
    * 