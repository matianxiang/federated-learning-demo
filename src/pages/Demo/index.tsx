import React, { useRef, useEffect, useState } from 'react'
import * as echarts from 'echarts'
import { mnist_2nn, mnist_cnn, wideResNet } from '../../data/epsilon_500_models'

const Demo = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const data: any = [['Accuracy', 'Model', 'Communicate_round']]
  for (let i = 0; i < 500; i++) {
    data.push([mnist_cnn[i], 'mnist_cnn', i + 1])
    data.push([mnist_2nn[i], 'mnist_2nn', i + 1])
    data.push([wideResNet[i], 'wideResNet', i + 1])
  }
  useEffect(() => {
    const myChart = echarts.init(chartRef.current!)
    const models = ['mnist_cnn', 'mnist_2nn', 'wideResNet']
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
          source: data
        },
        ...datasetWithFilters
      ],
      /* title: {
        text: 'Accuracy that changes as the number of communication rounds increases'
      }, */
      tooltip: {
        order: 'valueDesc',
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        /*  nameLocation: 'bottom', */
        name: 'Communicate_round'
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

  return <div ref={chartRef} style={{ width: '800px', height: '500px', paddingTop: '100px' }}></div>
}
export default Demo
