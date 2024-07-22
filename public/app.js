/* Global Variables */
const apiKey = '1023702f36e1416c9815cc60668f1155&units=imperial';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getWeatherData(zip)
  .then(function(data){
    postData('/add', { date: new Date().toLocaleDateString(), temp: data.main.temp, feelings: feelings })
    .then(function(){
      retrieveData();
    });
  });
}

const getWeatherData = async (zip) => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`);
  try {
    const data = await res.json();
    return data;
  } catch(error) {
    console.log('error', error);
  }
}

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch(error) {
    console.log('error', error);
  }
}

const retrieveData = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
    document.getElementById('content').innerHTML = allData.feelings;
    document.getElementById('date').innerHTML = allData.date;
  } catch(error) {
    console.log('error', error);
  }
}
