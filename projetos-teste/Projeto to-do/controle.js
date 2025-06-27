let input = document.getElementById('inputTarefa');
let btnAdd = document.getElementById('btn_add');
let main = document.getElementById('areaLista');
let contador = 0

function addTarefa(){
    // PEGA O VALOR DIGITADO NO INPUT
    let valorInput = input.value;

    //se nao for vazio, nulo , indefinido
    if((valorInput !=="") && (valorInput !== undefined) && (valorInput !==null)){

        ++contador;

        let novoItem = `<div id= "${contador}" class="item">
                <div onclick="marcarTarefa(${contador})" class="item-icone">
                    <span id="icone_${contador}" class="material-symbols-outlined">
                    radio_button_unchecked
                    </span>
                </div>
                <div onclick="marcarTarefa(${contador})" class="item-nome">
                    ${valorInput}
                </div>
                <div class="item-botao">
                    <button onclick= "deletar(${contador})"  class="delete"> 
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                        Deletar
                    </button>
                </div>
            </div>`;

        // adicionar conteudo
        main.innerHTML += novoItem;

        //zera o input e dar focus
        input.value = '';
        input.focus();
        
    }

}

input.addEventListener("keyup", function(event){
    
    if (event.key === "Enter") {
    event.preventDefault();
    btnAdd.click();
}
})
function deletar(id){
    var tarefa = document.getElementById(id);
    tarefa.remove();
}
function marcarTarefa(id) {
    var item = document.getElementById(id);
    var icone = document.getElementById("icone_" + id);

    if (item.classList.contains("clicado")) {
        item.classList.remove("clicado");
        icone.innerHTML = "radio_button_unchecked";

    
    } else {
        item.classList.add("clicado");
        icone.innerHTML = "check_circle";
        item.parentNode.appendChild(item);
    }
}