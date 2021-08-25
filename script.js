let myLibrary = [];
const titleDisplay = document.getElementById('display-title-value');
const authorDisplay = document.getElementById('display-author-value');
const pagesDisplay = document.getElementById('display-pages-value');
const isReadDisplay = document.getElementById('read-checkbox');
let displayedBookIndex;

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author; 
    this.pages = pages; 
    this.isRead = isRead;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? 'has been read' : 'not read yet'}`;
    };
    this.spineText = function() {
        return `${this.title} by ${this.author}`
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    myLibrary.push(new Book(title, author, pages, isRead))
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    renderLibrary();
}

function renderInfoDisplay(book) {
    titleDisplay.innerText = book.title;
    authorDisplay.innerText = book.author;
    pagesDisplay.innerText = book.pages;
    isReadDisplay.checked = book.isRead;
}

function clearInfoDisplay() {
    titleDisplay.innerText = '';
    authorDisplay.innerText = '';
    pagesDisplay.innerText = '';
    isReadDisplay.checked = '';
}

function renderLibrary() {
    // clear shelves
    Array.from(document.getElementsByClassName('book')).forEach(element => {
        element.remove();
    });
    const shelves = Array.from(document.getElementsByClassName('shelf-wood'));
    let currentShelf = shelves.shift();
    let shelfMaxWidth = currentShelf.offsetWidth;
    let widthCounter = 0;
    for(let i= 0; i < myLibrary.length; i += 1) {
        const nextBookDiv = document.createElement('div');
        nextBookDiv.classList.add('book');
        nextBookDiv.dataset.index = i;
        nextBookDiv.innerText = myLibrary[i].spineText();
        currentShelf.appendChild(nextBookDiv);
        widthCounter += nextBookDiv.offsetWidth;
        if (widthCounter > shelfMaxWidth) {
            nextBookDiv.remove();
            currentShelf = shelves.shift();
            if(!currentShelf) {
                break;
            }
            shelfMaxWidth = currentShelf.offsetWidth;
            widthCounter = 0;
        }
    }
}

window.addEventListener('load', ()=> {
    document.getElementById('app-container').addEventListener('click', (e)=>{
        if(e.target.className === 'book') {
            displayedBookIndex = e.target.dataset.index;
            renderInfoDisplay(myLibrary[displayedBookIndex]);
        }
    });
    isReadDisplay.addEventListener('click', () => {
        if(displayedBookIndex >= 0) {
            myLibrary[displayedBookIndex].isRead = !myLibrary[displayedBookIndex].isRead;
        }
    })
    document.getElementById('remove-book-bttn').addEventListener('click', ()=> {
        if(displayedBookIndex >= 0) {
            removeBookFromLibrary(displayedBookIndex);
            displayedBookIndex = Math.min(displayedBookIndex, myLibrary.length - 1);
            if(displayedBookIndex >= 0) {     
                renderInfoDisplay(myLibrary[displayedBookIndex]);
            } else {
                clearInfoDisplay();
            }
        }
    });
})