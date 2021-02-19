const SystemInfo = {
    template:$("#tmpSystemInfo").html(),
    data:function(){
        return {
            Info:{}
        }
    },
    methods:{
        refresh:function(){
            var vm = this;
            window.IPC.on('system-info-response',function(ev,dta){
                console.log(dta);
                vm.Info = data;
            })
            window.IPC.send('system-info');
        }
    },
    mounted:function(){
        var vm = this;
        vm.refresh();
    }
    
}