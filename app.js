//do not delete or touch anything here, only add new packages that are going to be used
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
//npm install these packages in order to make the product work on your pc(not really sure if you need them, just in case)

const User = require("./models/User"); //add your model like so in order to implement it

const authenticateUser = require("./middlewares/authenticateUser"); //for authentication, implement this if you want your content 
                                                                    //to be viewed only after the user have logged in
                                                                    //if you want to understand it a bit more check the middlewares folder
const app = express();

require('./startup/db')(); //connected to the database
require('./startup/middleware')(app); //using the middleware in order to convert the .html file to .ejs
                                      //check the folder if you want to understand it a bit better

// cookie session
app.use(
  cookieSession({
    keys: ["randomStringASyoulikehjudfsajk"],
  })
);

// route for serving frontend files - be sure to add your pages here, this is how they will be accessed by the user
app
  .get("/", (req, res) => {
    res.render("index");
  })
  .get("/login", (req, res) => {
    res.render("login");
  })
  .get("/register", (req, res) => {
    res.render("register");
  })
  .get("/home", authenticateUser, (req, res) => {
    res.render("home", { user: req.session.user }); //if the user is not logged in he does not have access to the homepage, 
                                                    //be sure to implement this if your page will be accessible only when you login
  });

// route for handling post requirests - be sure to include yours if you have to make POST requests
app
  .post("/login", async (req, res) => {
    const { email, password } = req.body;

    // checks for missing fields - ignore it 
    if (!email || !password) return res.send("Please enter all the fields");

    const doesUserExits = await User.findOne({ email });

    if (!doesUserExits) return res.send("invalid username or password");

    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExits.password
    );

    if (!doesPasswordMatch) return res.send("invalid username or password");

    // else he\s logged in
    req.session.user = {
      email,
    };

    res.redirect("/home");
  })
  .post("/register", async (req, res) => {
    const { email, password } = req.body;

    // checks for missing fields and already registered users
    if (!email || !password) return res.send("Please enter all the fields");

    const doesUserExitsAlreay = await User.findOne({ email });

    if (doesUserExitsAlreay) return res.send("A user with that email already exits please try another one!");

    // encrypts the password in the database
    const hashedPassword = await bcrypt.hash(password, 12);
    const latestUser = new User({ email, password: hashedPassword });

    latestUser //this saves the users in the database
      .save()
      .then(() => {
        res.send("registered account!");
        res.redirect("/login");
      })
      .catch((err) => console.log(err));
  });

//logout
app.get("/logout", authenticateUser, (req, res) => {
  req.session.user = null;
  res.redirect("/login");
});

app.use(express.static(__dirname + '/public')); // all the css js files are in the folder,
                                                // be sure to put yours there as well (css and js won`t be shown otherwise)


// server config - you do not need to change this as well
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started listening on port: ${PORT}`);
});
