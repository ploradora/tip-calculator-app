"use strict";

const bill = document.getElementById('bill');
const numOfPeople = document.querySelector("#people");
const gridTip = document.querySelector(".grid-tip");
const btnsPer = document.querySelectorAll(".tip-per");
const tipCustom = document.querySelector('#custom');
const errorMsg = document.querySelector('.error-p');
const results = document.querySelectorAll('.result');
const reset = document.querySelector('.reset');

let billValue = 0;
let tipValue = 0;
let peopleValue = 0;

const validateString = function(s) {
    let rgx = /^[0-9]*.?[0-9]*$/;
    return s.match(rgx);
}
const validateInt = function(s) {
    let rgx = /^[0-9]*$/;
    return s.match(rgx);
}

const readBill = function() {
    if (bill.value.includes(',')){
        bill.value = bill.value.replace(',', '.');
    }
    
    if (!validateString(bill.value)) {
        bill.value = bill.value.substring(0, bill.value.length-1);
    }
    billValue = parseFloat(bill.value); 
    calcTip();
}

bill.addEventListener('input', readBill);

gridTip.addEventListener('click', function(e) {
    const clicked = e.target.closest('.tip-per');
    if (!clicked) return;
    btnsPer.forEach(btn => btn.classList.remove('btn-active-perc'));

    btnsPer.forEach(btn => {
        if (e.target.innerHTML == btn.innerHTML) {
            btn.classList.add('btn-active-perc');
            tipValue = parseFloat(btn.innerHTML)/100;
        }
    })
    tipCustom.value = '';
    calcTip();
})

const setTipCustomValue = function() {
    if (!validateInt(tipCustom.value)) {
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1);
    }

    tipValue = parseFloat(tipCustom.value/100);
    
    btnsPer.forEach(btn => {
        btn.classList.remove('btn-active-perc');
    });

    if (tipCustom !== '') {
        calcTip();
    }
} 

tipCustom.addEventListener('input', setTipCustomValue);

const setNumPeople = function() {
    if (!validateInt(numOfPeople.value)) {
        numOfPeople.value = numOfPeople.value.substring(0, numOfPeople.value.length-1);
    }

    if (numOfPeople.value <= 0) {
        errorMsg.classList.add('show-error-msg');
        setTimeout(function() {
            errorMsg.classList.remove('show-error-msg')
        }, 3000)
    }

    peopleValue = parseFloat(numOfPeople.value);
    calcTip();
}

numOfPeople.addEventListener('input', setNumPeople);

const calcTip = function() {
    if (peopleValue >= 1) {
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        results[0].innerHTML = tipAmount.toFixed(2);
        results[1].innerHTML = total.toFixed(2);
    }
};

const resetAll = function() {
    bill.value = '';
    readBill()
    tipCustom.value = '';
    setTipCustomValue();
    numOfPeople.value = '';
    setNumPeople();
    results[0].innerHTML = '0.00'
    results[1].innerHTML = '0.00';
    btnsPer.forEach(btn => {
        btn.classList.remove('btn-active-perc')
    })
}

reset.addEventListener('click', resetAll)
