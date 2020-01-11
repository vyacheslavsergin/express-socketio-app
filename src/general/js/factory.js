class Factory {

  create(instance, component) {
    // console.log('instance', instance)
    // console.log('componentName', component)

    const instanceFactory = [...document.querySelectorAll(`[data-app-component="${component}"]`)].map(n => new instance(n))

    if (instanceFactory.length === 0) return false

    // console.log('instanceFactory', instanceFactory)

    instanceFactory.forEach((m) => {
      m.define = function () {
        // console.log('define')
      }

      m.define()
    })

    // console.log('instanceFactory', instanceFactory)
  }
}

const instance = new Factory()
export default instance
