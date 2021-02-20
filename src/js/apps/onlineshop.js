const OnlineShop = {
    template:$("#tmpOnlineShop").html(),
    data:function(){
        return {
            message:'Online Shop'
        }
    },
    methods:{
        refresh:function(){
            var vm = this 
        }
    },
    mounted:function(){
        var vm = this;
        vm.refresh();
    }
}