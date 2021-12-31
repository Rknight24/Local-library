function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountOne, accountTwo)=> (accountOne.name.last.toLowerCase() > 
  accountTwo.name.last.toLowerCase()? 1: -1))
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((allBorrows, book)=> {
    if (!allBorrows) {allBorrows = [...book.borrows,]}
    else {allBorrows = [...allBorrows, ...book.borrows,]};
    return allBorrows;
  }, [])
  .filter(({id}) => id === account.id).length;
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = books.filter(book => {
    if(!book.borrows[0].returned && book.borrows[0].id === account.id) {
      return book;
    }
  });
  for(let i = 0; i < borrowedBooks.length; i++) {
    const {id, title, authorId, borrows} = borrowedBooks[i];
    const bookAuthor = authors.find(author => author.id === borrowedBooks[i].authorId);
    borrowedBooks[i] = {
      id,
      title,
      authorId,
      author: bookAuthor,
      borrows,
    };
  }
  return borrowedBooks;
}
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
