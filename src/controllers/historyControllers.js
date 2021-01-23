const express = require('express');
const models = require('../models');

const historyByUser = (req, res) => {
  models.order_detail.findAll({
    include: [{
      model: models.products,
      attributes: ['id', 'name', 'price', 'images']
    }, {
      model: models.order,
      attributes: ['id', 'status_order', 'user_id'],
      where:{
        user_id: req.userId
      }
    }],
  })
  .then((result) => {
    // liat di FE butuh price product tidak??? klo ya map price  with size price
    if (result) {
      res.status(200).json({
        'status': 'OK',
        'messages': 'Berhasil get history',
        'data': result
      })
    } else {
      res.status(400).json({
        'status': '400',
        'messages': 'Gagal get history',
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

const deleteHistory = (req, res) => {
  const { order_detail_ids } = req.body;
  models.order_detail.destroy({
    where: {
      id: order_detail_ids
    }
  })
  .then((result) => {
    if (result) {
      res.status(200).json({
        'status': 'OK',
        'messages': 'Berhasil delete history',
      })
    } else {
      res.status(400).json({
        'status': '400',
        'messages': 'Gagal delete history',
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
module.exports = { historyByUser, deleteHistory }