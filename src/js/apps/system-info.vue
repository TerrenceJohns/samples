<template>
    <div>
      <div v-if="Info">
        <h3>System Info</h3>
        <hr>
        <h4 class="text-primary">
          <i class="fas fa-laptop-code"></i>
          Operating System</h4>
        <table class="table table-sm table-borderless">
          <tr>
            <td class="tdLabel">
              Operation system:
            </td>
            <td>
              {{Info.OS}}
            </td>
          </tr>
          <tr>
            <td class="tdLabel">
              Version:
            </td>
            <td>
              {{Info.version}}
            </td>
          </tr>
        </table>
        <hr>
        <h4 class="text-primary">
          <i class="fas fa-microchip"></i>
          Processors
        </h4>
        <div class="row" v-for="(p, index) in Info.cpus" :key="index">
          <div class="col-md-6">
            <table class="table table-sm table-borderless">
              <tr>
                <td style="font-weight:500;width:100px">
                  CPU_{{index}}:
                </td>
                <td>
                  {{p.model}}
                </td>
              </tr>
            </table>
          </div>
          <div class="col-md-6">
            <table class="table table-sm table-borderless">
              <tr>
                <td>
                  <div class="progress">
                    <div
                      :class="{'bg-success':p.load <= 40,'bg-warning':p.load>=40 && p.load<=80,'bg-danger':p.load > 80 }"
                      class="progress-bar" role="progressbar" :aria-valuenow="(p.load).toFixed(2)"
                      :style="'width:' + (p.load).toFixed(2) + '%'" aria-valuemin="0" aria-valuemax="100">
                      <span style="font-size:xx-small">
                        {{(p.load).toFixed(2)}}%
                      </span>
                    </div>
                  </div>
                </td>

              </tr>
            </table>
          </div>
        </div>

        <hr>
        <h4 class="text-primary">
          <i class="fas fa-sd-card"></i>
          Memory
        </h4>
        <div class="row">
          <div class="col-md-6">
            <table class="table table-sm table-borderless">
              <tr>
                <td class="tdLabel">
                  Total Memory:
                </td>
                <td style="width:100px">
                  {{(Info.totalMem ).toFixed(2)}}GB
                </td>
              </tr>
            </table>
          </div>
          <div class="col-md-6">
            <table class="table table-sm table-borderless">
              <tr>
                <td>
                  <div class="progress">
                    <div class="progress-bar" role="progressbar"
                      :aria-valuenow="(Info.usedMem/Info.totalMem * 100).toFixed(2)"
                      :style="'width:' + (Info.usedMem/Info.totalMem * 100).toFixed(2) + '%'" aria-valuemin="0"
                      aria-valuemax="100">
                      <span style="font-size:xx-small">
                        {{(Info.usedMem/Info.totalMem * 100).toFixed(2)}}%
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>

      </div>

    </div>
</template>
<script>
    module.exports = {
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
            vm.monitor();
            vm.tmr = setInterval(vm.monitor,1000);
            
        },
        monitor:function(){
            var vm = this;
            window.getSystemInfo().then(function(data){
                data['usedMem'] = (data.totalMem * 0.0000000010) - (data.freeMem * 0.0000000010);
                data.totalMem = data.totalMem * 0.0000000010;
                vm.Info = data;
            });
        }

    },
    mounted:function(){
        setApplicationTitle("System Resource Monitor", "System Monitor");
        var vm = this;
        vm.refresh();
    },
    beforeDestroy:function(){
        var vm = this;
        vm.stopStuff();
        
    }
    
}
</script>
