function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return books.filter(book=> !book.borrows[0].returned).length
}

function getMostCommonGenres(books) {
  const genreNames = books.map(book=> book.genre)
let counts = []
  for(const name of genreNames) {
    //this counts
   let exsisting = counts.findIndex(obj=> obj.name === name);
    if(exsisting >= 0){
     counts[exsisting].count++
   } else {
     counts.push({
      name: name,
      count: 1
    })
    }
  }
  counts.sort((objOne, objTwo)=> objOne.count < objTwo.count ? 1: -1)
  return counts.slice(0, 5)
}

function topFive(sortAndSliceMe) {
  return sortAndSliceMe
    .sort((partOne, partTwo) => partOne.count > partTwo.count ? -1 : 1)
    .slice(0,5)
}
function getMostPopularBooks(books) {
  return topFive(books.map((book) => ({name: book.title, count: book.borrows.length})));
}

function getMostPopularAuthors(books, authors) {
  const mostBooks = books
    .map((book) => ({id: book.authorId, count: book.borrows.length}))
    .sort((bookOne, bookTwo) => bookOne.count > bookTwo.count ? -1 : 1);
  const popAuthors = [];
  for( const popBook of mostBooks) {
    const {name} = authors.find((author) => author.id === popBook.id);
    popAuthors.push({
      name: `${name.first} ${name.last}`,
      count: popBook.count
    })
  }
  const returnValue = [];
  for (const author of popAuthors) {
    const existing = returnValue.findIndex((value) => value.name === author.name);
    if (existing !== -1) {
      returnValue[existing].count += author.count;
    } else {
      returnValue.push(author);
    }
  }
  return returnValue
    .sort((authOne, authTwo) => authOne.count > authTwo.count ? -1 : 1)
    .slice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
