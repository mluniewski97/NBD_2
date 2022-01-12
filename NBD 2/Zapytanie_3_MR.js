printjson(db.people.mapReduce(
    function() { 
    	emit(this.job, null) 
    },
    function(key, value) { 
    	return key 
    },
    { out: { inline: 1 } }
).results)