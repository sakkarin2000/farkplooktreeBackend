const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit:10,
    password:'Fpt123456789',
    user:'fpt',
    database:'FarkPlookTree_schema',
    host: 'localhost',
    port:'3306'
});

let fptdb={};

fptdb.donatelist= ()=>{
    return new Promise((resolve,reject)=>{
        pool.query('select displayname, tree_amount, donate_datetime, message, transaction_no from donate_history order by transaction_no desc limit 20', (err,results)=> {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

fptdb.donatelistfromtop= ()=>{
    return new Promise((resolve,reject)=>{
        pool.query('select displayname, tree_amount, donate_datetime, message, transaction_no from donate_history order by tree_amount desc limit 20', (err,results)=> {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};
//select * from registered_campaign_history where uid = ? and isjoined = 1;
fptdb.mydonatedhistory= (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query(`select displayname, tree_amount, message,donate_amount,donate_datetime,transaction_no,card_no
        from donate_history
        where uid=? order by transaction_no desc`,[id], (err,results)=> {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};


fptdb.myjoinedcampaign= (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query(`select campaign.type, campaign.name, campaign.from_datetime,campaign.to_datetime,campaign.location,campaign.thumbnail,campaign.description,register_datetime,join_code,campaign.campaign_no,isjoined from registered_campaign_history,campaign where uid = ? and campaign.campaign_no = registered_campaign_history.campaign_no`,[id], (err,results)=> {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};


fptdb.donate= (uid, tree_amount, message, displayname, donate_amount, card_no,refno)=>{
    return new Promise((resolve,reject)=>{
        pool.query("insert into donate_history(uid, tree_amount, message, displayname, donate_amount, donate_datetime, card_no,refno) values (?,?,?,?,?,CURRENT_TIMESTAMP,?,?)",[uid, tree_amount, message, displayname, donate_amount, card_no,refno], (err,results)=> {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

fptdb.availableCampaignlist= (uid)=>{
    return new Promise((resolve,reject)=>{
        pool.query('select *,(select count(uid) as counter from registered_campaign_history as r where c.campaign_no=r.campaign_no) as attendee,((select ? as uid, c.campaign_no as campaign_no) in (select uid , campaign_no from registered_campaign_history)) as isRegistered  from campaign as c where isenable = 1 and (select count(uid) as counter from registered_campaign_history as r where c.campaign_no=r.campaign_no)  < c.limitation order by campaign_no desc',[uid], (err,results)=> {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

fptdb.joinCampaign= (uid, name, surname, contact_email, phone, campaign_no,genCode)=>{
    
    
    return new Promise((resolve,reject)=>{
        pool.query("insert into registered_campaign_history values (?, ?, ?, ?, ?, ?, ? , CURRENT_TIMESTAMP, 0) ",[uid, genCode, name, surname, contact_email, phone, campaign_no], (err,results)=> {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};


fptdb.addpaymentcard= (card_no, expire_month, expire_year, cardholder, cvv, uid)=>{
    return new Promise((resolve,reject)=>{
        pool.query("insert into user_creditcard values (?,?,?,?,?,?) ",[card_no, expire_month, expire_year, cardholder, cvv, uid], (err,results)=> {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

    
fptdb.mypaymentcard= (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query(`select * from user_creditcard where uid = ?`,[id], (err,results)=> {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

fptdb.homeData= (id)=>{
    return new Promise((resolve,reject)=>{
        pool.query('select (select count(d.displayname) from (select distinct displayname from donate_history) as d) as countdonator ,(select count(campaign_no) from campaign) as countcampaign,(select sum(tree_amount) from donate_history where uid = ?) as myplantedtree, sum(tree_amount) as sumtreeamount from donate_history',[id], (err,results)=> {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports= fptdb;