const model = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const helper = require('../helpers/help')
const fs = require('fs')
const Product = {

    searchProduct: (req, res) => {
        search = req.query.search
        model.products.findAll({
            include: [{
                model: model.category
            }],
            attributes: ['id', 'name', 'price', 'images'],
            where: {
                name: {
                    [Op.like]: `%${search}%`
                }
            }
        })
            .then((result) => {
                return helper.response('success', res, result, 200, null)
            })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    },
    // get product by category
    view: (req, res) => {
        category = req.query.category
        sort = req.query.sort || 'DESC'
        const perPage = parseInt(req.query.limit)
        const currentPages = (req.query.page - 1) * perPage
        model.products.findAll({
            include: [{
                model: model.category
            }],
            attributes: ['id', 'name', 'price', 'images'],
            offset: currentPages, limit: perPage,
            where: {
                category_id: category
            },
            order: [['updatedAt', sort]]
        })
            .then((result) => {
                model.products.findAll({
                    where: {
                        category_id: category
                    }}).then((result2)=>{
                        res.json({
                            result: result,
                            rows: result2.length
                        })
                    })
            })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    },

    getProductById: (req, res) => {
        const productId = req.params.id
        model.products.findAll({
            where: {id: productId}
        }).then((result) => {
            if (result.length === 0) {
                return helper.response('success', res, null, 200, 'Id Not Found')
            }
            return helper.response('success', res, result, 200, null)
        })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    },

    insert: (req, res) => {
        let data = req.body
        data = JSON.parse(JSON.stringify(data))
        // validasi images
        if (!req.file) {
            // if not include images
            data.images = 'https://e7.pngegg.com/pngimages/924/927/png-clipart-camera-lens-camera-lens-camera.png'
        }
        else if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg") {
            // if the image type is wrong
            const path = `./images/${req.file.filename}` //the location of the images to be deleted
            // delete the images
            fs.unlinkSync(path)
            return helper.response('error', res, null, 401, 'Only .png, .jpg and .jpeg format allowed!')
        }
        else if (req.file.size >= 4388608) {
            // if images are more than 4mb
            const path = `./images/${req.file.filename}` //the location of the images to be deleted
            // delete the images
            fs.unlinkSync(path)
            return helper.response('error', res, null, 401, 'Image size is too large, it must be under 4MB')
        } else {
            //if there is no error handling it means that it entered the image correctly
            data.images = `${process.env.BASE_URL}images/${req.file.filename}`
        }
        model.products.create(data)
            .then((result) => {
                return helper.response('success', res, result, 200, null)
            })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })

    },

    update: (req, res) => {
        let data = req.body
        const productId = req.params.id
        data = JSON.parse(JSON.stringify(data))
        if (!req.file) {
            data.updatedAt = new Date()
        }
        else if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg") {
            const path = `./images/${req.file.filename}` //the location of the images to be deleted
            // delete the images
            fs.unlinkSync(path)
            return helper.response('error', res, null, 401, 'Only .png, .jpg and .jpeg format allowed!')
        }
        else if (req.file.size >= 8388608) {
            const path = `./images/${req.file.filename}` //the location of the images to be deleted
            // delete the images
            fs.unlinkSync(path)
            return helper.response('error', res, null, 401, 'Image size is too large, it must be under 8MB')
        } else {
            data.images = `${process.env.BASE_URL}images/${req.file.filename}`
            // process delete image on folder server
            model.products.findAll(
                { attributes: ['id', 'images'] },
                { where: { id: productId } }
            ).then((result) => {
                if (result[0].images !== 'https://e7.pngegg.com/pngimages/924/927/png-clipart-camera-lens-camera-lens-camera.png') {
                    const images = result[0].images.split('/')[4]
                    const path = `images/${images}`
                    fs.unlinkSync(path)
                }
            })
        }
        model.products.update(data, {
            where: {
                id: productId
            }
        })
            .then(result => {
                if (result[0] === 0) {
                    return helper.response('warning', res, null, 200, 'Id Not Found')
                }
                return helper.response('success', res, result[0], 200, 'data was updated successfully')
            })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    },

    delete: (req, res) => {
        const productId = req.params.id
        model.products.destroy({
            where: {
                id: productId
            }
        })
            .then((result) => {
                if (result === 0) {
                    return helper.response('success', res, null, 200, 'Id Not Found')
                }
                return helper.response('success', res, result, 200, 'data deleted successfully')
            })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    }



}
module.exports = Product