<template>
    <div>
      <div class="card">
        <div class="card-body">
          <span class="float-right">
            <a href="#" class="btn btn-sm text-info" @click="showInfo=!showInfo">
              <i class="fas fa-info"></i>
            </a>
          </span>
          <h4 class="card-title">
            Table Designer: {{table.table_name}}
          </h4>
          <div class="alert alert-info" v-show="showInfo">
            SQLType and Length are descriptive and don't affect the current database, but are used when creating scripts
            for a MS SQL or MySQL.
          </div>
          <table class="table table-sm table-borderless">
            <thead>
              <tr>
                <th style="width:40px"></th>
                <th style="width:200px">
                  Name
                </th>
                <th style="width:120px">DataType</th>
                <th style="width:120px">SQLType</th>
                <th style="width:120px">Length</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="col in Columns" :key="col.id">
                <td style="width:40px">
                  <i class="fas fa-columns"></i>  
                </td>
                <td style="width:200px">
                  <input type="text" v-model="col.column_name" class="form-control form-control-sm" style="width:200"
                    :readonly="col.column_name=='id'">
                </td>
                <td>
                  <select class="form-control form-control-sm">
                    <option value="String">String</option>
                    <option value="Number">Number</option>
                    <option value="Date">Date</option>
                  </select>
                </td>
                <td>
                  <select class="form-control form-control-sm">
                    <option value="Int">Int</option>
                    <option value="Long">Long</option>
                    <option value="Float">Float</option>
                    <option value="Money">Money</option>
                    <option value="Date">Date</option>
                    <option value="DateTime">DateTime</option>
                  </select>
                </td>
                <td>
                  <input type="number" class="form-control form-control-sm">
                </td>
                <td></td>
              </tr>
              <tr>
                <td style="width:40px">
                  <i class="fas fa-columns"></i>  
                </td>
                <td style="width:200px">
                  <input type="text" v-model="NewColumn.column_name" class="form-control form-control-sm"
                    style="width:200">
                </td>
                <td>
                  <select class="form-control form-control-sm">
                    <option value="String">String</option>
                    <option value="Number">Number</option>
                    <option value="Date">Date</option>
                  </select>
                </td>
                <td>
                  <select class="form-control form-control-sm">
                    <option value="Int">Int</option>
                    <option value="Long">Long</option>
                    <option value="Float">Float</option>
                    <option value="Money">Money</option>
                    <option value="Date">Date</option>
                    <option value="DateTime">DateTime</option>
                  </select>
                </td>
                <td>
                  <input type="number" class="form-control form-control-sm">
                </td>
                <td>
                  <a href="#" class="btn btn-sm text-primary" @click="columnAdded">
                    <i class="fas fa-plus"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
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
  module.exports =  {
    props: {
        table: {
            type: Object,
            required: true
        }, 
        close:{
            type:Function
        }
    },
    
    data: function () {
        return {
            Columns: [],
            NewColumn: {},
            message: '',
            showInfo:false

        }
    },
    methods: {
        refresh: function () {
            var vm = this;
            vm.NewColumn = {
                tableId: vm.table.id,
                column_name: ''
            }
            var p = {
                TableName: 'columns',
                Params: {
                    tableId: vm.table.id
                }
            };
            DataManagementService.ReadData(p).then(function (res) {
                vm.Columns = res;
            }).catch(function (err) {
                console.log(err);
            });
        },

        columnAdded: function () {
            var vm = this;
            if(vm.isValid()) {
                var newCol = JSON.parse(JSON.stringify(vm.NewColumn));
                vm.Columns.push(newCol);
                vm.NewColumn = vm.NewColumn = {
                    tableId: vm.table.id,
                    column_name: ''
                }
            }
            
        },
        isValid: function () {
            var vm = this;
            var res = true;
            if (vm.NewColumn.column_name == '') {
                res = false;
            }
            return res;
        },
        cancel:function(){
            var vm = this;
            vm.$emit('canceltabledesign',`Changes to table ${vm.table.table_name} were cancelled.`);
        },
        save: function () {
            var vm = this;
            var idx = 0;
            var cols = vm.Columns.length;
            _.each(vm.Columns, function (col) {
                var p = {
                    TableName: 'columns',
                    Params: col
                };
                DataManagementService.SaveData(p).then(function (res) {
                    if (res.id) {
                        idx += 1;
                        if (idx == cols) {
                            vm.$emit('success-message', `Table ${vm.table.table_name} successfully saved.`);
                        }
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            });


        }
    },
    mounted: function () {
        var vm = this;
        vm.refresh();
    }
}
</script>

