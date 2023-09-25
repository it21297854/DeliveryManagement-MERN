import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Modal } from 'react-bootstrap'
import EditDelivery from './delivery-edit.component'
import * as Swal from 'sweetalert2'

const Delivery = (props) => (
  <tr className='text-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
    <td className='px-2 py-4'>{props.delivery.orderID}</td>
    <td className='px-2 py-4'>{props.delivery.deliveryStatus}</td>
    <td className='px-2 py-4'>{props.delivery.prodDetails}</td>
    <td className='px-2 py-4'>{props.delivery.Price}.00</td>
    <td className='px-2 py-4'>{props.delivery.date.substring(0, 10)}</td>
    <td className='px-2 py-4'>
      <div className='flex justify-center'>
        <div className=''>
          <button
            className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200'
            onClick={() => {
              props.gotoUpdateDelivery(props.delivery._id)
            }}
          >
            <div className=''>Update</div>
          </button>
        </div>
        <div className=''>
          <button
            className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200'
            onClick={() => {
              props.deleteDelivery(props.delivery._id)
            }}
          >
            <div className=''>Delete</div>
          </button>
        </div>
      </div>
    </td>
  </tr>
)

export class DeliveryList extends Component {
  constructor(props) {
    super(props)
    this.deleteDelivery = this.deleteDelivery.bind(this)
    this.gotoUpdateDelivery = this.gotoUpdateDelivery.bind(this)
    this.state = {
      id: '',
      delivery: [],
      searchDelivery: '',
      show: false,
    }
  }

  componentDidMount() {
    this.refreshTable()
  }

  refreshTable() {
    axios
      .get('http://localhost:5000/delivery/') // Adjust the API endpoint
      .then((response) => {
        this.setState({ delivery: response.data }) // Update state variable name
      })
      .catch((error) => {
        console.log(error)
      })
  }

  gotoUpdateDelivery = (id) => {
    this.setState({
      id: id,
      show: true,
    })
    console.log('Delivery id is :' + id)
  }

  closeModalBox = () => {
    this.setState({ show: false })
    this.refreshTable()
  }

  deleteDelivery(id) {
    axios
      .delete('http://localhost:5000/delivery/' + id) // Adjust the API endpoint
      .then((res) => {
        console.log(res)
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Delivery has been Deleted!!',
          background: '#fff',
          confirmButtonColor: '#133EFA',
          iconColor: '#60e004',
        })
      })
    this.setState({
      delivery: this.state.delivery.filter((del) => del._id !== id),
    })
  }

  deliveryList() {
    return this.state.delivery.map((currentDelivery) => {
      return (
        <Delivery
          delivery={currentDelivery}
          deleteDelivery={this.deleteDelivery}
          gotoUpdateDelivery={this.gotoUpdateDelivery}
          key={currentDelivery._id}
        />
      )
    })
  }

  searchDeliveryList() {
    return this.state.delivery.map((currentDelivery) => {
      if (
        this.state.searchDelivery === '' ||
        currentDelivery.orderID.includes(this.state.searchDelivery)
      ) {
        return (
          <Delivery
            delivery={currentDelivery}
            deleteDelivery={this.deleteDelivery}
            gotoUpdateDelivery={this.gotoUpdateDelivery}
            key={currentDelivery._id}
          />
        )
      }
      return null
    })
  }

  exportDelivery = () => {
    console.log('Exporting Delivery PDF')
    const unit = 'pt'
    const size = 'A4'
    const orientation = 'landscape'
    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)
    const title = 'Delivery Report'
    const headers = [['Date', 'OrderID', 'Delivery Status', 'Details', 'Price']]
    const delivery = this.state.delivery.map((currentDelivery) => [
      currentDelivery.date.substring(0, 10),
      currentDelivery.orderID,
      currentDelivery.deliveryStatus,
      currentDelivery.prodDetails,
      currentDelivery.Price + '.00',
    ])
    let content = {
      startY: 50,
      head: headers,
      body: delivery,
    }
    doc.setFontSize(20)
    doc.text(title, marginLeft, 40)
    require('jspdf-autotable')
    doc.autoTable(content)
    doc.save('Delivery Report.pdf')
  }

  render() {
    return (
      <div className='flex flex-col px-5 pt-2'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='items-center overflow-hidden'>
              <div className='grid grid-cols-1 gap-4 content-start'>
                <table>
                  <tr>
                    <th className='drop-shadow-md'>
                      <div className='flex'>
                        <div className=''>
                          <h3>Delivery Details</h3>
                        </div>
                      </div>
                    </th>
                    <td className='flex justify-end gap-2'>
                      <div className='flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2'>
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                          <Link
                            className='font-semibold text-white no-underline'
                            to={'/createDelivery'}
                          >
                            <div className='flex'>
                              <div className=''>
                                <svg
                                  className='h-5 w-5 mr-2'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke='currentColor'
                                >
                                  <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    d='M19 7.5v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                                  />
                                </svg>
                              </div>
                              <div className=''>Create a Delivery</div>
                            </div>
                          </Link>
                        </button>
                        <button
                          className='flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                          onClick={() => this.exportDelivery()}
                        >
                          <div className=''>
                            <svg
                              className='h-5 w-5 mr-2'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                              />
                            </svg>
                          </div>
                          <div className=''>Download Report</div>
                        </button>
                      </div>
                      <div className='flex justify-end sm:flex-row sm:text-left sm:justify-end'>
                        <input
                          className='form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
                          type='text'
                          placeholder='Search by Order Id'
                          aria-label='Search'
                          onChange={(e) => {
                            this.setState({
                              searchDelivery: e.target.value,
                            })
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                <table className='w-full h-full overflow-y-auto text-sm text-left text-gray-500 dark:text-gray-400'>
                  <thead className='p-5 text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                      <th className='p-2 tbhead'>OrderID</th> {/* New Header */}
                      <th className='p-2 tbhead'>Delivery Status</th>{' '}
                      {/* New Header */}
                      <th className='p-2 tbhead'>Details</th> {/* New Header */}
                      <th className='p-2 tbhead'>Price</th> {/* New Header */}
                      <th className='p-2 tbhead'>Date</th>
                      <th className='p-2 text-center tbhead'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.searchDelivery === ''
                      ? this.deliveryList()
                      : this.searchDeliveryList()}
                  </tbody>
                </table>
              </div>
              <div className=''>
                <Modal
                  show={this.state.show}
                  onHide={this.closeModalBox}
                  centered
                  size={'xl'}
                >
                  <Modal.Body className={'custom-modal-body-login p-0 mb-5'}>
                    <EditDelivery
                      classId={this.state.id}
                      key={this.state.id}
                      deliveryId={this.state.id}
                      close={this.closeModalBox}
                    />
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
