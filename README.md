# Student Corner
This project was done for our client LiveWall. We had to create a digital substitution to something that already existed

## Concept

Student Corner`s whole purpose and structure are based on the concept "Learning is a process, not a single action". We synthesized this sentence on our way to solving our main design challenge i.e. student struggle with concentration and organization. <br>

The overarching goal of Student Corner is not just to give students the mainstream tools, but to teach them the healthy habit of learning. Our team wants to engage the users in a simple cycle where we navigate them to take simple steps which will eventually lead them to the final goal. <br> 

For example, it can be a deadline, an exam, or another event. For this reason, we carefully selected the necessary tools (agenda, to-do lists, notes, focus mode) and organized them in the correct order. So, the student has to take as few decisions as possible. Basically, Student Corner is also based on the principle of "Divide and Conquer".
## Project structure

The project structure: 
```
$PROJECT_ROOT
├── middlewares
│       # authentication for the user
├── models
│       # models for each thing that is saved in the database 
├── public
│       # static files such as: styling, scripts images and assets
├── startup
│       # database connection and view engine settings
├── views / partials
│       # .ejs pages for our website, footer and header set-up
├── app.js
│       # server-side file containing all of the settings for our website
└── packages
```
## Website contents

The website consists of (pages):
- A landing page (an introduction page for Student Corner consisting of the benefits and tools of the product )
- A log in page 
- A register page
- A home page (consisting of the tools and information about the user)
- A profile page (consisting of the achievements of the user)
- Each tool has a dedicated page

The website consists of (functions):
- Responsive Design
- Tooltips (designed to contain short information about certain things that may confuse the user)
- Logging in and registration processes (the accounts are saved in the database)
- Checks for preventing a user to see restricted content and log in / register checks
- Achievements (recieve achievements for the different activites that you do)
- A focus mode (tracking your time spent studying, playing concentration music, scan the QR code and connect your phone to the focus mode)
- Notes app (add, save, edit and delete different notes, each note is saved in the database)
- To-Do lists (add, save, edit and delete different todos, each todo is saved in the database)
- Agenda (add, save, edit and delete different events, each event is saved in the database, unique customization of events and event categories)

## Website structure

The website structure: 
```
┌       #Navigation menu ( Home, Tools, Benefits, Profile(icon), Focus Mode, Focus Mode Settings(kebab menu) )
├── Landing Page
│       # Introduction to Student Corner, Benefits, Tools, Footer 
├── Log in Page
│       # Modals for logging in or registering a new user
├── Homepage
│       # Welcome back, Log out, Tools
│── Profile Page
│       # Achievements status
│── Agenda
│       # Agenda calendar, settings, add a new event
│── To-Do list
│       # Add a new to-do list,save the todo,edit the todo, delete the to-do list, color settings
│── Notes
│       # Add a new note, save the note, edit the note, delete the note, color settings
└── Log out
```
# Installation
First, you need to have Node.js installed on your device. To check if you already have it type '$ node -v' in the terminal. If you have it, the terminal will return the Node.js version, or if you don't have it, the terminal you notify you. Visit https://nodejs.org/en/ to install Node.js.

Then, you need to install the packages listed below:

```bash
$ npm i express mongoose bcrypt cookie-session
or run to install all packages in one $ npm install 
```

After you install the packages you have to go to the project`s folder and run the project using ***node app.js***
- If you have successfully installed the necessary packages the command will take you to ***http://localhost:3000/***
- If there are any errors, they should be displayed in the terminal. The errors occur only when you have not installed the necessary packages.
# Credits
### Team
* <a href="https://git.fhict.nl/I477568">Aleksandar Karamirev</a>
* <a href="https://git.fhict.nl/I478026">Mia Vasilevska</a>
* <a href="https://git.fhict.nl/I477569">Gabriela Simeonova</a>
* <a href="https://git.fhict.nl/I478165">Tsveta Pandurska</a>
* <a href="https://git.fhict.nl/I478650">Viktor Velizarov</a>

### Attribution
Thanks to Fontys University of Applied Sciences and LiveWall for making this project and experience possible. <br>


