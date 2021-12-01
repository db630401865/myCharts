export default function myAnimation(param) {
  let current = 0
  let looped // 制作动画
  const ctx = this.ctx
  const _canvas = this._canvas
  const callback = param.render
  const successCb = param.success;
  (function looping() {
    // requestAnimationFrame告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
    looped = requestAnimationFrame(looping)
    if (current < param.percent) {
      ctx.clearRect(0, 0, _canvas.width, _canvas.height)
      current = current + 4 > param.percent ? param.percent : current + 4
      callback(current)
    } else {  
      window.cancelAnimationFrame(looping) // 清除动画
      looped = null
      successCb && successCb()
    }
  })()
}