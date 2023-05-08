import React from 'react'
import Style from './index.module.scss'
import Logo from '@/static/federated-learning.svg'
import { Button } from 'antd'
interface Props {
  onChange: () => void
}
const StartPage = (props:Props) => {
  return (
    <div className={Style.Div}>
      <div className={Style.LogoBox}>
        <img src={Logo} alt='Logo' />
        <p className={Style.p}>Privacy Data Sharing System : Base On Federated Learning</p>
        <div className={Style.ButtonBox}>
          <Button type='dashed' ghost onClick={()=>props.onChange()}>
            进入系统
          </Button>
        </div>
      </div>
    </div>
  )
}
export default StartPage
