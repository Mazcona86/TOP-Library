'use strict';

/* GLOBAL VARIABLES FOR EVENTS */
let myLibrary = [];

const addButton = document.querySelector('.section__btn');
const cardContainer = document.querySelector('.section__card-container');
const modal = document.querySelector('.modal');
const modalSubmit = document.querySelector('.modal__submit-btn');
const overlay = document.querySelector('.overlay');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const header = document.querySelector('.header');
let removeCard = document.querySelectorAll('.section__remove-btn');

/**************************************
  FUNCTIONS
 **************************************/

function createNewCard() {
  const bookCard = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');

  bookCard.className = 'section__card-box';
  title.className = 'book-title';
  author.className = 'book-author';
  pages.className = 'book-pages';
  readBtn.className = 'section__read-btn';
  removeBtn.className = 'section__remove-btn';

  title.textContent = `${bookTitle.value}`;
  author.textContent = `${bookAuthor.value}`;
  pages.textContent = `${bookPages.value}`;
  readBtn.textContent = 'Read';
  removeBtn.textContent = 'Remove';

  bookCard.append(title);
  bookCard.append(author);
  bookCard.append(pages);
  bookCard.append(readBtn);
  bookCard.append(removeBtn);
  cardContainer.append(bookCard);

  // Showing modal after ADD BOOK //
  modal.classList.add('modal--hidden');
  overlay.classList.toggle('active');
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

/**************************************
  CONSTRUCTOR
 **************************************/

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  createNewCard();
}

/**************************************
  EVENTLISTENER
 **************************************/

addButton.addEventListener('click', function () {
  modal.classList.remove('modal--hidden');
  overlay.classList.toggle('active');
});

modalSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  const book = new Book(bookTitle.value, bookAuthor.value, bookPages.value);
  addBookToLibrary(book);
  removeCard = document.querySelectorAll('.section__remove-btn');
  console.log(removeCard);
});

removeCard.forEach(item =>
  item.addEventListener('click', function () {
    console.log(item);
    console.log(removeCard);
  })
);
