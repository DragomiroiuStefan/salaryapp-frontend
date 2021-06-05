import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Dropdown from 'primevue/dropdown';
import SplitButton from 'primevue/splitbutton';


import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

createApp(App)
.use(PrimeVue)
.use(ToastService)
.component('Button', Button)
.component('DataTable', DataTable)
.component('Column', Column)
.component('InputText', InputText)
.component('Password', Password)
.component('InputNumber', InputNumber)
.component('Dialog', Dialog)
.component('Calendar', Calendar)
.component('TabView', TabView)
.component('TabPanel', TabPanel)
.component('Dropdown', Dropdown)
.component('SplitButton', SplitButton)
.mount('#app')
