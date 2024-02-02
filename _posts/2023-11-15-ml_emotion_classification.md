---
layout: post
title:  "Machine Learning Emotion Classification"
categories: [Machine Learning, Python, Image Processing]
image: assets/images/ml_emotion_classification.png
featured: true
hidden: true
---

Machine Learning, Python, Image Processing

<iframe width="100%" height="441" src="https://www.youtube.com/embed/CJrl6uvsziY?si=CeYyhI1T_yrKK-e9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Overview

**Goal**: Create a robust emotion classification pipeline by developing a machine learning algorithm capable of classifying facial images based on their depicted emotion.

**GitHub**: [https://github.com/henryburon/ml-emotion-classification](https://github.com/henryburon/ml-emotion-classification)

**Process**:

1. **Load, Process, and Store Images**:
    * I loaded several thousand 48x48 grayscale training and testing images from seven different emotion categories, converted them to numpy arrays, and normalized the pixel values.
    * Kaggle Dataset: [https://www.kaggle.com/datasets/ananthu017/emotion-detection-fer](https://www.kaggle.com/datasets/ananthu017/emotion-detection-fer)
2. **Apply Histogram of Oriented Gradients (HOG) Feature Extraction**:
    * Facial images are heavily influenced by subtle changes in facial shape and the presence of edges (e.g. raised eyebrows, open mouth). HOG excels at capturing these features by computing the oriented gradients within localized regions of the image. In addition, HOG is known for its robustness in variations in lighting and contrast, which are common challenges in image processing. Finally, implementing HOG is relatively efficient compared to other sophisticated feature extraction methods, which was important in my project, considering the number of images I needed to process.
    ![HOG Image Example](/assets/images/hog_image_example.png)
3. **Assign Labels to Data:**
    * I assigned seven labels to the data, corresponding to seven different emotion classes:
    [0] angry, [1] happy, [2] neutral, [3] sad, [4] disgusted, [5] fearful, [6] surprised
4. **Train Model**:
    * I trained the linear regression model, made predictions, obtained the classification report, and saved the trained model for further use, achieving an accuracy of up to 77%.
5. **Improving Model Accuracy**:
    * I took several steps to increase the accuracy of the model by improving the feature extraction process. For example, through experimentation, I optimized the number of orientations, block size, and cell size, all with the goal of enhancing the granularity and thereby descriptive power of the extracted features. I also investigated different normalization techniques, such as min-max scaling, although this did not discernably affect the results.
    * Looking ahead, instead of engineering the features myself (i.e. HOG), I intend to try more feature learning techniques--automatic feature engineering--as this would empower the machine to autonomously learn more effective representations from the raw data.