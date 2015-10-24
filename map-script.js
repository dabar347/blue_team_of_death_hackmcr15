/**
 * Created by Cristi on 24-Oct-15.
 */
// (function () {
    var x = document.getElementById("coordinates");
    var latitude, longitude;
    var ourGoogle;

    var directionsDisplay;
    var directionsService;
    var directionsMap;
    // getLocation();
    function getLocation() {
        directionsService = new google.maps.DirectionsService();
        ourGoogle = google;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        x.innerHTML = "Latitude: " + latitude +
            "<br>Longitude: " + longitude;
        console.log("Works here!");
        initMap();
    }
    function initMap() {
        console.log("Display map");
        directionsDisplay = new google.maps.DirectionsRenderer();
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: latitude, lng: longitude},
            scrollwheel: false,
            zoom: 12
        });
        directionsDisplay.setMap(map);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map,
            title: 'You are here!!!'
        });
    }

    function calcRoute() {
        var _start = new google.maps.LatLng(latitude, longitude);
        var _end = "Manchester, uk";
        var request = {
            origin:_start,
            destination:_end,
            travelMode: google.maps.TravelMode.WALKING,
            provideRouteAlternatives: true
        };
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });
    }
