const addThemebtn = document.querySelector('.add_card');
const cardThemes = document.querySelectorAll('.card_themes');
const cardTheme = document.querySelectorAll('.card_theme');
const cardContainer = document.querySelector('.card_container');
const template = document.querySelector('.card_template');
const cardEditBtn = document.getElementById("card_edit_btn")

var count = 0;

const CardContent = [];

displayTodos();

// cardEditBtn.addEventListener("click", (e) => {
//     console.log(e.target)
// })

addThemebtn.addEventListener('click', () =>{

    if(count%2 === 0){
        for (let index = 0; index < cardTheme.length; index++) {
            setTimeout(function(){
                cardTheme[index].style.transform = `translateY(0px)`;
                cardTheme[index].style.display = "block";
            }, 50 * index);
            
        }
    }else{
        for (let index = 0; index < cardTheme.length; index++) {
            setTimeout(function(){
                cardTheme[cardTheme.length - 1 -index].style.transform = `translateY(calc(${cardTheme.length - 1 - index} * -40px))`;
                cardTheme[cardTheme.length - 1 -index].style.display = "none";
            }, 50 * index);
            
        }
    }
    count++;
  
})

var cardID = 0;

cardTheme.forEach(elem =>{
  elem.addEventListener('click', ()=>{

    if(document.querySelector('.card_template')){
        document.querySelector('.card_template').remove();
    }
    cardID++;
    let color = elem.style.backgroundColor;
    const card = document.createElement('div');
    card.classList.add('card', 'addCard');
    card.id=`card-${cardID}`;

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let months= ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    card.innerHTML = `
    <div class="cardReal addCard" id="card`+cardID+`">
    <input id="card_title-`+ cardID+`" class="card_title" name="title" value="Write Something">
    </input>
    <span class="card_footer">
    <span>
    <a  class="icon" id="expandBtn-`+ cardID +`" onclick="myFunction1(`+cardID+`)">
    <i class="fa fa-arrow-circle-down" aria-hidden="true"></i>

    <a  class="icon1" id="expandBtn1-`+ cardID +`" onclick="smallCard1(`+cardID+`)">
    <i class="fa fa-arrow-circle-up" aria-hidden="true"></i>


    <a class="card_delete"><i class="fa fa-times-circle fa-2x " aria-hidden="true"></i></a>
</a>
    
        <small class="card_edit"><i class="fas fa-save"></i></small>
       
    </span>
    <form >
    <input type="checkbox" id="check" class="checks card-`+cardID+`>
    <input placeholder="Add event" id="card-`+cardID+` "  class="inputs card-`+cardID+`" type="text">
        
    <input type="checkbox" id="check" class="checks card-`+cardID+`  ><input id="check" type="checkbox">
    <input placeholder="Add event" id="card-`+cardID+`"   class="inputs card-`+cardID+`" type="text">

    <input type="checkbox" id="check" class="checks card-`+cardID+`  ><input id="check" type="checkbox"> 
    <input placeholder="Add event" id="card-`+cardID+` "  class="inputs card-`+cardID+`" type="text">

    <input type="checkbox" id="check" class="checks card-`+cardID+`  ><input id="check" type="checkbox"> 
    <input placeholder="Add event" id="card-`+cardID+` "  class="inputs card-`+cardID+`" type="text">
    </form>
</div>
    `;

    card.querySelector('.card_edit').addEventListener("click", (e) => {
        //click to edit
            const card = e.target.parentNode.parentNode.parentNode.parentNode

           const cardId = card.id.split('-')[1]
            let newTitle = document.getElementById(`card_title-${cardId}`).value;
            let newDescriptions = []
            let inputs = document.getElementsByClassName(`inputsCard-${cardId}`)
            console.log(inputs.lengthS)
            for (let i = 0; i <  inputs.length; i++) {
                const element = inputs[i];
                console.log(newDescriptions)
                newDescriptions.push(element.value)
            }



            //this fetch edit/save the note by sending the edited note ID and the new text
            fetch('http://studentcorner.onrender.com/updatetodo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: cardId,
                    title: newTitle,
                    description: newDescriptions
                    /* other product data */
                })
            })
                .then(res => console.log("udpated"));

        

    })
                
        //sends the title, date and the color to the server 
        fetch('http://studentcorner.onrender.com/addtodo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: "Write something...",
                description: ["", "", ""],
                color: color
            })
        })

     //sends the title, description and the color to the server
