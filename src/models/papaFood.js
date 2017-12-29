import menu from 'globals/common_data/menu'
import { Toast } from 'antd-mobile'

export default {
  namespace: 'papaFoodState',
  state: {
    loginLoading: false,
    comboMenu: menu.papa_menu.combo,
    snacksMenu: menu.papa_menu.snacks,
    beverageMenu: menu.papa_menu.beverage,
    selectFood: [],
    viewIsCart: 'showView',
    viewIsOrder: 'hideView',
  },
  effects: {
    * editCard ({
      payload,
    }, { put, select }) {
      let selectCartData = []
      const allStates = yield select(state => state.papaFoodState)
      const allFood = allStates.selectFood
      payload.data.forEach((element) => {
        if (element.number !== 0) selectCartData.push(element)
      })
      let isSameFlag = false
      for (let i = 0; i < allFood.length; i++) {
        if (payload.newFood.name === allFood[i].name) {
          isSameFlag = true
          if (payload.newFood.number === 0) {
            allFood.splice(i)
          } else {
            allFood[i] = payload.newFood
          }
        }
      }
      if (!isSameFlag) allFood.push(payload.newFood)
      if (payload.type === 'combo') {
        yield put({
          type: 'updateComboData',
          payload: payload.data,
        })
      } else if (payload.type === 'snacks') {
        yield put({
          type: 'updateSnacksData',
          payload: payload.data,
        })
      } else if (payload.type === 'beverage') {
        yield put({
          type: 'updateBeverageData',
          payload: payload.data,
        })
      }
      yield put({
        type: 'updateCartData',
        payload: allFood,
      })
    },
    // 结束当前购物页页面
    * goOrder (action, { put, select }) {
      const allStates = yield select(state => state.papaFoodState)
      const allFood = allStates.selectFood
      if (allFood.length > 0) {
        yield put({ type: 'viewOrder' })
      } else {
        Toast.offline('请选择好的美食再下单', 1)
      }
    },
    * goCart (action, { put }) {
      yield put({ type: 'viewCart' })
    },
  },
  reducers: {
    updateCartData (state, { payload }) {
      return {
        ...state,
        selectFood: payload,
      }
    },
    updateComboData (state, { payload }) {
      return {
        ...state,
        comboMenu: payload,
      }
    },
    updateSnacksData (state, { payload }) {
      return {
        ...state,
        snacksMenu: payload,
      }
    },
    updateBeverageData (state, { payload }) {
      return {
        ...state,
        beverageMenu: payload,
      }
    },
    viewOrder (state) {
      return {
        ...state,
        viewIsCart: 'hideView',
        viewIsOrder: 'showView',
      }
    },
    viewCart (state) {
      return {
        ...state,
        viewIsCart: 'showView',
        viewIsOrder: 'hideView',
      }
    },
  },
}
