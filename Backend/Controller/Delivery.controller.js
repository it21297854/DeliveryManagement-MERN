const Delivery = require('../Model/Delivery.model')

// Create a new delivery
const createDelivery = async (req, res) => {
  const {
    cname,
    contactNum,
    cusAddress,
    prodCode,
    quantity,
    Price,
    prodDetails,
    date,
  } = req.body

  const delivery = new Delivery({
    cname,
    contactNum,
    cusAddress,
    prodCode,
    quantity,
    Price,
    prodDetails,
    date,
    deliveryStatus: 'Pending', // Set the default deliveryStatus to 'Pending'
  })

  try {
    const savedDelivery = await delivery.save()
    res.json(savedDelivery)
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const createDeliveries = async (req, res) => {
  try {
    const deliveryData = req.body // An array of delivery objects

    // Insert all deliveries in a single bulk operation
    const insertedDeliveries = await Delivery.insertMany(deliveryData)

    res.json(insertedDeliveries)
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}


// Delete a delivery by ID
const deleteDelivery = async (req, res) => {
  const deliveryId = req.params.id
  try {
    await Delivery.findByIdAndDelete(deliveryId)
    res.json('Delivery has been deleted')
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

// Get delivery info by ID
const getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id)
    if (delivery) {
      res.json(delivery)
    } else {
      res.json('No delivery record in the database!')
    }
  } catch (error) {
    res.status(500).send('Server Error: ' + error)
  }
}

// Get all delivery records
const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find()
    res.json(deliveries)
  } catch (error) {
    res.status(500).send('Server Error: ' + error)
  }
}

// Update an existing delivery record
const updateDelivery = async (req, res) => {
  const deliveryId = req.params.id
  try {
    const existingDelivery = await Delivery.findById(deliveryId)
    if (!existingDelivery) {
      return res.status(404).json('Delivery not found')
    }

    // Update the delivery fields
    existingDelivery.cname = req.body.cname
    existingDelivery.contactNum = req.body.contactNum
    existingDelivery.cusAddress = req.body.cusAddress
    existingDelivery.deliveryStatus = req.body.deliveryStatus
    existingDelivery.prodCode = req.body.prodCode
    existingDelivery.quantity = req.body.quantity
    existingDelivery.Price = req.body.Price
    existingDelivery.prodDetails = req.body.prodDetails
    existingDelivery.date = req.body.date

    const updatedDelivery = await existingDelivery.save()
    res.json(updatedDelivery)
  } catch (error) {
    res.status(500).send('Server Error: ' + error)
  }
}

module.exports = {
  createDelivery,
  deleteDelivery,
  getDeliveryById,
  getDeliveries,
  updateDelivery,
  createDeliveries,
}
