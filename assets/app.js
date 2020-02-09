let cities = {
    cityList: []
};

//console.log(cities);

async function getCurrentWeather(city){
    
    let apiKey = 'a7964fea4cc921b4a47ca07c5861fd45';
    let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    //let queryUrl = `https://rudzki.ca/api/?q=${id}`;
    const result = await fetch(queryUrl);
    const data = await result.json();
    // console.log(`current weather for ${data.name} is: `);
    //console.log(data.weather[0].icon);
    let date = new Date();
    //Date.toString(data.dt);
    // console.log(`Date: ${date.toString(data.dt)}, Temp: ${data.main.temp-273.15} C, Humidity: ${data.main.humidity}%, Wind speed: ${data.wind.speed} m/s`);
    
    document.getElementById('cityName').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('date').innerText = moment(date.toISOString(data.dt)).format('(YYYY-MM-DD)');
    let iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('icon').setAttribute("src",iconUrl);
    document.getElementById('currentTemp').innerText = ` Temperature: ${Math.round(data.main.temp-273.15
    )} C`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').innerText = `Wind speed: ${data.wind.speed} m/s`;

    
    getUVIndex(data.name,data.coord.lon,data.coord.lat);

    getForecastWeather(city);
    
};

async function getForecastWeather(city){
    let apiKey = 'a7964fea4cc921b4a47ca07c5861fd45';
    let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    const result = await fetch(queryUrl);
    const data = await result.json();
    console.log(`forecast weather for ${city} is:`);
    console.log(data);
    let days = [];
    days.push(data.list[7]);
    days.push(data.list[15]);
    days.push(data.list[23]);
    days.push(data.list[31]);
    days.push(data.list[39]);
    
    let innerHTML = '';
    days.forEach(el => {
        //debugger;
        innerHTML += `<div class="col-2"><div class="card border-light" style="width: 12rem;">
        <div class="card-body">
            <h5 class="card-title1" id="card-title1">${moment(el.dt_txt).format('YYYY-MM-DD')}</h5>
            <img src="http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png" class="card-img-top" style="width:30px;heigth:30px;">
            <p class="card-text">Temp: ${Math.round(el.main.temp - 273.15)} C<br>Humidity: ${el.main.humidity}%</p>
        </div>
        </div></div>`;

    });
    debugger;
    document.querySelector('.row').innerHTML = innerHTML;

};

async function getUVIndex(city,lon,lat){
    let apiKey = 'a7964fea4cc921b4a47ca07c5861fd45';
    let queryUrl = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
    const result = await fetch(queryUrl);
    const data = await result.json();
    

    document.getElementById('UV').innerHTML = `UV Index: <span id="UVcolor" class="UVcolor-red">&nbsp;${data.value}&nbsp;</span>`;
    if (data.value <= 3){
        document.getElementById('UVcolor').className = "UVcolor-green";
    }
    else if (data.value > 3 && data.value <= 6){
        document.getElementById('UVcolor').className = "UVcolor-orange";
    } else {
        document.getElementById('UVcolor').className = "UVcolor-red";
    }
    
}

function renderList(items){
    
    document.getElementById('list-group').innerHTML = '';
    let innerHTML = '<input type="text" placeholder="Search for city" class="list-group-item rounded" id="searchBox">';
    items.cityList.forEach(el => {
        innerHTML += `<button class="list-group-item rounded text-left" onclick="getCurrentWeather('${el}')">${el}</button>`
    })
    document.getElementById('list-group').innerHTML = innerHTML;


};

function search(){
    
    let city = document.getElementById('searchBox').value;
    cities.cityList.unshift(city);
    if (cities.cityList.length > 6){
        cities.cityList.pop();
    }
    renderList(cities);
    saveToStorage(cities);
    getCurrentWeather(city);
    //getForecastWeather(city);

};

function saveToStorage(items){
    
    localStorage.setItem('cities',JSON.stringify(items.cityList));
};

// event listeners

//document.getElementById('searchBox').addEventListener('click',search)
document.addEventListener('keydown',(event) => {
    if(event.keyCode == 13){
        search();
    }
});

function loadFromStorage(items){
    
    if (localStorage.getItem('cities')){
        items.cityList = JSON.parse(localStorage.getItem('cities'));
        //return items;
    };
};

function init(){
    loadFromStorage(cities);
    renderList(cities);
};

init();

// getWeather('Warsaw');
// getWeather('New York');
// getWeather('Atlanta');
// renderList(cities);