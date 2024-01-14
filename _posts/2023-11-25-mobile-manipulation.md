---
layout: post
title:  "KUKA youBot Mobile Manipulation"
categories: [Robotic Manipulation, Python, CoppeliaSim]
image: assets/gifs/kuka.GIF
featured: true
hidden: true
---

Robotic Manipulation, Python, CoppeliaSim

<iframe width="100%" height="441" src="https://www.youtube.com/embed/ZHFO4J9itbI?si=82YA8ILq-O1_tx1X" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Overview

**Goal**: Write a program that automatically plans a trajectory for a KUKA youBot mobile manipulator as it grasps a block and places it in a desired location.

**GitHub**: [https://github.com/henryburon/mobile-manipulation](https://github.com/henryburon/mobile-manipulation)

**Process**:

1. I wrote three functions to complete this project, which, when combined, generate the final trajectory: 
    * TrajectoryGenerator
    * FeedbackControl
    * NextState
2. **TrajectoryGenerator**
    * Generates the reference trajectory for the end-effector frame {e}.
    * Consists of eight concatenated trajectory segments:
        * A trajectory to move the gripper from its initial configuration to a "standoff" configuration a few cm above the block.
        * A trajectory to move the gripper down to the grasp position
        * Closing of the gripper.
        * A trajectory to move the gripper back up to the "standoff" configuration.
        * A trajectory to move the gripper to a "standoff" configuration above the final configuration.
        * A trajectory to move the gripper to the final configuration of the object.
        * Opening of the gripper.
        * A trajectory to move the gripper back to the "standoff" configuration.

    * **Output**: A representation of the N configurations of the end-effector along the entire eight-segment reference trajectory.
3. **FeedbackControl**
    * Calculates the kinematic task-space feedforward plus feedback control law.
    ![Feedback Control](/assets/images/feedback_control.png)
    * **Output**: The commanded end-effector twist V expressed in the end-effector frame {e}.
4. **NextState**
    * Calculates the robot's configuration at the next time-step using first-order Euler-step.
    * **Output**: A 12-vector representing the configuration of the robot time &Delta;t later.
5. **Combine Functions**
    * Finally, I integrated these three functions, provided the necessary initial and desired final configurations, and generated a .csv file to simulate the KUKA youBot's movement in CoppeliaSim.
6. **Results**
    * I finished by generating three trajectories:
        * **Best**: A well-tuned feedforward-plus-PI controller. Error quickly converged to zero. First clip in the YouTube video.
        ![Best Run](/assets/images/best_run.png)
        * **Overshoot**: A less-well-tuned feedforward-plus-PI controller. Error takes longer to converge to zero.
        ![Overshoot Run](/assets/images/overshoot_run.png)
        * **newTask**: Different initial and final configurations of the block. Second clip in the YouTube video.