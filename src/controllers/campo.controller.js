const campoService = require('../services/campo.service')

const get = async (req, res) => {
    campos = await campoService.get()
    if (req.user) {
     res.render('pages/index', {user: req.user._json, campos})
    } else {
     res.render('pages/index', {user: null, campos})
    }
 }

module.exports = {
    get
} 