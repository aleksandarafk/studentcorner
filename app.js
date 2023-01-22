//do not delete or touch anything here, only add new packages that are going to be used
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
//npm install these packages in order to make the product work on your pc(not really sure if you need them, just in case)

const User = require("./models/User"); //add your model like so in order to implement it
const Note = require("./models/Note");
const Agenda = require("./models/Agenda");
const Color = require("./models/Color")
const Todo = require("./models/ToDo");

const authenticateUser = require("./middlewares/authenticateUser"); //for authentication, implement this if you want your content
//to be viewed only after the user have logged in
//if you want to understand it a bit more check the middlewares folder
const app = express();

require("./startup/db")(); //connected to the database
require("./startup/middleware")(app); //using the middleware in order to convert the .html file to .ejs
//check the folder if you want to understand it a bit better

// cookie session
app.use(
  cookieSession({
    keys: ["randomStringASyoulikehjudfsajk"],
  })
);

//used for notes: body parser to take info from the DOM and save it
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

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
  .get("/notes", (req, res) => {
    res.render("notes");
  })

  .get("/agenda", (req, res) => {
    res.render("agenda");
  })

  .get("/todo", (req, res) => {
    res.render("todo");
  })
  .get("/profile", authenticateUser, (req, res) => {
    res.render("profile", { user: req.session.user });
  })
  .get("/home", authenticateUser, (req, res) => {
    res.render("home", { user: req.session.user }); //if the user is not logged in he does not have access to the homepage,
    //be sure to implement this if your page will be accessible only when you login
  });

// route for handling post requirests - be sure to include yours if you have to make POST requests
app
.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

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

    if (doesUserExitsAlreay)
      return res.send(
        "A user with that email already exits please try another one!"
      );

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
  })

  // post for saving new events
  .post("/addEvent", async (req, res) => {
   const { title, description, date, type, reminder} = req.body;
   console.log('------------------', req.body);
    console.log({ title,
      description, 
      type,
      date,
      reminder}) 
    // fill the object with the information
    const event = new Agenda({ title,
                               description, 
                               type,
                               date,
                               reminder});
    // save to the database and redirect
    event.save() 
         .then(() => {
          console.log('success')
          res.redirect("/agenda").end();
    })
    .catch((err) => console.log(err));

  });
  // Post for saving changes of the colors of events
  app.post("/color", async(req, res) => {

    let data = req.body;

    const colorSetting1 = new Color 
    ({
      color: data.deadline, 
      typeOfEvent: "deadline"
    })
    const colorSetting2 = new Color 
    ({
      color: data.assignment, 
      typeOfEvent: "assignment"
    })
    const colorSetting3 = new Color 
    ({
      color: data.exam, 
      typeOfEvent: "exam"
    })
    const colorSetting4 = new Color 
    ({
      color: data.shift, 
      typeOfEvent: "shift"
    })
    const colorSetting5 = new Color 
    ({
      color: data.birthday, 
      typeOfEvent: "birthday"
    })
    const colorSetting6 = new Color 
    ({
      color: data.socialhappening, 
      typeOfEvent: "socialhappening"
    })
    const colorSetting7 = new Color 
    ({
      color: data.other, 
      typeOfEvent: "other"
    })

    Color.deleteMany({}, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("deleted");
      }
    }
  )
    colorSetting1.save();
    colorSetting2.save();
    colorSetting3.save();
    colorSetting4.save();
    colorSetting5.save();
    colorSetting6.save();
    colorSetting7.save();


  });

// post for updating an event
  app.post("/updateEvent", async(req, res) => {
      let data = req.body
      console.log(data)
      Agenda.findByIdAndUpdate(data.id, { title: data.title , description: data.description, type: data.type, date: data.date, reminder: data.reminder},
        function (err, docs) {
          if (err) {
            console.log("err is 0" + err)
          }
          else {
            console.log("Updated Note : ", docs);
          }
        });
    
  })

  // deleting an event
  app.delete('/EVENT', (req, res) => {
    //takes the data from the server (need ID)
    let data = req.body;
    //finds the event which has to be deleted by ID
    Agenda.findByIdAndDelete(data.id, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("deleted");
      }
    });
  })

