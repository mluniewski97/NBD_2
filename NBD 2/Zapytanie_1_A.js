printjson(db.people.aggregate([
        {
            $addFields: {
                heightDbl: { $toDouble: "$height"},
                weightDbl: { $toDouble: "$weight"},
            }
        }, 
        {
            $group: {
                _id: "$sex",
                avgHeight: { $avg: "$heightDbl" },
                avgWeight: { $avg: "$weightDbl" }
            }
        }
    ]).toArray())