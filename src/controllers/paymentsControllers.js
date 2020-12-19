const express = require('express');
const models = require('../models');

const checkout = (req, res) => {
  const {products, address, customer_phone, subtotal, tax_fee, shipping, total, payment_method_id, delivery_method, delivery_time } = req.body;
    models.order.create({
      user_id: req.id,
      address,
      customer_phone,
      subtotal,
      tax_fee,
      shipping,
      total,
      status_order: 'new order',
      payment_method_id,
      delivery_method,
      delivery_time
    })
    .then((order) => {
      console.log(products)
      products.map(product => {
        models.order_detail.create({
          product_id: product.product_id,
          order_id: order.dataValues.id,
          qty: product.qty
        })
      })
        if (order) {
          res.status(200).json({
            'status': 'OK',
            'messages': 'Order berhasil dibuat'
          })
        } else {
          res.status(400).json({
            'status': '400',
            'messages': 'Order gagal dibuat',
            'data': {}
          })
        }
      })
    .catch((err) => {
      res.status(500).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': null,
      })
    })
}


module.exports = { checkout }