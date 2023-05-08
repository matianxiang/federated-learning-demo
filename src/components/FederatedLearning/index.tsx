import React, { useState, useRef, useEffect, LegacyRef } from 'react'
import Graphin, { Behaviors, Utils, NodeStyle, GraphinData, GraphinContext, EdgeStyle, EdgeConfig, NodeConfig } from '@antv/graphin'
import { Row, Col, Card, Spin } from 'antd'
import IconLoader from '@antv/graphin-icons'

const icons = Graphin.registerFontFamily(IconLoader)

// ES modules

const { ZoomCanvas, FitView, Hoverable } = Behaviors

const mock_data: Array<{
  accuracy: number
  commuincate_round: number
  order: number[]
}> = [
  {
    accuracy: 0.3512001037597656,
    commuincate_round: 1,
    order: [9, 11, 4, 12, 13, 19, 18, 2, 16, 8, 10, 1, 5, 7, 0, 17, 6, 3, 15, 14]
  }
]

/* const data = Utils.mock(100)
  .grid({
    rowCount: 2, // 2行
    colCount: 50, // 每行50个节点
    horizontalGap: 10, // 水平间距10
    verticalGap: 10, // 垂直间距10
    getNodeId: (row: any, col: any) => {
      // 节点ID生成逻辑,中间节点ID为'center'
      if (row === 0) return `top_${col}`
      if (row === 1) return `bottom_${col}`
      return 'center'
    }
  })
 */
interface GraphData {
  nodes: Array<{
    id: string
    x: number
    y: number
    style: Omit<NodeStyle, ''>
  }>
  edges: any
}
let graphData: GraphData = {
  nodes: [],
  edges: []
}

/*两边节点的个数*/
const bothSidesNums: number = 20
/**每个节点的宽度*/
const nodeWidth: number = 60
/**总高度*/
const totalHeight: number = 700
/**上下节点和中心点连线的偏离程度*/
const poly: number = 6

// 中间节点
graphData.nodes.push({
  id: 'center',
  x: (bothSidesNums / 2 - 0.5) * nodeWidth, // x坐标居中
  y: totalHeight / 2, // y坐标
  style: {
    label: {
      value: `服务端`
    },
    keyshape: {
      size: 20
      /* fillOpacity: 0.2 */
    },
    icon: {
      type: 'font',
      fontFamily: 'graphin',
      value: icons.Company
    }
  }
})

/**客户端*/

/**客户端节点id集合*/
const nodeIds: Array<string> = []
/**客户端边id集合*/
const edgeIds: Array<EdgeInfo> = []

for (let i = 1; i <= bothSidesNums; i++) {
  graphData.nodes.push(
    ...[
      // 上行节点
      {
        id: `top_${i}`,
        x: i * nodeWidth, // x坐标依次增加
        y: 50 /*  + 450 */, // y坐标固定 上下24边距
        style: {
          label: {
            value: `客户端_${i}`,
            fontSize: 12
          },
          keyshape: {
            size: 12
            /* fillOpacity: 0.2 */
          },
          icon: {
            type: 'font',
            fontFamily: 'graphin',
            value: icons.Report
          }
        }
      },
      // 下行节点
      {
        id: `bottom_${i}`,
        x: i * nodeWidth, // x坐标依次增加
        y: totalHeight - 24, // y坐标固定 上下24边距
        style: {
          label: {
            value: `客户端_${50 + i}`,
            fontSize: 12
          },
          keyshape: {
            size: 12
            /* fillOpacity: 0.2 */
          },
          icon: {
            type: 'font',
            fontFamily: 'graphin',
            value: icons.Report
          }
        }
      }
    ]
  )
  nodeIds.push(`top_${i}`, `bottom_${i}`)

  graphData.edges.push(
    ...[
      {
        source: 'center',
        target: `top_${i}`,
        style: {
          keyshape: {
            lineWidth: 1,
            type: 'poly',
            poly: {
              distance: i < bothSidesNums / 2 ? poly * (bothSidesNums / 2 - i) : i === bothSidesNums / 2 ? 0 : -poly * (i - bothSidesNums / 2)
            }
          }
          /* animate: {
            type: 'circle-running',
            color: 'green',
            repeat: false,
            duration: 10000
          } */
        }
      },
      {
        source: 'center',
        target: `bottom_${i}`,
        style: {
          keyshape: {
            lineWidth: 1,
            type: 'poly',
            poly: {
              distance: i < bothSidesNums / 2 ? -poly * (bothSidesNums / 2 - i) : i === bothSidesNums / 2 ? 0 : poly * (i - bothSidesNums / 2)
            }
          }
          /*  animate: {
            type: 'circle-running',
            color: 'green',
            repeat: false,
            duration: 10000
           
          } */
        }
      }
    ]
  )
  edgeIds.push(
    {
      source: 'center',
      target: `top_${i}`,
      type: 'edge'
    },
    {
      source: 'center',
      target: `bottom_${i}`,
      type: 'edge'
    }
  )
}

