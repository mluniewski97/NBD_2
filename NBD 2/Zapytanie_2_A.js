printjson(db.people.aggregate([
    { $unwind: "$credit" },
    {$group: {
            _id: "$credit.currency",
            currencysum: { $sum:  { $toDecimal: "$credit.balance" } }}
    }
])
.toArray())