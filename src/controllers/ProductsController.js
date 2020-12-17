const model = require('../models/index')
const helper = require('../helpers/help')
const fs = require('fs')
const { nextTick } = require('process')
const Product = {
    view: (req, res) => {

    },
    getProductById: (req, res) => {

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
            fs.unlink(path, (err) => {
                if (err) {
                    console.log(err)
                }
            })
            return helper.response('error', res, null, 401, 'Only .png, .jpg and .jpeg format allowed!')
        }
        else if (req.file.size >= 4388608) {
            // if images are more than 4mb
            const path = `./images/${req.file.filename}`
            fs.unlinkSync(path)
            return helper.response('error', res, null, 401, 'Image size is too large, it must be under 4MB')
        } else {
            //if there is no error handling it means that it entered the image correctly
            data.images = `${process.env.BASE_URL}/images/${req.file.filename}`
        }
            const product ={
                name: data.name,
                price:data.price,
                description:data.description,
                images:data.images,
                size: data.size,
                stock:data.stock
            }
        model.products.create(product)
            .then((result) => {
                model.delivery.create({
                    id_product:result.id,
                    delivery_methods: data.delivery,
                    start_time:data.start_delivery,
                    end_time:data.end_delivery
                }).then((result) => {
                    return helper.response('success', res, null, 200, result)
                })
                    .catch((err) => {
                        return helper.response('error', res, null, 401, err)
                    })
            })
            .catch((err) => {
               return helper.response('error', res, null, 401, err)
            })
    },

    update: (req,res) => {

    },
    delete: (req, res) => {

    }



}
module.exports = Product