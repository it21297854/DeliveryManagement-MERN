import React, { Component } from 'react'
import axios from 'axios'
import * as Swal from 'sweetalert2'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export class CreateDelivery extends Component {
  constructor(props) {
    super(props)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeContactNum = this.onChangeContactNum.bind(this)
    this.onChangeCusAddress = this.onChangeCusAddress.bind(this)
    this.onChangeProdCode = this.onChangeProdCode.bind(this)
    this.onChangeQuantity = this.onChangeQuantity.bind(this)
    this.onChangePrice = this.onChangePrice.bind(this)
    this.onChangeProdDetails = this.onChangeProdDetails.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onChangeDeliveryStatus = this.onChangeDeliveryStatus.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      cname: '',
      contactNum: '',
      cusAddress: '',
      prodCode: '',
      quantity: 0,
      Price: 0,
      prodDetails: '',
      date: new Date(),
      cnameError: '',
      contactNumError: '',
      cusAddressError: '',
      prodCodeError: '',
      quantityError: '',
      PriceError: '',
      deliveryStatus: 'Pending',
      prodDetailsError: '',
      dateError: '',
    }
  }

  onChangeName(e) {
    this.setState({
      cname: e.target.value,
      cnameError: '',
    })
  }

  onChangeContactNum(e) {
    this.setState({
      contactNum: e.target.value,
      contactNumError: '',
    })
  }

  onChangeCusAddress(e) {
    this.setState({
      cusAddress: e.target.value,
      cusAddressError: '',
    })
  }

  onChangeProdCode(e) {
    this.setState({
      prodCode: e.target.value,
      prodCodeError: '',
    })
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
      quantityError: '',
    })
  }

  onChangePrice(e) {
    this.setState({
      Price: e.target.value,
      PriceError: '',
    })
  }

  onChangeProdDetails(e) {
    this.setState({
      prodDetails: e.target.value,
      prodDetailsError: '',
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date,
      dateError: '',
    })
  }

  onChangeDeliveryStatus(e) {
    this.setState({
      deliveryStatus: e.target.value,
    })
  }

  onSubmit(e) {
    e.preventDefault()
    const delivery = {
      cname: this.state.cname,
      contactNum: this.state.contactNum,
      cusAddress: this.state.cusAddress,
      prodCode: this.state.prodCode,
      quantity: this.state.quantity,
      Price: this.state.Price,
      prodDetails: this.state.prodDetails,
      date: this.state.date,
      deliveryStatus: this.state.deliveryStatus,
    }
    if (this.state.contactNum.length < 10) {
      this.setState({ contactNumError: 'Invalid Phone Number.' })
    } else if (this.state.prodCode.length <= 4) {
      this.setState({ prodCodeError: 'Invalid Product Code.' })
    } else if (this.state.quantity <= 0) {
      this.setState({ quantityError: 'Quantity should be greater than 0.' })
    } else if (this.state.Price <= 0) {
      this.setState({ priceError: 'Price should be greater than 0.' })
    } else {
      axios.post('http://localhost:5000/delivery/add', delivery).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.clearData()
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'Delivery has been created!',
            background: '#fff',
            confirmButtonColor: '#133EFA',
            iconColor: '#60e004',
          }).then(() => {
            // After displaying the success message, navigate to the home page using window.location.href
            window.location.href = '/' // Replace '/' with your desired home page URL
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error in creating delivery!',
            background: '#fff',
            confirmButtonColor: '#133EFA',
            iconColor: '#e00404',
          })
        }
      })
    }
  }

  clearData = () => {
    this.setState({
      cname: '',
      contactNum: '',
      cusAddress: '',
      prodCode: '',
      quantity: 0,
      Price: 0,
      prodDetails: '',
      date: new Date(),
    })
  }

  render() {
    return (
      <div className='flex flex-col px-5'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='items-center overflow-hidden'>
              <div className=''>
                <div className='grid grid-cols-1 gap-4 content-start pt-5 px-20'>
                  <form
                    className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50'
                    onSubmit={this.onSubmit}
                  >
                    <div className=''>
                      <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                        Create a Delivery
                      </p>
                      <div className='grid grid-cols-2 gap-4 form-group'>
                        <div>
                          <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                            Customer Name :{' '}
                          </label>
                          <input
                            type='text'
                            required
                            placeholder=''
                            className='form-control '
                            value={this.state.cname}
                            onChange={this.onChangeName}
                          />
                          <p className='block text-lg font-medium text-red-900 dark:text-white'>
                            {this.state.cnameError}
                          </p>
                        </div>
                        <div className='form-group'>
                          <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                            Contact Number :{' '}
                          </label>
                          <input
                            type='text'
                            required
                            placeholder=''
                            className='form-control'
                            value={this.state.contactNum}
                            onChange={this.onChangeContactNum}
                          />
                          <p className='block text-lg font-medium text-red-900 dark:text-white'>
                            {this.state.contactNumError}
                          </p>
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-4 form-group'>
                        <div>
                          <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                            Customer Address :{' '}
                          </label>
                          <div>
                            <input
                              type='text'
                              required
                              placeholder=''
                              className='form-control'
                              value={this.state.cusAddress}
                              onChange={this.onChangeCusAddress}
                            />
                            <p className='block text-lg font-medium text-red-900 dark:text-white'>
                              {this.state.cusAddressError}
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                            Product Code :{' '}
                          </label>
                          <div>
                            <input
                              type='text'
                              required
                              placeholder=''
                              className='form-control'
                              value={this.state.prodCode}
                              onChange={this.onChangeProdCode}
                            />
                            <p className='block text-lg font-medium text-red-900 dark:text-white'>
                              {this.state.prodCodeError}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='grid grid-cols-2 gap-4 form-group'>
                        <div className='form-group'>
                          <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                            Delivery Status :{' '}
                          </label>
                          <select
                            className='form-control'
                            value={this.state.deliveryStatus}
                            onChange={this.onChangeDeliveryStatus}
                          >
                            <option value='Pending'>Pending</option>
                            <option value='Delivered'>Delivered</option>
                            <option value='In Transit'>In Transit</option>
                          </select>
                        </div>
                        <div>
                          <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                            Quantity :{' '}
                          </label>
                          <input
                            type='number'
                            required
                            placeholder=''
                            className='form-control'
                            value={this.state.quantity}
                            onChange={this.onChangeQuantity}
                          />
                          <p className='block text-lg font-medium text-red-900 dark:text-white'>
                            {this.state.quantityError}
                          </p>
                        </div>
                        <div>
                          <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                            Price :{' '}
                          </label>
                          <input
                            type='number'
                            required
                            placeholder=''
                            className='form-control'
                            value={this.state.Price}
                            onChange={this.onChangePrice}
                          />
                          <p className='block text-lg font-medium text-red-900 dark:text-white'>
                            {this.state.PriceError}
                          </p>
                        </div>
                      </div>
                      <div className='form-group'>
                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                          Product Details :{' '}
                        </label>
                        <div>
                          <textarea
                            type='text'
                            required
                            placeholder=''
                            className='form-control'
                            value={this.state.prodDetails}
                            onChange={this.onChangeProdDetails}
                          />
                          <p className='block text-lg font-medium text-red-900 dark:text-white'>
                            {this.state.prodDetailsError}
                          </p>
                        </div>
                      </div>
                      <div className='form-group'>
                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                          Delivery Date:{' '}
                        </label>
                        <DatePicker
                          className='m-2'
                          selected={this.state.date}
                          onChange={this.onChangeDate}
                        />
                        <p className='block text-lg font-medium text-red-900 dark:text-white'>
                          {this.state.dateError}
                        </p>
                      </div>
                      <div className='text-center align-middle form-group'>
                        <input
                          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                          type='submit'
                          value='Create Delivery'
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
