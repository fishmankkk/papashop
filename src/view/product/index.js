import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card, Spin } from 'antd'
import { MwaterTable } from 'containers'
import 'globalCSS'

const bodyStyle = {
  bodyStyle: {
    height: 600,
    background: '#fff',
    paddingTop: 1,
  },
}
function ExportTask ({ exportTask, dispatch }) {
  const { smsTaskTableData, exportTaskTableCol, exportTableFilterData,
    exportTaskTableLoading, taskPagination } = exportTask
  // 帐号查询事件
  function getTableAllFilter (page, data) {
    let filterString = ''
    for (let key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const string = data[key] ? `&exportJob.${key}=${data[key]}` : ''
        filterString += string
      }
    }
    const rebuildFliter = `${filterString}`
    dispatch({ type: 'exportTask/getAllTask', payload: rebuildFliter.substr(1) })
  }
  const exportTableDataOperation = [{ text: '下载', key: 'edit', rule: { key: 'FILE_PATH', showRule: 'full', unrules: null } }]
  // 绑定
  function bindColFunc (index, record) {
    const Data = {
      'exportJob.status': 2,
      'exportJob.filePath': record.FILE_PATH,
      'exportJob.id': record.ID,
      expFileName: record.FILE_NAME,
    }
    dispatch({ type: 'exportTask/downloadCSV', payload: Data })
  }
  return (
    <div>
      <Row gutter={24} type="flex" justify="space-between">
        <Col lg={24} md={24}>
          <Spin spinning={exportTaskTableLoading}>
            <Card title="导出任务" bordered={false} {...bodyStyle} className="m_water_margin-lg-t">
              <MwaterTable
                filterData={exportTableFilterData}
                tableColumns={exportTaskTableCol}
                tableData={smsTaskTableData}
                getTableAllFilter={getTableAllFilter}
                pagination={taskPagination}
                tableDataOperation={exportTableDataOperation}
                editColFunc={bindColFunc}
              />
            </Card>
          </Spin>
        </Col>
      </Row>
    </div>
  )
}

ExportTask.propTypes = {
  exportTask: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ exportTask }) => ({ exportTask }))(ExportTask)
