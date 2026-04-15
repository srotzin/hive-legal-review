'use strict';
const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3023;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/legal'));
app.get('/',(_,r)=>r.json({service:'hive-legal-review',version:'1.0.0',description:'Contract analysis and legal review — risk scoring, clause detection, regulatory mapping',endpoints:{"review":"POST /v1/legal/review","report":"GET /v1/legal/report/:id","stats":"GET /v1/legal/stats","records":"GET /v1/legal/records","health":"GET /health","pulse":"GET /.well-known/hive-pulse.json"}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hive-legal-review] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
