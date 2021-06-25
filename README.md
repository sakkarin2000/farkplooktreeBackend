# farkplooktreeBackend

DATABASE MySql SCHEMA 

create table campaign
(
    campaign_no   int auto_increment
        primary key,
    name          varchar(150)         not null,
    description   varchar(1000)        not null,
    limitation    int                  not null,
    from_datetime datetime             not null,
    to_datetime   datetime             not null,
    location      varchar(200)         not null,
    isenable      tinyint(1) default 1 not null,
    thumbnail     varchar(1000)        not null,
    type          varchar(50)          null
);

create table donate_history
(
    uid             varchar(36)                        not null,
    tree_amount     int                                not null,
    message         varchar(150)                       not null,
    displayname     varchar(50)                        null,
    donate_amount   double                             not null,
    donate_datetime datetime default CURRENT_TIMESTAMP null,
    card_no         varchar(16)                        not null,
    transaction_no  int auto_increment
        primary key,
    refno           varchar(11)                        not null
);

create index cardno_fk
    on donate_history (card_no, refno);

create table registered_campaign_history
(
    uid               varchar(36)  not null,
    join_code         varchar(6)   not null,
    name              varchar(100) not null,
    surname           varchar(100) not null,
    contact_email     varchar(100) not null,
    phone             varchar(10)  null,
    campaign_no       int          not null,
    register_datetime timestamp    null,
    isjoined          tinyint(1)   not null,
    primary key (uid, campaign_no),
    constraint registered_campagin_campaign_campaign_no_fk
        foreign key (campaign_no) references campaign (campaign_no)
);

create table statistic
(
    planted               int null,
    planted_from_campaign int not null
        primary key,
    constraint statistic_campaign___fk
        foreign key (planted_from_campaign) references campaign (campaign_no)
);

create table user_creditcard
(
    card_no      varchar(16)  not null,
    expire_month int          not null,
    expire_year  int          not null,
    cardholder   varchar(100) null,
    cvv          varchar(3)   not null,
    uid          varchar(36)  not null,
    primary key (card_no, uid)
);

