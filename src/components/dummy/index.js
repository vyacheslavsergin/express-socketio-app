import './scss/index.scss'

import Dummy from './js/dummy.component'

/* init app */
// import app from './general/js/app'
// app.init()

/* init app */
import factory from '../../general/js/factory'
factory.create(Dummy, 'dummy')

// const dummy = [...document.querySelectorAll('[data-app-component="dummy"]')].map(n => new Dummy(n))
