const botoes = document.querySelectorAll('button');
let jogadorA = 0;

for(let i = 0; i < botoes.length; i++){
    botoes[i].addEventListener('click', function(){
        if(jogadorA == 0){
            this.innerText = "X";
            this.style.backgroundColor = "#230A59"
        } else {
            this.innerText = "O";
            this.style.backgroundColor = "#829FD9"
        }

        jogadorA = jogadorA == 0 ? 1 : 0;
        if(verificarV(botoes)){
            console.log(jogadorA);
            restart(botoes);
        }

        empate(botoes,verificarV(botoes));
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
        }
    },2000)
}

function empate(array, ganhador){
    let flag = false;
    for(let i = 0; i < array.length; i++){
        if(array[i].innerText == ""){
            break;
        }
        flag = true;
    }
    if(flag && ganhador){
        restart();
    }
}