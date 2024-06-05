// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

const users = [
    {
        name: '佐藤豪',
        email: 'sato.go@ohsuga.lab.uec.ac.jp',
        password: 'satogo',
        voted: false,
        sum_voted: 0,
    },
    {
        name: '岡野日翔',
        email: 'okano.haruka@ohsuga.lab.uec.ac.jp',
        password: 'okanoharuka',
        voted: false,
        sum_voted: 0,
    },
    {
        name: '美濃岡知樹',
        email: 'minoka.tomoki@ohsuga.lab.uec.ac.jp',
        password: 'minokatomoki',
        voted: false,
        sum_voted: 0,
    },
    {
        name: '木村晃和',
        email: 'kimura.akikazu@ohsuga.lab.uec.ac.jp',
        password: 'kimuraakikazu',
        voted: false,
        sum_voted: 0,
    },
];

const drink = [
    {
        id: 'd0',
        name: 'cider',
        voted: 0,
        price: 150,
        path: '/drink/cider.png',
        totalvoted: 0,
    },
    {
        id: 'd1',
        name: 'cocacola',
        voted: 0,
        price: 150,
        path: '/drink/cocacola.png',
        totalvoted: 0,
    },
    {
        id: 'd2',
        name: 'calpis',
        voted: 0,
        price: 150,
        path: '/drink/calpis.png',
        totalvoted: 0,
    },
    {
        id: 'd3',
        name: 'grape_calpis',
        voted: 0,
        price: 150,
        path: '/drink/grape_calpis.png',
        totalvoted: 0,
    },
    {
        id: 'd4',
        name: 'fanta_orange',
        voted: 0,
        price: 150,
        path: '/drink/fanta_orange.png',
        totalvoted: 0,
    },
    {
        id: 'd5',
        name: 'calpis_soda',
        voted: 0,
        price: 150,
        path: '/drink/calpis_soda.png',
        totalvoted: 0,
    },
    {
        id: 'd6',
        name: 'cclemon',
        voted: 0,
        price: 150,
        path: '/drink/cclemon.png',
        totalvoted: 0,
    },
    {
        id: 'd7',
        name: 'mets_cola',
        voted: 0,
        price: 150,
        path: '/drink/mets_cola.png',
        totalvoted: 0,
    },
    {
        id: 'd8',
        name: 'orangina',
        voted: 0,
        price: 150,
        path: '/drink/orangina.png',
        totalvoted: 0,
    },
    {
        id: 'd9',
        name: 'iemon',
        voted: 0,
        price: 150,
        path: '/drink/iemon.png',
        totalvoted: 0,
    },
    {
        id: 'd10',
        name: 'kirin_lemon',
        voted: 0,
        price: 150,
        path: '/drink/kirin_lemon.png',
        totalvoted: 0,
    },
    {
        id: 'd11',
        name: 'pepsi_zero',
        voted: 0,
        price: 150,
        path: '/drink/pepsi_zero.png',
        totalvoted: 0,
    },
    {
        id: 'd12',
        name: 'soukenbicha',
        voted: 0,
        price: 150,
        path: '/drink/soukenbicha.png',
        totalvoted: 0,
    },
];

const vote = [];

module.exports = {
    users,
    drink,
    vote,
};
