/* Global Variables */
const generate = document.querySelector('#generate');
const zip =document.getElementById('zip');
const temp =  document.getElementById('temp');
const showDate = document.getElementById("date");
const feelings = document.getElementById('feelings');
const feel = document.getElementById('content');
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=00a844aef87452205dc931bce7172789&units=Metric';
const baseURL  = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let month = d.getMonth()+1;
let newDate = month+'.'+ d.getDate() +'.'+ d.getFullYear();



generate.addEventListener('click',(e) =>{
    getWeather(baseURL+zip.value+apiKey)
    .then(data=>{
        
        if(data.cod !=404){
            data.main.feelings = feelings.value; 
            postData('/add',data.main)
            .then(()=>{
                retrieveData();
            })
        }else{
            temp.innerHTML = "zip is wrong!"
        }
       
    });
       
});

const getWeather = async(url) =>{
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error:", error)
    }
;}

const postData = async(url = '', data={}) =>{
    const response = await fetch(url, {
        method:'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });

    try {
       const newData =  await response.json();    
       return newData;
    } catch (error) {
        console.log("error", error)
    }
};


const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
  
    // Write updated data to DOM elements
    temp.innerHTML = Math.round(allData.temp)+ '°C';
    feel.innerHTML = allData.feelings;
    showDate.innerHTML =newDate;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}

