
var documents = [{
    "id": 0,
    "url": "henryburon.github.io/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "henryburon.github.io/HenryBuron_About",
    "title": "",
    "body": "   Current M. S. in Robotics student at Northwestern University.   Skilled in ROS/ROS2, embedded systems, machine learning, and mechatronics.   Interested in computer vision, autonomous systems, and mobile/field robotics. Education:         Sep. 2023 - Dec. 2024     M. S. in Robotics             Sep. 2019 - May 2023     B. S. in Engineering Physics   Contact:   henryburon2024@u. northwestern. edu  GitHub  LinkedIn   "
    }, {
    "id": 2,
    "url": "henryburon.github.io/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "henryburon.github.io/",
    "title": "Home",
    "body": "      Projects:                                                                                                         KUKA youBot Mobile Manipulation              :       Robotic Manipulation, Python, CoppeliaSim:                               04 Dec 2023        &lt;/span&gt;                                                                                                                                   Machine Learning Emotion Classification              :       Machine Learning, Python, Image Processing:                               25 Nov 2023        &lt;/span&gt;                                                                                                                                   PincherX 100 Pen Thief              :       OpenCV, Python, PincherX 100:                               15 Oct 2023        &lt;/span&gt;                                      "
    }, {
    "id": 4,
    "url": "henryburon.github.io/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 5,
    "url": "henryburon.github.io/mobile-manipulation/",
    "title": "KUKA youBot Mobile Manipulation",
    "body": "2023/12/04 - Robotic Manipulation, Python, CoppeliaSim Overview: Goal: Write a program that automatically plans a trajectory for a KUKA youBot mobile manipulator as it moves to, grasps, and places a block in a desired location. GitHub: https://github. com/henryburon/mobile-manipulation Process:  I wrote three functions to complete this project, which, when combined, generate the final trajectory:     TrajectoryGenerator   FeedbackControl   NextState    TrajectoryGenerator     Generates the reference trajectory for the end-effector frame {e}.    Consists of eight concatenated trajectory segments:         A trajectory to move the gripper from its initial configuration to a “standoff” configuration a few cm above the block.      A trajectory to move the gripper down to the grasp position     Closing of the gripper.      A trajectory to move the gripper back up to the “standoff” configuration.      A trajectory to move the gripper to a “standoff” configuration above the final configuration.      A trajectory to move the gripper to the final configuration of the object.      Opening of the gripper.      A trajectory to move the gripper back to the “standoff” configuration.           Output: A representation of the N configurations of the end-effector along the entire eight-segment reference trajectory.     FeedbackControl     Calculates the kinematic task-space feedforward plus feedback control law.    Output: The commanded end-effector twist V expressed in the end-effector frame {e}.     NextState     Calculates the robot’s configuration at the next time-step using first-order Euler-step.    Output: A 12-vector representing the configuration of the robot time Δt later.     Combine Functions     Finally, I integrated these three functions, provided the necessary initial and desired final configurations, and generated a . csv file to simulate the KUKA youBot’s movement in CoppeliaSim.     Results     I finished by generating three trajectories:         Best: A well-tuned feedforward-plus-PI controller. Error quickly converged to zero. First clip in the YouTube video.       Overshoot: A less-well-tuned feedforward-plus-PI controller. Error takes longer to converge to zero.       newTask: Different initial and final configurations of the block. Second clip in the YouTube video.           "
    }, {
    "id": 6,
    "url": "henryburon.github.io/ml_emotion_classification/",
    "title": "Machine Learning Emotion Classification",
    "body": "2023/11/25 - Machine Learning, Python, Image Processing "
    }, {
    "id": 7,
    "url": "henryburon.github.io/pen_thief/",
    "title": "PincherX 100 Pen Thief",
    "body": "2023/10/15 - OpenCV, Python, PincherX 100 Overview: Goal: Use the PincherX 100 robot arm to autonomously grab a purple pen. Github: https://github. com/henryburon/pen-thief Process:  Detect Location of the Purple Pen     First, I used the RGB image from an Intel RealSense camera to create an HSV mask that filtered out every color except purple.     Identify Contour and Calculate Centroid     I added contours around the selected pixels and found the 2D coordinate of the centroid of the largest contour, which I assumed to be the pen.     Align the Images     I then aligned the camera’s Depth Map with the RGB Image and found the pen’s 3D coordinates in the camera’s reference frame.     Transform to Robot Frame     I converted these coordinates to be in the robot arm’s frame, given its 90° rotation and fixed offset.     Command the End-Effector     Finally, I used the InterbotixManipulatorXS Python package to move the end-effector and gripper to the desired coordinate and position.    "
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