// getting the colors for the events
  app.get("/getColors", (req, res) => {
    Color.find({}, (err, color) => {
      if (err) {
        console.log(err);
      }
      console.log(color)
      res.send({color})
    })
  });
// get for loading and displaying all events
app.get("/agendaItems", (req, res) => {
  console.log('Received request for agenda');
  Agenda.find( {}, (err, agenda) => {
    if (err) {
      console.log(err);
    }
    res.send({agenda})
  })
});


//----Notes----//

//get request to retrieve all the notes from DB
app.get("/notesItems", (req, res) => {
  Note.find({}, (err, note) => {
    if (err) {
      console.log(err);
    }
    // sends {notes} array to the server
    res.send({ note });
  });
});

//post request to add note to the DB
app.post("/addnote", (req, res) => {
  //data from our server/DOM
  let data = req.body;

  //create the note using the schema
  const note = new Note({
    title: data.title,
    date: data.date,
    color: data.color,
  });
  // save to mongoDB
  note.save((error) => {
    if (error) {
      // Handle the error
    } else {
      console.log("note added in DB");
      res.send("DONE");
    }
  });
});

//Delete request to remove the note
app.delete("/deletenotes", (req, res) => {
  //takes the data from the server (need ID)
  let data = req.body;
  //finds the note which has to be deleted by ID
  Note.findByIdAndDelete(data.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("deleted");
    }
  });
});

//post request to update/edit the note
app.post("/updatenote", (req, res) => {
  //takes the data from the server (need ID and the new text)
  let data = req.body;
  //finds the note which has to be edites by ID and updates its title attribute
  Note.findByIdAndUpdate(data.id, { title: data.title }, function (err, docs) {
    if (err) {
      console.log("err is 0" + err);
    } else {
      console.log("Updated Note : ", docs);
    }
  });
});


//------Todo---//


//get request to retrieve all the notes from DB
app.get('/TodoItems', (req, res) => {
  Todo.find({}, (err, todo) => {
    if (err) {
      console.log(err)
    }
    // sends {toto} array to the server
    console.log(todo)
    res.send(todo)
  })
})




//post request to add note to the DB
app.post("/addtodo", (req, res) => {
  //data from our server/DOM
  let data = req.body
  console.log(data)

  //create the todo using the schema
  const todo = new Todo({
    title: data.title,
    description: ["","",""],
    color: data.color
  });
  // save to mongoDB
  todo.save((error) => {
    if (error) {
      // Handle the error
      console.log(error)
    } else {
      console.log('todo list added in DB')
      res.send("DONE");
    }
  });
})

//Delete request to remove the note
app.delete('/deletetodo', (req, res) => {
  //takes the data from the server (need ID)
  let data = req.body;
  //finds the note which has to be deleted by ID
  Todo.findByIdAndDelete(data.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("deleted");
    }
  });
})

//post request to update/edit the todo
app.post('/updatetodo', (req, res) => {
  //takes the data from the server (need ID and the new text)
  let data = req.body;
  console.log(data)
  //finds the todo which has to be edites by ID and updates its title attribute
  Todo.findByIdAndUpdate(data.id, { title: data.title, description:data.description },
    function (err, docs) {
      if (err) {
        console.log("err is 0" + err)
      }
      else {
        console.log("Updated Todo : ", docs);
      }
    });

})



//logout
app.get("/logout", (req, res) => {
  req.session.user = null;
});

app.use(express.static(__dirname + "/public")); // all the css js files are in the folder,
// be sure to put yours there as well (css and js won`t be shown otherwise)

// server config - you do not need to change this as well
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started listening on port: ${PORT}`);
});
