const model = require('../models/index')
const helper = require('../helpers/help')
const fs = require('fs')
const Product = {
    view: (req, res) => {
        const perPage = parseInt(req.query.limit)
        const currentPages = (req.query.page - 1) * perPage
        model.products.findAll({
            attributes: ['id', 'name', 'price', 'images'],
            offset: currentPages, limit: perPage
        })
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    },

    getProductById: (req, res) => {
        const productId = req.params.id
        model.products.findAll({
            include: [{
                model: model.delivery
            }],
            where: {
                id: productId
            }
        }).then((result) => {
            if (result.length === 0) {
                return helper.response('success', res, null, 200, 'Id Not Found')
            }
            return helper.response('success', res, null, 200, result)
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
            data.images = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
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
            data.images = `${process.env.BASE_URL}/images/${req.file.filename}`
        }
        const product = {
            name: data.name,
            price: data.price,
            description: data.description,
            images: data.images,
            size: data.size,
            stock: data.stock
        }
        return model.sequelize.transaction(t => {
            return model.products.create(product, { transaction: t })
                .then((result) => {
                    return model.delivery.create({
                        id_product: result.id,
                        delivery_methods: data.delivery,
                        start_time: data.start_delivery,
                        end_time: data.end_delivery
                    }, { transaction: t })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        }).then((result) => {
            return helper.response('success', res, null, 200, result)
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
            data.images = `${process.env.BASE_URL}/images/${req.file.filename}`
            // process delete image on folder server
            model.products.findAll(
                { attributes: ['id', 'images'] },
                { where: { id: productId } }
            ).then((result) => {
                if (result[0].images !== 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png') {
                    const images = result[0].images.split('/')[4]
                    const path = `images/${images}`
                    fs.unlinkSync(path)
                }
            })
        }
        const product = {
            name: data.name,
            price: data.price,
            description: data.description,
            images: data.images,
            size: data.size,
            stock: data.stock
        }
        model.products.update(product, {
            where: {
                id: productId
            }
        })
            .then(result => {
                if (result[0] === 0) {
                    return helper.response('warning', res, null, 200, 'Id Not Found')
                }
                model.delivery.update({
                    delivery_methods: data.delivery,
                    start_time: data.start_delivery,
                    end_time: data.end_delivery
                }, {
                    where: {
                        id_product: productId
                    }
                })
                    .catch((err) => {
                        console.log(err)
                    })
                return helper.response('success', res, null, 200, 'data was updated successfully')
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
                return helper.response('success', res, null, 200, 'data deleted successfully')
            })
            .catch((err) => {
                return helper.response('error', res, null, 401, err)
            })
    }



}
module.exports = Product