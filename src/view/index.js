import React from 'react'
import { connect } from 'dva'
import { TabBar } from 'antd-mobile'


function IndexPage () {
  return (
    <div className="box">
      <div className="row">
        <span className="item" />
        <span className="item" />
        <span className="item" />
      </div>
      <div className="row">
        <span className="item" />
      </div>
      <div className="row">
        <span className="item" />
        <span className="item" />
      </div>
    </div>
  )
}

IndexPage.propTypes = {
}

export default connect()(IndexPage)
