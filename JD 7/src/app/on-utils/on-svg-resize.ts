import * as $ from 'jquery'

/**
* @name OnSvgResize
* @description
* Esta classe é responsável por ajustar o tamanho do SVG
* ```
*/

export class OnSvgResize {
  element: any

  constructor(svg) {
    this.element = svg
    this.init()
  }

  init() {
    let svgViewBox = this.element.getAttribute('viewBox')
    svgViewBox = svgViewBox.split(' ')
    this.element.setAttribute('data-width', parseFloat(svgViewBox[2]))
    this.element.setAttribute('data-height', parseFloat(svgViewBox[3]))
    setTimeout(() => {
      this.resizeByParentWidth()
    }, 0)
    window.addEventListener('resize', () => {
      this.resizeByParentWidth()
    })
  }

  resizeByParentWidth() {
    let objectParent = $(this.element).closest('object')[0]
    let objectParentStyle = objectParent.currentStyle || window.getComputedStyle(objectParent)
    let objectParentPaddingLeft = parseFloat(objectParentStyle.paddingLeft)
    let objectParentPaddingRight = parseFloat(objectParentStyle.paddingRight)
    let newWidth = objectParent.offsetWidth - objectParentPaddingLeft - objectParentPaddingRight
    let newHeight = parseFloat(this.element.getAttribute('data-height')) * newWidth / parseFloat(this.element.getAttribute('data-width'))
    this.element.setAttribute('width', newWidth)
    this.element.setAttribute('height', newHeight)
  }
}
