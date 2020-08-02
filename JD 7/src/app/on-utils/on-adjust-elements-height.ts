/**
* @name OnAdjustElementsHeight
* @description
* Esta classe é responsável por ajustar a altura de elementos com a mesma classe
* ```
*/

export class OnAdjustElementsHeight {
  highestHeight: number
  status: boolean = false

  constructor(
    public elements: any[],
    public breakResolution?: number
    ) {
      this.init()
  }

  resetElementsHeight() {
    this.elements.forEach((element) => {
      element.style.height = 'auto'
    })
  }

  adjustElementsHeight() {
    this.highestHeight = this.elements[0].offsetHeight

    this.elements.forEach((element) => {
      if(element.offsetHeight > this.highestHeight)
        this.highestHeight = element.offsetHeight
    })

    this.elements.forEach((element) => {
      element.style.height = this.highestHeight + 'px'
    })
  }

  build() {
    this.status = true
    this.adjustElementsHeight()
  }

  unbuild() {
    this.status = false
    this.resetElementsHeight()
  }

  init() {
    !this.breakResolution ? this.breakResolution = 0 : this.breakResolution

    if(this.elements.length) {
      if(window.innerWidth >= this.breakResolution && this.status === false)
        this.build()

      window.addEventListener('resize', () => {
        if(window.innerWidth >= this.breakResolution && this.status === false)
          this.build()
        else(window.innerWidth < this.breakResolution && this.status === true)
          this.unbuild()
      })
    }
  }
}
