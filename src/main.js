import 'core-js/stable';
import 'regenerator-runtime/runtime'

import { createApp } from 'vue';

import App from 'components/App'; // 作ったやつ
import store from 'store';

const app = createApp(App);
app.use(store);
app.mount('#app');