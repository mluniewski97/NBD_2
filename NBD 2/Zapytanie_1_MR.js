printjson(db.people.mapReduce(
    function () { 
        emit(this.sex, 
            { "weight": parseFloat(this.weight), 
            "height": parseFloat(this.height), 
            "count": 1 }) },
    function (key, value) {
        return {
            "height": Array.sum(value.map(e => e["height"])),
            "weight": Array.sum(value.map(e => e["weight"])),
            "count": Array.sum(value.map(e => e["count"]))
        }
    },
    {
        finalize: function (key, values) {
            return {  "averageWeight": (values.weight / values.count) , "averageHeight": (values.height / values.count) }
        },
        out: { inline: 1 }
    }
).results)