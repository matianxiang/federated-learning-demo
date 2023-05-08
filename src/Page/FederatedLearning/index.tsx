import React, { useState, useRef, useEffect } from 'react'
import { Row, Col, Card, Spin, Steps, InputNumber } from 'antd'
import { SmileOutlined, ApartmentOutlined, BugOutlined, LineChartOutlined } from '@ant-design/icons'
import Style from './index.module.scss'

import styled from 'styled-components'

const items = [
  {
    title: '配置客户端',

    /*  status: 'process', */
    icon: <ApartmentOutlined />
  },
  {
    title: '训练',
    /*   status: 'wait', */
    icon: <BugOutlined />
  },
  {
    title: '分析',
    /*   status: 'wait', */
    icon: <LineChartOutlined />
  },
  {
    title: 'Success',

    /*  status: 'wait', */
    icon: <SmileOutlined />
  }
]

const MySteps = styled(Steps)`
  padding: 0 20px;
  .ant-steps-item-content {
    margin-top: 0px !important;
  }
  .ant-steps-item-title {
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
  }
  .ant-steps-item-description {
    font-size: 14px;
  }
`

const MyInputNumber = styled(InputNumber)`
  .ant-input-number-handler-wrap {
    opacity: 1 !important;
  }
`

const FederatedLearning = () => {
  const onChange = (value: number) => {
    console.log('changed', value)
  }
  return (
    <div className={Style.container}>
      <div className={Style.left}>
        <div>
          <p className={Style.title}>配置客户端</p>
          <div className={Style.line}>
            <p className={Style.headerText}>客户端数量</p>
            <MyInputNumber
              width={130}
              height={30}
              min={1}
              max={10}
              defaultValue={3}
              onChange={(val) => {
                onChange(Number(val))
              }}
            ></MyInputNumber>
          </div>
        </div>
      </div>
      <div className={Style.right}>
        <div className={Style.header}>
          <MySteps current={1} labelPlacement='vertical' items={items} />
        </div>
        <div className={Style.content}></div>
      </div>
    </div>
  )
}
export default FederatedLearning
