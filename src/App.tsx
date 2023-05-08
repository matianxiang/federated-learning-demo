import React, { useState } from 'react'

import FederatedLearning from './Page/FederatedLearning'
import StartPage from './Page/StartPage'
import Fork_Github_PNG from '@/static/fork_github.png'

function App() {
  const [isNextPage, setIsNextPage] = useState<boolean>(false)

  return (
    <div style={{ position: 'relative' }}>
      <img src={Fork_Github_PNG} alt='Fork_GitHub' style={{ position: 'fixed', top: '0px', right: '0px', width: '100px', height: '100px' }} />
      {!isNextPage ? <StartPage></StartPage> : <FederatedLearning></FederatedLearning>}
    </div>
  )
}

export default App
