displayColors()
displayEvents()

const eventsCont = document.querySelector('.chosenday__events')

let id = 0
// class for being able to create an object for an event
class AgendaEvent {
    constructor(id, title, description, type, date, reminder) {
        this.id = id
        this.title = title
        this.description = description
        this.type = type
        this.date = date
        this.reminder = reminder
    }
}
// clase for being able to create on object for the settings of the event
// contains type of event and value of the color
class ColorSettings {

    constructor(id, typeOfEvent, color) {
        this.id = id
        this.typeOfEvent = typeOfEvent
        this.color = color
    }
}
// empty list for storing the database information, once we retrieve, so we do not go back and forward in to the database
// faster performance (:
let events = []
// same applies for the color settings
let colorSettings = [
    new ColorSettings(0, "deadline", "010101"),
    new ColorSettings(0, "assignment", "010101"),
    new ColorSettings(0, "exam", "010101"),
    new ColorSettings(0, "shift", "010101"),
    new ColorSettings(0, "birthday", "010101"),
    new ColorSettings(0, "socialhappening", "010101"),
    new ColorSettings(0, "other", "010101"),

]
let items = [
    {
        id: id,
        title: "radka",
        description: "ceca",
        type: "assignment",
        date: "2022-12-15T15:55",
        reminder: "noreminder"
    }
]
// Here I am taking the information of the inputs for creating an event and push it in the list
// Happens every time when the "AddEvent" button is triggered
const addEventBtn = document.getElementById('add__event__agenda')
addEventBtn.addEventListener('click', (e) => {
    const title = document.getElementById('agenda__event__name')
    const type = document.getElementById('choose__type__event').value
    const description = document.getElementById('agenda__event__description').value
    const date = document.getElementById('date__time__event').value
    const reminder = document.getElementById('reminder__event').value
    events.push(new AgendaEvent(id++, title, description, type, date, reminder))
})

// Here I am taking the information of the inputs for the color settings and push it in the list
// Happens every time when the "Save Changes" button is triggered
const colorInputs = document.querySelectorAll('.colorSettings')
function changeColor() {
    for (let i = 0; i < colorInputs.length; i++) {
        colorInputs[i].addEventListener('change', () => {
            const typeOfEvent = colorInputs[i].getAttribute('name')
            const color = colorInputs[i].value
            let index = colorSettings.filter(s => s.typeOfEvent === typeOfEvent);
            colorSettings[index] = new ColorSettings(colorSettings[index].id, typeOfEvent, color);
        })
    }
}

let colorSaveBtn = document.getElementById('save__settings__agenda')
colorSaveBtn.addEventListener('click', changeColor())

function displayColors() {
    let deadline = document.querySelector('.deadline');
    let assignment = document.querySelector('.assignment');
    let exam = document.querySelector('.exam');
    let shift = document.querySelector('.shift');
    let birthday = document.querySelector('.birthday');
    let socialHappening = document.querySelector('.socialHappening');
    let other = document.querySelector('.other');

    // requesting the colors for the events
    fetch("http://localhost:3000/getColors")
        .then(data => data.json())
        .then(res => {

            if (res.color.length !== 0) {
                // setting the values of the colors for each event
                for (let i = 0; i < res.color.length; i++) {
                    colorSettings[i] = new ColorSettings(res.color[i]._id, res.color[i].typeOfEvent, res.color[i].color)

                    if (res.color[i].typeOfEvent === 'deadline') {
                        deadline.value = res.color[i].color
                    } else if (res.color[i].typeOfEvent === 'assignment') {
                        assignment.value = res.color[i].color
                    } else if (res.color[i].typeOfEvent === 'exam') {
                        exam.value = res.color[i].color
                    } else if (res.color[i].typeOfEvent === 'shift') {
                        shift.value = res.color[i].color
                    } else if (res.color[i].typeOfEvent === 'birthday') {
                        birthday.value = res.color[i].color
                    } else if (res.color[i].typeOfEvent === 'socialHappening') {
                        socialHappening.value = res.color[i].color
                    } else if (res.color[i].typeOfEvent === 'other') {
                        other.value = res.color[i].color
                    }

                }

            }

        })


}

