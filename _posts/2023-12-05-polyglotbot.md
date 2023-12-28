---
layout: post
title:  "Polyglotbot: A 7 DoF Robot Arm that Writes Translated Text and Speech"
categories: [ROS2, MoveIt!, RViz]
image: assets/gifs/polyglotbot.GIF
featured: true
hidden: true
---

ROS2, MoveIt!, RViz

<iframe width="100%" height="441" src="https://www.youtube.com/embed/f93vAm1NstA?si=q7lfAgRUdSKHukga" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Overview

**Goal**: Develop a ROS2 package that allows a 7 DoF Framka Emika Panda robotic arm to write translated text and speech on a whiteboard.

**GitHub**: [https://github.com/ME495-EmbeddedSystems/final-project-dkoh555](https://github.com/ME495-EmbeddedSystems/final-project-dkoh555)

**Teammates**: Allen Liu, Kassidy Shedd, Megan Black, Damien Koh

**Process**:

My primary responsibilities for this project included:
* Creating the *apriltags*  and *speech* packages
* Working with the MoveIt! package to help convert waypoints to movement

***apriltags* Package**

The purpose of this package is to localize the AprilTags on the whiteboard, transform their 3D-locations into the robot's base frame (panda_link0), and publish these coordinates so they can be accessed by the node used for movement.

The *GetAprilTags* node in the package creates a static transformation that links the camera to robot base, looks up transforms between the tags and camera, constructs transformation matrices from Quaternions, and publishes the coordinates using a custom message type.

***speech* Package**

The purpose of this package is to provide the speech-to-text functionality, as an alternative to the default text-to-text.

The node, *ListenSpeech*, is triggered by a service call. The package makes use of PyAudio and the speech_recognition library. By default, it translates the spoken language to English, but this can be changed with a different language code.

The service call activates the *LISTENING* state, which listens, then continues the pipeline in the *RECOGNIZING* state.

```python
if self.state == State.LISTENING:
            with sr.Microphone(device_index=self.index) as source: # detects presence of external microphone
                self.get_logger().info("Say something...")
                self.recognizer.adjust_for_ambient_noise(source) # adjusts for ambient noise
                self.audio = self.recognizer.listen(source) # by default, it listens until it detects a pause

            self.state = State.RECOGNIZING
```

**Waypoints to Movement**:

Each letter that the robot writes begins as a series of waypoints (2D-coordinates) that must be converted into physical movement by the robot arm. To do this, we created a custom *move_robot* Python wrapper to plan and execute paths using the MoveIt! MoveGroup and ExecuteTrajectory Action Clients, respectively. We make use of MoveIt!'s *compute_cartesian_path* service to follow a smooth and stable path. 


**How it Works**:

1. **Calibrate**
    * The robot uses an Intel Realsense camera to acquire the location of three AprilTags, which, together, are used to constrain the plane of the whiteboard.
    * The distance and orientation of the whiteboard is made public through a custom message type on a ROS2 topic.
    * Using the known transformation between the camera link and the robot arm's base link, the updated configuration (Pose) of the whiteboard is extrapolated into the frame of reference of the end-effector and is used to position the pen when writing.

2. **Detect Text**
    * By default, the robot then enters the "Detecting" state, in which it waits for a human to enter the frame and start writing on the whiteboard.
    * Using the YOLOv8 deep learning model, the robot recognizes once a human has entered the frame and then left, after which the next step commences.
    * The robot then uses the PaddleOCR library to detect the text written on the whiteboard and pass it along, without any processing, as a string. The desired language is written on the whiteboard as a short language code above the unknown word(s) (e.g. "en" for English).
    * Alternatively, instead of writing a word on the whiteboard, the user could call the *speech* service which activates the microphone as an input. The user then simply speaks out loud, and their word(s) are passed along as a string from there. By default, the desired language for speech is set to English.

3. **Translate Text**
    * The next stage in the pipeline is the *translator* node which takes in both the desired language and the string of the unknown word(s).
    * The translation node uses the Google Translate API and can translate to and from 50+ languages.
    * This step outputs a fully-translated string of text.

4. **Text to Waypoints**
    * The *string2waypoints* node uses matplotlib to convert each character to a series of waypoints--passed along as a series of *Point* messages--which can then be followed by the robot arm.

5. **Waypoints to Movement**
    * Finally, the robot uses the *write_letters* package to convert the waypoints to movement and draw the letters on the board.
    * This package makes use of our custom *move_robot* Python wrapper to plan and execute robot arm paths using the MoveIt! MoveGroup and ExecuteTrajectory Action Clients, respectively.
    * We make use of MoveIt!'s *compute_cartesian_path* service so as to follow a more direct and stable path when writing the letters, as opposed to *compute_ik*.

![The Robot Is Cool](/assets/images/the_robot_is_cool.jpeg)