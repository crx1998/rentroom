var url=require("url")
var formidable=require("formidable")
var custormer=require("../model/custormer")
var roomadmin=require("../model/roomadmin")
var order=require("../model/order")
var roompic=require("../model/roopic")
var record=require("../model/record")
var admin=require("../model/admin")
var path=require("path")

exports.showindex=function(req,res){
    if(req.session.loginadmin == 1){
           res.render("index")
    }else{
        res.render("adminlogin")
    }
}
exports.showcusindex=function(req,res){
    res.sendFile(path.join(__dirname , "../cus/indexcus.html"))
}
exports.showzhuce=function(req,res){
    res.render("zhuces")
}
exports.showroomadmin=function(req,res){
    roomadmin.getroom(function(data){
        roompic.getnum(data,function(data){
            var datas=data
            roompic.getlastnum(data,function(data){
                var lasetnum="lasetnum"
                datas[lasetnum]=data
                roomadmin.changeroomnum(datas,function(data){
                })
            })
        })
    })
    if(req.session.loginadmin == 1){
        res.render("roomadmin")
    }else{
        res.send("<a href=/index>请登录</a>")
    }
}
exports.changeorder=function(req,res){

    res.render("changeorder")
}
exports.showlobbycheck=function(req,res){
    if(req.session.loginadmin == 1){
        res.render("lobbycheck")
    }else{
        res.send("<a href=/index>请登录</a>")
    }
}
exports.showroompic=function(req,res){
    if(req.session.loginadmin == 1){
        res.render("roompic")
    }else{
        res.send("<a href=/index>请登录</a>")
    }
}
exports.showroominfor=function(req,res){

    if(req.session.loginadmin == 1){
        res.render("roominfor")
    }else{
        res.send("<a href=/index>请登录</a>")
    }
}
exports.showordercheck=function(req,res){
    if(req.session.loginadmin == 1){
        res.render("showordercheck")
    }else{
        res.send("<a href=/index>请登录</a>")
    }
}
exports.showrecord=function(req,res){
    if(req.session.loginadmin == 1){
        res.render("record")
    }else{
        res.send("<a href=/index>请登录</a>")
    }

}
exports.showcheckout=function(req,res){
    if(req.session.loginadmin == 1){
        res.render("checkout")
    }else{
        res.send("<a href=/index>请登录</a>")
    }
}
exports.showchangemima=function(req,res){
    if(req.session.loginadmin == 1){
        res.render("changemima")
    }else{
        res.send("<a href=/index>请登录</a>")
    }

}
exports.order=function(req,res){
    if(req.session.login == 1){
        res.render("order")
    }else{
        res.render("login")
    }
}
exports.addcustorms=function(req,res){
    var obj=url.parse(req.url,true).query
    custormer.addname(obj,function(data){
        req.session.login=data
    })
}
exports.checkcname=function(req,res){
    var obj=url.parse(req.url,true).query.name
    custormer.checkcnames(obj,function(data){
        res.json(data)
    })
}
exports.checkctel=function(req,res){
    var obj=url.parse(req.url,true).query.name
    order.checkctels(obj,function(data){
        res.json(data)
    })
}
exports.loginc=function(req,res){
    req.session.login=1
    res.json(1)
}
exports.addroomtype=function(req,res){
    var obj=url.parse(req.url,true).query
    roomadmin.addroom(obj,function(data){
        res.redirect("/roomadmin")
    })
}
exports.getroomtype=function(req,res){
    roomadmin.getroom(function(data){
        res.jsonp({"data":data})
    })
}
exports.updataroom=function(req,res){
    var obj=url.parse(req.url,true).query
    roomadmin.updataroom(obj,function(data){
        res.json(data)
    })
}
exports.delroom=function (req, res) {
    var obj = req.params.room
    var arr = obj.split(",")
    for (var i = 0; i < arr.length; i++) {
        roomadmin.delrooms(arr[i],function (err, data) {
            if (err) {
                res.send("出错")
            }else{
            }
        })
    }
    res.json({"result":1})
}
exports.addorder=function(req,res){
    var obj=url.parse(req.url,true).query
    order.addorders(obj,function(data){
        roomadmin.changenum(obj,function(){
            res.redirect("/order")
        })
    })
}
exports.getorderuser=function(req,res){
    var tel=url.parse(req.url,true).query.data
    order.getorderusers(tel,function(data){
        res.json(data)
    })
}
exports.updataorder=function(req,res){
    var obj=url.parse(req.url,true).query
    order.updataorder(obj,function(){
        res.redirect("/changeorder")
    })
}
exports.delorder=function(req,res){
    var obj=url.parse(req.url,true).query
    order.delorder(obj,function(){
            res.redirect("/changeorder")
    })
}
exports.getroompic=function(req,res){
    roompic.getroompics(function(data){
          res.json(data)
    })
}
exports.updataroominfor=function(req,res){
    var obj=url.parse(req.url,true).query
    roompic.updataroominfors(obj,function(data){
        res.json(data)
    })
}
exports.addroominfor=function(req,res){
    var obj=url.parse(req.url,true).query
    roompic.addroominfors(obj,function(data){
        res.redirect("/roominfor")
    })
}
exports.delroominfor=function (req, res) {
    var obj = req.params.id
    var arr = obj.split(",")
    for (var i = 0; i < arr.length; i++) {
        roompic.delroominfors(arr[i],function (err, data) {
            if (err) {
                res.send("出错")
            }else{

            }
        })
    }
    res.json({"result":1})
}
exports.addlobby=function(req,res){
    var obj=url.parse(req.url,true).query
    record.addlobbys(obj,function(data){
        roompic.changestate(obj,function(){
            res.redirect("/index")
        })
  })
}
exports.seachorder=function(req,res){
    var obj=url.parse(req.url,true).query.data
    order.seachorder(obj,function(data){
        res.json(data)
    })
}
exports.ordercheck=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var json=JSON.parse(fields.data)
        record.ordercheck(json,function(data){
            roompic.changestatesd(json,function() {
                res.json(1)
            })
        })
    })
}
exports.findrecord=function(req,res){
    record.findrecords(function(data){
        res.json(data)
    })
}
exports.getrecord=function(req,res){
    var obj=url.parse(req.url,true).query.data
    record.getrecord(obj,function(data){
        res.json(data)
    })
}
exports.updateorder=function(req,res){
    var obj=url.parse(req.url,true).query
    var roomhao=obj.roomhao
    record.updateorders(obj,function(data){
        roompic.changestates(roomhao,function(data){
            res.json(data)
        })
    })
}
exports.adminlogin=function(req,res){
    var obj=url.parse(req.url,true).query
    admin.adminlogin(obj,function(data){
        if(data==1){
            req.session.loginadmin=1
        }
        res.json(data)

    })
}
exports.checkmima=function(req,res){
    var obj=url.parse(req.url,true).query.data
    admin.checkmimas(obj,function(data){

        res.json(data)
    })
}
exports.changemima=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        admin.changemimas(fields,function(data){
            res.redirect("/index")
        })
    })

}
exports.del=function(req,res){
    delete req.session.loginadmin
    res.redirect("/")
}