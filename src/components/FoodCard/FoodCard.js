import React from 'react'
import PropTypes from 'prop-types'
import { Stepper, Flex, Modal } from 'antd-mobile'
import foodcard from './FoodCard.less'

class FoodCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalTitle: '',
      showmodal: false,
      allFoodParam: [],
    }
  }
  onChangeNumber = (number, item) => {
    let changeFoodParma = this.props.list
    for (let i = 0; i < changeFoodParma.length; i++) {
      if (changeFoodParma[i].name === item.name) {
        changeFoodParma[i].number = number
        // this.setState({
        //   allFoodParam: changeFoodParma,
        // })
      }
    }
    console.log(changeFoodParma)
    this.props.selectFoodFunc(changeFoodParma, this.props.foodType, item)
  }
  onClose = () => {
    this.setState({
      showmodal: false,
    })
  }
  showFoodDetail = (data) => {
    const popupMsg = (
      <div className={foodcard.popupMsg}>
        <img src={data.img} className={foodcard.food_img} alt={data.name} />
        <h3 style={{ margin: 0 }}>{data.name}</h3>
        <p style={{ margin: 0 }} className="font-gray">{data.describe || ''}</p>
        <span className={foodcard.prices}>¥{data.price}</span>
      </div>
    )
    this.setState({
      showmodal: true,
      modalTitle: data.name,
      popupMsg,
    })
  }
  productCardItem = (item, key) => {
    let cardItem = ''
    cardItem = (
      <Flex className={foodcard.product_card} key={key} align="start">
        <Flex.Item style={{ flex: 1 }}>
          <div className={foodcard.food_cover} onClick={() => this.showFoodDetail(item)}>
            <img src={item.img} className={foodcard.food_img} alt={item.name} />
          </div>
        </Flex.Item>
        <Flex.Item style={{ flex: 2 }}>
          <div className={foodcard.food_msg}>
            <div className={foodcard.food_msg_top}>
              <h3 style={{ margin: '5px 0' }}>{item.name}</h3>
              <p style={{ margin: 0 }} className="font-gray">{item.describe || ''}</p>
            </div>
            <div className={foodcard.food_msg_bottom}>
              <Flex>
                <Flex.Item style={{ flex: 6 }}>
                  <span className="font-yellow font-keyword font-lg">¥<span className="font-md">{item.price}</span></span>
                </Flex.Item>
                <Flex.Item style={{ flex: 14 }}>
                  <div className={foodcard.number}>
                    <Stepper
                      showNumber
                      min={0}
                      value={item.number}
                      onChange={e => this.onChangeNumber(e, item)}
                    />
                  </div>
                </Flex.Item>
              </Flex>
            </div>
          </div>
        </Flex.Item>
      </Flex>
    )
    return cardItem
  }
  render () {
    // this.state.allFoodParam = this.props.list
    const menuData = this.props.list
    const allProductCard = menuData.map((item, key) => (
      this.productCardItem(item, key)
    ))
    return (
      <div className="all_product_card">
        {allProductCard}
        <Modal
          visible={this.state.showmodal}
          transparent
          onClose={this.onClose}
          title={this.state.modalTitle}
        >
          <div style={{ height: 350 }}>
            {this.state.popupMsg}
          </div>
        </Modal>
      </div>
    )
  }
}

FoodCard.propTypes = {
  list: PropTypes.array,
  selectFoodFunc: PropTypes.func,
  foodType: PropTypes.string,
}

export default FoodCard
