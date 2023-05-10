import React, { useEffect, useState } from 'react'
import Style from './index.module.scss'
import { ClusterOutlined } from '@ant-design/icons'
import { Modal, Rate } from 'antd'
import ReactJson from 'react-json-view'
import { styled } from 'styled-components'
import { useAppSelector } from '../../app/hooks'
import { queryStatus } from '../../features/process/processSlice'
const MyRate = styled(Rate)`
  color: rgb(58, 202, 51) !important;
`
interface props {
  index: number
  data:
    | {
        'conv1.weight': any
        'conv1.bias': any
        'fc1.weight': any
        'fc1.bias': any
      }
    | undefined
  status: number
}
const CardItem = (props: props) => {
  const progress = useAppSelector(queryStatus)

  const [showText, setShowText] = useState(true)

  useEffect(() => {
    if (progress !== 'initial') {
      setShowText(false)
      setTimeout(() => {
        setShowText(true)
      }, Math.random() * 3000 + 3000)
    }
  }, [progress])
  return (
    <div className={Style.box}>
      <div className={Style.header}>
        <ClusterOutlined style={{ marginRight: '16px' }} />
        客户端{props.index + 1}
      </div>
      <div className={Style.text}>
        <span>状态</span>
        <span>{progress}</span>
      </div>
      <div className={Style.rateBox}>
        <MyRate defaultValue={5} disabled></MyRate>
      </div>
      <div className={Style.line}>
        <span>权重参数一</span>
        <span className={Style.link}>
          {props.data?.['conv1.weight'] && showText && progress !== 'initial' ? (
            <span
              onClick={() => {
                Modal.info({
                  content: (
                    <ReactJson
                      src={props.data?.['conv1.weight']} //data是一个对象
                      theme='summerfruit:inverted'
                      collapsed={1}
                      displayDataTypes={false}
                      iconStyle='triangle'
                      style={{ wordBreak: 'break-all' }}
                    />
                  ),
                  maskClosable: true,
                  title: '第一层卷积层权重参数',
                  width: 900
                })
              }}
            >
              点击查看
            </span>
          ) : (
            '--'
          )}
        </span>
      </div>
      <div className={Style.line}>
        <span>偏置参数一</span>
        <span className={Style.link}>
          {props.data?.['conv1.bias'] && showText && progress !== 'initial' ? (
            <span
              onClick={() => {
                Modal.info({
                  content: (
                    <ReactJson
                      src={props.data?.['conv1.bias']} //data是一个对象
                      theme='summerfruit:inverted'
                      collapsed={1}
                      displayDataTypes={false}
                      iconStyle='triangle'
                      style={{ wordBreak: 'break-all' }}
                    />
                  ),
                  maskClosable: true,
                  title: '第一层卷积层偏置参数',
                  width: 900
                })
              }}
            >
              点击查看
            </span>
          ) : (
            '--'
          )}
        </span>
      </div>
      <div className={Style.line}>
        <span>权重参数二</span>
        <span className={Style.link}>
          {props.data?.['fc1.bias'] && showText && progress !== 'initial' ? (
            <span
              onClick={() => {
                Modal.info({
                  content: (
                    <ReactJson
                      src={props.data?.['fc1.bias']} //data是一个对象
                      theme='summerfruit:inverted'
                      collapsed={1}
                      displayDataTypes={false}
                      iconStyle='triangle'
                      style={{ wordBreak: 'break-all' }}
                    />
                  ),
                  maskClosable: true,
                  title: '第一层卷积层偏置参数',
                  width: 900
                })
              }}
            >
              点击查看
            </span>
          ) : (
            '--'
          )}
        </span>
      </div>
      <div className={Style.line}>
        <span>偏置参数二</span>
        <span className={Style.link}>
          {props.data?.['fc1.bias'] && showText && progress !== 'initial' ? (
            <span
              onClick={() => {
                Modal.info({
                  content: (
                    <ReactJson
                      src={props.data?.['fc1.bias']} //data是一个对象
                      theme='summerfruit:inverted'
                      collapsed={1}
                      displayDataTypes={false}
                      iconStyle='triangle'
                      style={{ wordBreak: 'break-all' }}
                    />
                  ),
                  maskClosable: true,
                  title: '第一层卷积层偏置参数',
                  width: 900
                })
              }}
            >
              点击查看
            </span>
          ) : (
            '--'
          )}
        </span>
      </div>
    </div>
  )
}
export default CardItem
