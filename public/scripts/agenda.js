const date = new Date()

// function for rendering the calendar
const renderCalendar = () => {
    date.setDate(1)

    const monthDays = document.querySelector('.days__agenda')
    let lastDay = 0
    let lastDayIndex = 0
    // if it is the last month, add one more year, when going to next month (January)
    if (date.getMonth() == 11) {
        lastDay = new Date(date.getFullYear() + 1, 0, 0).getDate()
        // console.log(lastDay)
        lastDayIndex = new Date(date.getFullYear() + 1, 0, 0).getDay()
        // console.log(lastDayIndex)
    }
    else {
        lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
        lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay()
    }

    //first day of current month - day of the week 
    const firstDayIndex = date.getDay()
    console.log(firstDayIndex)

    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate()

    console.log(prevLastDay)
    //day of the week of the last day of the current month
    const nextDays = 7 - lastDayIndex

    // Array with the months, because they never change
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    // Dynamically updating the current date
    document.querySelector('.date__agenda h1').innerHTML = months[date.getMonth()]
    document.querySelector('.date__agenda p').innerHTML = new Date().toDateString()

    let days = ''


    function checker(index, string) {
        if (index < 10) {
            return `0${string}`
        }
        else {
            return `${string}`
        }
    }

    let year = date.getFullYear()
    console.log(firstDayIndex)

    // displaying days from previous month
    let counter;
    if(firstDayIndex === 0){
        counter = 6
    }
    else{
        counter = firstDayIndex - 1
    }
    for (let x = counter; x > 0; x--) {
    // for (let x = firstDayIndex; x > 0; x--) {
        console.log(firstDayIndex)
        console.log(prevLastDay)
        days += `<div class="prev-date dates" accesskey="${year}-${date.getMonth()}-${prevLastDay - x + 1}">${prevLastDay - x + 1}<div class="circleContainer"></div></div>`
    }
    // displaying days from current month
    for (let i = 1; i <= lastDay; i++) {

        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {

            days += `<div class="today dates" accesskey="${year}-${checker((date.getMonth() + 1), (date.getMonth() + 1))}-${checker(i, i)}">${i}<div class="circleContainer"></div></div>`



        } else {

            days += `<div class="dates" accesskey="${year}-${checker((date.getMonth() + 1), (date.getMonth() + 1))}-${checker(i, i)}">${i}<div class="circleContainer"></div></div>`

            //days += `<div class="dates key=2022-${months.indexOf(months[date.getMonth()])}-${i}">${i}</div>`
        }
        monthDays.innerHTML = days
    }
    // displaying days from next month
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date dates" accesskey="${year}-${date.getMonth() + 2}-0${j}">${j}<div class="circleContainer"></div></div>`
        monthDays.innerHTML = days;
    }

}

// browsing through months and calling the function for agenda rendering
document.querySelector('.prev').addEventListener('click', () => {
    if (date.getMonth() == 0) {
        date.setMonth(11)
        date.setFullYear(date.getFullYear() - 1)
       
    }
    else {
        date.setMonth(date.getMonth() - 1)
    }
    renderCalendar()
    displayEvents()
    DetailedEventsPreview()
    
})

// browsing through months and calling the function for agenda rendering
document.querySelector('.next').addEventListener('click', () => {
    if (date.getMonth() == 11) {
        date.setMonth(0)
        date.setFullYear(date.getFullYear() + 1)
        // console.log(date.getFullYear())
    }
    else {
        date.setMonth(date.getMonth() + 1)
    }
    renderCalendar()
    displayEvents()
    DetailedEventsPreview()
})

renderCalendar()

//Settings Modal
const modal = document.querySelector(".modal__settings__agenda");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

// function for hiding/showing modal
function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

//Add Event Modal
const modal2 = document.querySelector(".modal__event__agenda");
const trigger2 = document.querySelector(".trigger2");
const closeButton2 = document.querySelector(".close-button2");

// function for hiding/showing modal
function toggleModal2() {
    modal2.classList.toggle("show-modal2");
}

function windowOnClick2(event) {
    if (event.target === modal2) {
        toggleModal2();
    }
}

trigger2.addEventListener("click", toggleModal2);
closeButton2.addEventListener("click", toggleModal2);
window.addEventListener("click", windowOnClick);


//Edit Event Modal
const modal3 = document.querySelector(".modal__event__agenda3");
const trigger3 = document.querySelector(".trigger3");
const closeButton3 = document.querySelector(".close-button3");

// function for hiding/showing modal
function toggleModal3() {
    modal3.classList.toggle("show-modal3");
}

function windowOnClick3(event) {
    if (event.target === modal3) {
        toggleModal3();
    }
}

// trigger3.addEventListener("click", toggleModal3);
trigger3.addEventListener('click', toggleModal3)
closeButton3.addEventListener("click", toggleModal3);
window.addEventListener("click", windowOnClick);

// Events container show/hide

const closeContBtn = document.getElementById('close-cont-icon')

function closeContEvents() {
    eventsCont.style.display = "none"
}
closeContBtn.addEventListener("click", closeContEvents)