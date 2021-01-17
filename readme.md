<h1 align="center">Coffee Shop Skyline</h1>

[![Node JS](https://img.shields.io/badge/Dependencies-Express%20JS-green)](https://nodejs.org/en/)
![GitHub repo size](https://img.shields.io/github/repo-size/FendiAnwarRifai/CoffeeShop-API)
![GitHub contributors](https://img.shields.io/github/contributors/FendiAnwarRifai/CoffeeShop-API)
![GitHub stars](https://img.shields.io/github/stars/FendiAnwarRifai/CoffeeShop-API)
![GitHub forks](https://img.shields.io/github/forks/FendiAnwarRifai/CoffeeShop-API)

<p align="center">
  <a href="https://nodejs.org/" target="blank">
    <img src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

## Table of Contents
* [Prerequiste](#Prerequiste)
* [Installation](#Installation)
* [Create Environment Variable](#create-environment-variable)
* [Start Development Server](#Start-Development-Server)
* [Postman Collection](#Postman-Collection)
* [API Endpoint](#API-Endpoint)
* [About Project](#About-Project)
* [Related Project](#Related-Project)
* [Contributing](#Contributing)
* [Contact](#Contact)


## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/).
- MySQL - Download and Install [MySQL](https://www.mysql.com/downloads/)
- Redis - Download and Install [Redis](https://redis.io/)


## Installation
### Clone
```
$ git clone https://github.com/azmprllynsa/tokosidia-API.git
$ cd tokosidia-API
$ npm install
```

## Create Environment Variable

```
DB_HOST=YOUR_DB_HOST
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=YOUR_TABLE_NAME
PORT=YOUR_PORT
SECRET_KEY = YOUR_SECRET_KEY
URL_EMAIL_CONFIRM = YOUR_EMAIL_VALIDATION_PAGE_FRONTEND
EMAIL = YOUR_EMAIL_CONFIRMATION
PASSWORD = YOUR_EMAIL_PASSWORD
```

### Start Development Server
```
$ npm run serve
```
## Link Collection Postman
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/b14d5faf192b7b980d32)

## API Endpoint
### Auth Endpoint
| No  | HTTP Method | URI                                           | Operation                                  |
| --- | ----------- | --------------------------------------------- | ------------------------------------------ |
| 1   | POST        | /api/auth/signup                              | Register new user                          |
| 2   | POST        | /api/auth/login                               | login user                                 |
| 3   | POST        | /api/auth/forgot-password/request             | Request forgot password via email          |
| 4   | POST        | /api/auth/forgot-password/new-password/:token | Forgot password                            |
| 9   | PATCH       | /api/auth/edit-password                       | Edit password from profile user            |

### User Endpoint
| No  | HTTP Method | URI                              | Operation                                  |
| --- | ----------- | -------------------------------- | ------------------------------------------ |
| 1   | PATCH       | /api/user/edit-profile           | Edit profile user                          |
| 2   | PATCH       | /api/user/update-image           | update image user                          |
| 3   | DELETE      | /api/user/delete-image           | Delete image user                          |
| 4   | GET         | /api/user/detail                 | Get detail user                            |

### Product Endpoint
| No  | HTTP Method | URI                                  | Operation                                 |
| --- | ----------- | ------------------------------------ | ----------------------------------------- |
| 1   | GET         | /api/product/                     | Get all products data                     |
| 2   | GET         | /api/product/:product_id          | Get product’s data by it’s ID             |
| 3   | GET         | /api/product/?page=1              | Get product’s data on the 1st page        |
| 4   | GET         | /api/product/?search=product_title| Search product data by title keyword      |
| 5   | GET         | /api/product/?sortBy=title        | Sort product data by the title            |
| 6   | GET         | /api/product/?sortBy=genre        | Sort product data by the category         |
| 7   | POST        | /api/product/admin                | Insert new product data                   |
| 8   | PATCH       | /api/product/admin/:product_id    | Update the product’s data by it’s ID      |
| 9   | DELETE      | /api/product/admin/:product_id    | Delete the product by it’s ID             |

### Order Endpoint
| No  | HTTP Method | URI                                 | Operation                                  |
| --- | ----------- | ----------------------------------- | ------------------------------------------ |
| 1   | GET         | /api/order                       | Get all orders data                        |
| 1   | GET         | /api/order/:user_id              | Get all orders data by user ID             |
| 2   | GET         | /api/order/:order_id             | Get order’s data by order ID               |
| 9   | POST        | /api/order/                      | Insert new order data                      |
| 9   | PATCH       | /api/order/:order_id             | Edit or update the order’s data by it’s ID |
| 10  | DELETE      | /api/order/:order_id             | Delete the order by it’s ID                |

## About Project
this project for Coffee Shop which is a store that sells some good meals, and especially coffee.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
1. Create your Feature Branch  ```git checkout -b [feature]```
2. Commit your Changes ```git commit -m 'Add some feature'```
3. Push to the Branch ```git push origin [feature]```
4. Open a Pull Request

## Related Project
* [`Frontend Coffee Shop`](https://github.com/maulanarifai114/frontend-coffee-shop)

## Contributors
<center>
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/defri-ansyah">
          <img width="150" src="https://avatars1.githubusercontent.com/u/73015398?s=400&u=72939e4bacd74f0ad4de21d2c8e1a0bfe8f3b059&v=4" alt="Defri Ansyah"><br/>
          <b>Defri Ansyah</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/FendiAnwarRifai">
          <img width="150" src="https://avatars0.githubusercontent.com/u/73191453?s=400&u=b47808a771d90a7fc302b683e46cf34cde16ab88&v=4" alt="Fendi Anwar Rifa'i"><br/>
          <b>Fendi Anwar Rifa'i</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/maulanarifai114">
          <img width="150" src="https://avatars2.githubusercontent.com/u/72542280?s=400&u=09207f92a439d660f07bb376109fb02b82de500c&v=4" alt="Raden Maulana Rifa'i Abdullah"><br/>
          <b>Raden Maulana Rifa'i Abdullah</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/safiratrisa">
          <img width="150" src="https://avatars1.githubusercontent.com/u/41407774?s=400&v=4" alt="Trisa Safira Hasanah"><br/>
          <b>Trisa Safira Hasanah</b>
        </a>
      </td>
    </tr>
  </table>
</center>

---
Copyright © 2020 [Defri Ansyah](https://github.com/defri-ansyah)