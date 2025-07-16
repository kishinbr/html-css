const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button")

//construindo o objeto calculadora
class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // adiciona o digito para a tela da calculadora
    addDigit(digit){
        //checar se operacao atual ja tem ponto
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit
        this.updateScreen();
        
    }
    // processo de todas as operacoes
    processOperation(operation){
        //checar se o valor atual esta vazio
        if(this.currentOperationText.innerText === "" && operation !=="C"){
            //mudanca de opecao
            if(this.previousOperationText.innerText !==""){
                this.changeOperation(operation);
            }
            return;
        }


        // pegando o valor atual e o anterior
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue,operation,current,previous)
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue,operation,current,previous)
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue,operation,current,previous)
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue,operation,current,previous)
                break;
            case "DEL":
                this.processDelOperator()
                break;
            case "CE":
                this.processClearCurrentOpetarion()
                break;
            case "C":
                this.processClearOpetarion()
                break;
            case "=":
                this.precessEqualsOperator()
                break;

            default:
                return;
        }
    }


    //atualizando os valores da tela 
    updateScreen(
        operationValue = null, 
        operation = null,
        current = null,
        previous = null
     ){
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        }else{
            //checar se o valor é 0, se for apenas adicionar ao valor atual
            if(previous === 0){
                operationValue = current;
            }
            // adicionar o valor atual ao anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    //mundando a operacao matematica
    changeOperation(operation){

        const mathOperations = ["+", "-", "/", "*"];

        if(! mathOperations.includes(operation)){
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    //deletar o ultimo digito
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }
    //limpando o valor atual
    processClearCurrentOpetarion(){
        this.currentOperationText.innerText = "";
    }
    //limpando a operaçao toda
    processClearOpetarion(){
        this.processClearCurrentOpetarion();
        this.previousOperationText.innerText = "";
    }
    //processo de igual
    precessEqualsOperator(){
        const operation = previousOperationText.innerHTML.split(" ")[1];
        this.processOperation(operation);
    }
}


// inicializando o objeto
const calc = new Calculator(previousOperationText, currentOperationText);


buttons.forEach((btn) => {
    btn.addEventListener("click",(e)=>{
        const value = e.target.innerText;
        

        if(+value >=0 || value === "."){
            calc.addDigit(value);

        } else {
            calc.processOperation(value);
        }




    })
})