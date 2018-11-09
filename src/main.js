import Vue from 'vue'
import App from './App.vue'
import ImgUpload from './ImgUpload.vue'

Vue.component('img-upload', ImgUpload)
new Vue({
  el: '#app',
  render: h => h(App)
})
