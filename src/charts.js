import utils from './utils'
import Cirque from './cirque'
import myAnimation from './myAnimation'
import { drawHistogram } from './histogram'
import { drawAxis, drawPoint, drawBrokenLine, drawDashLine } from './broken'

class MyCharts {
  constructor(defaultParam) {
    this.defaultParam = defaultParam // 传进来的默认参数
    this._canvasParDom = document.querySelector(this.defaultParam.select) // 获取容器的标识
    this.containerWidth = this._canvasParDom.clientWidth // div容器的宽
    this.containerHeight = this._canvasParDom.clientHeight // div容器的高
    this._canvas = document.createElement('canvas') // 动态创建一个标签

    // 设置默认配置
    this.defaultConfig = {
      styles: {
        borderColor: "#6b9bb8",
        lineColor: '#9ec8da',
        pointColor: '#41627c'
      },
      data: [],
      x: 40,
      padding: 20,
      fontSize: '16px',
      wd: this.containerWidth * this.defaultParam.ratio,
      ht: this.containerHeight * this.defaultParam.ratio,
      lineWidth: 2,
      hisColor: ['#7b8c7c', '#5c968a', '#576d93', '#a0d878', '#337d56', '#c1d0ae', '#93b469', '#bda29a']
    }

    // 上下文绘制环境
    this.ctx = this._canvas.getContext('2d')

    // 缩放画布大小
    this._canvas.width = this.containerWidth * this.defaultParam.ratio
    this._canvas.height = this.containerHeight * this.defaultParam.ratio

    // 添加至div 当中
    this._canvasParDom.appendChild(this._canvas)

    // 扩展或者覆盖配置
    this.defaultParam = utils.extendsObj(this.defaultConfig, this.defaultParam)

    // 设置合适的画布宽度
    this.defaultParam.wid = this._canvas.width - 20

    // 设置缩放比 
    this.defaultParam.maxPoint = utils.maxData(this.defaultParam.data) / 0.8

    this.init()
  }

  init() {
    switch (this.defaultParam.type) {
      case 'cirque':
        let circleConfig = {
          x: this.defaultParam.wd / 2,
          y: this.defaultParam.ht / 2,
          radius: 200, 
          startAngle: 0,
          endAngle: 2 * Math.PI,
          arcWidth: 18,
          target: 50
        }
        this.circleConfig = utils.extendsObj(this.defaultConfig, circleConfig)
        myAnimation.call(this, {
          percent: this.circleConfig.target,
          render: (current) => {
            Cirque.call(this, current / 100)
          }
        })
        break
        case 'line':
          myAnimation.call(this, {
            percent: 200,
            render: (current) => {
              // 绘制坐标系
              drawAxis.call(this)
              // 绘制圆形
              drawBrokenLine.call(this, current / 200)
              // 绘制Y轴虚线
              drawDashLine.call(this, current / 200)
              // 绘制圆形
              drawPoint.call(this, current / 200)
            }
          })
          break;
        case 'histogram':
          myAnimation.call(this, {
            percent: 100,
            render: (current) => {
              // 绘制坐标系
              drawAxis.call(this)
              // 绘制直方图
              drawHistogram.call(this, current / 100)
            }
          })
          break
      default:
        console.log('无此功能的绘制')
    }
  }
}

export default MyCharts