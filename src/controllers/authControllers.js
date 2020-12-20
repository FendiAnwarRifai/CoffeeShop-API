const express = require('express');
// const { DataTypes } = require('sequelize/types');
const helpers = require('../helpers/help')
const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../helpers/email')

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
  const { email, password, phone_number } = req.body
  models.users.findOne({
    where: {
      email: email
    }
  })
    .then((cekEmail) => {
      if (cekEmail != null) {
        res.status(409).json({ 'messages': 'email is already in use' })
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
              .then((user) => {
                if (user) {
                  res.status(200).json({
                    'status': 'OK',
                    'messages': 'User berhasil ditambahkan',
                  })
                }
              })
              .catch((err) => {
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
    .catch((err) => {
      res.status(500).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': {},
      })
    })
}

const login = (req, res) => {
  const { email, password } = req.body
  models.users.findOne(
    {
      where: {
        email
      }
    })
    .then((users) => {
      if (users === null) {
        res.status(404).json({
          'status': 'ERROR',
          'messages': 'user not found',
          'data': {},
        })
      }
      isPassword = bcrypt.compareSync(password, users.dataValues.password)
      if (!isPassword) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': 'Wrong Password',
          'data': {},
        })
      } else {
        users.password = undefined
        jwt.sign({ id: users.id, email: users.email, roleId: users.role_id }, process.env.SECRET_KEY, { expiresIn: '24h' }, function (err, token) {
          res.status(200).json({
            'status': 'OK',
            'messages': 'User berhasil login',
            'data': users,
            'token': token
          })
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
          'status': '400',
          'messages': 'user not found',
          'data': {},
        })
      } else {
        jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '500s' }, function (err, token) {
          const data = {
            //ToDO link diperbaharui, menggunakan link front-end
            link: `${process.env.BASE_URL}users/email-verif/${token}`,
            username: users.username
          }
          sendEmail(email, data)
            .then(() => {
              res.status(200).json({
                'status': '200',
                'messages': 'Silahkan cek email anda'
              })
            })
            .catch(() => {
              return helpers.response(res, null, 500, {
                message: 'error send email'
              })
            })
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        'status': '500',
        'messages': err.message,
        'data': null,
      })
    })
}

const forgotPassword = (req, res) => {
  const { password, repeat_password } = req.body;
  const { token } = req.params;
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      if (err.name === 'JsonWebTokenError') {
        res.status(401).json({
          'status': '401',
          'messages': 'invalid token'
        })
      } else if (err.name === 'TokenExpiredError') {
        res.status(401).json({
          'status': '401',
          'messages': 'Token Expired'
        })
      }
    }
    if (password !== repeat_password) {
      res.status(400).json({
        'status': '400',
        'messages': 'Password harus sama',
        'data': {},
      })
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        models.users.update({
          password: hash
        }, {
          where: {
            email: decoded.email
          }
        })
          .then((users) => {
            if (users === null) {
              res.status(404).json({
                'status': '404',
                'messages': 'user not found',
                'data': {},
              })
            } else {
              res.status(200).json({
                'status': '200',
                'messages': 'Password berhasil diubah',
              })
            }
          })
          .catch((err) => {
            console.log(err);
          })
      })
    })
  })
}

const editPassword = (req, res) => {
  const { userId } = req
  const { prev_password, password, repeat_password } = req.body;
  models.users.findOne(
    {
      where: {
        id: userId
      }
    })
    .then((user) => {
      if (user === null) {
        res.status(404).json({
          'status': 'ERROR',
          'messages': 'user not found',
          'data': {},
        })
      }
      isPassword = bcrypt.compareSync(prev_password, user.dataValues.password)
      if (!isPassword) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': 'Previous password is wrong',
          'data': {},
        })
      } else {
        if (password !== repeat_password) {
          res.status(400).json({
            'status': '400',
            'messages': 'Password harus sama',
            'data': {},
          })
        }
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            models.users.update({
              password: hash
            }, {
              where: {
                id: userId
              }
            })
              .then((editPassword) => {
                if (editPassword === null) {
                  res.status(404).json({
                    'status': '404',
                    'messages': 'user not found',
                    'data': {},
                  })
                } else {
                  res.status(200).json({
                    'status': '200',
                    'messages': 'Password berhasil diubah',
                  })
                }
              })
              .catch((err) => {
                console.log(err);
              })
          })
        })
      }
    })
}

module.exports = { getAllUser, createUser, login, reqForgotPassword, forgotPassword, editPassword }