let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = function () {
            return (this.title + " by " + this.author +
                "\nPages:" + this.pages +
                "\nStatus:" + (this.read ? "Read" : "Not Read"));
        };
    }
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

let index = myLibrary.length;

function addBookToLibrary(title, author, pages, readStatus) {



    let newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
    //clearing all the divs before adding all of them

    removeAllChildNodes(document.getElementById("cards"));

    //buckle up thats going to be a rough ride
    myLibrary.forEach(book => {
        // making the card div
        let card = document.createElement("div");
        card.className = "card";
        card.dataset.indexCard = index;

        //inside the card div we got a h2, img and a p
        let name = document.createElement("h2");
        name.innerText = book.title;
        name.className = "card-title";

        let cover = document.createElement("img");
        cover.src = "hobbit.jpg";
        cover.alt = (book.title + " Cover")

        let cardDesc = document.createElement("p");
        cardDesc.className = "card-desc";
        cardDesc.innerText = book.info();

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.dataset.indexCheckbox = index;
        if (book.read == true) {
            checkbox.checked = true;
        }

        checkbox.addEventListener('change', (event) => {
            if (event.currentTarget.checked) {
                myLibrary[event.currentTarget.dataset.indexCheckbox].toggleRead();
                updateCardDesc(event.currentTarget.dataset.indexCheckbox);
            }
            else {
                myLibrary[event.currentTarget.dataset.indexCheckbox].toggleRead();
                updateCardDesc(event.currentTarget.dataset.indexCheckbox);
            }
        })

        let deleteContainer = document.createElement("div");
        deleteContainer.className = "delete-container";

        let deleteButton = document.createElement("div");
        deleteButton.innerText = "Delete"
        deleteButton.className = "delete-button";
        deleteButton.dataset.index = index;
        deleteButton.setAttribute("onclick", "deleteBook(this)")

        deleteContainer.appendChild(deleteButton);

        let slider = document.createElement("label");
        slider.className = "switch";



        let sliderRound = document.createElement("span");
        sliderRound.className = "slider round"

        slider.appendChild(checkbox);
        slider.appendChild(sliderRound);

        deleteContainer.appendChild(slider);
        //appending those 3 to the card div
        card.appendChild(name);
        card.appendChild(cover);
        card.appendChild(cardDesc);
        card.appendChild(deleteContainer);

        document.getElementById("cards").appendChild(card);

        index++;
    });
}

function updateCardDesc(index){
    let card = document.querySelector('[data-index-card="' + index + '"]');
    card.firstChild.nextSibling.nextSibling.innerText = myLibrary[index].info();;
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function submitForm() {
    //grabbing the value and reseting them to default
    let title = document.getElementById("title").value;
    document.getElementById("title").value = "";
    let author = document.getElementById("author").value;
    document.getElementById("author").value = "";
    let pages = document.getElementById("pages").value;
    document.getElementById("pages").value = "";
    let readStatus = Boolean(parseInt(document.getElementById("read").value));
    document.getElementById("read").value = "0";

    //guess what this does
    closeForm();

    addBookToLibrary(title, author, pages, readStatus);

}

function removeAllChildNodes(parent) {
    index = 0;
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function deleteBook(indexPointer) {

    index = indexPointer.dataset.index;
    if (index > -1) {
        myLibrary.splice(index, 1);
    }

    let indexCard =
        document.querySelector('[data-index-card="' + index + '"]');
    indexCard.remove();
}
