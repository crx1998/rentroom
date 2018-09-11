var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jiudian');
var Schema = mongoose.Schema;
var crypto = require("crypto");
var dbsc = new Schema({
    name:    Number,
    sex:  String,
});
var dbs = mongoose.model('custormer', dbsc)
exports.addname=function(data,callback){
    dbs.create(data,function(err){
        if(err){
            console.log("err")
        }else{
            callback(1)
        }
    })
}
exports.checkcnames=function(data,callback){
    dbs.find({"name":data},function(err,data){
        if(err){
            callback(-2)
        }else if(data!=""){
            callback(1)
        }else{
            callback(-1)
        }
    })
}