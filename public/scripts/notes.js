// selecting all the const I will be working with
const addThemebtn = document.querySelector('.add_card');
const cardThemes = document.querySelectorAll('.card_themes');
const cardTheme = document.querySelectorAll('.card_theme');
const cardContainer = document.querySelector('.card_container');
const template = document.querySelector('.card_template');

var editable = [];
// used for the plus button (if colors should be shown or hidden)
var count = 0;

displayNotes();

//clicking the template or + button shows the color options
[addThemebtn, template].forEach(item => {
    item.addEventListener('click', event => {
        //show the colors
        if (count % 2 === 0) {
            for (let index = 0; index < cardTheme.length; index++) {
                setTimeout(function () {
                    cardTheme[index].style.transform = `translateY(0px)`;
                    cardTheme[index].style.display = "block";
                }, 50 * index);

            }
            //hide the colors
        } else {
            for (let index = 0; index < cardTheme.length; index++) {
                setTimeout(function () {
                    cardTheme[cardTheme.length - 1 - index].style.transform = `translateY(calc(${cardTheme.length - 1 - index} * -40px))`;
                    cardTheme[cardTheme.length - 1 - index].style.display = "none";
                }, 50 * index);

            }
        }
        //increases with each click
        count++;
    })
})


//when you click on one of the color options
cardTheme.forEach(elem => {
    elem.addEventListener('click', () => {

        //removes the empty template
        if (template) {
            template.remove();
        }

        //adds new div element= empty card
        let color = elem.style.backgroundColor;
        const card = document.createElement('div');
        card.classList.add('card', 'addCard');

        //takes the exact date of card creation 
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        let finalDate = months[month] + " " + day + ',' + year;
        let title = `Write something`;

        //empty card added to the html
        card.innerHTML = `
        <div class="card addCard">
        <i class= "fas fa-trash card_delete"></i>
        <textarea id="card_title" class="card_title" name="title" rows="10" cols="50">
        ${title}
        </textarea>
        <span class="card_footer">
            <p name="date">${finalDate}</p>
            <small class="card_edit"><i class="fas fa-pen"></i></small>
        </span>
        </div>
        `;

        //sends the title, date and the color to the server 
        fetch('http://localhost:3000/addnote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                date: finalDate,
                color: color
            })
        })
            //.then(res => res.json())
            .then(res => console.log(res));

        //putting the card the chosen color
        card.style.backgroundColor = color;
        cardContainer.prepend(card);

        

        const cards = document.querySelectorAll('.card');

        

        //edit the content of the cards
        cards.forEach((card, cardCount) => {
            editable[cardCount] = false;
            card.querySelector('.card_edit').addEventListener("click", () => {
                //click to edit
                if (editable[cardCount]) {
                    card.querySelector('textarea').disabled = true;
                    editable[cardCount] = false;
                    card.querySelector('.card_edit').innerHTML = `<i class= "fas fa-pen"></i>`
                }//click to save
                else {
                    card.querySelector('textarea').disabled = false;
                    editable[cardCount] = true;
                    card.querySelector('.card_edit').innerHTML = `<i class= "fas fa-save"></i>`
                }

            })
        })
    })
})

//this function is used to read the notes from the database
function displayNotes() {
    console.log('fetch get notes')
    //this fetch requests all the notes from the server
    fetch('http://localhost:3000/notesItems')
        .then(data => data.json())
        .then(resp => {
            //the res returns an array with all the notes
            for (let i = 0; i < resp.note.length; i++) {
                if (resp.note.length >= 1) {
                    if (template) {
                        template.remove();
                    }
                }
               
                //the functions is identical to the function above which creates notes
                const card = document.createElement('div');
                card.classList.add('card', 'addCard');
                card.setAttribute('data-id', `${resp.note[i]._id}`);

                //create a note on the DOM with all variables from the data server
                card.innerHTML = `
                <div class="card addCard">
                <i class="fas fa-trash card_delete"></i>
                <textarea id="card_title" class="card_title" name="title" rows="10" cols="50">${resp.note[i].title}</textarea>
                <span class="card_footer">
                    <p name="date">${resp.note[i].date}</p>
                    <small class="card_edit"><i class="fas fa-pen"></i></small>
                </span>
                 </div>
                `;

                card.style.backgroundColor = resp.note[i].color;
                cardContainer.prepend(card);

                const cards = document.querySelectorAll('.card');

                //edit the content of the cards
                cards.forEach((card, cardCount) => {
                    editable[cardCount] = false;
                    card.querySelector('.card_edit').addEventListener("click", () => {
                        //click to edit
                        if (editable[cardCount]) {
                            card.querySelector('textarea').disabled = true;
                            editable[cardCount] = false;
                            card.querySelector('.card_edit').innerHTML = `<i class= "fas fa-pen"></i>`

                            let id= card.dataset.id;
                            let newTitle = document.querySelector('textarea').value;
                            console.log(newTitle)

                            //this fetch edit/save the note by sending the edited note ID and the new text
                            fetch('http://localhost:3000/updatenote', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    id: id,
                                    title: newTitle
                                    /* other product data */
                                })
                            })
                                .then(res => console.log( res));

                        }//click to save
                        else {
                            card.querySelector('textarea').disabled = false;
                            editable[cardCount] = true;
                            card.querySelector('.card_edit').innerHTML = `<i class= "fas fa-save"></i>`
                        }

                    })
                })


                //delete a note both from the DOM and thr data base
                card.querySelector('.card_delete').addEventListener('click', () =>{
                    //removes from the DOM
                    card.remove();
                    let id= card.dataset.id;

                    //this fetch sends delete request to the server which removes it from the database
                    fetch('http://localhost:3000/deletenotes', {
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

