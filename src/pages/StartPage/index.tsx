import React, { useRef,useState } from 'react'
import Style from './index.module.scss'
import Logo from '@/static/federated-learning.svg'
import { Button } from 'antd'
import { current } from '@reduxjs/toolkit'
interface Props {
  onChange: () => void
}
const StartPage = (props: Props) => {
  const [flag,setFlag]= useState(true)

  return (
    <div className={Style.Div}>
      <div className={Style.LogoBox}>
        <img src={Logo} alt='Logo' />
        <p className={Style.p}>Privacy Data Sharing System : Base On Federated Learning</p>
        <div className={Style.ButtonBox}>
          <Button
            type='dashed'
            ghost
            onClick={() => {
              props.onChange()
              setFlag(false)
            }}
            disabled={!flag}
          >
            进入系统
          </Button>
        </div>
      </div>
    </div>
  )
}
export default StartPage
