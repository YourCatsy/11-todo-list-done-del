import TodoApi from "./Todo.js";

'use strict';

const ITEM_SELECTOR = '.item';
const DELETE_BUTTON_CLASS = 'delete-button';
const CLICK_ON_LINE_CLASS = 'click-on-line';
const DONE_CLASS = 'done';
const FILL_FIELD = 'Заполните поле, пожалуйста';

const list = document.querySelector('#list');
const input = document.querySelector('#list-element-title');
const addToListButton = document.querySelector('#add-to-list-button');

const itemTemplate = document.querySelector('#item-template').innerHTML;

addToListButton.addEventListener('click', onButtonClick);
list.addEventListener('click', onLineClick);


init();

function init() {
    TodoApi.getList()
        .then(renderTodoList)
        .catch(handleError);
}

function onButtonClick() {
    const text = getMessage();

    if (!isMessageValid(text)) {
        warning();
        return;
    }

    TodoApi.create({ text });

    renderList({ text });
    clear();
}

function onLineClick(e) {
    const item = getListElement(e.target)
    const classList = e.target.classList;

    if (item) {
        if (classList.contains(DELETE_BUTTON_CLASS)) {
            removeList(item);
        }
        
        if (classList.contains(ITEM_SELECTOR)) {
            toggleDone(item);
        }
        item.classList.toggle(CLICK_ON_LINE_CLASS)
    }
}

function getListElement(target) {
    return target.closest(ITEM_SELECTOR);
}

function renderTodoList(todoList) {
    const html = todoList.map(generateListHtml).join('');
    list.insertAdjacentHTML('beforeend', html);

}
function renderList(todo){
    const html = generateListHtml(todo);
    list.insertAdjacentHTML('beforeend', html);
}

function generateListHtml(todo) {
    const done = todo.status ? DONE_CLASS : '';

    return itemTemplate
        .replace('{{id}}', todo.id)
        .replace('{{status}}', todo.status)
        .replaceAll('{{text}}', todo.text)
        .replace('{{done}}', done);
}

function removeList(text) {
    const id = getListElementId(text);

    TodoApi
        .delete(id)
        .catch(handleError);
    text.remove();
}

function toggleDone(text) {
    const id = getListElementId(text);
    const status = text.dataset.status !== 'true';

    TodoApi
        .update(id, { status })
        .catch(handleError);

    text.classList.toggle(DONE_CLASS);
}

function getListElementId(text) {
    return text.dataset.id;
}

function isMessageValid(text) {
    return text.trim() != '';
}

function getMessage() {
    return input.value;
}

function warning() {
    alert(FILL_FIELD);
}

function clear() {
    input.value = '';

}

function handleError(e) {
    alert(e.message);
}