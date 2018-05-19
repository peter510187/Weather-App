# Weather-App
Weather-App is an application that can show users a real-time weather and city photos based on different cities.<br>
[Link to the demo](http://peterchangsite.com/aau/wnm617/midterm/)

## Description
This project is using different kinds of APIs to reach the basic weather application needs. It can search by city's name and show the real-time weather data and the city photos. Also, the application has basic login/logout functions.

## How it works?
#### examples:
```javascript
//Using Openweathermap API to get real-time weather data
function GetCityWeather_F(city) {

    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial' + '&appid=yourID',
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            //paste data to html elements
        },
        error:function(){

        }
    });
}
```
```javascript
//Using Flickr API to get city photos
function GetCityPhoto(city) {

    $.ajax({
        url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=yourAPIKey&tags=skyline'+'&text='+city+
        '&safe_search=1&privacy_filter=1&content_type=1&per_page=5&format=json&nojsoncallback=1',
        format: "json",
        success: function(data) {
            //paste data to html elements            
        },
        error:function() {

        },
    });
}
```
