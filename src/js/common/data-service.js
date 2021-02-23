const dbmBaseUrl = 'http://localhost:9000/'
const baseUrl = 'http://localhost:9001/';
function getID(obj){
    var qs = ''
    if(obj.Params.id) {
        qs='/' + obj.Params.id;
    }
    return qs;
}
function getParams(obj) {
    var qs = '';
    if (obj.Params.length != 0 ){
        _.each(obj.Params, function(vl,key){
            var kkey = key;
            if(key.indexOf('_embed')!=-1) {
                kkey = '_embed'
            }
            if (qs=='') {
                qs = '?' + kkey + '=' + vl;
            } else {
                qs = qs + '&' + kkey + '=' + vl;
            }
        });
    } 
    
    return qs;

}

const DataService = {
    ReadData:function(obj){
        var url = baseUrl + obj.TableName + getParams(obj);
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "GET",
                url: url,
                contentType: "text/plain",
                dataType: "json",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        }); 
    },
    SaveData:function(obj){
        var qs = getID(obj);
        var url = baseUrl + obj.TableName + qs;
        console.log(url);
        var tp = 'PATCH'
        if (qs==''){
            var tp = 'POST'
        } else {
            delete obj.Params.id
        }  
        console.log(obj.Params);      
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: tp,
                url: url,
                contentType: "application/json",
                dataType: "json",
                data:JSON.stringify(obj.Params),
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }
} 
const DataManagementService = {
    ReadData:function(obj){
        var url = dbmBaseUrl + obj.TableName + getParams(obj);
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "GET",
                url: url,
                contentType: "text/plain",
                dataType: "json",
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        }); 
    },
    SaveData:function(obj){
        var qs = getID(obj);
        var url = dbmBaseUrl + obj.TableName + qs;
        console.log(url);
        var tp = 'PATCH'
        if (qs==''){
            var tp = 'POST'
        } else {
            delete obj.Params.id
        }  
        console.log(obj.Params);      
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: tp,
                url: url,
                contentType: "application/json",
                dataType: "json",
                data:JSON.stringify(obj.Params),
                success: function (data) {
                    resolve(data);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }
} 