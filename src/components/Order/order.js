import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon } from 'antd-mobile'
import { OrderMsg, OrderSureBtn } from 'components'

class Order extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div style={{ height: '100%', position: 'relative' }}>
        <div style={{ zIndex: 1, position: 'relative' }}>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={this.props.onLeftClick}
          >
            确认订单
          </NavBar>
        </div>
        <div style={{ height: '100%', position: 'absolute', top: 0, paddingTop: '45px', paddingBottom: '40px', 'box-sizing': 'border-box', overflow: 'auto' }}>
          <OrderMsg
            orderParam={this.props.orderData}
          />
        </div>
        <OrderSureBtn
          orderParam={this.props.orderData}
        />
      </div>
    )
  }
}

Order.propTypes = {
  orderData: PropTypes.array,
  onLeftClick: PropTypes.func,
}

export default Order
// export default connect()(Order)
