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
let readBtn = document.querySelector('.section__read-btn');
let removeBtn = document.querySelectorAll('.section__remove-btn');

/* FUNCTIONS */

function createNewBook() {
  const bookCard = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');
  const bookIsRead = document.querySelector('#isRead');

  bookCard.className = 'section__card-box';
  title.className = 'book-title';
  author.className = 'book-author';
  pages.className = 'book-pages';
  readBtn.className = 'section__read-btn';
  removeBtn.className = 'section__remove-btn';

  title.textContent = `${bookTitle.value}`;
  author.textContent = `${bookAuthor.value}`;
  if (bookIsRead.checked) {
    readBtn.textContent = 'Read';
  } else {
    readBtn.textContent = 'Not read';
    readBtn.classList.add('section__read-btn--red');
  }
  pages.textContent = `${bookPages.value}`;
  removeBtn.textContent = 'Remove';

  bookCard.append(title);
  bookCard.append(author);
  bookCard.append(pages);
  bookCard.append(readBtn);
  bookCard.append(removeBtn);
  cardContainer.append(bookCard);

  // Hidding modal after ADD BOOK //
  modal.classList.add('modal--hidden');
  overlay.classList.toggle('active');
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBook() {
  removeBtn.forEach(item =>
    item.addEventListener('click', function (e) {
      e.target.closest('div').removeBtn();
    })
  );
}

/* CONSTRUCTORS */

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

/* EVENT HANDLERS */

// Adding books
addButton.addEventListener('click', function () {
  modal.classList.remove('modal--hidden');
  overlay.classList.toggle('active');
});

// Submitting book info
modalSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  createNewBook();
  const book = new Book(bookTitle.value, bookAuthor.value, bookPages.value);
  addBookToLibrary(book);

  // Updating Nodelist
  removeBtn = document.querySelectorAll('.section__remove-btn');
  removeBook();
});
