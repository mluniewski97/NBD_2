printjson(db.people.aggregate([
	{
		$addFields: {
            weight: {$convert: { input: "$weight", to: "decimal", onError: Error }},
            height: {$convert: { input: "$height", to: "decimal", onError: Error }} 
        }
        },
{$group: {
	_id: "$nationality", 
	"maxBMI": {"$max" : { $divide:["$weight",{ $pow: [ { $divide: [ "$height", 100 ] }, 2 ] }]}},
    "minBMI": {"$min" : { $divide:["$weight",{ $pow: [ { $divide: [ "$height", 100 ] }, 2 ] }]}},
	"avgBMI": {"$avg" : { $divide:["$weight",{ $pow: [ { $divide: [ "$height", 100 ] }, 2 ] }]}},
}}
]).toArray())