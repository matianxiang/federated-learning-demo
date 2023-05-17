import React, { useState } from 'react'

import FederatedLearning from './pages/FederatedLearning'
import StartPage from './pages/StartPage'
import Demo from './pages/Demo'
import Fork_Github_PNG from '@/static/fork_github.png'
import { message } from 'antd'

function App() {
  const [isNextPage, setIsNextPage] = useState<boolean>(false)

  const onClickCb = () => {
    const duration = 2000 + 3000 * Math.random()
    message.loading({
      content: 'The system is initializing.',
      duration
    })

    setTimeout(() => {
      setIsNextPage(true)
     message.destroy()
    }, duration)
  }
  return (
    <div style={{ position: 'relative' }}>
     {/*  <img
        src={Fork_Github_PNG}
        alt='Fork_GitHub'
        style={{ position: 'fixed', top: '0px', right: '0px', width: '100px', height: '100px', cursor: 'pointer' }}
        onClick={() => {
          window.open('https://github.com/matianxiang/federated-learning-demo')
        }}
      />
      {!isNextPage ? <StartPage onChange={onClickCb}></StartPage> : <FederatedLearning></FederatedLearning>} */}
      <Demo></Demo>
    </div>
  )
}

export default App
