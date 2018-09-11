var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jiudian');
var Schema = mongoose.Schema;
var crypto = require("crypto");
var dbsc = new Schema({
    roomposition:String,
    roomtype:String,
    roomnum:Number,
    roomstate:String,
    roomcontent:String
});
var dbs = mongoose.model('roompic', dbsc)
exports.getroompics=function(callback){
    dbs.find({},function(err,data){
        if(err){
            console.log("err")
        }else{
            callback(data)
        }
    })
}
exports.updataroominfors=function(data,callback){
    dbs.update({"_id":data._id},{$set:data},function(err){
        if(err){
            console.log("err")
        }else{
            callback(1)
        }
    })
}
exports.addroominfors=exports.addroom=function(data,callback){
    dbs.create(data,function(err){
        if(err){
            console.log("err")
        }else{
            callback(1)
        }
    })
}
exports.delroominfors = function (v, callback) {
    dbs.remove({"_id": v },function (err, data) {
        callback(err,data)
    })
}
exports.changestate=function(data,callback){
    dbs.update({"roomnum":data.roomhao},{$set:{"roomstate":1}},function(err){
        if(err){
            console.log("err")
        }else{
            callback(1)
        }
    })
}
exports.changestatesd=function(data,callback){
    for(var i=0;i<data.length;i++){
        dbs.update({"roomnum":data[i].roomhao},{$set:{"roomstate":1}},function(err){
            if(err){
                console.log("err")
            }else{
            }
        })
    }
    callback(1)
}
exports.getnum=function(data,callback){
    for(var i=0;i<data.length;i++){
        var name=data[i]
        dbs.find({"roomtype":name.roomtypename},function(err,data){
            if(err){
                console.log("err")
            }else if(data==''){
                callback(1)
            }
            else{
                var type=data[0].roomtype
                var num=data.length
                var data={type, num}
                callback(data)
            }
        })
    }
}
exports.getlastnum=function(data,callback){
        dbs.find({"roomtype":data.type,"roomstate":0},function(err,data){
            if(err){
                console.log("err")
            }else{
                callback(data.length)
            }
    })
}
exports.changestates=function(data,callback){
    dbs.update({"roomnum":data},{$set:{"roomstate":0}},function(err){
        if(err){
            console.log("err")
        }else{
            callback(1)
        }
    })
}
