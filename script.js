'use strict';

const ITEM_SELECTOR = '.item';
const DELETE_BUTTON_CLASS = 'deleteButton';
const CLICK_ON_LINE_CLASS = 'clickOnLine';

const list = document.querySelector('#list');
const input = document.querySelector('#listElementTitle');
const button = document.querySelector('#addToListButton');
const itemTemplate = document.querySelector('#itemTemplate').innerHTML;

button.addEventListener('click', onButtonClick);
list.addEventListener('click', onLineClick);

function onButtonClick() {
    const text = getMessage();

    if (!isMessageValid(text)) {
        warning();
        return;
    }

    addItem(text);
    clearField();
}

function onLineClick(e) {
    const item = e.target.closest(ITEM_SELECTOR);

    if (item) {
        if (e.target.classList.contains(DELETE_BUTTON_CLASS)) {
            return item.remove();
        }

        item.classList.toggle(CLICK_ON_LINE_CLASS)
    }
}

function addItem(text) {
    const itemHTML = itemTemplate.replace('{{text}}', text);

    list.insertAdjacentHTML('beforeend', itemHTML);
}

function isMessageValid(text) {
    return text.trim() != '';
}

function getMessage() {
    return input.value;
}

function warning() {
    alert('Заполните поле, пожалуйста');
}

function clearField() {
    input.value = '';
}