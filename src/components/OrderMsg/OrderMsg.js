import React from 'react'
import PropTypes from 'prop-types'
import { Flex, WingBlank } from 'antd-mobile'
import OrderMsg from './OrderMsg.less'

class BottomToolBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  getOrderNumber = (data) => {
    let number = 0
    data.forEach((element) => {
      number += element.number
    }, this)
    return number
  }
  orderItem = (item, key) => {
    let orderItem = ''
    orderItem = (
      <Flex className={OrderMsg.order_item} key={key}>
        <Flex.Item style={{ flex: 1 }}>
          <div className={OrderMsg.food_cover}>
            <img src={item.img} className={OrderMsg.food_img} alt={item.name} />
          </div>
        </Flex.Item>
        <Flex.Item style={{ flex: 4 }}>
          <Flex justify="around" align="stretch">
            <Flex.Item style={{ flex: 7 }}>
              <h3 style={{ margin: '5px 0' }}>{item.name}</h3>
              <p className="font-gray font-md">x{item.number}</p>
            </Flex.Item>
            <Flex.Item style={{ flex: 1 }}>
              <div style={{ margin: '5px 0' }} className={`${OrderMsg.prices} font-yellow`}>¥{item.price}</div>
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
    )
    return orderItem
  }
  getOrderPrice = (data) => {
    let price = 0
    data.forEach((element) => {
      let itemMoney = element.number * element.price
      price += itemMoney
    }, this)
    return price
  }
  finis
  render () {
    const order = this.props.orderParam
    const allOrder = order.map((item, key) => (
      this.orderItem(item, key)
    ))
    const totalPrice = this.getOrderPrice(order)
    return (
      <WingBlank>
        <div className={OrderMsg.order_item_list}>
          {allOrder}
          <Flex justify="end" className={OrderMsg.order_total}>
            <Flex.Item>
              <div className={OrderMsg.order_item_total}>
                  小计<span className="font-red font-lg font-keyword">¥{totalPrice}</span>
              </div>
            </Flex.Item>
          </Flex>
        </div>
      </WingBlank>
    )
  }
}

BottomToolBar.propTypes = {
  orderParam: PropTypes.array,
}

export default BottomToolBar
