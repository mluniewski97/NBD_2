db.people.mapReduce(
    mapFunction = function () {
        var key = this.nationality
        var value = {count: 1, height: this.height, weight: this.weight}
        emit(key, value)
    },
    reduceFunction = function (key, values) {
        reducedValue = {count: 0, height: 0, weight: 0};
        for (var i = 0; i < values.length; i++) {
            reducedValue.count += values[i].count;
            reducedValue.height += values[i].height;
            reducedValue.weight += values[i].weight;
        }
        return reducedValue;
    },
    {
        out: "result", finalize: finalizeFunction = function (key, reducedValue) {
            finalizeValue = {reducedValueBMI: 0}
            finalizeValue.reducedValueBMI = 
reducedValue.weight/{ $pow: [reducedValue.height*100]} /reducedValue.count
            return finalizeValue
        }
    })
printjson(db.result.find().toArray());