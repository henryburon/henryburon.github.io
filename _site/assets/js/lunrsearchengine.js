
var documents = [{
    "id": 0,
    "url": "http://localhost:4000/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "http://localhost:4000/_pages/About/",
    "title": "",
    "body": "   Current M. S. in Robotics student at Northwestern University.   Skilled in ROS/ROS2, computer vision, machine learning, and robotic manipulation.   Interested in autonomous systems, SLAM, path planning, and mobile robots. Education:         Sep. 2023 - Dec. 2024     M. S. in Robotics             Sep. 2019 - May 2023     B. S. in Engineering Physics   Contact:   henryburon2024@u. northwestern. edu  GitHub  LinkedIn   "
    }, {
    "id": 2,
    "url": "http://localhost:4000/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "http://localhost:4000/",
    "title": "Home",
    "body": "      Projects:                                                                                                         Polyglotbot: A 7 DoF Robot Arm that Writes Translated Text and Speech              :       ROS2, MoveIt!, RViz:                               05 Dec 2023        &lt;/span&gt;                                                                                                                                   KUKA youBot Mobile Manipulation              :       Robotic Manipulation, Python, CoppeliaSim:                               25 Nov 2023        &lt;/span&gt;                                                                                                                                   Machine Learning Emotion Classification              :       Machine Learning, Image Processing, Feature Extraction:                               15 Nov 2023        &lt;/span&gt;                                                                                                                                   Computer Vision-Controlled Robot Arm              :       OpenCV, Python, Transforms:                               15 Sep 2023        &lt;/span&gt;                                                                                                                                   Rapidly-Exploring Random Tree (RRT)              :       Path Planning, Python, RRT:                               10 Sep 2023        &lt;/span&gt;                                                                                                                                   Unmanned Electric Race Boat              :       ArduPilot, Electronics, Autonomous Systems:                               25 Jun 2023        &lt;/span&gt;                                        "
    }, {
    "id": 4,
    "url": "http://localhost:4000/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 5,
    "url": "http://localhost:4000/polyglotbot/",
    "title": "Polyglotbot: A 7 DoF Robot Arm that Writes Translated Text and Speech",
    "body": "2023/12/05 - ROS2, MoveIt!, RViz Overview: Goal: Develop a ROS2 package that allows a 7 DoF Framka Emika Panda robotic arm to write translated text and speech on a whiteboard. GitHub: https://github. com/ME495-EmbeddedSystems/final-project-dkoh555 Teammates: Allen Liu, Kassidy Shedd, Megan Black, Damien Koh Process: My primary responsibilities for this project included:  Creating the apriltags and speech packages Working with the MoveIt! package to help convert waypoints to movementapriltags Package The purpose of this package is to localize the AprilTags on the whiteboard, transform their 3D-locations into the robot’s base frame (panda_link0), and publish these coordinates so they can be accessed by the node used for movement. The GetAprilTags node in the package creates a static transformation that links the camera to robot base, looks up transforms between the tags and camera, constructs transformation matrices from Quaternions, extracts the coordinate values, and publishes them using a custom message type. In the image below, the AprilTags have been localized and transformed into the robot’s frame. speech Package The purpose of this package is to provide the speech-to-text functionality, as an alternative to the default text-to-text. The node, ListenSpeech, is triggered by a service call. The package makes use of PyAudio and the speech_recognition library. By default, it translates the spoken language to English, but this can be changed with a different language code. The service call activates the LISTENING state, which listens, then continues the node’s pipeline in the RECOGNIZING state. 1234567if self. state == State. LISTENING:      with sr. Microphone(device_index=self. index) as source: # detects presence of external microphone        self. get_logger(). info( Say something. . .  )        self. recognizer. adjust_for_ambient_noise(source) # adjusts for ambient noise        self. audio = self. recognizer. listen(source) # by default, it listens until it detects a pause      self. state = State. RECOGNIZINGWaypoints to Movement Each letter that the robot writes begins as a series of waypoints (2D-coordinates) that must be converted into physical movement by the robot arm. To do this, we created a custom move_robot Python API to plan and execute paths using the MoveIt! MoveGroup and ExecuteTrajectory Action Clients, respectively. We make use of MoveIt!’s compute_cartesian_path service to follow a smooth and stable path. See the move_robot API: move_robot The API plans collision-free paths and allows the user to send the end-effector to a desired configuration with code as simple as: 12345678self. comm_count = 0 # self. comm_count is incremented after each successful execution of a position commandself. pos_list = [      Point(x=0. 2, y=0. 4, z=0. 2)] # desired locationself. ori_list = [      Quaternion(x=1. 0, y=0. 0, z=0. 0, w=0. 0)] # desired orientationself. robot. find_and_execute(          point=self. pos_list[self. comm_count],           quat=self. ori_list[self. comm_count],)How it Works:  Calibrate     The robot uses an Intel Realsense camera to acquire the location of three AprilTags, which, together, are used to constrain the plane of the whiteboard.    The distance and orientation of the whiteboard is made public through a custom message type on a ROS2 topic.    Using the known transformation between the camera link and the robot arm’s base link, the updated configuration (Pose) of the whiteboard is extrapolated into the frame of reference of the end-effector and is used to position the pen when writing.     Detect Text     By default, the robot then enters the “Detecting” state, in which it waits for a human to enter the frame and start writing on the whiteboard.    Using the YOLOv8 deep learning model, the robot recognizes once a human has entered the frame and then left, after which the next step commences.    The robot then uses the PaddleOCR library to detect the text written on the whiteboard and pass it along, without any processing, as a string. The desired language is written on the whiteboard as a short language code above the unknown word(s) (e. g. “en” for English).    Alternatively, instead of writing a word on the whiteboard, the user could call the speech service which activates the microphone as an input. The user then simply speaks out loud, and their word(s) are passed along as a string from there. By default, the desired language for speech is set to English.     Translate Text     The next stage in the pipeline is the translator node which takes in both the desired language and the string of the unknown word(s).    The translation node uses the Google Translate API and can translate to and from 50+ languages.    This step outputs a fully-translated string of text.     Text to Waypoints     The string2waypoints node uses matplotlib to convert each character to a series of waypoints–passed along as a series of Point messages–which can then be followed by the robot arm.     Waypoints to Movement     Finally, the robot uses the write_letters package to convert the waypoints to movement and draw the letters on the board.    This package makes use of our custom move_robot Python API to plan and execute robot arm paths using the MoveIt! MoveGroup and ExecuteTrajectory Action Clients, respectively.    We make use of MoveIt!’s compute_cartesian_path service so as to follow a more direct and stable path when writing the letters, as opposed to compute_ik.    "
    }, {
    "id": 6,
    "url": "http://localhost:4000/mobile-manipulation/",
    "title": "KUKA youBot Mobile Manipulation",
    "body": "2023/11/25 - Robotic Manipulation, Python, CoppeliaSim Overview: Goal: Write a program that automatically plans a trajectory for a KUKA youBot mobile manipulator as it grasps a block and places it in a desired location. GitHub: https://github. com/henryburon/mobile-manipulation Process:  I wrote three functions to complete this project, which, when combined, generate the final trajectory:     TrajectoryGenerator   FeedbackControl   NextState    TrajectoryGenerator     Generates the reference trajectory for the end-effector frame {e}.    Consists of eight concatenated trajectory segments:         A trajectory to move the gripper from its initial configuration to a “standoff” configuration a few cm above the block.      A trajectory to move the gripper down to the grasp position     Closing of the gripper.      A trajectory to move the gripper back up to the “standoff” configuration.      A trajectory to move the gripper to a “standoff” configuration above the final configuration.      A trajectory to move the gripper to the final configuration of the object.      Opening of the gripper.      A trajectory to move the gripper back to the “standoff” configuration.           Output: A representation of the N configurations of the end-effector along the entire eight-segment reference trajectory.     FeedbackControl     Calculates the kinematic task-space feedforward plus feedback control law.    Output: The commanded end-effector twist V expressed in the end-effector frame {e}.     NextState     Calculates the robot’s configuration at the next time-step using first-order Euler-step.    Output: A 12-vector representing the configuration of the robot time Δt later.     Combine Functions     Finally, I integrated these three functions, provided the necessary initial and desired final configurations, and generated a . csv file to simulate the KUKA youBot’s movement in CoppeliaSim.     Results     I finished by generating three trajectories:         Best: A well-tuned feedforward-plus-PI controller. Error quickly converged to zero. First clip in the YouTube video.       Overshoot: A less-well-tuned feedforward-plus-PI controller. Error takes longer to converge to zero.       newTask: Different initial and final configurations of the block. Second clip in the YouTube video.           "
    }, {
    "id": 7,
    "url": "http://localhost:4000/ml_emotion_classification/",
    "title": "Machine Learning Emotion Classification",
    "body": "2023/11/15 - Machine Learning, Image Processing, Feature Extraction Overview: Goal: Create a robust emotion classification pipeline by developing a machine learning algorithm capable of classifying facial images based on their depicted emotion. GitHub: https://github. com/henryburon/ml-emotion-classification Process:  Load, Process, and Store Images:     I loaded several thousand 48x48 grayscale training and testing images from seven different emotion categories, converted them to numpy arrays, and normalized the pixel values.    Kaggle Dataset: https://www. kaggle. com/datasets/ananthu017/emotion-detection-fer    Apply Histogram of Oriented Gradients (HOG) Feature Extraction:     Facial images are heavily influenced by subtle changes in facial shape and the presence of edges (e. g. raised eyebrows, open mouth). HOG excels at capturing these features by computing the oriented gradients within localized regions of the image. In addition, HOG is known for its robustness in variations in lighting and contrast, which are common challenges in image processing. Finally, implementing HOG is relatively efficient compared to other sophisticated feature extraction methods, which was important in my project, considering the number of images I needed to process.     Assign Labels to Data:     I assigned seven labels to the data, corresponding to seven different emotion classes: [0] angry, [1] happy, [2] neutral, [3] sad, [4] disgusted, [5] fearful, [6] surprised    Train Model:     I trained the linear regression model, made predictions, obtained the classification report, and saved the trained model for further use, achieving an accuracy of up to 77%.     Improving Model Accuracy:     I took several steps to increase the accuracy of the model by improving the feature extraction process. For example, through experimentation, I optimized the number of orientations, block size, and cell size, all with the goal of enhancing the granularity and thereby descriptive power of the extracted features. I also investigated different normalization techniques, such as min-max scaling, although this did not discernably affect the results.    Looking ahead, instead of engineering the features myself (i. e. HOG), I intend to try more feature learning techniques–automatic feature engineering–as this would empower the machine to autonomously learn more effective representations from the raw data.    "
    }, {
    "id": 8,
    "url": "http://localhost:4000/pen_thief/",
    "title": "Computer Vision-Controlled Robot Arm",
    "body": "2023/09/15 - OpenCV, Python, Transforms Overview: Goal: Use the PincherX 100 robot arm to autonomously grab a purple pen. Github: https://github. com/henryburon/pen-thief Process:  Detect Location of the Purple Pen     First, I used the RGB image from an Intel RealSense camera to create an HSV mask that filtered out every color except purple.     Identify Contour and Calculate Centroid     I added contours around the selected pixels and found the 2D coordinate of the centroid of the largest contour, which I assumed to be the pen.     Align the Images     I then aligned the camera’s Depth Map with the RGB Image and found the pen’s 3D coordinates in the camera’s reference frame.     Transform to Robot Frame     I converted these coordinates to be in the robot arm’s frame, given its 90° rotation and fixed offset.     Command the End-Effector     Finally, I used the InterbotixManipulatorXS Python package to move the end-effector and gripper to the desired coordinate and position.    "
    }, {
    "id": 9,
    "url": "http://localhost:4000/path_planning/",
    "title": "Rapidly-Exploring Random Tree (RRT)",
    "body": "2023/09/10 - Path Planning, Python, RRT Overview: Goal: Implement the RRT path-planning algorithm. GitHub: https://github. com/henryburon/path-planning/tree/main/path_planning Process: This is an implementation of the Rapidly-Exploring Random Tree (RRT), a fundamental path planning algorithm in robotics. An RRT consists of a set of vertices, which represent configurations in some domain D and edges, which connect two vertices. The algorithm randomly builds a tree in such a way that, as the number of vertices and n increases to ∞, the vertices are uniformly distributed across the domain D. In this implementation, the RRT algorithm uses two key components:  Tree Data Structure: The RRT algorithm maintains a tree data structure to explore and represent the configuration space efficiently. Each node in the tree corresponds to a specific vertex, and edges between nodes represent feasible transitions.  State Machine: To control the decision-making process during tree expansion and exploration, I employed a state machine to guide the algorithm’s behavior. The inputs are as follows:  q_init: initial configuration K: max vertices in the RRT delta: incremental distance between vertices domain: the planning domain (default 100x100)The algorithm begins by randomly creating the obstacles, initializing the goal (and checking it’s in an acceptable location), and initializing the matplotlib plot. It then begins the main process, which repeats up to K times. A goal is considered acceptable if it is near the edge of the domain and not inside an obstacle: 123456789101112131415161718def initialize_goal(self):  acceptable_goal = False  while acceptable_goal == False:    check1 = False    check2 = False    self. x_goal = round(np. random. uniform(self. domain[0],self. domain[1]), 5)    self. y_goal = round(np. random. uniform(self. domain[2],self. domain[3]), 5)    if abs(50 - self. x_goal) &gt; 35 and abs(50 - self. y_goal) &gt; 35: # goal must be near edge of domain (so RRT has to search a little)      check1 = True    for circle in self. circles_list: # goal must not be inside an obstacle        coord = circle[ coordinate ]        distance = self. distance(coord, (self. x_goal, self. y_goal))        if distance &gt; circle[ size ]:          check2 = True    if check1 and check2:      acceptable_goal = True # proceed with current goalEvery iteration, the algorithm:  Finds a random configuration (random coordinate within the domain).  Identifies the closest existing vertex.  Calculates the direction of the random configuration.  Plans a new vertex delta (1) in the direction of the random configuration.    Checks if the planned vertex collides with an obstacle, and either returns to Step 1 if needed, or continues if there will not be a collision.   Collision checking is implemented as follows:   12345678910 elif self. state ==  CHECK_COLLISIONS :       for obstacle in self. circles_list: # check each obstacle         coord = obstacle[ coordinate ] # get center coordinate of obstacle         distance = self. distance(coord, self. q_new)         if distance &lt; obstacle[ size ]: # if new configuration is within obstacle, get new random coordinate           self. state =  RANDOM_CONFIG            return                   else:           self. state =  CHECK_FOR_GOAL  # continue to next stage if no collision detected    Checks if the goal can be spotted (straight line, no obstacles) from the newest vertex. If so, a flag is activated and the algorithm ends.  Updates the tree with the newest child vertex. The RRT is then animated with matplotlib.  "
    }, {
    "id": 10,
    "url": "http://localhost:4000/unmanned_electric_boat/",
    "title": "Unmanned Electric Race Boat",
    "body": "2023/06/25 - ArduPilot, Electronics, Autonomous Systems Video provided by the American Society of Naval Engineers. Overview: For my undergraduate Capstone project at William &amp; Mary, I lead a team in building a boat from scratch to compete in Unmanned Division of the 2023 Promoting Electric Propulsion for Small Craft (PEP) competition, a 5-mile endurance race. Our fully electric boat placed 3rd against universities from across the country. Our catamaran-style differential-drive boat, fondly named the Colonial Cruiser, ran ArduPilot Rover on a Pixhawk Cube Orange and was controlled via radio during the competition, though it was capable of autonomous navigation during controlled tests. As the Team and Electrical Lead, I focused on the autonomous navigation and electric propulsion systems of the boat, though I had a hand in everything from hull design to the power distribution systems as well. Teammates: Owen Darcy, Ethan Chang, Shamsullah AhmadzaiAdvisor: Jonathan Frey ArduPilot Ground Station setup. Final touches before the competition. Testing on the lake. "
    }, {
    "id": 11,
    "url": "http://localhost:4000/HenryBuron_About",
    "title": "About Me",
    "body": "2001/03/14 -  Hello! I am a current Master’s in Robotics student at Northwestern University and am passionate about computer vision, motion planning, and autonomous systems. My background includes practical experience writing code for robotic manipulation and navigation, developing ROS2 packages, and a variety of other software engineering work in a Linux environment. I take pride in my ability to write robust and reliable code. Some of my notable work includes co-developing a ROS2 package for motion planning on a 7-DoF robot arm, programming a robot to autonomously explore a simulated environment in Gazebo by implementing the Frontier Exploration algorithm, writing software to plan a trajectory for a mobile robot’s end-effector, building a quadcopter from scratch, and using computer vision to control a robot arm as it identifies and grasps objects. Education:         Sep. 2023 - Dec. 2024     NU | M. S. in Robotics             Sep. 2019 - May 2023     W&amp;M | B. S. in Engineering Physics   Contact: To contact me, please email: henryburon2024@u. northwestern. edu Linkedin: https://www. linkedin. com/in/henryburon/ GitHub: https://github. com/henryburon Resume:   "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});