import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Tabs, NoticeBar } from 'antd-mobile'
import { FoodCard, BottomToolBar, Order } from 'components'
import styles from './list.less'

const banner = require('public/papa_shop/banner.jpg')

const tabs = [
  { title: '物份简餐' },
  { title: '物份小吃' },
  { title: '物杯饮料' },
]
const tabHeight = window.screen.height - 290
function PapaFood ({ papaFoodState, dispatch }) {
  const { comboMenu, snacksMenu, beverageMenu, selectFood, viewIsCart, viewIsOrder } = papaFoodState
  function selectFoodFunc (data, type, newFood) {
    let param = { type, data, newFood }
    dispatch({ type: 'papaFoodState/editCard', payload: param })
  }
  function foodSelectFunc () {
    dispatch({ type: 'papaFoodState/goOrder' })
  }
  function onLeftClick () {
    dispatch({ type: 'papaFoodState/goCart' })
  }
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <div className={viewIsCart} style={{ height: '100%', position: 'relative' }}>
        <div className={`${styles.banner} banner_img`}>
          <img src={banner} alt="banner" style={{ height: '150px', width: '100%' }} />
        </div>
        <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }} className={`${styles.notice}`}>
          通知: 啪啪脆食堂正式上线，欢迎用户在本店. 啪啪脆，要你好吃。
        </NoticeBar>
        <div className={`${styles.TabsBody}`} style={{ height: tabHeight }}>
          <Tabs tabs={tabs}
            initalPage={'t2'}
            tabBarPosition="left"
            tabDirection="vertical"
          >
            <div style={{ display: 'flex', alignItems: 'top', justifyContent: 'left', backgroundColor: '#fff' }}>
              <FoodCard
                list={comboMenu}
                foodType="combo"
                selectFoodFunc={selectFoodFunc}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'top', justifyContent: 'left', backgroundColor: '#fff' }}>
              <FoodCard
                list={snacksMenu}
                foodType="snacks"
                selectFoodFunc={selectFoodFunc}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'top', justifyContent: 'left', height: '100%', backgroundColor: '#fff' }}>
              <FoodCard
                list={beverageMenu}
                foodType="beverage"
                selectFoodFunc={selectFoodFunc}
              />
            </div>
          </Tabs>
        </div>
        <BottomToolBar orderData={selectFood} finishChooseFunc={foodSelectFunc} />
      </div>
      <div className={viewIsOrder} style={{ height: '100%', position: 'relative' }}>
        <Order
          orderData={selectFood}
          onLeftClick={onLeftClick}
        />
      </div>
    </div>
  )
}

PapaFood.propTypes = {
  papaFoodState: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ papaFoodState }) => ({ papaFoodState }))(PapaFood)
