const Wishlist = require('../schema/wishlist')

class WishlistController {
  static async getWishlist(req, res) {
    try {
      const data = await Wishlist.find()
        .sort({ createdAt: -1 })

      res.status(200).json({
        data
      })
    } catch (err) {
      next(err)
    }
  }

  static async postWishlist(req, res, next) {
    const { id, thumbnail, rating, author, title } = req.body

    try {
      let newAuthor 

      if (!id || !thumbnail || !rating || !author || !title) {
        throw { name: 'required' }
      }


      if(Array.isArray(author)) {
        newAuthor = author.join(',') 
      } else {
        newAuthor = author
      }
      

      const books = await Wishlist.findOne().where({ id })

      if (books) {
        throw { name: 'duplicateItem' }
      }

      const success = await Wishlist.insertMany({
        id, thumbnail, rating, author: newAuthor, title
      })

      res.status(201).json({ message: success })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = WishlistController