function displayEvents() {
    //fetch request to agendaItems...
    console.log("fetch all agenda items");
    fetch("http://localhost:3000/agendaItems")
        .then(data => data.json()) //make the data a json file
        .then(resp => {
            events = resp.agenda; //put the response inthe list of events
            for (let i = 0; i < resp.agenda.length; i++) {

                // taking the date and time and separating them in two different variables
                const date = events[i].date.substring(0, 10)
                const time = events[i].date.substring(11)
                const type = events[i].type;

                let color

                // setting color
                for (let j = 0; j < colorSettings.length; j++) {

                    if (colorSettings[j].typeOfEvent === type.toLowerCase()) {
                        color = colorSettings[j].color
                    }
                }

                // taking the date divs, so I can stuff them with the events
                const datesDivs = document.querySelectorAll('.dates')
                datesDivs.forEach(dat => {

                    // taking their access key, which I already defined to correspond to the date of it
                    if (dat.getAttribute('accesskey') == date) {
                        // if the date of the event and the access key date correspond, create an element for displaying a dot for the event
                        // appending and some styling
                        const eventTick = document.createElement('div')
                        dat.lastChild.appendChild(eventTick)
                        eventTick.classList.add('tick')
                        eventTick.style.backgroundColor = `${color}`
                        eventTick.style.width = "0.5rem"
                        eventTick.style.height = "0.5rem"
                        
                    }
                });
            }
        })
}

// WORKING ON DISPLAYING FULL INFORMATION ABOUT EVENTS ON A SELECTED DATE

