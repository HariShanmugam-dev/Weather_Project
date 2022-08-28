let tempratureDescription = document.querySelector(".temprature-description");
let tempratureDegree = document.querySelector(".temprature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let weatherHumidity = document.querySelector(".weather-humidity");
let weatherWind = document.querySelector(".weather-wind");
let tempfeels = document.querySelector(".temp-feels-like");
let tempfeelspan = document.querySelector(".degree-section-2 span");
let iconpic = document.querySelector(".icon");
let tempspan = document.querySelector(".degree-section span");
let searchtext = document.querySelector(".search-text");
let timetext = document.querySelector(".current-time");
const apikeyvalue = "51c596882f565d5c8db2ca0cee72cd43";
let harihsmin = 0, harihsdate = 0, harihshours = 0, haritimezone = 0;
const text_tempfeels = "Feels like: ";
const text_Humi = "Humidity : ";
const text_Humi_unit = " % ";
const text_wind = "Wind : ";
const text_wind_unit = " Km/h ";
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["month", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let main_temp = 0;
let feel_temp = 0;
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

window.addEventListener('load', () => {
    ani.hideall();


    let long;
    let lat;

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            apikey = '51c596882f565d5c8db2ca0cee72cd43';



            const api = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + apikeyvalue + '&units=metric';

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { main: { temp, humidity, feels_like },
                        weather, wind: { speed }, timezone, name
                    } = data;
                    //set DOM Elements from the API
                    haritimezone = timezone;

                    const { main: details, icon } = weather[0];

                    tempratureDegree.textContent = temp;
                    main_temp = temp;
                    feel_temp = feels_like;
                    tempratureDescription.textContent = details;
                    locationTimezone.textContent = data.name;
                    weatherHumidity.textContent = text_Humi + humidity + text_Humi_unit;
                    weatherWind.textContent = text_wind + speed + text_wind_unit;
                    tempfeels.textContent = text_tempfeels + feels_like;
                    const dateh = new Date();
                    const offset = dateh.getTimezoneOffset();
                    datefn.fulldate(offset);
                    image.fetchmode(dateh.getHours());

if(screen.width<1300)
{
    document.querySelector(".photo-frame").style.display = "none";
}
else{
                    image.fetchImage(name);
}


                    iconpic.setAttribute("src", 'http://openweathermap.org/img/wn/' + icon + '@2x.png');
                    ani.showall();

                    document.getElementById("search").addEventListener("click", function () {
                        ani.hideall();
                        weatherr.search();

                    })
                    document.querySelector(".search-box").addEventListener("keyup", function (event) {
                        if (event.key == "Enter") {
                            ani.hideall();
                            weatherr.search();
                        }
                    })



                });
        });


    }
    else {
        h1.textContent = "This wont work untill you have locations enabled.";
    }


});

