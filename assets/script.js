// Funzione per ottenere i libri dalla chiamata API
async function getBooks() {
  try {
    const response = await fetch('https://striveschool-api.herokuapp.com/books');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Errore durante il recupero dei libri', error);
  }
}

// Funzione per renderizzare i libri sulla pagina
async function renderBooks() {
  const bookListContainer = document.getElementById('book-list');
  const books = await getBooks();

  books.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('col-sm-12', 'col-md-6', 'col-lg-3', 'book-card');

    card.innerHTML = `
            <div class="card">
              <img src="${book.img}" class="card-img-top img-fluid" alt="Copertina del libro">
              <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">Prezzo: $${book.price}</p>
                <button class="btn btn-danger" onclick="removeBook(this)">Scarta</button>
                <button class="btn btn-success" onclick="addToCart('${book.title}', ${book.price})">Compra ora</button>
              </div>
            </div>
          `;

    bookListContainer.appendChild(card);
  });
}

// Funzione per rimuovere un libro dalla pagina
function removeBook(button) {
  const bookCard = button.closest('.book-card');
  bookCard.remove();
}

// Inizializza la pagina
renderBooks();