$(function() {

    GetCityWeather_F("San Francisco");
    GetCityPhoto("San Francisco");

    $("#submit_weather").click(function(){

        var city = $("#city").val();
        var check = $("#degree_c").attr("class");

        if(city != ""){

            $("#error").html("");

            if(check == "degree_non_click"){
                GetCityWeather_F(city);
                GetCityPhoto(city);
            }else{
                GetCityWeather_C(city);
                GetCityPhoto(city);
            }


        }else{
            $("#error").html("Field cannot be empty");
        }

    });

    $("#change_background").click(function(){

        var city = $(".title").text();
        GetCityPhoto(city);

    });

    $("#degree_c").click(function(){

        var city = $(".title").text();
        var check = $("#degree_f").attr("class");

        if(check != "degree_non_click"){
            GetCityWeather_C(city);

            $("#degree_f").addClass("degree_non_click");
            $("#degree_c").removeClass("degree_non_click");
        }

    });

    $("#degree_f").click(function(){

        var city = $(".title").text();
        var check = $("#degree_c").attr("class");

        if(check != "degree_non_click"){
            GetCityWeather_F(city);

            $("#degree_f").removeClass("degree_non_click");
            $("#degree_c").addClass("degree_non_click");
        }

    });

});

function GetCityPhoto(city) {

    $.ajax({
        url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=76a759b75e7f5c5c1d45c7385760bc1d&tags=skyline'+'&text='+city+
        '&safe_search=1&privacy_filter=1&content_type=1&per_page=5&format=json&nojsoncallback=1',
        format: "json",
        success: function(data) {
            console.log(data);
            var num = Math.floor(Math.random()*5);
            //http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
            var farmID = data.photos.photo[num].farm;
            var serverID = data.photos.photo[num].server;
            var photoID = data.photos.photo[num].id;
            var secret = data.photos.photo[num].secret;
            var backgroundImageUrl = 'http://farm'+farmID+'.staticflickr.com/'+serverID+'/'+photoID+'_'+secret+'_b.jpg'

            $('.background').css('background-image','linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(' + backgroundImageUrl + ')');
        },
        error:function() {

        },
    });

}



function GetCityWeather_C(city) {

    $.ajax({

        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric' + '&appid=b5e3fb75f4da8f3a1e9b7c768d8bd286',
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            //console.log(data);

            $(".title").text(data.name);
            $(".date").text(Day()+" | TODAY");
            $(".temp").text(Math.round(data.main.temp)+"°C");
            $(".main").text(data.weather[0].main);
            $(".temp_all").text(Math.round(data.main.temp_min)+"°C - "+Math.round(data.main.temp_max)+"°C");
            $(".sunrise").text(Time(data.sys.sunrise));
            $(".sunset").text(Time(data.sys.sunset));
            $(".wind").text(data.wind.speed+" m/s");
            $(".pressure").text(data.main.pressure+" hPa");
            $(".humidity").text(data.main.humidity+"%");
            
            $("#city").val("");
            $("#input").prop("checked",false);

            var temp = data.main.temp;

        },
        error:function(){
            $("#error").html("City name cannot be found.");
            $("#city").val("");
        }
    });
}

function GetCityWeather_F(city) {

    $.ajax({

        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial' + '&appid=b5e3fb75f4da8f3a1e9b7c768d8bd286',
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            console.log(data);

            $(".title").text(data.name);
            $(".date").text(Day()+" | TODAY");
            $(".temp").text(Math.round(data.main.temp)+"°F");
            $(".main").text(data.weather[0].main);
            $(".temp_all").text(Math.round(data.main.temp_min)+"°F - "+Math.round(data.main.temp_max)+"°F");
            $(".sunrise").text(Time(data.sys.sunrise));
            $(".sunset").text(Time(data.sys.sunset));
            $(".wind").text(data.wind.speed+" m/h");
            $(".pressure").text(data.main.pressure+" hPa");
            $(".humidity").text(data.main.humidity+"%");
            
            $("#city").val("");
            GetCityWeather_F_3hours(city);
            $("#input").prop("checked",false);
        },
        error:function(){
            $("#error").html("City name cannot be found.");
            $("#city").val("");
        }
    });
}

function GetCityWeather_C_3hours(city) {

    $.ajax({

        url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric' + '&appid=b5e3fb75f4da8f3a1e9b7c768d8bd286',
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            console.log(data);


        },
        error:function(){
            $("#city").val("");
        }
    });
}

function GetCityWeather_F_3hours(city) {

    $.ajax({

        url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial' + '&appid=b5e3fb75f4da8f3a1e9b7c768d8bd286',
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            console.log(data);

            

        },
        error:function(){
            $("#city").val("");
        }
    });
}

function Day(){
    var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
    ];
    var today = new Date().getDay();

    return days[today];
}

function Time(time){
    var sec = time;
    var date = new Date(sec * 1000);
    var timestring = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    return timestring;
}

function handleSignUp() {
    var email = $('#form-email').val();
    var password = $('#form-password').val();

    if (email.length < 4) {
        alert("Please enter a valid email address.")
        return;
    }
    if (password.length < 4) {
        alert("Please use a stronger password.")
        return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
        function(){
            $('.login_window').css('display',"none");
            $('.main_window').css('display',"block");
            //window.location.href="http://peterchangsite.com/aau/wnm617/midterm/main.html";
        }
    )
    .catch(
        function(error){
            alert(error.message);
        }
    )
}
function handleSignIn() {
    var email = $('#form-email').val();
    var password = $('#form-password').val();

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            function(){
                $('.login_window').css('display',"none");
                $('.main_window').css('display',"block");               
            }
        )
        .catch(
            function(error){
                alert(error.message);
            }
        )
}
function handleSignOut() {
    firebase.auth().signOut()
        .then(
            function(){
                $('.login_window').css('display',"block");
                $('.main_window').css('display',"none");
            }
        )
        .catch(
            function(error){
                alert(error.message);
            }
        )
}
function handleFBLogin() {
    if(! firebase.auth().currentUser){
        var provider = new firebase.auth.FacebookAuthProvider();
        //provider.addScope('user_birthday');
        firebase.auth().signInWithPopup(provider)
            .then(
                function(result){
                    var token = result.credential.accessToken;
                    var user = result.user;
                    $('.login_window').css('display',"none");
                    $('.main_window').css('display',"block"); 
                }
            )
            .catch(
                function(error){
                    alert(error.message);
                }
            )
    }
    else{
        handleSignOut();
    }
}
function handleGoogleLogin() {
    if(! firebase.auth().currentUser){
        var provider = new firebase.auth.GoogleAuthProvider();
        //provider.addScope('profile');
        //provider.addScope('email');
        firebase.auth().signInWithPopup(provider)
            .then(
                function(result){
                    var token = result.credential.accessToken;
                    var user = result.user;
                    $('.login_window').css('display',"none");
                    $('.main_window').css('display',"block"); 
                }
            )
            .catch(
                function(error){
                    alert(error.message);
                }
            )
    }
    else{
        handleSignOut();
    }
}