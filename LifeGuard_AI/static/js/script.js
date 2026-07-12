<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Emergency SOS - LifeGuard AI</title>

<link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">

</head>


<body>

// ================= SOS ALERT =================

function sendSOS(){

    document.getElementById("status").innerHTML =
    "🚨 SOS Activated";


    if(navigator.geolocation){


        navigator.geolocation.getCurrentPosition(function(position){


            let latitude = position.coords.latitude;

            let longitude = position.coords.longitude;


            let location = latitude + "," + longitude;


            let message =
            "🚨 Emergency Alert! User needs immediate help.";



            // Save SOS to Database

            fetch("/save_sos",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    message:message,

                    location:location

                })

            })


            .then(response=>response.json())


            .then(data=>{


                document.getElementById("sosMessage").innerHTML =

                "🚨 Emergency Alert Sent Successfully!<br><br>"+

                "📍 Location Shared With Family";


                alert("SOS Alert Activated");


            })



            .catch(error=>{

                console.log(error);

            });



        });


    }

    else{


        alert("Location not supported");


    }


}









// ================= FAMILY MEMBER =================


function addFamily(){


    let name =
    document.getElementById("familyName").value;


    let phone =
    document.getElementById("familyNumber").value;



    if(name=="" || phone==""){


        alert("Please enter family name and phone number");

        return;

    }





    fetch("/add_family",{


        method:"POST",


        headers:{

            "Content-Type":"application/json"

        },


        body:JSON.stringify({


            name:name,

            phone:phone


        })


    })



    .then(response=>response.json())


    .then(data=>{


        let list =
        document.getElementById("familyList");



        let item =
        document.createElement("li");



        item.innerHTML =

        "👤 "+name+

        " 📞 <a href='tel:"+phone+"'>Call</a>";



        list.appendChild(item);



        document.getElementById("familyName").value="";

        document.getElementById("familyNumber").value="";



        alert("Family Member Added");


    });



}










// ================= CAMERA =================


let stream = null;



function startCamera(){


    navigator.mediaDevices.getUserMedia({

        video:true,

        audio:false

    })


    .then(function(videoStream){


        stream = videoStream;


        document.getElementById("camera").srcObject = stream;



    })


    .catch(function(error){


        alert("Camera permission denied");


        console.log(error);


    });



}






function stopCamera(){


    if(stream){


        stream.getTracks().forEach(function(track){


            track.stop();


        });



        document.getElementById("camera").srcObject = null;


    }


}









// ================= LIVE LOCATION =================


function getLocation(){


    let locationBox =
    document.getElementById("location");



    if(navigator.geolocation){



        navigator.geolocation.getCurrentPosition(function(position){



            let latitude =
            position.coords.latitude;



            let longitude =
            position.coords.longitude;




            let mapLink =

            "https://www.google.com/maps?q="

            + latitude + "," + longitude;





            locationBox.innerHTML =


            "📍 Latitude: "+latitude+

            "<br>"+


            "📍 Longitude: "+longitude+

            "<br><br>"+


            "<a class='btn' target='_blank' href='"+mapLink+"'>Open Map</a>";




        });



    }


    else{


        locationBox.innerHTML =
        "❌ Location not supported";


    }


}<nav>

<div class="logo">🏥 LifeGuard AI</div>

<ul>
<li><a href="/">Home</a></li>
<li><a href="/chatbot">Chatbot</a></li>
<li><a href="/medicine">Medicine</a></li>
<li><a href="/water">Water</a></li>
<li><a href="/emergency">Emergency</a></li>
</ul>

</nav>





<section class="hero">


<h1>🚨 Emergency SOS</h1>

<p>
Quick emergency assistance and family support.
</p>





<div class="card">

<h2>🆘 Emergency Alert</h2>

<p>
Press SOS during emergency.
</p>


<button class="btn" onclick="sendSOS()">
🚨 SEND SOS
</button>


<h3 id="status"></h3>

<p id="sosMessage"></p>


</div>







<div class="card">

<h2>📞 Emergency Contacts</h2>


<p>🚑 Ambulance:
<a href="tel:108">108</a>
</p>


<p>🚓 Police:
<a href="tel:100">100</a>
</p>


<p>🔥 Fire:
<a href="tel:101">101</a>
</p>


<p>📞 Health:
<a href="tel:104">104</a>
</p>


</div>








<div class="card">

<h2>👨‍👩‍👧 Family Members</h2>


<input id="familyName"
placeholder="Enter Name"
style="padding:10px;">


<br><br>


<input id="familyNumber"
placeholder="Enter Phone Number"
style="padding:10px;">


<br><br>


<button class="btn" onclick="addFamily()">
Add Member
</button>


<ul id="familyList"></ul>


</div>








<div class="card">

<h2>📷 Emergency Camera</h2>


<video id="camera"
width="300"
autoplay>
</video>


<br><br>


<button class="btn" onclick="startCamera()">
Start Camera
</button>


<button class="btn" onclick="stopCamera()">
Stop Camera
</button>


</div>







<div class="card">

<h2>📍 Live Location</h2>


<button class="btn" onclick="getLocation()">
Get Location
</button>


<p id="location">
Location not available
</p>


</div>








</section>









<script>


// SOS FUNCTION

function sendSOS(){


document.getElementById("status").innerHTML =
"🚨 SOS Activated";



if(navigator.geolocation){



navigator.geolocation.getCurrentPosition(function(position){



let lat =
position.coords.latitude;


let lon =
position.coords.longitude;



let mapLink =
"https://www.google.com/maps?q="
+lat+","+lon;



document.getElementById("sosMessage").innerHTML =

"🚨 EMERGENCY ALERT 🚨<br><br>"+

"Need immediate help.<br><br>"+

"📍 Location:<br>"+

"<a href='"+mapLink+"' target='_blank'>Open Location</a><br><br>"+

"Please contact family member.";





});

}


else{


document.getElementById("sosMessage").innerHTML =
"Location not available";


}



alert("Emergency message created");


}









// FAMILY MEMBER ADD


function addFamily(){


let name =
document.getElementById("familyName").value;


let number =
document.getElementById("familyNumber").value;



if(name=="" || number==""){


alert("Enter details");

return;


}



let list =
document.getElementById("familyList");


let item =
document.createElement("li");



item.innerHTML =

"👤 "+name+
" 📞 <a href='tel:"+number+"'>Call</a>";



list.appendChild(item);



}









// CAMERA


let stream;



function startCamera(){


navigator.mediaDevices.getUserMedia({

video:true

})


.then(function(videoStream){


stream=videoStream;


document.getElementById("camera").srcObject=stream;


})


.catch(function(){

alert("Camera permission denied");

});


}





function stopCamera(){


if(stream){


stream.getTracks().forEach(function(track){

track.stop();

});


document.getElementById("camera").srcObject=null;


}


}









// LOCATION


function getLocation(){


let box =
document.getElementById("location");



navigator.geolocation.getCurrentPosition(function(position){



let lat =
position.coords.latitude;


let lon =
position.coords.longitude;



let map =
"https://www.google.com/maps?q="
+lat+","+lon;



box.innerHTML =

"📍 Latitude: "+lat+
"<br>"+

"📍 Longitude: "+lon+
"<br><br>"+

"<a href='"+map+"' target='_blank'>Open Map</a>";



});

}



</script>


</body>

</html>