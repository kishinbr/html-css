
var view = document.querySelector(".view");
const botoes = document.querySelectorAll('.item');

for (let i = 0; i < botoes.length; i++) {
  const botao = botoes[i];

  botao.addEventListener('click', function () {

    const valorClicado = botao.innerText;
    const ultimo = view.innerHTML.charAt(view.innerHTML.length - 1);

    const operadores = ["x", "/", ".", "+", "-","%"];

    if (operadores.includes(valorClicado) && operadores.includes(ultimo)) {
        return; // bloqueia operador repetido no visor
    }
    if (view.innerHTML.length === 0 && operadores.includes(valorClicado)) {
    // opcional: não deixa começar o visor com operador
    return;
    }
    

    if (botao.innerText === "D"){
        view.innerHTML = "";
        return;
    }
    if (botao.innerText === "A"){
        view.innerHTML = view.innerHTML.slice(0,-1);
        return;
    }
    if (botao.innerHTML === "=") {
    let expressao = view.innerHTML.replace(/x/g, "*");
    expressao = expressao.replace(/(\d+)%(\d+)/g, "($1/100)*$2");
    
    if (view.innerText.length === 0) {
        return; 
    }

    view.innerHTML = eval(expressao); 
    return;
}

    
    view.innerHTML+= botao.innerText;
  });
}
