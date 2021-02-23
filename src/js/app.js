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
       component:httpVueLoader('js/main.vue'),
       children:[
           {path:"",component:httpVueLoader('js/apps/overview.vue')},
           {path:"sysinfo",component:httpVueLoader('js/apps/system-info.vue')},
           {path:"dbdesigner",component:httpVueLoader('js/apps/db-designer.vue')},
           {path:"onlineshop",component:httpVueLoader('js/apps/onlineshop.vue')}
       ]
    }];

 const router = new VueRouter({
   routes: routes // short for `routes: routes`
 });

//  router.beforeEach((to, from, next) => {
//   })
//   router.beforeResolve((to, from, next) => {
//     /* must call `next` */
//   })
  
  router.afterEach((to, from) => {
    if((from.fullPath.indexOf('/onlineshop')!=-1) && (to.fullPath.indexOf('/onlineshop') == -1)) {
        window.stopServer({filename:'onlineshop.json',port:9001});
    }
  });
 Vue.component('database-table-create',httpVueLoader('js/apps/db-table-create.vue'));
 Vue.component('data-table-designer',httpVueLoader('js/apps/db-table-designer.vue'));
 Vue.component('data-editor',httpVueLoader('js/apps/db-data-editor.vue'));
 Vue.component('database-create',httpVueLoader('js/apps/db-create.vue'))

 const app = new Vue({
    router: router
 }).$mount('#app');