let cities = {
    cityList: []
};

//console.log(cities);

async function getCurrentWeather(city){
    debugger;
    let apiKey = 'a7964fea4cc921b4a47ca07c5861fd45';
    let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    //let queryUrl = `https://rudzki.ca/api/?q=${id}`;
    const result = await fetch(queryUrl);
    const data = await result.json();
    console.log(`current weather for ${data.name} is: `);
    console.log(data)
    let date = new Date();
    //Date.toString(data.dt);
    console.log(`Date: ${date.toString(data.dt)}, Temp: ${data.main.temp-273.15} C, Humidity: ${data.main.humidity}%, Wind speed: ${data.wind.speed} m/s`);
    
    document.getElementById('cityName').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('date').innerText = moment(date.toISOString(data.dt)).format('(YYYY-MM-DD)');
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
    
};

async function getUVIndex(city,lon,lat){
    let apiKey = 'a7964fea4cc921b4a47ca07c5861fd45';
    let queryUrl = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
    const result = await fetch(queryUrl);
    const data = await result.json();
    console.log(`UV index for ${city} is: ${data.value}`);

    document.getElementById('UV').innerHTML = `UV Index: <span id="UVcolor" class="UVcolor-red">&nbsp;${data.value}&nbsp;</span>`;
    if (data.value <= 3){
        document.getElementById('UVcolor').className = "UVcolor-green";
    }
    else if (data.value > 3 && data.value <= 6){
        document.getElementById('UVcolor').className = "UVcolor-orange";
    } else {
        document.getElementById('UVcolor').className = "UVcolor-red";
    }
    //console.log(data)
}

function renderList(items){
    // if(items.length > 5){
    //     items = items.slice(0,5);
    //     console.log('more than 5 take action');
    // }
    document.getElementById('list-group').innerHTML = '';
    let innerHTML = '<input type="text" placeholder="Search for city" class="list-group-item rounded" id="searchBox">';
    items.cityList.forEach(el => {
        innerHTML += `<button class="list-group-item rounded text-left" onclick="getCurrentWeather('${el}')">${el}</button>`
    })
    document.getElementById('list-group').innerHTML = innerHTML;


};

function search(){
    //debugger;
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
    //debugger;
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
    //debugger;
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