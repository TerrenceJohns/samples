<template>
    <div>
      <div class="float-right">
        <a href="#" class="btn text-primary" @click="showInfo=!showInfo">
          <i class="fas fa-info"></i>
        </a>
      </div>
      <center>
        <h2>
          Computer Online Shop
        </h2>
        <span class="text-primary font-weight-bold">
          Best prices. Shop till you drop
        </span>

      </center>

      <transition name="slide" mode="out-in">
        <div class="alert alert-info" v-if="showInfo" v-html="infomessage">

        </div>

      </transition>



    </div>
</template>
<script>
    module.exports = {
    template:$("#tmpOnlineShop").html(),
    data:function(){
        return {
            infomessage:`<b>The Online Shop</b> sells computers and laptops online. 
                Its a typical online vendor site that requires a pulic interface where internet users can see and perhaps purchase goods. The owner 
                of the site obviously needs a way to edit products, change prices, upload pictures and manage stock as well as track orders.
                You can use <i> username:</i> <b>testuser</b> and <i>password:</i> <b>secret</b> to access the admin functionality. Try adding products, suppliers, etc. 
                <p>Since so many people browse the internet on mobile devices its important that the site displays well on a computer screen or a tablet.
                Click the mobile icon to simpulate a mobile tablet.    
            `,
            showInfo:false
        }
    },
    methods:{
        refresh:function(){
            var vm = this; 

        },
        simulateTablet:function(){
            simulateTablet(false);
        }
    },
    mounted:function(){
        window.startServer({filename:'onlineshop.json',port:9001});
        setApplicationTitle("Online Computer Store", "Computer Store");
        var vm = this;
        vm.refresh();
    },
    beforeDestroy:function(){
        window.stopServer({filename:'onlineshop.json',port:9001});
    }
}
</script>
