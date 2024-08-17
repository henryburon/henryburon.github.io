---
layout: post
title:  "Computer Vision-Based Basketball Coach"
categories: [OpenCV, Computer Vision, Object Tracking]
image: assets/gifs/basketball_shot.gif
featured: true
hidden: true
---

OpenCV, Computer Vision, Object Tracking

<iframe width="90%" height="441" src="https://www.youtube.com/embed/MW7uQ3kL7gM?si=L13EQ9G4aMUwJl2X" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Overview

This project uses computer vision to analyze, score, and provide feedback on your basketball shot, effectively functioning as a virtual coach. 

The program tracks the ball's trajectory and your body's movement, comparing these to a ground truth (a "perfect" shot). It then calculates a performance score and generates a PDF report with specific feedback.

**Teammate**: Srikanth Schelbert

**GitHub**: [https://github.com/henryburon/cv_basketball_trainer](https://github.com/henryburon/cv_basketball_trainer)

<div style="background-color: white; height: 1px;"></div>

## Contents

1. [Motion Tracking](#motion-tracking)
   - [Basketball Tracking Algorithm](#basketball-tracking-algorithm)
   - [Body Movement Tracking](#body-movement-tracking)
2. [Data Analysis and Scoring](#data-analysis-and-scoring)
3. [Results](#results)

<div style="background-color: white; height: 1px;"></div>

## Motion Tracking

The first step is to collect the data that would later be analyzed, compared, and scored.

#### Basketball Tracking Algorithm

I was primarily responsible for developing the algorithm that identifies and tracks the basketball throughout the video.

```Algorithm:``` apply color mask **>>** find contours **>>** score contours **>>** identify basketball

Applying the color mask and identifying the contours is a straightforward process. The objective is simply to reduce the amount of *potential basketballs* in the frame and therefore make the scoring process easier.

Each contour in the frame is graded on a series of factors, and each of of those grades are weighted and summed up to create a final score for the contour. The contour with the highest score is assumed to be the basketball, and its coordinates are saved into the trajectory array.

The contours are scored on:
* Size
* Squareness
* Distance to previous frame's "basketball"

Each score is then normalized and multiplied by a weight parameter, which can be tuned to give certain factors more or less importance.

<div style="display: flex; justify-content: space-around;">
    <div>
        <img src="/assets/images/cv_bball_contours.png" width="500" />
        <small>Figure 1. Scored contour rectangles. Green outline indicates basketball. Red circle is location in previous frame.</small>
    </div>
    <div>
        <img src="/assets/images/cv_bball_traj.png" width="500" />
        <small>Figure 2. Sample collected basketball trajectory data.</small>
    </div>
</div>


#### Body Movement Tracking

We used MediaPipe to track the body during the shot. 

Specifically, we tracked the motion of the wrist and elbow, as their movement has a high importance in shooting a basketball.

We combined this data with the basketball's motion and were then able to identify the moment the ball was released from the player's hands.

<p align="center">
   <img src="/assets/images/cv_every_traj.png" width="600" />
</p>
<center><small>Figure 3. All trajectories plotted.</small></center>

<div style="background-color: white; height: 1px;"></div>

## Data Analysis and Scoring

<div style="background-color: white; height: 1px;"></div>

## Results



This post is under construction. Please check back soon.
