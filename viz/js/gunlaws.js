"use strict";

(function(){
    // CHANGE THIS LINE TO CHANGE STATE
    // SPACES IN NAME ARE OK!
    // Title Case Is A Must
    var STATE_NAME = "Connecticut";

    function go_with_data(data){

	var container = d3.select("#container");

	var viz = container.append("viz");

	var laws = viz.selectAll(".law")
	    .data(data)
	    .enter()
	    .append("div")
	    .classed("item", true)
	    .classed("law", true);

	var years = d3.range(1991,2018);

	let title_field = "Brief Description of Provision";
	let explainer_field = "Detailed Description of Provision";

	var year_state_got_it = function(row){

	    var year_got_it = ""
	    var got_it = false;
	    var still_has_it = false

	    for (var i in years){
		var year = String(years[i]);
		var status = row[year];
		if ( got_it == false && status == 1) { year_got_it = year; got_it = true; }
		if ( status != 1 ) { still_has_it = false; }
		else { still_has_it = true; }
	    }

	    if (still_has_it) return Number(year_got_it)
	    return 0;
	    
	};

	var data = data.map(function(a){
	    var ret = a;
	    a["year_state_got_it"] = year_state_got_it(a);
	    if (Number(a["year_state_got_it"]) > 1900){
		ret["state_has_it"] = true;
	    }
	    else {
		ret["state_has_it"] = false;
	    }
	});

	// var data = data.sort(function(a,b){
	//     if (a["count2017"] < b["count2017"]) { return 1; }
	//     return -1;
	// });

	laws.attr("data-state-got-it", function(a){
	    return a["year_state_got_it"];
	});

	var heds = laws.append("h4").text(function(a, i){
	    var ret = "" + (i+1) + ". "
	    + a[title_field];
	    return ret;
	});

	var explainer =
	    laws.append("div").classed("chatter", true)
	    .html(function(a){
		var ret = "<p>"
		    + a[explainer_field]
		    + "</p>"

		ret += "<p>";
		if (a["year_state_got_it"]){
		    ret += STATE_NAME + " has had this provision since at least "
			+ "<span class='stat'>"
			+ a ["year_state_got_it"]
			+ "</span>"
			+ "."
		}
		ret += "</p>";

		ret += "<p>";
		ret += "<span class='stat'>"
		    + a["count2017"]
		    + "</span>"
		    + " states have this provision"

		if(a["state_has_it"]){
		    ret += ", including " + STATE_NAME + ".";
		}
		else {
		    ret += ", but " + STATE_NAME + " does not."
		}
		ret += "</p>";

		return ret;
	    });

    }

    d3.json("data/"+ STATE_NAME +".json", go_with_data);

})();



(function(){
    var search = d3.select("#search");
    var search_button = d3.select("#search-button");

    var do_search = function(){
	var val = search.node().value;
	console.log("Search field is " + val);

	var items = d3.selectAll(".item");

	items.style("display","none");

	items.style("display", function(){
	    var index = d3.select(this).text().toLowerCase()
		.indexOf(val.toLowerCase());

	    if (index >= 0){ return ; }
	    return "none";


	});


    };

    search.on("keyup", do_search);

    search_button.on("click", do_search);

})();
