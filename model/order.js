var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jiudian');
var Schema = mongoose.Schema;
var crypto = require("crypto");
var dbsc = new Schema({
    starttime: String,
    endtime: String,
    roomnumber: String,
    roomnum:Number,
    checkinname: String,
    contactsname: String,
    contactstel: Number,
    ordercontent: String,
    cardtype:String,
    cardnum:Number,
    sex:String
});
var dbs = mongoose.model('order', dbsc)
exports.addorders=function(data,callback){
    dbs.create(data,function(err){
        if(err){
            console.log("err")
        }else{
            callback(1)
        }
    })
}
exports.getorderusers=function(tel,callback){
    dbs.find({"contactstel":tel},function(err,data){
        if(err){
            console.log("err")
        }else{
            callback(data)
        }
    })
}
exports.checkctels=function(data,callback){
    dbs.findOne({"contactstel":data},function(err,data){
        if(err){
            callback(-2)
        }else if(data!=null){
            callback(1)
        }else{
            callback(-1)
        }
    })
}
exports.updataorder=function(data,callback){
    dbs.update({"contactstel":data.contactstel},{$set:data},function(err){
        if(err){
            console.log("err")
        }else{
            callback(1)
        }
    })
}
exports.delorder=function(data,callback){
    dbs.findOne({"contactstel" : data.contactstel,"roomnumber" : data.roomnumber},function(err,data){
        if(err){
            console.log("err");
        }else{
            dbs.remove({"_id":data._id},function(err){
                if(err){
                    console.log(err);
                }else{
                    callback(err);
                }
            });
        }
    })

}

exports.seachorder=function(data,callback){
    if(Number.isInteger(Number(data))){
        dbs.find({"contactstel":data},function(err,data){
            if(err){
                console.log('err')
            }else{
                callback(data)
            }
        })
    }else{
        dbs.find({"contactsname":data},function(err,data){
            if(err){
                console.log('err')
            }else{
                callback(data)
            }
        })
    }
}