// fetch('http://localhost:3000/addTodo', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//         title: title,
//         description: description,
//         color: color
//     })
// })

// //.then(res => res.json())
// .then(res => console.log(res));





    //putting the card the chosen color
    card.style.backgroundColor = color;
    cardContainer.prepend(card);


    const cards = document.querySelectorAll('.card');

    cards.forEach((card, cardCount) =>{

                card.querySelector('.card_edit').innerHTML = `<i class= "fas fa-save"></i>`
    })
  })
})



//this function is used to read the todo lists from the database
function displayTodos() {
    console.log('fetch get todo')
    //this fetch requests all the todo lists from the server
    fetch('http://studentcorner.onrender.com/todoItems')
        .then(data => data.json())
        .then(resp => {
            //the res returns an array with all the todo lists
            for (let i = 0; i < resp.length; i++) {
                // if (resp.todo.length >= 1) {
                    // if (template) {
                    //     template.remove();
                    // }
                // }
               
                //the functions is identical to the function above which creates todos
                const card = document.createElement('div');
                card.classList.add('card', 'addCard');
                let cardID=resp[i]._id
                let title=resp[i].title
                card.setAttribute('data-id', `${resp[i]._id}`);

                card.innerHTML = `
                <div class="cardReal addCard" id="card-`+cardID+`">
                <input id="card_title-`+ cardID+`" class="card_title" name="title" value="`+title+`">
                </input>
                <span class="card_footer">
                <span>
                <a  class="icon" id="expandBtn-`+ cardID +`" onclick="myFunction('`+cardID+`')">
                <i class="fa fa-arrow-circle-down" aria-hidden="true"></i>
            
                <a  class="icon1" id="expandBtn1-`+ cardID +`" onclick="smallCard('`+cardID+`')">
                <i class="fa fa-arrow-circle-up" aria-hidden="true"></i>
            
            
                <a class="card_delete"><i class="fa fa-times-circle fa-2x " aria-hidden="true"></i></a>
            </a>
                
                    <small class="card_edit"><i class="fas fa-save"></i></small>
                   
                </span>
                <form >
                <input type="checkbox" id="check" class="checks card-`+cardID+`>
                <input placeholder="Add event" id="card-`+cardID+` "  class="inputs card-`+cardID+`" type="text">
                
                <input type="checkbox" id="check" class="checks card-`+cardID+`  ><input id="check" type="checkbox">
                <input placeholder="Add event" id="card-`+cardID+`"   class="inputs card-`+cardID+`" type="text" value="`+resp[i].description[0]+`">
            
                <input type="checkbox" id="check" class="checks card-`+cardID+`  ><input id="check" type="checkbox"> 
                <input placeholder="Add event" id="card-`+cardID+` "  class="inputs card-`+cardID+`" type="text" value="`+resp[i].description[1]+`">
            
                <input type="checkbox" id="check" class="checks card-`+cardID+`  ><input id="check" type="checkbox"> 
                <input placeholder="Add event" id="card-`+cardID+` "  class="inputs card-`+cardID+`" type="text" value="`+resp[i].description[2]+`">
                </form>
            </div>
                `;

                card.style.backgroundColor = resp[i].color;
                cardContainer.prepend(card);

                const cards = document.querySelectorAll('.cardReal');
                //edit the content of the cards
                cards.forEach((card, cardCount) => {

                    card.querySelector('.card_edit').addEventListener("click", (e) => {
                        //click to edit
                            const card = e.target.parentNode.parentNode.parentNode.parentNode

                           const cardId = card.id.split('-')[1]
                           console.log(cardId)
                            let newTitle = document.getElementById(`card_title-${cardId}`).value;
                            let newDescriptions = []
                            let inputs = document.getElementsByClassName(`inputsCard-${cardId}`)
                            console.log(inputs.lengthS)
                            for (let i = 0; i <  inputs.length; i++) {
                                const element = inputs[i];
                                console.log(newDescriptions)
                                newDescriptions.push(element.value)
                            }
                            console.log(newTitle)



                            //this fetch edit/save the note by sending the edited note ID and the new text
                            fetch('http://studentcorner.onrender.com/updatetodo', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    id: cardId,
                                    title: newTitle,
                                    description: newDescriptions
                                    /* other product data */
                                })
                            })
                                .then(res => console.log("udpated"));

                        

                    })
                })


                  //delete a note both from the DOM and thr data base
                  card.querySelector('.card_delete').addEventListener('click', () =>{
                    //removes from the DOM
                    card.remove();
                    let id= card.dataset.id;

                    //this fetch sends delete request to the server which removes it from the database
                    fetch('http://studentcorner.onrender.com/deletetodo', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: id,
                            /* other product data */
                        })
                    })
                        .then(res => console.log(res));
                       
                })
            }
        });

}


