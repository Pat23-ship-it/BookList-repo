//Book Class: Represents Book
class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn  
      
    }
}

//UI Class: Handle UI Tasks
class UI {
    
        static displayBooks() {
           
            const books = Store.getBooks();

            books.forEach((book) => UI.addBookToList(book));
        }

        static addBookToList(book) {
            //get the book
            const list = document.getElementById('book-list');
            //create an element
            const row = document.createElement('tr')
            
            //insert table
            row.innerHTML = 
                `<td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td> 
            
                <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`

                list.appendChild(row)

                
        }


        static deleteBook(el) {
            if(el.classList.contains('delete')) {
                el.parentElement.parentElement.remove()
            }

        }

        static showAlert(message, className) {
            //create a div
            const div = document.createElement('div');
            //add class
            div.className =`alert alert-${className}`;
            //add text
            div.appendChild(document.createTextNode(message));
            //get parent
            const container = document.querySelector('.container');
            //get form
            const form = document.querySelector('#book-form');
            //insert
            container.insertBefore(div,form);
            //timeout
             setTimeout (() => document.querySelector('.alert').remove(),3000) 

            }

        
       //clear fields
        static clearFields() {
             document.getElementById('title').value = ''
             document.getElementById('author').value = ''
             document.getElementById('isbn').value = ''
             

        }
    }


//Store CLass: Handles Storage
class Store {
   static getBooks() {
       let books;
       if(localStorage.getItem('books') === null) {
           books = []
       }else {
           books = JSON.parse(localStorage.getItem('books'));
       }
      return books
    }

   static addBook(book) {
       const books = Store.getBooks();
       books.push(book)
       localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }
        })
      localStorage.setItem('books', JSON.stringify(books))
    }

  
}

//Event Listeners
document.addEventListener('DOMContentLoaded',UI.displayBooks)

//Event:Add a Book
document.getElementById('book-form').addEventListener('submit',(e) => {
    e.preventDefault()
    //form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
   


    //validate Book
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please enter all fields', 'danger')
    }else {

  //Instantiate book
  const book = new Book(title,author,isbn)

  //Add book to list
  UI.addBookToList(book)

  //AddBook to store
  Store.addBook(book);

  //show success message
  UI.showAlert('Book Added','success')

  //clearfields
  UI.clearFields()
 

    }
  
   
    
});


//Event:Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {

    UI.deleteBook(e.target);

    //show success message
    UI.showAlert('Book removed','success')
});





