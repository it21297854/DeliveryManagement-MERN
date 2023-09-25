const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deliverySchema = new Schema(
  {
    orderID: { type: String, default: generateOrderID },
    cname: { type: String, required: true },
    contactNum: { type: String, required: true },
    cusAddress: { type: String, required: true },
    prodCode: { type: String, required: true },
    quantity: { type: Number, required: true },
    Price: { type: Number, required: true },
    prodDetails: { type: String, required: true },
    date: { type: Date, required: true },
    deliveryStatus: {
      type: String,
      default: 'Pending', // Set the default value to "Pending"
      enum: ['Pending', 'Delivered', 'In Transit'], // Define possible values
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Function to generate a unique orderID
function generateOrderID() {
  // Implement your logic here to generate a unique orderID, e.g., using a library like shortid
  // For simplicity, let's use a random 6-digit number as an example
  return Math.floor(100000 + Math.random() * 900000).toString()
}

module.exports = Delivery = mongoose.model('Deliveries', deliverySchema)
