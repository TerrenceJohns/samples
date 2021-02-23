    <template>
        <div style="min-height:calc(100vh - 120px);background-color:whitesmoke">
            <div class="form-inline bg-light">
                <div class="input-group input-group-sm">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <i class="fas fa-database"></i>
                        </div>
                    </div>
                    <select v-model="SelectedDatabaseID" @change="selectedDatabaseChanged" class="form-control">
                        <option value="-1">--Select DB--</option>
                        <option v-for="db in AllDatabases" :value="db.id" :key="db.id">{{db.dbname}}</option>
                        <option value="0">--Create DB--</option>
                    </select>
                </div>
            </div>
            <div class="objectPane">
                <table class="table table-sm table-borderless table-hover ml-1" v-if="SelectedDatabase">
                    <thead>
                        <tr>
                            <th>
                                <span class="float-right">
                                    <a href="#" class="btn btn-sm text-primary" title="Add table" @click="addTable">
                                        <i class="fas fa-plus"></i>
                                    </a>
                                </span>
                                <i class="fas fa-table"></i>
                                Tables
                            </th>
                        </tr>
                    </thead>
                    <tbody v-if="mode=='addTable'">
                        <tr>
                            <td>
                                <database-table-create :dbid="SelectedDatabaseID" @datatable-created="dataTableCreated"
                                    @datatable-creation-cancelled="dataTableCreationCancelled"></database-table-create>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr v-for="tb in SelectedDatabase.tables" :key="tb.table_name">
                            <td style="text-indent:5px">
                                <div class="float-right">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm dropdown-toggle" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">

                                        </button>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <button class="dropdown-item" type="button" @click="designTable(tb)">
                                                <i class="fas fa-tools"></i>
                                                Design
                                            </button>
                                            <button class="dropdown-item" type="button" @click="viewData(tb)">
                                                <i class="fas fa-list-alt"></i>
                                                View data
                                            </button>
                                            <button class="dropdown-item" type="button">
                                                <i class="fas fa-edit"></i>
                                                Edit Data
                                            </button>
                                        </div>
                                    </div>

                                </div>

                                {{tb.table_name}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="toast border border-success" role="alert" aria-live="assertive" aria-atomic="true"
                data-animation="true" data-autohide="true" data-delay="3000"
                style="position: absolute; top: 60; right: 0;">
                <div class="toast-header">
                    <strong class="mr-auto">Databse Designer</strong>
                    <small>Just now</small>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div ref="toastBody" class="toast-body">

                </div>
            </div>
            <div class="workspace">

                <div v-if="mode=='viewdata'">
                    <data-editor :tablename="SelectedTableName" :columns="SelectedTableColumns" :key="SelectedTableName"
                        @close-data-editor="closeDataEditor">
                    </data-editor>
                </div>
                <div v-if="mode=='designtable'">
                    <data-table-designer :table="SelectedTable" :key="SelectedTableName"
                        @canceltabledesign="cancelTableDesign" @success-message="toastMessage"></data-table-designer>
                </div>
                <div v-if="mode=='newdb'">
                    <database-create @database-saved="databaseSaved" @databasecreate-canceled="databaseCreateCancelled"
                        @success-message="toastMessage"></database-create>
                </div>

            </div>

        </div>



    </template>
    <script type="text/javascript">
        module.exports = {
            data: function () {
                return {
                    AllDatabases: [],
                    AllTables: [],
                    AllColumns: [],
                    SelectedDatabaseID: -1,
                    SelectedDatabase: false,
                    SelectedTableName: '',
                    SelectedTableColumns: [],
                    NewDatabase: {
                        dbname: '',
                        filename: ''
                    },
                    refreshing: false,
                    errors: [],
                    messages: [],
                    mode: ''
                }
            },
            methods: {
                dataTableCreationCancelled: function () {
                    var vm = this;
                    vm.mode = '';
                },
                dataTableCreated: function (e) {
                    var vm = this;
                    vm.mode = '';
                    vm.refresh(vm.selectedDatabaseChanged);
                    vm.selectedDatabaseChanged();
                    var ms = `<span class="text-success">${e}</span>`;
                    $(vm.$refs.toastBody).html(ms);
                    $(".toast").toast('show');
                },
                addTable: function () {
                    var vm = this;
                    vm.mode = 'addTable'
                },
                databaseCreateCancelled: function () {
                    var vm = this;
                    vm.mode = '';
                },
                databaseSaved: function (e) {
                    var vm = this;
                    vm.mode = '';
                    vm.refresh();
                    var ms = `<span class="text-success">${e}</span>`;
                    $(vm.$refs.toastBody).html(ms);
                    $(".toast").toast('show');
                },
                closeDataEditor: function () {
                    var vm = this;
                    vm.SelectedTable = {};
                    vm.SelectedTableName = '';
                    vm.mode = '';
                },
                toastMessage: function (e) {
                    var vm = this;
                    console.log(e);
                    vm.messages.push({
                        message: e
                    });
                    vm.mode = '';
                    vm.SelectedTable = {};
                    vm.SelectedTableName = '';
                    var ms = `<span class="text-success">${e}</span>`;
                    $(vm.$refs.toastBody).html(ms);
                    $(".toast").toast('show');
                },
                designTable: function (tb) {
                    var vm = this;
                    vm.SelectedTable = tb;
                    vm.SelectedTableName = tb.table_name;
                    vm.mode = 'designtable';

                },
                cancelTableDesign: function (e) {
                    var vm = this;
                    vm.mode = '';
                    vm.SelectedTable = {};
                    vm.SelectedTableName = '';
                    var ms = `<span class="text-danger">${e}</span>`;
                    $(vm.$refs.toastBody).html(ms);
                    $(".toast").toast('show');
                },
                viewData: function (tb) {
                    var vm = this;
                    vm.SelectedTableName = tb.table_name;
                    vm.SelectedTableColumns = _.filter(vm.AllColumns, function (cl) {
                        return cl.tableId == tb.id;
                    });
                    vm.mode = 'viewdata';
                },
                selectedDatabaseChanged: function () {
                    var vm = this;
                    if (vm.SelectedDatabase) {
                        window.stopServer({
                            filename: vm.SelectedDatabase.filename
                        });
                    }
                    if (vm.SelectedDatabaseID != -1 && vm.SelectedDatabaseID != 0) {
                        var db = _.findWhere(vm.AllDatabases, {
                            id: vm.SelectedDatabaseID
                        });
                        var tbs = _.filter(vm.AllTables, function (tb) {
                            return tb.databaseId == vm.SelectedDatabaseID;
                        });
                        db.tables = _.sortBy(tbs, 'table_name');
                        vm.SelectedDatabase = db;
                        window.startServer({
                            filename: vm.SelectedDatabase.filename,
                            port: 9001
                        });

                    } else {
                        vm.SelectedDatabase = false;
                        if (vm.SelectedDatabaseID == 0) {
                            vm.NewDatabase = {
                                dbname: '',
                                filename: ''
                            };
                            vm.mode = 'newdb';
                        }
                    }
                },
                refresh: function (next) {
                    var vm = this;
                    var p = {
                        TableName: 'db',
                        Params: {}
                    }
                    DataManagementService.ReadData(p).then(function (res) {
                        vm.AllDatabases = res.databases;
                        vm.AllTables = res.tables;
                        vm.AllColumns = res.columns;
                        if (next) {
                            next();
                        }
                    }).catch(function (err) {
                        console.log(err);
                    });
                }
            },
            mounted: function () {
                setApplicationTitle("Database Designer", "Database Designer");
                window.startServer({
                    filename: 'databases.json',
                    port: 9000
                });
                var vm = this;
                vm.refresh();
            },
            beforeDestroy: function () {
                var vm = this;
                window.stopServer({
                    filename: 'databases.json',
                    port: 9000
                });
                if (vm.SelectedDatabase) {
                    window.stopServer({
                        filename: vm.SelectedDatabase.filename
                    });
                }
            }

        }
    </script>