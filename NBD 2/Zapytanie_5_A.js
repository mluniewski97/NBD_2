printjson(db.people.aggregate([
    { $match: { "nationality" : "Poland", "sex" : "Female"}},
    { $unwind : "$credit"},
    { $project : { nationality : 1 , sex : 1, credit : 1, money : {"$toDouble" : "$credit.balance"}}},
    { $group:{
            "_id" : "$credit.currency",
            Suma : {$sum: "$money"},
            Srednia : {$avg: "$money"},
        }}
]).toArray())