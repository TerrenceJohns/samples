<template>
     <div>
      <div id="mySidebar" class="sidebar">
        <center>
          <h3>Samples</h3>
        </center>
        <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action" :class="{active:$route.path=='/'}"
            @click="gotoOverview">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Overview</h4>
            </div>
            <p class="mb-1">
              Overview of the application.
            </p>
          </a>
          <a href="#" class="list-group-item list-group-item-action" :class="{active:$route.path=='/sysinfo'}"
            @click="gotoSystemInfo">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">System Info</h4>
            </div>
            <p class="mb-1">
              Monitor some system resources.
            </p>
          </a>
          <a href="#" class="list-group-item list-group-item-action" :class="{active:$route.path=='/databases'}"
            @click="gotoDatabases">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Database Designer</h4>
            </div>
            <p class="mb-1">
              A simple database designer.
            </p>
          </a>
          <a href="#" class="list-group-item list-group-item-action" :class="{active:$route.path=='/onlineshop'}"
            @click="gotoOnlineShop">
            <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">Online Shop</h4>
            </div>
            <p class="mb-1">
              Online computer shop sample.
            </p>
          </a>
        </div>
      </div>
      <div id="mainDiv">
        <br>
        <transition name="fade">
          <router-view></router-view>
        </transition>

      </div>
    </div>
</template>
<script>
    module.exports = {
    data:function(){
        return {
            message:'Welcome'
        }
    },
    methods:{
        gotoOverview:function(){
            var vm = this;
            vm.$router.push('/');
            toggleSideBar();
        },
        gotoSystemInfo:function(){
            var vm = this;
            vm.$router.push('/sysinfo');
            toggleSideBar();
        },
        gotoOnlineShop:function(){
            var vm = this;
            vm.$router.push('/onlineshop');
            toggleSideBar();
        },
        gotoDatabases:function(){
            var vm = this;
            vm.$router.push('/dbdesigner');
            toggleSideBar();
        }
    },
    mounted:function(){

    }
}
</script>
