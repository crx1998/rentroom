var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jiudian');
var Schema = mongoose.Schema;
var crypto = require("crypto");
var dbsc = new Schema({
    adminname:String,
    mima:String
});
var dbs = mongoose.model('admin', dbsc)
exports.adminlogin=function(data,callback){
    var sha256 = crypto.createHash("sha256");
    var str = sha256.update(data.mima).digest("hex");
    data.mima=str
    dbs.findOne({"admin":data.admin,"mima":data.mima},function(err,result){
        if(err){
            callback(-2)
        }else if(result!=null){
            callback(1)
        }else{
            callback(-1)
        }
    })
}
exports.checkmimas=function(data,callback){
    var sha256 = crypto.createHash("sha256");
    var str = sha256.update(data).digest("hex");
    dbs.find({"mima":str},function(err,data){
        if(err){
            callback(-2)
        }else if(data!=""){
            callback(1)
        }else{
            callback(-1)
        }
    })
}
exports.changemimas=function(data,callback){
    var sha256 = crypto.createHash("sha256");
    var sha2561 = crypto.createHash("sha256");
    var ymima = sha256.update(data.ymima).digest("hex");
    var mima = sha2561.update(data.mima).digest("hex");
    dbs.update({"mima":ymima},{$set:{"mima":mima}},function(err){
        if(err){
            console.log("err")
        }else{
            callback(1)
        }
    })
}