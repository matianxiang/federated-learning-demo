import React, { useState, useRef, useEffect } from 'react'
import { Row, Col, Card, Spin, Steps, InputNumber, Select, Button, Progress, notification } from 'antd'
import { SmileOutlined, ApartmentOutlined, BugOutlined, LineChartOutlined } from '@ant-design/icons'
import CardItem from '../../components/CardItem'
import Echart from '../../components/Echart'
import Style from './index.module.scss'
import styled from 'styled-components'
import axios from '../../api'

import { useWindowSize } from 'react-use'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { queryStatus, update } from '../../features/process/processSlice'

import initial_data from '../../data/initial_data'

const items = [
  {
    title: '配置客户端',

    /*  status: 'process', */
    icon: <ApartmentOutlined />
  },
  {
    title: '载入测试集',
    /*   status: 'wait', */
    icon: <BugOutlined />
  },
  {
    title: '训练',
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

const MySelect = styled(Select)`
  width: 170px;
`

const MyButton = styled(Button)`
  background-color: rgb(125, 203, 90);
  color: #fff;
`
const FederatedLearning = () => {
  const { width, height } = useWindowSize()
  const dispatch = useAppDispatch()
  const process = useAppSelector(queryStatus)
  const [model, setModel] = useState<'wideResNet' | 'minst_2nn' | 'minst_cnn'>('minst_2nn')
  const [clientNums, setClientNums] = useState<number>(10)
  const [randomClientNums, setRandomClientNums] = useState<number>(5)
  const [trainTimes, setTrainTimes] = useState<number>(5)
  const [learnRate, setLearnRate] = useState<number>(0.01)
  const [vf, setVf] = useState<number>(10)
  const [sf, setSf] = useState<number>(20)
  const [comun, setComun] = useState<number>(30)

  const [currentProcess, setCurrentProcess] = useState<number>(1)

  const [updateTime, setUpdateTime] = useState<string>('2023-05-09 12:43:12')

  const [initData, setInitData] = useState<
    Array<{
      'conv1.weight': any
      'conv1.bias': any
      'fc1.weight': any
      'fc1.bias': any
    }>
  >()

  const [disBtn, setDisBtn] = useState<boolean>(false)

  const content_ref: any = useRef()
  const [contentWidth, setContentWidth] = useState<number>(1000)

  useEffect(() => {
    if (content_ref?.current) {
      setContentWidth((content_ref?.current as any)?.clientWidth)
    }
  }, [width])

  useEffect(() => {
    if (process === 'training') {
      const random_time = Math.random() * 3000 + 3000
      setTimeout(() => {
        dispatch(update())
      }, random_time)
    }
  }, [process])
  return (
    <div className={Style.container}>
      <div className={Style.left}>
        <div className={Style.leftBox}>
          <p className={Style.title}>配置客户端</p>
          <div className={Style.line}>
            <p className={Style.headerText}>客户端数量</p>
            <MyInputNumber
              width={130}
              height={30}
              min={1}
              max={20}
              value={clientNums}
              onChange={(val) => {
                setClientNums(Number(val))
              }}
              disabled={process !== 'initial'}
            ></MyInputNumber>
          </div>
          <div className={Style.line}>
            <p className={Style.headerText}>随机挑选客户端数量</p>
            <MyInputNumber
              width={130}
              height={30}
              min={1}
              max={clientNums}
              value={randomClientNums}
              onChange={(val) => {
                setRandomClientNums(Number(val))
              }}
              disabled={process !== 'initial'}
            ></MyInputNumber>
          </div>
          <div className={Style.line}>
            <p className={Style.headerText}>数据集</p>
            <MySelect defaultValue={'MINST'} options={[{ value: 'MINST', label: 'MINST' }]} disabled={process !== 'initial'}></MySelect>
          </div>
        </div>
        <div className={Style.leftBox}>
          <p className={Style.title}>发布任务</p>
          <div className={Style.line}>
            <p className={Style.headerText}>选择模型</p>
            <MySelect
              options={[
                { value: 'mnist_2nn', label: 'MNIST_2NN' },
                { value: 'mnist_cnn', label: 'MNIST_CNN' },
                { value: 'wideResNet', label: 'WIDERESNET' }
              ]}
              defaultValue={'MNIST_2NN'}
              onChange={(val: any) => {
                console.log('val', val)
                setModel(val)
              }}
              disabled={process !== 'initial'}
            ></MySelect>
          </div>
          <div className={Style.line}>
            <p className={Style.headerText}>训练次数</p>
            <MyInputNumber
              width={130}
              height={30}
              min={1}
              max={5}
              defaultValue={trainTimes}
              onChange={(val) => {
                setTrainTimes(Number(val))
              }}
              disabled={process !== 'initial'}
            ></MyInputNumber>
          </div>
          <div className={Style.line}>
            <p className={Style.headerText}>学习率</p>
            <MyInputNumber
              width={130}
              height={30}
              min={0.01}
              max={0.02}
              step={0.001}
              defaultValue={learnRate}
              onChange={(val) => {
                setLearnRate(Number(val))
              }}
              disabled={process !== 'initial'}
            ></MyInputNumber>
          </div>
          <div className={Style.line}>
            <p className={Style.headerText}>验证频率</p>
            <MyInputNumber
              width={130}
              height={30}
              min={10}
              max={20}
              defaultValue={vf}
              onChange={(val) => {
                setVf(Number(val))
              }}
              disabled={process !== 'initial'}
            ></MyInputNumber>
          </div>
          <div className={Style.line}>
            <p className={Style.headerText}>模型保存频率</p>
            <MyInputNumber
              width={130}
              height={30}
              min={10}
              max={30}
              defaultValue={sf}
              onChange={(val) => {
                setSf(Number(val))
              }}
              disabled={process !== 'initial'}
            ></MyInputNumber>
          </div>
          <div className={Style.line}>
            <p className={Style.headerText}>总通信轮数</p>
            <MyInputNumber
              width={130}
              height={30}
              min={10}
              max={30}
              defaultValue={comun}
              onChange={(val) => {
                setComun(Number(val))
              }}
              disabled={process !== 'initial'}
            ></MyInputNumber>
          </div>
        </div>
        <div className={Style.leftBox}>
          <p className={Style.title}>进度展示</p>
          <Progress percent={process === 'initial' ? 0 : process === 'loading' ? 10 : process === 'training' ? 30 : 100} size='small' status='active' style={{ marginTop: '12px' }} />
          <p className={Style.updateTime}>数据更新时间: 2023-05-09 12:43:12</p>
          <div className={Style.trainBox}>
            <MyButton
              onClick={() => {
                dispatch(update())
                setDisBtn(true)
                setTimeout(() => {
                  setDisBtn(false)
                }, 5000)
                notification.success({
                  message: 'Status Change',
                  description: `The process is ${process === 'initial' ? 'loading' : process === 'loading' ? 'training' : 'finish'}`
                })
              }}
              disabled={disBtn || process === 'finish'}
            >
              训练
            </MyButton>
            {process === 'finish' && (
              <Button
                type='primary'
                style={{ marginLeft: '8px' }}
                onClick={() => {
                  dispatch(update())
                }}
              >
                重新训练
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className={Style.right}>
        <div className={Style.header}>
          <MySteps current={process === 'initial' ? 0 : process === 'loading' ? 1 : process === 'training' ? 2 : 3} labelPlacement='vertical' items={items} />
        </div>
        <div className={Style.content} ref={content_ref}>
          {disBtn && process === 'training' && (
            <div className={Style.drag}>
              <Spin size='large'></Spin>
            </div>
          )}
          {process !== 'finish' ? (
            Array(clientNums)
              .fill(1)
              .map((item, index) => <CardItem index={index} data={initial_data[index % initial_data.length]} status={currentProcess}></CardItem>)
          ) : (
            <Echart width={contentWidth}></Echart>
          )}
        </div>
      </div>
    </div>
  )
}
export default FederatedLearning
