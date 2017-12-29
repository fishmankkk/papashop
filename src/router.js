import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import IndexPage from './view/index'
import productList from 'view/list/list'

function RouterConfig ({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={productList} />
      </Switch>
    </Router>
  )
}

export default RouterConfig

