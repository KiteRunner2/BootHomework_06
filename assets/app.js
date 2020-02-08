console.log('hello');

let cities = [];

async function getWeather(city){
    let apiKey = 'a7964fea4cc921b4a47ca07c5861fd45';
    let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    //let queryUrl = `https://rudzki.ca/api/?q=${id}`;
    const result = await fetch(queryUrl);
    const data = await result.json();

    console.log(data.name,data.sys.country);
    // console.log('Number of elements: ', data.length);

    // data.forEach(element => {
    //     console.log(element);
    // });
};

function renderList(items){
    if(items.length > 5){
        console.log('more than 5 take action');
    }
    document.getElementById('list-group').innerHTML = '';
    let innerHTML = '<input type="text" placeholder="Search for city" class="list-group-item rounded" id="searchBox">';
    cities.forEach(el => {
        innerHTML += `<li class="list-group-item rounded">${el}</li>`
    })
    document.getElementById('list-group').innerHTML = innerHTML;


}

function search(){
    let city = document.getElementById('searchBox').value;
    cities.unshift(city);
    renderList(cities);
    getWeather(city);

}


// event listeners

//document.getElementById('searchBox').addEventListener('click',search)
document.addEventListener('keydown',(event) => {
    if(event.keyCode == 13){
        search();
    }
});



// getWeather('Warsaw');
// getWeather('New York');
// getWeather('Atlanta');
// renderList(cities);