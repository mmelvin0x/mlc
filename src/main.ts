import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { store } from './state';
import BootstrapVue3 from 'bootstrap-vue-3';
import VueCountdown from '@chenfengyuan/vue-countdown';
import detectBrowser from 'vue-detect-browser';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import '@solana/wallet-adapter-vue-ui/styles.css';
import './styles/base.scss';

const app = createApp(App);

app.component(VueCountdown.name!, VueCountdown);

app.use(router);
app.use(store);
app.use(BootstrapVue3);
app.use(detectBrowser);

app.mount('#app');
