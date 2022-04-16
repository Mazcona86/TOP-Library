'use strict';

/* GLOBAL VARIABLES FOR EVENTS */

let myLibrary = [];
const addButton = document.querySelector('.section__btn');
const cardContainer = document.querySelector('.section__card-container');
const cardBox = document.querySelector('.section__card-box');
const modal = document.querySelector('.modal');
const modalSubmit = document.querySelector('.modal__form');
const overlay = document.querySelector('.overlay');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const header = document.querySelector('.header');
const bookIsRead = document.querySelector('#isRead');
let readBtn = document.querySelectorAll('.section__read-btn');
let removeBtn = document.querySelectorAll('.section__remove-btn');

/* FUNCTIONS */

function createNewBook(book) {
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

  title.textContent = `${book.title}`;
  author.textContent = `${book.author}`;
  if (bookIsRead.checked) {
    readBtn.textContent = 'Read';
  } else {
    readBtn.textContent = 'Not read';
    readBtn.classList.add('section__read-btn--red');
  }
  pages.textContent = `${book.pages}`;
  removeBtn.textContent = 'Remove';

  bookCard.append(title);
  bookCard.append(author);
  bookCard.append(pages);
  bookCard.append(readBtn);
  bookCard.append(removeBtn);
  cardContainer.append(bookCard);

  // Hidding modal after ADD BOOK //
  toggleModal();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function toggleModal() {
  modal.classList.toggle('modal--hidden');
  overlay.classList.toggle('active');
}

function mainFunction(e) {
  e.preventDefault();
  const book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookIsRead.checked
  );
  createNewBook(book);
  addBookToLibrary(book);

  // Updating Nodelist
  readBtn = document.querySelectorAll('.section__read-btn');
  removeBtn = document.querySelectorAll('.section__remove-btn');

  book.removeBook();
  book.toggleRead();
}

///////////////////////////////////////////////////
/* CONSTRUCTORS */

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  readBtn.forEach(item =>
    item.addEventListener('click', function (e) {
      console.log(e.target);
      if (e.target.textContent === 'Read') {
        item.textContent = 'Not Read';
        this.read = false;
        item.classList.toggle('section__read-btn--red');
      } else {
        item.textContent = 'Read';
        item.classList.toggle('section__read-btn--red');
      }
    })
  );
};

Book.prototype.removeBook = function () {
  removeBtn.forEach(item =>
    item.addEventListener('click', function (e) {
      e.target.closest('div').remove();
    })
  );
};
////////////////////////////////////////////////////////

/* EVENT HANDLERS */

// Adding books
addButton.addEventListener('click', toggleModal);

// Submitting book info
modalSubmit.addEventListener('submit', mainFunction);
