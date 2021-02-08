const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

    res.sendFile(__dirname + "/index.html");

})

app.post('/', (req, res) => {
    const query = req.body.cityName;
    const apiKey = "dbdabe71e7f86543f50f98ddb8e432c1";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconSrc = `\'http://openweathermap.org/img/wn/${icon}@2x.png\'`;
            // res.write('<h1> The temperature in Toronto is ' + temp + '.</h1>');
            res.send("<img src=" + iconSrc + ">");


        })
    })
})



app.listen(3000, () => {
    console.log('Listening to port 3000.');
})