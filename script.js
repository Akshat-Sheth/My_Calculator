// global variable selection and selecting the elements

const loading_container = document.querySelector('.loading-container')
const container = document.querySelector('.container')
const history = document.querySelector('.history')
const results = document.querySelector('.results')
const close_button = document.querySelector('.close')
const buttons = document.querySelectorAll('button')
const answer_panel = document.querySelector('.answer_panel') 
const main_button = document.querySelector('.main_button')
var  string="";
let flag = 0;
let past = [];


// Loading screen Logic

main_button.addEventListener('click', ()=>{
    main_button.classList.add('display-none')
    loading_container.classList.remove('display-none');
    setTimeout(()=>{
        container.classList.remove("display-none")
        loading_container.classList.add('display-none')
    },2500)

})



// result screen animation logic

results.addEventListener('click',(e)=>{
    history.classList.toggle('history-animation-add')

    // adding history to the html by mapping over to the past array

    past.map((ele)=>{
            const div = document.createElement('div')
            div.classList.add('data')
            div.classList.add('display-none')
            div.innerHTML = ele
            history.appendChild(div)
    })

    past = []

    const data = document.querySelectorAll('.data')
    const data_length = data.length;

    for(let i = 0;i<data_length;i++){
        data[i].classList.toggle('display-none')
    }

})

// calculator Logic

buttons.forEach(button => button.addEventListener('click', ()=>{
    let divideByZero = 0;
    console.log(past)
    const value = button.innerHTML
    if(flag === 1){
        string = '';
        flag = 0;
    }
    // logic fot the number buttons
    if( value.match(/[0-9]/) ){
        string += value 
        answer_panel.innerHTML = string;
    }
    // logic for the rest  buttons
    switch(value){
        case 'CLEAR':
            string = '';
            answer_panel.innerHTML = string;
            break;
        case 'DEL':
            string = string.slice(0,-1);
            answer_panel.innerHTML = string;
            break;
        case '+':
            if(string.length<1){
                break;
            }
            if(isOperand(string)){
                let calculate = ''
                calculate += string
                string = eval(string)
                if(String(string).endsWith('Infinity')){
                    answer_panel.innerHTML = 'Cannot divide by Zero';
                    flag = 1;
                    divideByZero = 1;
                }
                if(String(string).includes('.')){
                    let temp = Number(string)
                    string = String(temp.toFixed(2))
                }
                calculate+= '=';
                calculate+= string;
                past.push(calculate)
            }
            if(divideByZero === 0) {
                string+= '+'
                answer_panel.innerHTML = string;
            }
            break;
        case '-':
            if(isOperand(string)){
                let calculate = ''
                calculate += string
                string = eval(string)
                if(String(string).endsWith('Infinity')){
                    answer_panel.innerHTML = 'Cannot divide by Zero';
                    flag = 1;
                    divideByZero = 1;
                }
                if(String(string).includes('.')){
                    let temp = Number(string)
                    string = String(temp.toFixed(2))
                }
                calculate+= '=';
                calculate+= string;
                past.push(calculate)
            }
            if(divideByZero === 0) {
                string+= '-'
                answer_panel.innerHTML = string;
            }
            break;
        case '/':
            if(string.length<1){
                break;
            }
            if(isOperand(string)){
                let calculate = ''
                calculate += string
                string = eval(string)
                if(String(string).endsWith('Infinity')){
                    answer_panel.innerHTML = 'Cannot divide by Zero';
                    flag = 1;
                    divideByZero = 1;
                }
                if(String(string).includes('.')){
                    let temp = Number(string)
                    string = String(temp.toFixed(3))
                }
                calculate+= '=';
                calculate+= string;
                past.push(calculate)
            }
            if(divideByZero === 0) {
                string+= '/'
                answer_panel.innerHTML = string;
            }

            break;
        case '*':
            if(string.length<1){
                break;
            }
            if(isOperand(string)){
                let calculate = ''
                calculate += string
                string = eval(string)
                if(String(string).endsWith('Infinity')){
                    answer_panel.innerHTML = 'Cannot divide by Zero';
                    flag = 1;
                    divideByZero = 1;
                }
                if(String(string).includes('.')){
                    let temp = Number(string)
                    string = String(temp.toFixed(2))
                }
                calculate+= '=';
                calculate+= string;
                past.push(calculate)
            }
            if(divideByZero === 0) {
                string+= '*'
                answer_panel.innerHTML = string;
            }
            break;
        case '=':
            if(string.length > 0){
            let calculate = '';
            calculate += string;
            string = eval(string);
            if(String(string).endsWith('Infinity')){
                answer_panel.innerHTML = 'Cannot divide by Zero';
                flag = 1;
                divideByZero = 1;
            }
            if(String(string).includes('.')){
                string = String(string.toFixed(2));
            }else{
                string = String(string)
            }
            calculate+= '=';
            calculate+= string
            past.push(calculate)
            console.log(past)
            if(divideByZero === 0){
                answer_panel.innerHTML = string;
            }
            flag = 1;
            }
            break;
        case '.':
            string = addPeriod(string)
            answer_panel.innerHTML = string;
        default:
            break;
    }

}))

// helper functions

const isOperand = (string) => {
    if( string.includes('+') || string.includes("-") || string.includes("/") || string.includes('*')  ){
        return true
    }else{
        return false
    }
}   


const addPeriod = (string) => {
    if(string.length === 0){
        return string+= '.'
    }

    if(string.includes('+')){
        let arr = string.split('+');
        if(arr[1].length === 0){
            return string+= '.'
        }
        if(!arr[1].includes('.')){
            return string+='.'
        }
    }

    else if(string.includes('-')){
        let arr = string.split('-');
        if(arr[1].length === 0){
            return string+= '.'
        }
        if(!arr[1].includes('.')){
            return string+='.'
        }
    }

    else if(string.includes('*')){
        let arr = string.split('*');
        if(arr[1].length === 0){
            return string+= '.'
        }
        if(!arr[1].includes('.')){
            return string+='.'
        }
    }

    else if(string.includes('/')){
        let arr = string.split('/');
        if(arr[1].length === 0){
            return string+= '.'
        }
        if(!arr[1].includes('.')){
            return string+='.'
        }
    }
    else{
        if(!string.include('.')){
            return string+= '.'
        }
    }

    return string


}