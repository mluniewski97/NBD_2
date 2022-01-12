printjson(db.people.mapReduce(
    function() { 
        if (this.sex === "Female" && 
        	this.nationality === "Poland" ) 
        {
            this.credit.forEach(x => emit(x.currency, {"sum": parseFloat(x.balance), "count": 1} ) ) 
        }
    },

    function(key, value) {
        return { 
        	"sum": Array.sum(value.map(y => y["sum"])),
        	"count": value.length 
        }
    },
    { 
        out: { inline: 1 },
        finalize: function(key, values) {
            return {
            	"total" : (values.sum),
            	"average": (values.sum / values.count) 
            }
        },
    }
).results)