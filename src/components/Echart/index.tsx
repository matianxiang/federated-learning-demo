import React, { useRef, useEffect, useState } from 'react'
import * as echarts from 'echarts'

import { accuracy_data } from '../../data/accuracy_data'

/* const fs = require('fs'); */

/* import fs from 'fs'
console.log(fs.readFileSync('/data/data_accuracy.json')) */
import data_accuracy from '../../data/data_accuracy.json'
const mock_data = data_accuracy.data

interface props {
  width: number
}
const Echart = (props: props) => {
  const chartRef = useRef<HTMLDivElement>(null)

  const [data, setData] = useState<any[]>(accuracy_data)


  useEffect(() => {
    const myChart = echarts.init(chartRef.current!)
    const models = ['minst-cnn', 'minst-2nn', 'wideResNet']
    const datasetWithFilters: any = []
    const seriesList: any = []
    models.forEach((item) => {
      const datasetId = 'dataset_' + item
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
          type: 'filter',
          config: {
            and: [
              { dimension: 'Communicate_round', gte: 1 },
              { dimension: 'Model', '=': item }
            ]
          }
        }
      })
      seriesList.push({
        type: 'line',
        datasetId: datasetId,
        showSymbol: false,
        name: item,
        endLabel: {
          show: true,
          formatter: function (params: any) {
            return params.value[1] + ': ' + Number(params.value[0]).toFixed(4)
          }
        },
        labelLayout: {
          moveOverlap: 'shiftY'
        },
        emphasis: {
          focus: 'series'
        },
        encode: {
          x: 'Communicate_round',
          y: 'Accuracy',
          label: ['model', 'accuracy'],
          itemName: 'communicate-round',
          tooltip: ['model']
        }
      })
    })

    myChart.setOption({
      animationDuration: 15000,
      dataset: [
        {
          id: 'dataset_raw',
          source: mock_data
        },
        ...datasetWithFilters
      ],
      title: {
        text: 'Accuracy that changes as the number of communication rounds increases'
      },
      tooltip: {
        order: 'valueDesc',
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        /* nameLocation: 'r', */
        name:'Communicate_round'
      },
      yAxis: {
        name: 'Accuracy'
      },
      grid: {
        right: 140
      },
      series: seriesList
    } as any)
  }, [])

  return <div ref={chartRef} style={{ width: props.width, height: '100%' }} />
}
export default Echart
