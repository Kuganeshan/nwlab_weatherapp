const express = require ('express');
const server = express();
const hbs = require('hbs');
const axios = require ('axios');
const bodyParser =require('body-parser');

server.use(bodyParser.urlencoded({extended: true}));
server.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

server.get('/', (req,res) => {
  res.render('main.hbs');
});

server.get('/main', (req,res) => {
  res.render('main.hbs');
});

server.post('/form',(req,res)=> {
  res.render('form.hbs');
});

server.get('/results',(req,res)=> {
  res.render('results.hbs');
});
server.post('/getweather', (req, res) => {
  const addr = req.body.address;


  //res.render('main.hbs',{
    //title: 'Hola amigo',
  //message: 'welcome to my house',});
  const locationReq = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyCGCxQf4yOMG9yCsqQ9CzHKjUcs14fqDY4`;

  axios.get(locationReq).then((response) => {
    console.log(response.data.results[0].formatted_address);
    //console.log('lat =',response.data.results[0].geometry.location.lat);
    const lat =response.data.results[0].geometry.location.lat;
    const lng =response.data.results[0].geometry.location.lng;
    const weatherReq = `https://api.darksky.net/forecast/3212c4fbdaa96a2aa80206cd67ee6ec1/${lat},${lng}`;
    return axios.get(weatherReq);
  }).then((response) => {

    res.render('results.hbs', {
      address: addr,
      summary: response.data.currently.summary,
      temperature: (response.data.currently.temperature -32) * 0.5556,

    });
    console.log(response.data.currently.summary);
    const temp = (response.data.currently.temperature - 32) * 0.5556;
    const temperature = temp.toFixed(2);
    console.log(`${temp} Celsius`);

  })
  .catch((error)  => {
    console.log(error.code);
  });

});

server.get('/form', (req, res) => {
  res.render('form.hbs');
    //currentdate: new Date().toDateString(),
  });

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
