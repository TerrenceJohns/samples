<template>
    <div class="card rounded" style="background-color:white">
      <div class="card-body">
        <h4 class="card-title">Edit Data: {{tablename}}</h4>
        <table class=" table-sm table table-bordered">
          <thead>
            <tr>
              <th v-for="col in columns" :key="col.id">
                {{col.column_name}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="font-size:8pt" v-for="row in Data" :key="row.id">
              <td v-for="col in columns" :key="col.id">
                {{row[col.column_name]}}
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="float-right">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-warning" @click="close">
              <i class="fas fa-times"></i> Close
            </button>
            
          </div>
        </div>
      </div>

    </div>
</template>
<script>
    module.exports = {
    props:{
        tablename:{
            type:String,
            required:true
        },
        columns:{
            type:Array,
            required:true
        }
    },
    template:$("#tmpDataEditor").html(),
    data:function(){
        return {
            Data:[]
        }
    },
    methods:{
        close:function(){
            var vm = this;
            vm.$emit('close-data-editor','');
        },
        refresh:function(){
            var vm = this;
            var p = {
                TableName:vm.tablename,
                Params:{}
            };
            DataService.ReadData(p).then(function(res){
                vm.Data = res;
            }).catch(function(err){
                console.log(err);
            });
        }
    },
    mounted:function(){
        var vm = this;
        vm.refresh();
    }
}
</script>
