const express = require('express');
// const { DataTypes } = require('sequelize/types');
const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUser = async (req, res) => {
    const user = await models.users.findAll({});
    res.status(200).send({
        status: 200,
        message: 'Berhasil get data user',
        data: user
    });
};

// const createUser = async (req, res) => {
//     try { 
//         const {email, password, phone_number} = req.body;
//         const users = await models.users.create({
//           email,
//           password,
//           phone_number
//         });
//         if (users) {
//           res.status(200).json({
//             'status': 'OK',
//             'messages': 'User berhasil ditambahkan',
//             'data': users,
//           })
//         }
//        } catch (err) {
//          res.status(400).json({
//            'status': 'ERROR',
//            'messages': err.message,
//            'data': {},
//          })
//        }
// }

const createUser = (req, res) => {
  const {email, password, phone_number} = req.body
  models.users.findOne({where: {
    email: email
  }})
  .then((cekEmail) => {
    if (cekEmail != null) {
      res.status(409).json({'messages': 'email is already in use'})
    }
     else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
      models.users.create({
        email,
        password: hash,
        phone_number,
        role_id: 2
      })
      .then ((user) => {
        if (user) {
          res.status(200).json({
            'status': 'OK',
            'messages': 'User berhasil ditambahkan',
          })
        }
      })
      .catch ((err) => {
        res.status(400).json({
          'status': 400,
          'messages': err.message,
          'data': {},
        })
      })
    })
    })
    }
  })
  .catch ((err) => {
    res.status(500).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {},
    })
  })
}

const login = (req, res) => {
  const {email, password} = req.body
  models.users.findOne(
    {
      where: {
        email
      }
    })
  .then ((users) => {
    if (users === null) {
      res.status(400).json({
        'status': 'ERROR',
        'messages': 'user not found',
        'data': {},
      })
    }
    isPassword = bcrypt.compareSync(password, users.dataValues.password)
    if (!isPassword){
      res.status(400).json({
        'status': 'ERROR',
        'messages': 'Wrong Password',
        'data': {},
      })
    } else {
      users.password = undefined
      res.status(200).json({
        'status': 'OK',
        'messages': 'User berhasil login',
        'data': users,
      })
    }
  })
  .catch ((err) => {
    res.status(500).json({
      'status': 'ERROR',
      'messages': err.message,
      'data': null,
    })
  })
}

const reqForgotPassword = (req, res) => {
  const { email } = req.body;
  models.users.findOne(
    {
      where: {
        email
      }
    })
    .then((users) => {
      if (users === null) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': 'user not found',
          'data': {},
        })
      }else{
      res.status(200).json({
        'status': 'OK',
        'messages': 'Silahkan cek email anda'
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

module.exports = { getAllUser, createUser, login, reqForgotPassword }