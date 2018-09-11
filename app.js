var express=require("express");
var app=express();
var main=require("./main/main")
var session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))
app.use(express.static("static"))
app.use(express.static("cus"))
app.set("view engine","ejs")
//显示组
app.all("/index",main.showindex)//显示首页
app.all("/",main.showcusindex)//显示客户首页
app.all("/zhuce",main.showzhuce)//显示客户注册
app.all("/roomadmin",main.showroomadmin)//显示房间类型
app.all("/changeorder",main.changeorder)//显示查询订单页
app.all("/lobbycheck",main.showlobbycheck)//显示大堂入住
app.all("/roompic",main.showroompic)//显示房间分布
app.all("/roominfor",main.showroominfor)//显示房间信息
app.all("/ordercheck",main.showordercheck)//线上入住显示
app.all("/record",main.showrecord)//订单入住记录显示
app.all("/checkout",main.showcheckout)//退房显示
app.all("/changemima",main.showchangemima)//退房显示
//功能组
app.all("/order",main.order)//顾客登录检查
// app.all("/checkcustormer",main.checkcustormer)//顾客登录检查
app.all("/addcustorms",main.addcustorms)//添加顾客
app.all("/checkcname",main.checkcname)//判断用户是否存在
app.all("/loginc",main.loginc)//判断用户是否存在

//房间类别
app.all("/addroomtype",main.addroomtype)//增加房间类别
app.all("/getroomtype",main.getroomtype)//获取房间信息
app.all("/updataroom",main.updataroom)//更新房间信息
app.get("/del/:room",main.delroom)//删除房间
//订单
app.all("/addorder",main.addorder)//增加订单
app.all("/getorderuser",main.getorderuser)//修改订单
app.all("/checkctel",main.checkctel)//检查手机号
app.all("/updataorder",main.updataorder)//修改订单数据
app.all("/delorder",main.delorder)//删除订单数据
//房间类别
app.all("/getroompic",main.getroompic)//获取房间信息
app.all("/updataroominfor",main.updataroominfor)//修改房间信息
app.all("/addroominfor",main.addroominfor)//添加房间信息
app.all("/delroominfor/:id",main.delroominfor)//删除房间信息
//订单
app.all("/addlobby",main.addlobby)//添加大堂订单
app.all("/seachorder",main.seachorder)//查询在线订单
app.all("/orderchecks",main.ordercheck)//添加在线订单
// 记录查询
app.all("/findrecord",main.findrecord)//查找全部记录
app.all("/getrecord",main.getrecord)//查找一个记录
app.all("/updateorder",main.updateorder)//退房
//管理员操作
app.all("/adminlogin",main.adminlogin)//检验登录
app.all("/checkmima",main.checkmima)//检验密码是否存在
app.all("/changemimas",main.changemima)//修改密码
app.all("/del",main.del)//退出登录
app.listen(3001)