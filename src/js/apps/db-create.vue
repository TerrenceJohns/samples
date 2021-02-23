<template>
    <div>
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            Create Database
          </h4>
          <div class="row">
            <div class="col-md-6">
              <table>
                <tr>
                  <td class="tdLabel">
                    Database name:
                  </td>
                  <td>
                    <input type="text" v-model="NewDatabase.dbname" class="form-control">
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <table>
                <tr>
                  <td class="tdLabel">
                    Filename:
                  </td>
                  <td>
                    <input type="text" v-model="NewDatabase.filename" class="form-control">
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="alert alert-danger" v-show="errors.length!=0">
            <ul>
              <li v-for="err in errors">
                {{err.message}}
              </li>
            </ul>
          </div>
          <hr>
          <div class="float-right">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-primary" @click="save">
                <i class="fas fa-save"></i> Save
              </button>
              <button type="button" class="btn btn-sm btn-danger" @click="cancel">
                <i class="fas fa-times"></i> Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
</template>
<script>
module.exports=  {
    template:$("#tmpDatabaseCreate").html(),
    data:function(){
        return {
            NewDatabase:{
                dbname:'',
                filename:''
            },
            errors:[]
        }
    },
    methods:{
        isValid:function(){
            var vm = this;
            var res = true;
            if(vm.NewDatabase.dbname == '' || vm.NewDatabase.filename=='') {
                res = false;
                vm.errors.push({message:'Database name and Filename are required'});
            }
            if(vm.NewDatabase.filename.toUpperCase().indexOf('.JSON')==-1) {
                vm.NewDatabase.filename = vm.NewDatabase.filename + '.json'; 
            }
            return res;

        },
        save:function(){
            var vm = this;
            if(vm.isValid()) {
                var p = {
                    TableName:'databases',
                    Params:vm.NewDatabase
                }
                DataManagementService.SaveData(p).then(function(res){
                    if(res.id) {
                        vm.$emit('database-saved',`Database "${vm.NewDatabase.dbname}" was succesfully created.`);
                    } 
                }).catch(function(err){
                    console.log(err);
                })
            }
        },
        cancel:function(){
            var vm = this;
            vm.$emit('databasecreate-canceled','');   
        }
    },
    mounted:function(){
        var vm = this;
    }

}
</script>
