const Main = {
    template:$("#tmpMain").html(),
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
        }
    },
    mounted:function(){

    }
}