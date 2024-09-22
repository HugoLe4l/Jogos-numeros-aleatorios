var numMin = 0;
var numMax = 50;
let box_game = document.querySelector(".box-game")
let box_game_over = document.getElementById("box-game-over")
let dica_box = document.querySelector(".dica-box")
let title_numer = document.getElementById("title-numer")
let buttons_box= document.getElementById("buttons-box")

let btn_embaralhar = document.getElementById("btn-embaralhar")
let btn_dica = document.getElementById("btn-dica")
let btn_start = document.getElementById("btn-start")
let btn_recomeçar =document.getElementById("btn-recomeçar")

let audio_green = document.getElementById("audio-green")
let audio_red = document.getElementById("audio-red")
let audio_start = document.getElementById("audio-start")
let audio_embaralhar = document.getElementById("audio-embaralhar")
let audio_hover_card = document.getElementById("audio-hover-card")
let audio_game_over = document.getElementById("audio-game-over")

let dica_text = document.getElementById("dica-text")
let option1 = document.getElementById("option1")
let option2 = document.getElementById("option2")
let option3 = document.getElementById("option3")
let optionbox = document.querySelectorAll(".option");

let pontuacao_text = document.getElementById("pontuacao")
let quant_chances_text = document.getElementById("quant-chances-text")
let Cont_dica_text = document.getElementById("Cont-dica-text")

let UserPontuacao = 0;
let quantChances = 5;
let quantDica = 5;

var numRandomCorreto;
var numRandomFalso1;
var numRandomFalso2;

var dicaMin;
var dicaMax;

title_numer.textContent = `Numero aleatorio entre ${numMin} e ${numMax}`
quant_chances_text.textContent = `Chances: ${quantChances}`;
Cont_dica_text.textContent = quantDica; 

function BoxGameOver(){
    box_game_over.showModal();
}
function embaralhar(x){

    if(quantChances <0){
        audio_game_over.play();
        BoxGameOver();
    }else{
        option1.style.background = "linear-gradient(to right, rgb(250, 145, 25), rgb(239, 241, 115))"
        option2.style.background = "linear-gradient(to right, rgb(250, 145, 25), rgb(239, 241, 115))"
        option3.style.background = "linear-gradient(to right, rgb(250, 145, 25), rgb(239, 241, 115))"

        while (true){
            numRandomCorreto = Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
            numRandomFalso1 = Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
            numRandomFalso2 = Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;

            if(numRandomCorreto !== numRandomFalso1 && numRandomCorreto !== numRandomFalso2 && numRandomFalso1 !== numRandomFalso2){
                break;
            }
        }
        

        lista = [numRandomCorreto,numRandomFalso1,numRandomFalso2]
        for (let i = lista.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [lista[i], lista[j]] = [lista[j], lista[i]];
        }
        option1.textContent = lista[0]
        option2.textContent = lista[1]
        option3.textContent = lista[2]

        dicaMin = numRandomCorreto - 4;
        dicaMax = numRandomCorreto + 4;
        }
    
}
function ativar_desativar_options(){
    btn_embaralhar.classList.toggle("disable-option")
    option1.classList.toggle("disable-option")
    option2.classList.toggle("disable-option")
    option3.classList.toggle("disable-option")
}
function ativa_desativa_btn_embaralhar(){
    btn_embaralhar.classList.toggle("disable-option")

}
function OptionClick() {
    var numero = this.textContent;
    ativar_desativar_options()
    if (numero == numRandomCorreto) {
        this.style.background = "green";
        UserPontuacao += 1
        pontuacao_text.textContent = `Sua Pontuação: ${UserPontuacao}`
        audio_green.play();
        if (UserPontuacao > 5){
            quantDica += 1
            Cont_dica_text.textContent = quantDica
        }
    } else {
        this.style.background = "red";
        audio_red.play();
        quantChances -= 1;
        quant_chances_text.textContent = `Chances: ${quantChances}`;
    }
    setTimeout(() => {
        embaralhar();ativar_desativar_options();},1000);
}

function start(){
    audio_start.play();
    embaralhar();
    optionbox.forEach(function(option) {
        option.style.height = "200px";
    });
    buttons_box.style.display = "flex"
    btn_start.style.display = "none"
    pontuacao_text.style.display = "flex"
    title_numer.style.display = "flex"
    box_game.style.height = "500px"
    quant_chances_text.style.display = "flex"
}
function dica(){
    if (quantDica == 0){
        btn_dica.classList.add("disable-option")
    }else{
        dica_box.style.display = "flex"
        dica_text.textContent = `O numero correto está entre ${dicaMin} e ${dicaMax}`
        setTimeout(() => {
            dica_box.style.display = "none"
        }, 2000);
        btn_embaralhar.classList.remove("disable-option")
        quantDica -= 1
        Cont_dica_text.textContent = quantDica;
    }
    
}

option1.addEventListener("mouseover", function(){
    audio_hover_card.play();
})
option2.addEventListener("mouseover", function(){
    audio_hover_card.play();
})
option3.addEventListener("mouseover", function(){
    audio_hover_card.play();
})

btn_start.onclick = start;
btn_embaralhar.onclick =  function(){
    audio_embaralhar.play(); 
    embaralhar();
    ativa_desativa_btn_embaralhar();
    setTimeout(() => {
        ativa_desativa_btn_embaralhar();
    }, 5000);
}
btn_dica.onclick = dica;
btn_recomeçar.onclick = function(){
    location.reload();
}
option1.onclick = OptionClick;
option2.onclick = OptionClick;
option3.onclick = OptionClick;