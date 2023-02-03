const express=require("express");
const cors=require("cors");
const morgan= require("morgan");
const path=require("path");
let propertiesReader=require("properties-reader");
let propertiesPath=path.resolve(__dirname,"conf/db.properties");
let properties= propertiesReader(propertiesPath);
let dbPprefix=properties.get("db.prefix");
let dbUsername=encodeURIComponent(properties.get("db.user"));
let dbPwd=encodeURIComponent(properties.get("db.pwd"));
let dbName=properties.get("db.dbName");
let dbUrl=properties.get("db.dbUrl");
let dbParams=properties.get("db.params");
const uri=dbPprefix+dbUsername+":"+dbPwd+dbUrl+dbParams;

const {MongoClient, ServerApiVersion,ObjectId}=require("mongodb");
const client=new MongoClient(uri, {serverApi:ServerApiVersion.v1});
let db=client.db(dbName);

const app=express();
app.set('json spaces',3);
app.use(cors());
app.use(morgan("short"));

app.use(express.json());

let staticPath=path.join(__dirname,"images");
app.use(express.static(staticPath));



app.param('collection',function (req,res,next,collection){
    req.collection=db.collection(collection);
    return next();
});

app.get('/:collection',function (req,res,next){
    req.collection.find({}).toArray(function(err,results){
        if(err){
            return next(err);
        }
        if(results.length==0){
            next();
        }
        else{
        res.send(results);
        }
    });
});

app.put('/:collection/:id',function (req,res,next){
    req.collection.updateOne({id:req.params.id},
        {$set:req.body},
        {safe:true,multi:false},function(err,result){

            if(err){
                return next(err);
            }
            res.send(result);
        });
});


app.post('/:collection',function (req,res,next){
    req.collection.insertOne(req.body,(function(err,results){
        if(err){
            return next(err);
        }
        res.send("Update has been completed");
    }));
});




app.get('/:collection/search',function (req,res,next){
    let searchword=req.query.q;
    req.collection.find({subject:
            {$regex:new RegExp(searchword)}}).toArray(function(err,results){
        if(err){
            return next(err);
        }
            res.send(results);
            });

});


app.use(function(req,res){
    res.status(404).send("No data found ");
});

const port=process.env.PORT || 3000;
app.listen(port,function(){
    console.log("App started on port: "+port);
})