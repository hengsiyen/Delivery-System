import 'vue-select/src/scss/vue-select.scss'

import Vue from 'vue'
import vSelect from 'vue-select'

vSelect.props.components.default = () => ({
  Deselect: {
    render: createElement => createElement('i', { class: 'fa fa-close' })
  },
  OpenIndicator: {
    render: createElement => createElement('i', { class: 'fas fa-sort' })
  }
})

Vue.component('v-select', vSelect)
