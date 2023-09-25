const express = require('express')
const router = express.Router()

const {
  createDelivery,
  deleteDelivery,
  getDeliveryById,
  getDeliveries,
  updateDelivery,
  createDeliveries,
} = require('../controller/Delivery.controller')

//@route  POST api/delivery
//@desc   add delivery record
router.post('/add', createDelivery)

//@route  POST api/delivery/add-multiple
//@desc   add multiple deliveries
router.post('/add-multiple', createDeliveries);

//@route  GET api/delivery
//@desc   get delivery by Id
router.get('/:id', getDeliveryById)

//@route  DELETE api/delivery
//@desc   delete delivery
router.delete('/:id', deleteDelivery)

//@route  GET api/delivery/all
//@desc   get all deliveries
router.get('/', getDeliveries)

//@route  PUT api/delivery
//@desc   update delivery record
router.put('/:id', updateDelivery)

module.exports = router
