var rFunc = function (key, values) {
    return Array.sum(values.filter(n => !isNaN(n)))
}
var mapFunc = function () {
    for (i = 0; i < this.credit.length; i++) {
        emit(this.credit[i].currency, parseFloat(this.credit[i].balance));
    }
}
db.people.mapReduce(mapFunc, rFunc, { out: 'zad' })
printjson(db.zad.find().toArray());