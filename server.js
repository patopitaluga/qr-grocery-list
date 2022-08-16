const path = require('path');
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
// app.use(bodyParser.json()); // parse application/json

// app.engine('html', require('express-es6-template-engine'));
// app.set('view engine', 'html');
// app.set('views', 'views');
app.use(express.static('public'));

// require('./routes')(app);
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, './views/index.html'));
});
app.get('/list', function (req, res) {
  res.sendFile(path.resolve(__dirname, './views/list.html'));
});

app.post('/api/login', function (req, res) {
  res.send({
    valid: true,
  });
});

app.listen((process.env.PORT || 3000), function () {
  console.log('App listening on port ' + (process.env.PORT || 3000));
});

/**
 * 404 page middleware must be set AFTER all routes, static (public) middleware AND webpack virtual files because only if any of these urls are served it must show 404 page.
 */
app.use((req, res) => {
  res.status(404).send('Content not found');
  // return res.status(404).render('page404.html', { });
});
