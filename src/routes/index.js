const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({status: "FarkPlookTree REST API is Ready!"});

});
router.get('/donatehistory', async (req, res, next) => {
   try{
       let results = await db.donatelist();
       res.json(results);
   }catch(e){
       console.log(e);
       res.sendStatus(500);
   }

});

router.get('/topdonatehistory', async (req, res, next) => {
    try{
        let results = await db.donatelistfromtop();
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
 
 });

router.get('/donatehistory/:id', async (req, res, next) => {
    try{
        let results = await db.mydonatedhistory(req.params.id);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
 
 });

 router.get('/myjoinedcampaign/:id', async (req, res, next) => {
    try{
        let results = await db.myjoinedcampaign(req.params.id);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
 
 });

 router.post('/donate', async (req, res, next) => {
    try{
        const {uid, tree_amount, message, displayname, donate_amount, card_no,refno} = req.body;
        console.log(req.body);
        let results = await db.donate(uid, tree_amount, message, displayname, donate_amount, card_no,refno).then(()=>{
            
            res.sendStatus(200);
        }).catch((err)=>{
            console.log(err);
            res.sendStatus(400);
        });
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
 
 });

 router.post('/joincampaign', async (req, res, next) => {
    try{
        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
              result += characters.charAt(Math.floor(Math.random() * 
         charactersLength));
           }
           return result;
        }
        var genCode=makeid(6);
        const {uid, name, surname, contact_email, phone, campaign_no} = req.body;
        console.log(req.body);
        let results = await db.joinCampaign(uid, name, surname, contact_email, phone, campaign_no,genCode).then(()=>{
            
            res.status(200);
            res.send({
                "join_code":genCode
            });
        }).catch((err)=>{
            console.log(err);
            res.sendStatus(400);
        });
        
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
 
 });


 router.post('/addpaymentcard', async (req, res, next) => {
    try{
        const {card_no, expire_month, expire_year, cardholder, cvv, uid} = req.body;
        console.log(req.body);
        let results = await db.addpaymentcard(card_no, expire_month, expire_year, cardholder, cvv, uid).then(()=>{
            
            res.sendStatus(200);
        }).catch((err)=>{
            console.log(err);
            res.sendStatus(400);
        });
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
 
 });
 
 router.get('/availableCampaign/:id', async (req, res, next) => {
    try{
        let results = await db.availableCampaignlist(req.params.id);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
 
 });

 router.get('/mypaymentcard/:id', async (req, res, next) => {
    try{
        let results = await db.mypaymentcard(req.params.id);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
 
 });

 router.get('/homeData/:id', async (req, res, next) => {
    try{
        let results = await db.homeData(req.params.id);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
 
 });

module.exports=router;
