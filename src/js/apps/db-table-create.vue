<template>
    <div>
        <div class="input-group input-group-sm">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <i class="fas fa-table"></i>
            </div>
          </div>
          <input type="text" class="form-control" v-model="table_name"> 
        </div>
        <div class="float-right">
          <div class="btn-group btn-group-sm">
            <a href="#" class="btn text-success" @click="save">
              <i class="fas fa-check"></i>
            </a>
            <a href="#" class="btn text-danger" @click="cancel">
              <i class="fas fa-times"></i>
            </a>
          </div>
        </div>
      </div>
</template>
<script>
module.exports = {
    props:{
        dbid:{
            type:[Number, String],
            required : true
        }
    } ,
    template:$("#tmpDataTableCreate").html(),
    data:function(){
        return {
            table_name:''
        }
    },
    methods:{
        isValid:function(){
            var vm = this;
            var res = true;
            if(vm.table_name=='') {
                res = false;
            }
            return res;
        },
        save:function(){
            var vm = this;
            if(vm.isValid()){
                var p = {
                    TableName:'tables',
                    Params:{
                        databaseId:vm.dbid,
                        table_name:vm.table_name
                    }
                };
                DataManagementService.SaveData(p).then(function(res){
                    if(res.id){
                        vm.$emit('datatable-created', `Data table "${vm.table_name}" successfully created`);
                    }
                }).catch(function(err){
                    console.log(err);
                });
            }
            
        },
        cancel:function(){
            var vm = this;
            vm.$emit('datatable-creation-cancelled','');
        }
    },
    mounted:function(){

    }
}
</script>
