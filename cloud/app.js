
var express = require('express');
var parseExpressHttpsRedirect = require('parse-express-https-redirect');
var parseExpressCookieSession = require('parse-express-cookie-session');
var app = express();

app.set('views', 'cloud/views');
app.set('view engine', 'ejs');
app.use(parseExpressHttpsRedirect());  // Require user to be on HTTPS.
app.use(express.bodyParser());
app.use(express.cookieParser('YOUR_SIGNING_SECRET'));
app.use(parseExpressCookieSession({ cookie: { maxAge: 3600000 } }));

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'This hello page was created by Nates PC!  Using Git and Parse!' });
});


// You could have a "Log In" link on your website pointing to this.
app.get('/login', function(req, res) {
  // Renders the login form asking for username and password.
  res.render('login.ejs');
});

// Clicking submit on the login form triggers this.
app.post('/login', function(req, res) {
  Parse.User.logIn(req.body.username, req.body.password).then(function() {
    // Login succeeded, redirect to homepage.
    // parseExpressCookieSession will automatically set cookie.
    res.redirect('/');
  },
  function(error) {
    // Login failed, redirect back to login form.
    res.render('login', {flash: error.message});
  });
});

// Clicking submit on the login form triggers this.
app.post('/signup', function(req, res) {
  Parse.User.signUp(req.body.username, req.body.password, { ACL: new Parse.ACL()}).then(function() {
    // Login succeeded, redirect to homepage.
    // parseExpressCookieSession will automatically set cookie.
    res.redirect('/');
  },
  function(error) {
    // Login failed, redirect back to login form.
    res.render('login', {flash: error.message});
  });
});

// Clicking submit on the login form triggers this.
app.post('/addpart', function(req, res) {
    Parse.Cloud.run('savePart', {name: req.body.part}).then(function(results){
        console.log(req.body.part + 'saved');
      },function(error){
          console.log(error.message);
    });
    res.redirect('/');
});

// You could have a "Log Out" link on your website pointing to this.
app.get('/logout', function(req, res) {
  Parse.User.logOut();
  res.redirect('/');
});

// The homepage renders differently depending on whether user is logged in.
app.get('/', function(req, res) {
  if (Parse.User.current()) {
    res.render('admin', { message: 'This hello page was created by Nates PC!  Using Git and Parse!' });
  } else {
    res.render('home', { message: 'This hello page was created by Nates PC!  Using Git and Parse!' });
  }
});

// You could have a "Profile" link on your website pointing to this.
app.get('/profile', function(req, res) {
  // Display the user profile if user is logged in.
  if (Parse.User.current()) {
    // We need to fetch because we need to show fields on the user object.
    Parse.User.current().fetch().then(function(user) {
      // Render the user profile information (e.g. email, phone, etc).
    },
    function(error) {
      // Render error page.
    });
  } else {
    // User not logged in, redirect to login form.
    res.redirect('/login');
  }
});


// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();
