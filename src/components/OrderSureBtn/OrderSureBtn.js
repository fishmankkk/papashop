import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd-mobile'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import OrderSure from './OrderSureBtn.less'

const erCode = require('public/papa_shop/kefu_code.jpg')

class OrderSureBtn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      copied: false,
      showmodal: false,
      value: '',
    }
  }
  onClose = () => {
    this.setState({
      showmodal: false,
    })
  }
  onCopy = () => {
    this.setState({
      showmodal: true,
      copied: true,
    })
  }
  render () {
    const order = this.props.orderParam
    let copyText = ''
    order.forEach((item) => {
      copyText += `${item.name}~${item.number}份 \n`
    })
    this.state.value = copyText
    return (
      <div>
        <Modal
          visible={this.state.showmodal}
          transparent
          onClose={this.onClose}
          title="识别二维码黏贴下单"
        >
          <div style={{ height: 350 }}>
            <img src={erCode} alt="二维码" style={{ width: '100%' }} />
          </div>
        </Modal>
        <textarea rows={2} cols={10} value={this.state.value} style={{ display: 'none' }} />
        <CopyToClipboard text={this.state.value}
          onCopy={this.onCopy}
        >
          <div className={`font-lg ${OrderSure.order_sure_btn}`}>
            下单
          </div>
        </CopyToClipboard>
      </div>
    )
  }
}

OrderSureBtn.propTypes = {
  orderParam: PropTypes.array,
}

export default OrderSureBtn
