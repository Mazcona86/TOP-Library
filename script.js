'use strict';

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead(e) {
    if (e.target.textContent === 'Read') {
      e.target.textContent = 'Not Read';
      this.read = false;
      e.target.classList.add('section__read-btn--red');
    } else {
      e.target.textContent = 'Read';
      this.read = true;
      e.target.classList.remove('section__read-btn--red');
    }
  }

  removeBook(e) {
    e.target.closest('div').remove();
  }
}

class App {
  myLibrary = [];
  #addButton = document.querySelector('.section__btn');
  #cardContainer = document.querySelector('.section__card-container');
  #modalSubmit = document.querySelector('.modal__form');
  #bookIsRead = document.querySelector('#isRead');

  constructor() {
    // Adding books
    this.#addButton.addEventListener('click', this._toggleModal);

    // Submitting book info
    this.#modalSubmit.addEventListener('submit', this._mainFunction.bind(this));
  }

  _createNewCard(book) {
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

    if (this.#bookIsRead.checked) {
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
    this.#cardContainer.append(bookCard);

    // Add EventListener to newly created elements //
    removeBtn.addEventListener('click', book.removeBook);
    readBtn.addEventListener('click', book.toggleRead.bind(book));

    // Hidding modal after ADD BOOK //
    this._toggleModal();
  }

  _addBookToLibrary(book) {
    this.myLibrary.push(book);
  }

  _toggleModal() {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.modal__close-btn');

    modal.classList.toggle('modal--hidden');
    overlay.classList.toggle('active');
    closeBtn.addEventListener('click', function (e) {
      modal.classList.add('modal--hidden');
      overlay.classList.remove('active');
    });
  }

  _mainFunction(e) {
    const bookTitle = document.getElementById('title');
    const bookAuthor = document.getElementById('author');
    const bookPages = document.getElementById('pages');

    e.preventDefault();
    const book = new Book(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      this.#bookIsRead.checked
    );
    this._createNewCard(book);
    this._addBookToLibrary(book);
  }
}

const app = new App();
