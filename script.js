(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let t = "AM"

            
            if (h >= 12) t = "PM";

            if (h > 12) {
                h = h-12;
            }
            if(h === 0) {
                h = 12;
                t = "PM"

            } 
            

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + t;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let eesnimi = document.getElementById("fname").value;
        let perenimi = document.getElementById("lname").value;



        if(eesnimi === "" || perenimi === "") {
            alert("Nime väli peab olema täidetud")
        } else if (/\d/.test(eesnimi) || /\d/.test(perenimi)) {
            alert("Nimi ei tohi sisaldada numbreid");
        } else if ((document.getElementById("v3").checked || document.getElementById("v4").checked) === false) {
            alert("Valige makseviis");
        } else if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;
        } else {
            let hind = 0;
            if (document.getElementById("v1").checked) hind += 5;
            if (document.getElementById("v2").checked) hind += 1;
            switch(linn.value) {
                case "trt":
                    hind += 2.5;
                    break;
                case "nrv":
                    hind += 2.5;
                    break;
                case "prn":
                    hind += 3;
                    break;

            }

            e.innerHTML = hind + " €";
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    let point = new Microsoft.Maps.Location(
        37.4220009,
        -122.0839996
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 2,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {});

    pushpin.metadata = {
        title: 'Tartu Ülikool',
        description: 'Mu kool',
        text: 'UT'
        };

    let pushpin2 = new Microsoft.Maps.Pushpin(point, {});

    pushpin2.metadata = {
        title: 'Google HQ',
        description: 'Mu kontor',
        text: 'HQ'
        };

    var infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });
    infobox.setMap(map);


    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);


    map.entities.push(pushpin);
    map.entities.push(pushpin2);
    

    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }

}



// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

