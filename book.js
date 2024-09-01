function Book(title, author, pages, read) {
  this.title  = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function(){
    return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
  }
}

Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
}

let myLibrary = [
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 180 , "yes"),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, "no"),
  new Book("1984", "George Orwell", 328, "yes"),
];

function showBook(){
  const booksContainer = document.getElementById("booksContainer");
  booksContainer.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookTitle = document.createElement("h2");
    bookTitle.innerHTML = myLibrary[i].title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerHTML = `<strong>Author:</strong> ${myLibrary[i].author}`;

    const bookPages = document.createElement("p");
    bookPages.innerHTML = `<strong>Pages:</strong> ${myLibrary[i].pages}`;

    const bookRead = document.createElement("p");
    bookRead.innerHTML = `<strong>Read:</strong> ${myLibrary[i].read? "Yes" : "No"}`;

    // create button to remove the book
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.setAttribute('data-index', i);
    removeButton.addEventListener('click', () => {
      removeBook(i);
    });

    const toggleReadButton = document.createElement("button");
    toggleReadButton.textContent = "Toggle Read Status";
    toggleReadButton.setAttribute('data-index', i);
    toggleReadButton.addEventListener('click', () => {
      toggleReadStatus(i);
    });

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);
    bookCard.appendChild(toggleReadButton);
    bookCard.appendChild(removeButton);

    booksContainer.appendChild(bookCard);
  }
}

function removeBook(index){
  myLibrary.splice(index, 1);
  showBook();
}

function toggleReadStatus(index){
  myLibrary[index].toggleReadStatus();
  showBook();
}

document.getElementById("showBooks").addEventListener("click", showBook);
document.getElementById("newBookButton").addEventListener("click", ()=> {document.getElementById("newBookDialog").showModal();
})
document.getElementById("cancelButton").addEventListener("click", ()=> {document.getElementById("newBookDialog").close();})
document.getElementById("newBookForm").addEventListener("submit", function(e){e.preventDefault

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);

  document.getElementById('newBookDialog').close();

  // document.getElementById("newBookForm").reset();
});

function addBookToLibrary(title, author, pages, read){
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  showBook();
}

