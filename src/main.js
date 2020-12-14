import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);


Vue.config.productionTip = false;

store.dispatch('attempt', localStorage.getItem('token')).then(()=> {
    new Vue({
        router,
        vuetify,
        store,
        render: h => h(App)
    }).$mount('#app');
});

