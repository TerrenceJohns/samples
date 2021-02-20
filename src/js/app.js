Vue.filter('toCurrency2', function (value) {
    return 'R ' + parseFloat(value).toFixed(2);
});
Vue.filter('toCurrency0', function (value) {
    return 'R ' + parseFloat(value).toFixed(0);
});
Vue.filter('shortDate', function (value) {
    var v = new Date(value);
    return moment(v).format('YYYY-MM-DD');
});
Vue.filter('mediumDate', function (value) {
    return moment(value).format('DD MMM YYYY');
});

 const routes = [
   {
       path:"/",
       component:Main,
       children:[
           {path:"",component:Overview},
           {path:"sysinfo",component:SystemInfo}
       ]
    }];

 const router = new VueRouter({
   routes: routes // short for `routes: routes`
 });

 
 Vue.component('form-field', Field);
 Vue.component('select-field', SelectField);
 
 const app = new Vue({
     router: router
 }).$mount('#app');