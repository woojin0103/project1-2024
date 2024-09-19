let temp = document.querySelector('#temp');
let min = document.querySelector('#min');
let max = document.querySelector('#max');
let wind = document.querySelector('#wind');
let weather = document.querySelector('#weather');
let icon = document.querySelector("#icon");
let icon_url = "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/";


function get_weather(){
    let cityname = "london"
    city = document.getElementById('city')
    cityname = city.value

    current.innerText = "정우진 Current Weather in " + cityname

    weather_url = "https://api.openweathermap.org/data/2.5/find?"
    appid = "&units="

    abcd = document.getElementById('temperature')
    abcdname = abcd.value

    cdef = "&appid=7d96bc5108f52b80e2d9075a369b9f35"
    final_url = weather_url + "q=" + cityname + appid + abcdname + cdef

    axios.get(final_url).then(function(response) {
        console.log(response.data);
        let wdata = response.data.list[0];
        let exdata = response.data.list[0].weather[0];

        if(abcdname == "metric"){
            temp.innerText = wdata.main.temp + "°C";
            min.innerText = wdata.main.temp_min + "°C";
            max.innerText = wdata.main.temp_max + "°C";
        }
        else if(abcdname == "imperial"){
            temp.innerText = wdata.main.temp + "°F";
            min.innerText = wdata.main.temp_min + "°F";
            max.innerText = wdata.main.temp_max + "°F";
        }
        else{
            temp.innerText = wdata.main.temp + "k";
            min.innerText = wdata.main.temp_min + "k";
            max.innerText = wdata.main.temp_max + "k";
        }
        wind.innerText = wdata.wind.speed;

        weather.innerText = exdata.main + "," + exdata.description;
        icon.setAttribute('src', icon_url + exdata.icon + ".png");
    })
    .catch(function(error) {
        console.log(error);
    })
    .then(function() {});
}

get_weather()