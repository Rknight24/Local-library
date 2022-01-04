function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

function findBookById(books, id) {
  return books.find(book=> book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  return [
    [...books.filter(book=> !book.borrows[0].returned)
      ],
      [
        ...books.filter(book=> book.borrows[0].returned)
      ]
    ]
  }

  function getBorrowersForBook({borrows}, accounts) {
    const returnValue = [];
    for (const borrow of borrows) {
      const {id, picture, age, name, company, email, registered} = accounts.find((account) => borrow.id === account.id);
      const returned = borrow.returned
      const newObj = {
        id,
        returned,
        picture,
        age,
        name,
        company,
        email,
        registered
      }
      returnValue.length >= 10 ? returnValue: returnValue.push(newObj);
    }
    return returnValue;
  }

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