// Store the selected date in a variable
let selectedDate;
// get the container from the html
let eventsContainer = document.querySelector('.cont--cards')
// make an empty list, which we can fill with the events of the selected date
// I decided not to make a new fetch, as it slows down the whole process and is not good to go back and forth 
// in the database, I am going to be using the list of events, that I fetched earlier in the code
let eventsOnDay = "";
// variable for selected event to edit
let selectedEventForUpdate;
// const datesDivs = document.querySelectorAll('.dates')
// getting all the date divs and giving them all an event listener for when they are clicked
function DetailedEventsPreview  ()  {
    const datesDivs = document.querySelectorAll('.dates')
    datesDivs.forEach(date => {
        date.addEventListener('click', () => {
            // when the user clicks on a date, show the container with full information about events on that day
            eventsCont.style.display = "block";
            // get the access key of the selected date div
            selectedDate = date.getAttribute('accesskey');
            eventsOnDay = ""
            let selectedEvents = events.filter(event => event.date.substring(0, 10) === selectedDate)
    
            const selectedDate2 = selectedDate.substring(8, 10);
            const selectedMonth2 = selectedDate.substring(5, 7);
            const selectedYear2 = selectedDate.substring(0, 4);
    
            // chamging the date in the container, with the date that is selected
            let dateCont = document.getElementById('dateForCont')
            dateCont.innerHTML = `${selectedDate2}-${selectedMonth2}-${selectedYear2}`
            
            // if there are no events on the selected day, say this
            if (selectedEvents.length < 1) {
                eventsOnDay = `<p style="text-align:center; margin-top:1rem">No events due today. You can rest (:</p>`
            }
            let chosenColor;
    
            // accessing the color of the event
            for (let i = 0; i < selectedEvents.length; i++) {
                // accessing the color
                for (let j = 0; j < colorSettings.length; j++) {
                    if(colorSettings[j].typeOfEvent === selectedEvents[i].type){
                        chosenColor = colorSettings[j].color;
                    }
                }
                // rendering the events, using a template, and just changing the information
                eventsOnDay += ` <div class="event--card">
        <div class="main--info--event">
            <div class="info1">
                <div class="event--info--color" style="background-color:${chosenColor};"></div>
                <div class="event--info--name">${selectedEvents[i].title}</div>
            </div>
            <div class="info2">
                <div class="edit--event"><i class="fa-regular fa-pen-to-square editBUTON " value = "${selectedEvents[i]._id}" id="editEventIcon"></i></div>
                <div class="delete--event"><i class="fa-solid fa-trash" value = "${selectedEvents[i]._id}" id="deleteEventIcon"></i></div>
            </div>
        </div>
        <div class="info--description">${selectedEvents[i].description}</div>
    </div>`
    
            }
            // clean the container from events from prev dates
    
            eventsContainer.innerHTML = ""
            // display the events in the container
            eventsContainer.innerHTML = eventsOnDay
    
            //get the edit icon, and it's unique value, which is the id of the event, otherwise editing will not work
            let editIcons = document.querySelectorAll(".fa-pen-to-square")
            
            // deleting an event
            for (let index = 0; index < selectedEvents.length; index++) {
                let editIcon = editIcons[index];
    
                if (editIcon != null) {
                    deleteIcons = document.querySelectorAll("#deleteEventIcon")
                    deleteIcons.forEach(icon => {
                        icon.addEventListener("click", () => {
                            var editId = icon.getAttribute("value");
                            var eventBox = icon.parentElement.parentElement.parentElement.parentElement;
                            var colorDot = date.querySelector('.tick');

                            // removing the event from the array
                            let index = events.findIndex(e => e._id === editId)
                            events.splice(index, 1)
                            colorDot.remove();
                            eventBox.remove();
    
                            // deleting event in the back-end
                            fetch('http://localhost:3000/EVENT', {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    id: editId,
                                })
                            })
                                .then(data => data);
    
                        })
                    })
                    // editing an event
                    editIcon.addEventListener('click', () => {
                        // when the icon is triggered, show the edit modal with the information of the selected event filled in
                        modal3.classList.toggle("show-modal3");
                        selectedEventForUpdateID = editIcon.getAttribute('value');

                        const editsavebtn = document.querySelector("#edit__event__agenda");
    
                        for (let i = 0; i < selectedEvents.length; i++) {
    
                            if (selectedEvents[i]._id === selectedEventForUpdateID) {
                                eventData = selectedEvents[i]
    
                                editsavebtn.addEventListener("click", () => {
                                    var idedit = selectedEventForUpdateID;
                                    let title = document.querySelector(".updateTitle").value
                                    let description = document.querySelector(".updateDescription").value
                                    let type = document.querySelector(".updateType").value
                                    let date = document.querySelector(".updateTime").value
                                    let reminder = document.querySelector(".updateReminder").value
                                    
                                    // post for updating the event in the back-end
                                    fetch('http://localhost:3000/updateEvent', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            id: idedit,
                                            title: title,
                                            description: description,
                                            type: type,
                                            date: date,
                                            reminder: reminder
                                        })
                                    })
                                        .then(res => console.log(res));
                                    location.reload();
    
                                })
    
                            }
    
                        }
    
                        const title = document.getElementById('agenda__event__name1')
                        const type = document.getElementById('choose__type__event1')
                        const description = document.getElementById('agenda__event__description1')
                        const date = document.getElementById('date__time__event1')
                        const reminder = document.getElementById('reminder__event1')
    
                        title.value = eventData.title
                        description.value = eventData.description
                        type.value = eventData.type
                        date.value = eventData.date
                        reminder.value = eventData.reminder
                    })
                }
            }
        })
    })
}


DetailedEventsPreview()


function updateEvent(id, title, description) {
    // fetch('http://localhost:3000/updateEvent', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         id: id,
    //         title: title,
    //         description: description
    //     })
    // })
    //     .then(res => console.log(res));

}

let deleteIcon;
let eventId;

// deleting the event in the back-end by id
function deleteEvent(id) {
    fetch('http://localhost:3000/deleteEvent', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id,
        })
    })
        .then(res => console.log(res));

}