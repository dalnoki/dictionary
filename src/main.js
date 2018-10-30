import Vue from 'vue'
import App from './App.vue'
import Card from './Card.vue'

Vue.component('cards-body', Card)
new Vue({
  el: '#app',
  render: h => h(App)
})
