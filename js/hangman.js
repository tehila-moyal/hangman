const theMan=document.querySelectorAll(".man")
let index =0;
let ans=false;
const keybord= document.querySelector(".keybord")
const wrong= document.querySelector(".wrong")
const sentence=document.querySelector(".sentence")
const game=document.querySelector(".game")
const start=document.querySelector(".start")

let guess
const keys=[]
const startbtn = document.querySelector("#startbtn")
const hebrewBtn = document.querySelector("#hebrew")
const englishBtn = document.querySelector("#english")
let leng
const hebrew=["א","ב","ג","ד","ה","ו","ז","ח","ט","י","כ","ל","מ","נ","ס","ע","פ","צ","ק","ר","ש","ת","ם","ן","ץ","ף","ך"]
const english = ["a","b","c","d","e","f","g","h","i","j","g","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const again=document.querySelector('.again')
let theWord="";

function startover(){
    index=0
           theMan.forEach(el => {
               el.classList.add("hide");   
   })
   game.classList.add("hide");
    start.classList.remove("hide")  
    sentence.innerHTML=""
    sentence.classList.remove("word")
    guess.innerHTML=[]
    wrong.innerHTML=""
}
   
const x= document.querySelector(".x")
const win= document.querySelector(".win")
x.addEventListener("click",()=>{
    win.classList.add("hide")
})

again.addEventListener('click',startover)

function wrongA() {
    if(index<theMan.length){
        theMan[index].classList.remove("hide");
        index++
    }else{
        alert(`u lose the word was ${theWord}`);
        startover()
    }   
}


function creatKeybord(array) {
    array.forEach(e => {
        const key = document.createElement("button");
        key.innerText = e ;
        key.classList.add("letter")
        keybord.append(key)
        keys.push(key)
        
    });
    console.log(keys);
    
}

function checkWin() {
    let chek=guess.length
    guess.forEach(element => {
        if(element.innerText ===""){
            chek=0;
        }
        
    })
    if (chek===guess.length) {
            win.classList.remove("hide")
            setTimeout(() => {
                
                startover()
            }, 1000);
    }
    
    
}

function setup(w) {
    for (let i = 0; i < w.length; i++) {
        sentence.innerHTML+=`<div class="guess"></div>`
    }
    console.log(w);
    guess=document.querySelectorAll(".guess")
}

document.addEventListener('keydown', (e) => {
    if(leng.includes(e.key)){
             if(theWord.includes(e.key)){
                let index= theWord.indexOf(e.key)
                while(theWord.indexOf(e.key,index)>=0){
                    index= theWord.indexOf(e.key,index)
                    guess[index].innerText=e.key;
                    index++
                }
               
                keys.forEach(el => {
                    if(el.innerText===e.key){
                        el.disabled=true
                        el.classList.add("blockword2")
                    }
                });
               
                checkWin()
                
             }else{
               
                keys.forEach(el => {
                    if(el.innerText===e.key){
                        el.disabled=true
                        el.classList.add("blockword")
                    }
                });
                wrong.innerText += e.key
                
                wrongA()
            }
    }      
});

keybord.addEventListener("click",(e)=>{
    if (e.target.tagName.toUpperCase()==='BUTTON'){
        if(theWord.includes(e.target.innerText)){
            let index= theWord.indexOf(e.target.innerText)
            while(theWord.indexOf(e.target.innerText,index)>=0){
                index= theWord.indexOf(e.target.innerText,index)
                guess[index].innerText=e.target.innerText;
                index++
            }
            e.target.classList.add("blockword2")
            e.target.disabled=true
            checkWin()
            
        }else{
            e.target.classList.add("blockword")
         wrong.innerText += e.target.innerText
         e.target.disabled=true
         wrongA()
        }

        
    }
        
          
})


startbtn.addEventListener("click",()=>{
    if (hebrewBtn.checked) {
        keybord.innerHTML=""
        creatKeybord(hebrew)
        theWord=wordHebrew[Math.floor(Math.random()*wordHebrew.length)]
        leng=hebrew
        sentence.classList.add("word")


    } else if ( englishBtn.checked) {
        keybord.innerHTML=""
        creatKeybord(english)
        theWord=wordEnglish[Math.floor(Math.random()*wordEnglish.length)].toLowerCase();
        leng=english

    } 
    setup(theWord)
    game.classList.remove("hide")
    start.classList.add("hide")

})