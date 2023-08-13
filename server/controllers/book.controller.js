const axios = require('axios')
class BooksController {
  static async book(req, res,next) {
    const {keyword} = req.query
    try {
      const response = await axios({ url: `https://www.googleapis.com/books/v1/volumes?q=${keyword}` })

      const {items} = response.data

      const data = items.map((book) =>({
        id: book.id,
        author: book.volumeInfo.authors || 'unknown' ,
        title: book.volumeInfo.title || '',
        thumbnail: book.volumeInfo.imageLinks?.thumbnail || '',
        rating: book.volumeInfo.averageRating || 0
      }))
      res.status(200).json({
        data
      })
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = BooksController