const layout = {
  type: /* 'graphin-force' */ ''
  /* preset: {
    type: 'random'
  } */
}

type ItemType = 'node' | 'edge' | 'combo'

interface EdgeInfo {
  type: 'edge'
  source: string
  target: string
}

interface OtherItemInfo {
  type: 'node' | 'combo'
  id: string
}

type UpdateDataInfo = EdgeInfo | OtherItemInfo

// TODO：build-in Graphin.Utils
/* const update = (data: GraphinData, type: ItemType = 'node') => {
  const items: any = data[`${type}s`]
  return {
    set: (update_data: UpdateDataInfo, model: EdgeConfig) => {
      const newItems: any = []
      if (update_data.type !== 'edge') {
        items.forEach((item: any) => {
          if (item.id === update_data?.id) {
            const mergedItem = Utils.deepMix({}, item, model)
            newItems.push(mergedItem)
          } else {
            newItems.push(item)
          }
        })
      } else {
        items.forEach((item: any) => {
          if (item.source === update_data.source && item.target === update_data.target) {
            const mergedItem = Utils.deepMix({}, item, model)
            newItems.push(mergedItem)
          } else {
            newItems.push(item)
          }
        })
      }
      return {
        ...data,
        [`${type}s`]: newItems
      }
    }
  }
}
 */
const update = (data: GraphinData, type: ItemType = 'node') => {
  const items: any = data[`${type}s`]
  return {
    set: (id: any, model: any) => {
      const newItems: any = []
      items.forEach((item: any) => {
        if (item.id === id) {
          const mergedItem = Utils.deepMix({}, item, model)
          newItems.push(mergedItem)
        } else {
          newItems.push(item)
        }
      })
      return {
        ...data,
        [`${type}s`]: newItems
      }
    }
  }
}
const UpdateNode = (props: any) => {
  const { setData, data } = props

  const { graph } = React.useContext(GraphinContext)

  React.useEffect(() => {
    /*  setTimeout(() => {
      newData = nodeIds.forEach((id: string) => {
        update(data, 'node').set(id, {
          style: {
            keyshape: {
              size: 40
            }
          }
        })
      })
      setData(newData)
      console.log('newData999', newData,nodeIds)
    }, 3000) */

    setTimeout(() => {
      const newData = update(data, 'node').set(nodeIds[0], {
        style: {
          keyshape: {
            size: 40
          }
        }
      })
      setData(newData)
    }, 3000)

    /* const handleNodeClick = (e: any) => {
      console.log('e', e)
      const { id } = e.item.getModel()
      const newData = update(data, 'node').set(id, {
        style: {
          keyshape: {
            size: 40
          },
          badges: [
            {
              position: 'RT',
              type: 'text',
              value: Math.round(Math.random() * 100),
              size: [20, 20],
              color: '#fff',
              fill: 'red'
            }
          ]
        }
      })
      console.log('newData', newData)
      setData(newData)
    } */
    /*  graph.on('node:click', handleNodeClick)
    return () => {
      graph.off('node:click', handleNodeClick)
    } */
  }, [setData, data])
  return null
}

export const FederatedLearning = () => {
  const [data, setData] = useState<GraphData>(graphData)
  const [response, setResponse] = useState('')
  const timerRef = useRef(null)

  const CustomComponents = () => {
    // 只要包裹在Graphin内的组件，都可以通过Context获得Graphin提供的graph实例和apis
    const { graph, apis } = React.useContext(GraphinContext)
    console.log('ref', graph.updateItem, apis)
    return null
  }

  useEffect(() => {
    const timer = setInterval(() => {
      mock_data.push({
        accuracy: 0.3512001037597656,
        commuincate_round: mock_data[mock_data.length - 1].commuincate_round + 1,
        order: mock_data[0].order.sort(() => Math.random() - 0.5)
      })
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Card bodyStyle={{ height: '100vh', overflow: 'scroll' }}>
      <Graphin data={data} layout={layout}>
        {/*  <Hoverable bindType='node' />
        <CustomComponents /> */}
        <ZoomCanvas disabled={true}></ZoomCanvas>
        <UpdateNode data={data} setData={setData} />
      </Graphin>
    </Card>
  )
}

export default FederatedLearning
