const addThemebtn = document.querySelector('.add_card');
const cardThemes = document.querySelectorAll('.card_themes');
const cardTheme = document.querySelectorAll('.card_theme');
const cardContainer = document.querySelector('.card_container');

var editable =[];
var count = 0;

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

cardTheme.forEach(elem =>{
  elem.addEventListener('click', ()=>{

    if(document.querySelector('.card_template')){
        document.querySelector('.card_template').remove();
    }
    let color = elem.style.backgroundColor;
    const card = document.createElement('div');
    card.classList.add('card', 'addCard');

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let months= ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    card. innerHTML = `
    <div class="card addCard">
    <span class="card_title">
       Write something...
    </span>
    <span class="card_footer">
        <small>${months[month]} ${day}, ${year}</small>
        <small class="card_edit"><i class="fas fa-pen"></i></small>
    </span>
</div>
    `;
    card.style.backgroundColor = color;
    cardContainer.prepend(card);

    const cards = document.querySelectorAll('.card');

    cards.forEach((card, cardCount) =>{
        editable[cardCount] = false;
        card.querySelector('.card_edit').addEventListener("click", ()=>{
            if(editable[cardCount]){
                card.querySelector('.card_title').contentEditable = 'false';
                editable[cardCount] = false;
                card.querySelector('.card_edit').innerHTML = `<i class= "fas fa-pen"></i>`
            }else{
                card.querySelector('.card_title').contentEditable = 'true';
                editable[cardCount] = true;
                card.querySelector('.card_edit').innerHTML = `<i class= "fas fa-save"></i>`
            }

        })
    })
  })
})

cardContainer.addEventListener('click', (e) => { e.pare.remove();})