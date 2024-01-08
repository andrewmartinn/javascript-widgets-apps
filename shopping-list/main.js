// global variables
const addItemForm = document.getElementById('addItemForm');
const addItemInput = document.getElementById('addItemInput');
const addItemButton = document.getElementById('addItemBtn');
const itemFilterInput = document.getElementById('filterItem');
const itemsList = document.getElementById('itemsList');
const clearAllItemsButton = document.getElementById('clearItems');

// fetch items from local storage and display on page load
function displayItems() {
  const shoppingList = getItemsFromLocalStorage();

  shoppingList.forEach((item) => {
    createListItem(item);
  });

  // check list for items to render filter and clear all button
  checkListItems();
}

// handle add item form submission
function handleAddItem(e) {
  e.preventDefault();

  // validate input 
  const newItem = addItemInput.value.trim();
  const errorText = document.querySelector('.error-text');

  if (newItem === "") {
    errorText.parentElement.classList.add('error');
    errorText.textContent = "Please fill out item name";
    return;
  } else {
    errorText.parentElement.classList.remove('error');
    errorText.textContent = "";
  }

  // check for duplicate item entries
  if (checkItemEntries(newItem)) {
    errorText.parentElement.classList.add('error');
    errorText.textContent = "Item aldready exists";
    return;
  } else {
    errorText.parentElement.classList.remove('error');
    errorText.textContent = "";
  }

  // add new item to local storage
  addItemToLocalStorage(newItem);
  // create item element and appenend to list
  createListItem(newItem);
  addItemInput.value = "";
  // check list for items to render filter and clear all button
  checkListItems();
}

// filter list items according to search term
function filterItems(e) {
  e.preventDefault();

  const listItems = itemsList.querySelectorAll('li');
  const searchTerm = e.target.value.toLowerCase().trim();

  listItems.forEach((item) => {
    const itemName = item.querySelector('p').textContent.toLowerCase();
    // check list items for match and remove other items
    if (itemName.indexOf(searchTerm) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// check for duplicate item entries
function checkItemEntries(item) {
  // retreive items from local storage
  const shoppingList = getItemsFromLocalStorage();
  // return item if item exists
  return shoppingList.includes(item);
}

// remove list item
function handleDeleteItem(e) {
  // select the list item and item name
  const item = e.target.parentElement.parentElement;
  const itemName = item.querySelector('p').textContent;
  // remove item from DOM
  item.remove();
  // remove item from local storage
  removeItemFromLocalStorage(itemName);
  // check list for items to render filter and clear all button
  checkListItems();
}

// clear all list items
function handleClearAllItems(e) {
  const items = itemsList.querySelectorAll('li');
  // iterate through list items and remove each item
  items.forEach((item) => item.remove());
  // remove items from local storage
  localStorage.removeItem('items');
  // check list for items to render filter and clear all button
  checkListItems();
}

// create and return li item
function createListItem(itemName) {
  const newItemElement = document.createElement('li');
  newItemElement.setAttribute('class', 'item');

  const newItemText = document.createElement('p');
  newItemText.setAttribute('class', 'item-name');
  newItemText.textContent = itemName;

  const deleteButton = createDeleteButton('remove-item btn-link text-red', 'fa-solid fa-xmark');
  // append children to li element
  newItemElement.appendChild(newItemText);
  newItemElement.appendChild(deleteButton);
  // appened new list item to ul
  itemsList.appendChild(newItemElement);
}

// create and return delete button with icon
function createDeleteButton(btnClasses, iconClasses) {
  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', btnClasses);
  deleteBtn.setAttribute('id', 'deleteBtn');
  deleteBtn.addEventListener('click', handleDeleteItem);

  const icon = document.createElement('i');
  icon.setAttribute('class', iconClasses);

  deleteBtn.appendChild(icon);

  return deleteBtn;
}

// add new items to local storage
function addItemToLocalStorage(item) {
  // call itemsFromLocalStorage which returns the items stored in local storage
  let shoppingList = getItemsFromLocalStorage();
  // add new item to items array
  shoppingList.push(item);
  // stringify items and set it to local storage
  localStorage.setItem('items', JSON.stringify(shoppingList));
}

// get items from local storage
function getItemsFromLocalStorage() {
  let shoppingList;
  // retrive items from local storage
  if (localStorage.getItem('items') === null) {
    shoppingList = [];
  } else {
    shoppingList = JSON.parse(localStorage.getItem('items'));
  }

  return shoppingList;
}

function removeItemFromLocalStorage(item) {
  // get item from storage
  let shoppingList = getItemsFromLocalStorage();
  // filter out the item from local storage
  shoppingList = shoppingList.filter((shoppingListItem) => shoppingListItem !== item);
  // set filtered items back to local storage
  localStorage.setItem('items', JSON.stringify(shoppingList));

  checkListItems();
}

// check for list items and conditonally render filter input and clear all button
function checkListItems() {
  // reset add item input value
  addItemInput.value = "";

  const listItems = itemsList.querySelectorAll('li');

  if (listItems.length <= 0) {
    itemFilterInput.style.display = 'none';
    clearAllItemsButton.style.display = 'none';
  } else {
    itemFilterInput.style.display = 'block';
    clearAllItemsButton.style.display = 'block';
  }
}

checkListItems();

// event listeners
addItemForm.addEventListener('submit', handleAddItem);
clearAllItemsButton.addEventListener('click', handleClearAllItems);
itemFilterInput.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);