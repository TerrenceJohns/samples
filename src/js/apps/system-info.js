const SystemInfo = {
    template:$("#tmpSystemInfo").html(),
    data:function(){
        return {
            Info:false,
            tmr:{}
        }
    },
    methods:{
        stopStuff:function(){
            var vm = this;
            clearInterval(vm.tmr);
        },
        refresh:function(){
            var vm = this;
            window.IPC.on('system-info-response',function(ev,dta){
                console.log(dta);
                dta['usedMem'] = (dta.totalMem * 0.0000000010) - (dta.freeMem * 0.0000000010);
                dta.totalMem = dta.totalMem * 0.0000000010;
                vm.Info = dta;
            });
            window.IPC.removeListener('system-info-response',vm.stopStuff);
            vm.monitor();
            vm.tmr = setInterval(vm.monitor,1000);
            
        },
        monitor:function(){
            var vm = this;
            window.IPC.send('system-info');
        }

    },
    mounted:function(){
        var vm = this;
        vm.refresh();
    },
    beforeDestroy:function(){
        var vm = this;
        vm.stopStuff();
        
    }
    
}