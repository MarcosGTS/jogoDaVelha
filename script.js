const botoes = document.querySelectorAll('button');
const campeao = document.querySelector('.campeao');
let jogadorA = Math.random() * 10;

for(let i = 0; i < botoes.length; i++){
    botoes[i].addEventListener('click', function(){
        if(jogadorA > 4 && this.innerText == "" && !verificarV(botoes)){
            this.innerText = "X";
            this.style.backgroundColor = "#230A59"
            jogadorA = 0;

        } else if(jogadorA <= 4  && this.innerText == "" && !verificarV(botoes)) {
            this.innerText = "O";
            this.style.backgroundColor = "#829FD9"
            jogadorA = 5;
        }

        currentPlayer( jogadorA );

        if(verificarV(botoes)){
            mostraC(jogadorA);
            restart(botoes);
        }
        empate(botoes)
       
    })

}
function verificarS(a,b,c){
    return(a == b && b == c && a != "");
}

function verificarV(vetor){

    for(let i = 0; i < 3 ; i++){
        if(verificarS(vetor[i+0].innerText, vetor[i+3].innerText, vetor[i+6].innerText)){
            return true;
        }
    }

    for(let i = 0; i < 3 ; i++){
        if(verificarS(vetor[i*3+0].innerText, vetor[i*3+1].innerText, vetor[i*3+2].innerText)){
            return true;
        }
    }
   
    if(verificarS(vetor[0].innerText, vetor[4].innerText, vetor[8].innerText)){
        return true;
    }

    if(verificarS(vetor[2].innerText, vetor[4].innerText, vetor[6].innerText)){
        return true;
    }

    return false
}

function restart(array){
    setTimeout(function(){
        for(let i =0; i < array.length; i++){
            array[i].innerText = "";
            array[i].style.backgroundColor = 'rgb(164, 172, 209)'
            campeao.innerHTML = "<p>Em partida</p>";
        }
    },2000)
}

function empate(array){
    let flag = false;
    for(let i = 0; i < array.length; i++){
        if(array[i].innerText == ""){
            flag = true;
        }
        
    }
    if(!flag){
        campeao.innerText = "Empate"
        restart(array);
        flag = false;
        
    }
}

function mostraC(player){
    let ganhador = player > 4 ? "O" : "X";
    campeao.innerHTML = `<p>Ganhador:${ganhador}</p>`;
}

function currentPlayer( jogador ){
    let player = jogador > 4 ? "X" : "O";
    campeao.innerHTML = `<p>Jogado Atual:${player}</p>`; 
}

