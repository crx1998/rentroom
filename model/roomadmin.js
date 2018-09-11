var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jiudian');
var Schema = mongoose.Schema;
var crypto = require("crypto");
var dbsc = new Schema({
    roomtypenum: Number,
    roomtypename: String,
    roomtypearea: Number,
    bednum: Number,
    breakfast: String,
    wifi: String,
    television: String,
    money: Number,
    roomnum: Number,
    lastnum: Number,
});
var dbs = mongoose.model('roomadmin', dbsc)
exports.addroom=function(data,callback){
    var lastnum="lastnum"
    data[lastnum]=data.roomnum
    dbs.create(data,function(err){
        if(err){
            console.log("err1")
        }else{
            callback(1)
        }
    })
}
exports.getroom=function(callback){
    dbs.find({},function(err,data){
        if(err){
            console.log("err2")
        }else{
            callback(data)
        }
    })
}
exports.updataroom=function(data,callback){
    dbs.update({"roomtypenum":data.roomtypenum},{$set:data},function(err){
        if(err){
            console.log("err3")
        }else{
            callback(1)
        }
    })
}
exports.delrooms = function (v, callback) {
    dbs.remove({"_id": v },function (err, data) {
        callback(err,data)
    })
}
exports.changenum=function(data,callback){
    var datas=data
    dbs.findOne({"roomtypename4":datas.roomnumber},function(err,data){
         if(err){
             console.log(err)
         }else{
             dbs.update({"roomtypename":datas.roomnumber},{$set:data},function(err){
                 callback(1)
             })
         }
     })
}
exports.changeroomnum=function(data,callback){
    dbs.update({"roomtypename":data.type},{$set:{"roomnum":data.num,"lastnum":data.lasetnum}},function(err){
        if(err){
            console.log("err5")
        }else{
            callback(1)
        }
    })
}
