import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Badge, ActionSheet } from 'antd-mobile'
import toolBar from './BottomToolBar.less'

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
  getOrderPrice = (data) => {
    let price = 0
    data.forEach((element) => {
      let itemMoney = element.number * element.price
      price += itemMoney
    }, this)
    return price
  }
  finishCardFunc = () => {
    this.props.finishChooseFunc(this.props.orderData)
  }
  showAllFood = () => {
    let cartData = []
    this.props.orderData.forEach((item) => {
      cartData.push(`【${item.name}】  ¥${item.price} × ${item.number}份`)
    })
    cartData.push('已选的【啪啪脆】美食')
    ActionSheet.showActionSheetWithOptions({
      options: cartData,
      cancelButtonIndex: cartData.length - 1,
      maskClosable: true,
      'data-seed': 'logId',
    },
    (buttonIndex) => {
      this.setState({ clicked: cartData[buttonIndex] })
    })
  }
  render () {
    const orderData = this.props.orderData
    const totalNum = this.getOrderNumber(orderData)
    const totalPrice = this.getOrderPrice(orderData)
    const isActiveClass = (orderData.length > 0) ? 'bg-yellow' : 'bg-gray'
    const cardDetail = (
      <div className={toolBar.bottom_tool_left}>
        <div className={toolBar.card_icon_btn} onClick={() => this.showAllFood()}>
          <Badge text={totalNum} overflowCount={99}>
            <div className={`${toolBar.card_icon} ${isActiveClass}`}>
              <i className={`${toolBar.isActiveClass} iconfont icon-gouwuche font-lg`} />
            </div>
          </Badge>
        </div>
        <div className={toolBar.price}>¥{totalPrice}</div>
      </div>
    )
    return (
      <div className={toolBar.bottom_tool_bar}>
        <Flex>
          <Flex.Item style={{ flex: 6 }}>
            {cardDetail}
          </Flex.Item>
          <Flex.Item style={{ flex: 4 }}>
            <div className={`${toolBar.go_order_btn} ${isActiveClass}`} onClick={this.finishCardFunc}>
              选好了
            </div>
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}

BottomToolBar.propTypes = {
  orderData: PropTypes.array,
  finishChooseFunc: PropTypes.func,
}

export default BottomToolBar