let id = 0;
function showUniqueId() {
  id++;
  return `input-${id}`;
}


function myFunction(cardID){

    
    var cardInput = Array.from( document.getElementsByClassName(`card-${cardID}`)) 
    
    cardInput.forEach(function(e) {e.style.display="block", e.style.outline="0px"})
    
    
    let card = document.querySelector(`[data-id='${cardID}']`)  
    var btn = document.querySelector("#expandBtn-"+cardID)
    let btn1 = document.querySelector("#expandBtn1-"+cardID)
 
    
    btn1.style.display = "block"
    btn.style.display = "none"
    card.style.height = "21rem"  
    
}

function myFunction1(cardID){
    console.log(cardID)
    var input = Array.from( document.getElementsByClassName(`card-${cardID}`)) 
    
    input.forEach(function(e) {e.style.display="block", e.style.outline="0px"})
    
   
    let card = document.getElementById(`card-${cardID}`)  
    var btn = document.querySelector("#expandBtn-"+cardID)
    let btn1 = document.querySelector("#expandBtn1-"+cardID) 

    btn1.style.display = "block"
    btn.style.display = "none"
    card.style.height = "21rem"  
    
}



function smallCard(cardID){

    var input = Array.from( document.getElementsByClassName(`card-${cardID}`)) 

    input.forEach(function(e) {e.style.display="none"})

    
    let card = document.querySelector(`[data-id='${cardID}']`) 
    var btn = document.querySelector("#expandBtn-"+cardID) 
    let btn1 = document.querySelector("#expandBtn1-"+cardID)

    
    btn.style.display = "block"
    btn1.style.display = "none"
    card.style.height = "6rem"
}

function smallCard1(cardID){

    var input = Array.from( document.getElementsByClassName(`card-${cardID}`)) 

    input.forEach(function(e) {e.style.display="none"})

    let card = document.getElementById(`card-${cardID}`) 
    var btn = document.querySelector("#expandBtn-"+cardID) 
    let btn1 = document.querySelector("#expandBtn1-"+cardID)

    
    btn.style.display = "block"
    btn1.style.display = "none"
    card.style.height = "6rem"
}


function removeDummy() {
    var elem = document.querySelector(".card");
    elem.parentNode.removeChild(elem);
    return false;
}


/*function deleteItem(index){
    let localItems = JSON.parse( localStorage.getItem('.card'))
    taskList.splice(index, 1)
    localStorage.setItem('.card', JSON.stringify(taskList));
    showItem()
}

function clearTask(){
    
localStorage.clear()
showItem()
}
*/
/*
const form = document.querySelector('.card_form');
const inputs = document.querySelectorAll('.inputs');
const checks = document.querySelectorAll('.checks');

// Listen for the form submission
addEventListener('change', (e) => {
  //e.preventDefault();

  const cardid1 = e.target.id
  console.log(e.target.id)
  // sloji tova s localstorage \
  //localStorage.setItem("etst","tsetsdsd")
  //localStorage.setItem("text", {card:"1", text:e.target.value}.toString())

  // Create an array to store the todo list items
  const todos = [];

  // Loop through the inputs and checks and store the values in the todos array
  inputs.forEach((input, index) => {
    const todo = {
      text: input.value,
      checked: checks[index].checked
    };
    todos.push(todo);
  });

  // Save the todos array to local storage
  localStorage.setItem('todos', JSON.stringify(todos));
});

// Load any saved todo list items when the webpage is loaded
window.addEventListener('load', () => {
  // Get the serialized todo list from local storage
  const todosJson = localStorage.getItem('todos');

  // Deserialize the todo list and add it to the webpage
  if (todosJson) {
    const todos = JSON.parse(todosJson);
    todos.forEach((todo) => {
      // Add the todo list item to the webpage
      addTodo(todo.text, todo.checked);
    });
  }
});

// Add a todo list item to the webpage
function addTodo(text, checked) {
  // Create the todo list item element
  const todo = document.createElement('li');
  todo.textContent = text;

  // Add a checkbox to the todo list item
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = checked;
  todo.prepend(checkbox);

  // Append the todo list item to the webpage
  form.appendChild(todo);
}
*/















