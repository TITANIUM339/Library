class Book {
    constructor (title, author, pages, complete) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.complete = complete;
    }
}

const books = [];

function addBookToLibrary(title, author, pages, complete) {
    books.push(new Book(title, author, pages, complete));
}

function deleteBookFromLibrary(index) {
    books.splice(index, 1);
}

const container = document.querySelector(".container");

function focusWindow() {
    container.style.filter = "blur(2px)";
    form.style.display = "grid";
}

const form = document.querySelector("form");

function unfocusWindow() {
    form.reset();
    container.style.filter = "blur(0)";
    form.style.display = "none";
}

const cardContainer = document.querySelector(".card-container");

function loadBooks() {
    cardContainer.innerHTML = "";

    for (let i = 0; i < books.length; i++) {
        let card = `
        <div class="card">
            <div class="title">${books[i].title}</div>
            <div class="info">
                <div class="author">
                    Author: <span>${books[i].author}</span>
                </div>
                <div class="pages">
                    Pages: <span>${books[i].pages}</span>
                </div>
                <div class="status">
                    Status: <span>${books[i].complete ? "Completed":"In progress"}</span>
                </div>
                <div class="card-button-container" data-index-number="${i}">
                    <button class="delete">Delete</button>
                    <button class="complete">${books[i].complete ? "Not finished":"Finished"}</button>
                </div>
            </div>
        </div>
        `;
        
        cardContainer.innerHTML += card;
    }

    for (let i = 0; i < books.length; i++) {
        document.querySelector(`div[data-index-number="${i}"]>.delete`).addEventListener("click", function(){
            deleteBookFromLibrary(i);
            loadBooks();
        });

        document.querySelector(`div[data-index-number="${i}"]>.complete`).addEventListener("click", function(){
            books[i].complete = books[i].complete ? false:true;
            loadBooks();
        });
    }
}

document.querySelector(".button-container>button").addEventListener("mouseup", function() {
    focusWindow();
});

document.querySelector(".container").addEventListener("mousedown", function() {
    unfocusWindow();
});

document.querySelector("form>button").addEventListener("mousedown", function() {
    if (form.checkValidity()) {
        let title = document.querySelector("#title").value;
        let author = document.querySelector("#author").value;
        let pages = document.querySelector("#pages").value;
        let complete = document.querySelector("#status").checked;

        addBookToLibrary(title, author, pages, complete);
        unfocusWindow();
        loadBooks();
    }
});