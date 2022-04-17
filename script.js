'use strict';

/* GLOBAL VARIABLES FOR EVENTS */

let myLibrary = [];
const addButton = document.querySelector('.section__btn');
const cardContainer = document.querySelector('.section__card-container');
const modal = document.querySelector('.modal');
const modalSubmit = document.querySelector('.modal__form');
const overlay = document.querySelector('.overlay');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const header = document.querySelector('.header');
const bookIsRead = document.querySelector('#isRead');
const readBtn = document.querySelector('.section__read-btn');
const removeBtn = document.querySelector('.section__remove-btn');
const closeBtn = document.querySelector('.modal__close-btn');

/* FUNCTIONS */

function createNewCard(book) {
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

  // Add EventListener to newly created elements //
  removeBtn.addEventListener('click', book.removeBook);
  readBtn.addEventListener('click', book.toggleRead.bind(book));

  // Hidding modal after ADD BOOK //
  toggleModal();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function toggleModal() {
  modal.classList.toggle('modal--hidden');
  overlay.classList.toggle('active');
  closeBtn.addEventListener('click', function (e) {
    modal.classList.add('modal--hidden');
    overlay.classList.remove('active');
  });
}

function mainFunction(e) {
  e.preventDefault();
  const book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookIsRead.checked
  );
  createNewCard(book);
  addBookToLibrary(book);
}

///////////////////////////////////////////////////
/* CONSTRUCTORS */

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function (e) {
  if (e.target.textContent === 'Read') {
    e.target.textContent = 'Not Read';
    this.read = false;
    e.target.classList.add('section__read-btn--red');
  } else {
    e.target.textContent = 'Read';
    this.read = true;
    e.target.classList.remove('section__read-btn--red');
  }
};

Book.prototype.removeBook = function (e) {
  e.target.closest('div').remove();
};
////////////////////////////////////////////////////////

/* EVENT HANDLERS */

// Adding books
addButton.addEventListener('click', toggleModal);

// Submitting book info
modalSubmit.addEventListener('submit', mainFunction);