//Search weather by location.
let weatherr = {

    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&appid="
            + apikeyvalue
            + "&units=metric"
        ).then(response => {

            if (!response.ok) {
                searchtext.classList.add("err");
            }
            else {
                searchtext.classList.remove("err");
            }
            return response.json();
        })
            .then(data => {
                console.log(data);
                const { main: { temp, humidity, feels_like },
                    weather, wind: { speed }, timezone, name
                } = data;
                //set DOM Elements from the API

                const { main: details, icon } = weather[0];

                tempratureDegree.textContent = temp;
                main_temp = temp;
                feel_temp = feels_like;
                tempratureDescription.textContent = details;
                locationTimezone.textContent = data.name;
                weatherHumidity.textContent = text_Humi + humidity + text_Humi_unit;
                weatherWind.textContent = text_wind + speed + text_wind_unit;
                tempfeels.textContent = text_tempfeels + feels_like;
                datefn.fulldate(timezone);
                datefn.fulltime(timezone);

if(screen.width<1300)
{
    document.querySelector(".photo-frame").style.display = "none";
}
else{
                image.fetchImage(city);
}
                iconpic.setAttribute("src", 'http://openweathermap.org/img/wn/' + icon + '@2x.png');
                ani.showall();
            });
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-box").value);
    }

};
let image = {
    fetchImage: function (city) {
        const access_key = "lgHMz6HybBNqJUYfy52_ye2jp44tJQWkF_KU-DZqeQI";
        const api = 'https://api.unsplash.com/search/photos?query=' + city + '&per_page=10&orientation=portrait&page=1&client_id=' + access_key;


        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { results } = data;
                const { urls: { raw } } = results[0];
                console.log(raw);
                /*setTimeout(this.imageroll(raw),20000);*/
                document.querySelector(".Photo").setAttribute("src", raw);

                /*for (let i = 0; i < 10; i++) {
                    const { urls: { raw } } = results[i];
                    console.log(raw);
                    /*setTimeout(this.imageroll(raw),20000);
                    document.querySelector(".Photo").setAttribute("src", raw).fadeIn().delay(3000).fadeOut();
                    /*$('.Photo').fadeIn().delay(3000).fadeOut();
                   /* i = i==9?0:i;

                }*/


            });
    },
    fetchmode:function(hours){
        console.log(hours);

        if(hours > 18 || hours<7)
        {
            console.log("dark");
    document.querySelector(".mode").classList.add("dark");
    document.querySelector(".mode").classList.remove("light");
        }
        else{
            console.log("lightmode activated");
            document.querySelector(".mode").classList.add("light");
    document.querySelector(".mode").classList.remove("dark");
        }

    }

}
let datefn = {

    fulldate: function (timezone) {

        console.log(timezone);
        let dateatt = document.querySelector(".current-date");
        let dayatt = document.querySelector(".current-day");
        var date = new Date((new Date().getTime()) + timezone * 1000);
        const dateFormat = date.toDateString();

        dateatt.innerHTML = dateFormat.substring(4, 15);
        dayatt.innerHTML = days[date.getDay()];




    },
    fulltime: function (timezone) {
        timetext.classList.add("current-time-active");
        var date = new Date((new Date().getTime()) + timezone * 1000);
        time = date.toISOString();
        let hours = time.substring(11, 13);
        const min = time.substring(14, 16);
        image.fetchmode(hours);
        if (haritimezone == timezone) {
            timetext.textContent = "Sorry the time difference wont work properly for the same timezone.";
            $('#timetext').fadeIn().delay(3000).fadeOut();
        }
        else {
            const text_AMPM = +hours > 12 ? " PM. " : " AM. ";
            const timeahead = " ahead of us.";
            let timecal = "";
            var d = new Date();
            harihshours = d.getHours();
            harihsmin = d.getMinutes();
            harihsdate = d.getDate();
            if (harihsdate > date.getDate()) {
                timeahead = " behind us."
                var hourdiff = parseInt(hours) - harihshours;
                var mindiff = parseInt(min) - harihsmin;

                //console.log(hourdiff);
                timecal = (hourdiff) + "hours " + (mindiff) + "min";
            }
            else {
                console
                var hourdiff = 24 - harihshours + parseInt(hours);
                var mindiff = parseInt(min) - harihsmin;

                if (mindiff < 0) {
                    hourdiff -= 1;
                    mindiff *= -1;
                }
                if(hourdiff >24)
                {
                    hourdiff-=24;
                }

                console.log(hourdiff);
                timecal = (hourdiff) + "hours " + (mindiff) + "min";

            }
            // console.log(date.getTime());

            hours = hours > 12 ? hours - 12 : hours;
            timetext.textContent =
                "It's " + hours + ":" + min + text_AMPM
                + timecal + timeahead;

        }

    }

};

let ani = {
    
    hideall: function () {
        document.querySelector(".loader").style.opacity ="1";
        const nodeList = document.querySelectorAll("body > div:not(.loader)");
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].style.opacity = "0";
        }

    },
    showall: function() {
        document.querySelector(".loader").style.opacity ="0";
        const nodeList = document.querySelectorAll("body > div:not(.loader)");
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].style.opacity = "1";
        }

    }
}


document.querySelector(".temprature").addEventListener("click", function () {
    //Formula for converting celsius to degree
    let temp_farenheit = ((main_temp * (9 / 5)) + 32).toFixed(2);
    let Feels_farenheit = ((feel_temp * (9 / 5)) + 32).toFixed(2);
    if (tempspan.textContent === "C") {
        tempspan.textContent = "F";
        tempfeelspan.textContent = "F";
        tempratureDegree.textContent = temp_farenheit;
        tempfeels.textContent = text_tempfeels + Feels_farenheit;

    }
    else {
        tempratureDegree.textContent = main_temp;
        tempfeels.textContent = text_tempfeels + feel_temp;
        tempspan.textContent = "C";
        tempfeelspan.textContent = "C";
    }
})

