const express = require('express');
const models = require('../models');

const editProfile = (req, res) => {
  const { email, address, phone_number, username, first_name, last_name, bod, gender } = req.body;
  models.users.update({
    email,
    address,
    phone_number,
    username,
    first_name,
    last_name,
    bod,
    gender
  },
    {
      where: {
        id: req.userId
      }
    }
  )
    .then((users) => {
      users.password = undefined
      if (users) {
        res.status(200).json({
          'status': 'OK',
          'messages': 'Data Berhasil di update'
        })
      } else {
        res.status(400).json({
          'status': '400',
          'messages': 'Data tidak berhasil di update',
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

const updateImage = (req, res) => {
  const image = `${process.env.BASE_URL}images/${req.file.filename}`;
  models.users.update({ image },
    {
      where: {
        id: req.userId
      }
    })
    .then((result) => {
      if (result) {
        res.status(200).json({
          'status': 'OK',
          'messages': 'image Berhasil di update',
        })
      } else {
        res.status(400).json({
          'status': '400',
          'messages': 'image tidak berhasil di update',
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

const deleteImage = (req, res) => {

  models.users.update({ image: null },
    {
      where: {
        id: req.userId
      }
    })
    .then((result) => {
      if (result) {
        res.status(200).json({
          'status': 'OK',
          'messages': 'image Berhasil di hapus',
        })
      } else {
        res.status(400).json({
          'status': '400',
          'messages': 'image tidak berhasil di hapus',
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

const getDetail = (req, res) => {
  models.users.findOne(
    {
      where: {
        id: req.userId
      }
    })
    .then((users) => {
      users.password = undefined
      if (users === null) {
        res.status(404).json({
          'status': 'ERROR',
          'messages': 'user not found',
          'data': {},
        })
      } else {
        res.status(200).json({
          'status': '200',
          'messages': 'Get detail success',
          'data': users
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

module.exports = { editProfile, updateImage, deleteImage, getDetail }