var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jiudian');
var Schema = mongoose.Schema;
var crypto = require("crypto");
var dbsc = new Schema({
    starttime: String,
    endtime: String,
    roomnumber: String,
    roomhao:Number,
    roomnum:Number,
    checkinname: String,
    contactsname: String,
    contactstel: Number,
    ordercontent: String,
    cardtype:String,
    cardnum:Number,
    sex:String,
    ordermoney:Number
});
var dbs = mongoose.model('record', dbsc)
exports.addlobbys=function(data,callback){
    dbs.create(data,function(err){
        if(err){
            console.log("err")
        }else{
            callback(1)
        }
    })
}
exports.findrecords=function(callback){
    dbs.find({},function(err,data){
        if(err){
            console.log("err")
        }else{
            callback(data)
        }
    })
}
exports.getrecord=function(data,callback){
    dbs.findOne({"roomhao":data,"ordermoney":''},function(err,data){
        if(err){
            console.log("err")
        }else{
            callback(data)
        }
    })

}
exports.updateorders=function(data,callback){
    dbs.update({"roomhao":data.roomhao,"ordermoney":""},{$set:{"endtime":data.endtime,"ordermoney":data.ordermoney}},function(err){
        if(err){
            console.log("err")
        }else{
            callback(1)
        }
    })
}
exports.ordercheck=function(data,callback){
    for(var i=0;i<data.length;i++){
        dbs.create(data[i],function(err){
            if(err){
                console.log("err")
            }else{

            }
        })
    }
    callback(1)

}