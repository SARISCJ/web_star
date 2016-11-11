var template = '<div class="col s12 m4">' +
		    '<div class="card horizontal hoverable">' +
		      	'<div class="card-stacked">' +
		        	'<div class="card-content white-text pink darken-4">' +
		          		'<p>Hi, my name is <strong>{{name}}</strong></p>' +
		        	'</div>' +
			        '<div class="card-action">' +
			          	'<a data-show-url="{{url}}" class="about pink-text">See more about me</a>' +
			        '</div>' +
			    '</div>' +
	    	'</div>' +
	  	'</div>';

var species = '<option value="{{valor}}">{{specie}}</option>'

$(document).ready(function(){
	var specieStar = function(response){
	var people = "";
	$.each(response.results, function(i,nombre){
		var value = "";
		var peopleUrl ="http://swapi.co/api/people/";
		$.each(nombre.people, function(i,url){
				console.log(url);
				value += url.replace(peopleUrl,"");
			});
		people += species

		.replace("{{specie}}", nombre.name)
		.replace("{{valor}}",value.substring(0,value.length-1));
	});
	
	$("#species").html('<option value ="" disabled selected>Selecciona una Specie</option>');
	$("#species").append(people);
	 }
	
	$.getJSON("http://swapi.co/api/species/", specieStar);
});

$(".container").on("change","#species",function(){
	$("#contenido").html("");
	var numero = $(this).val().split("/");
	for(var i=0; i<numero.length;i++){
		$.getJSON("http://swapi.co/api/people/"+numero[i]+"/",function(response){
			var tiposSpecies = template.replace("{{name}}",response.name);
			$("#contenido").append(tiposSpecies);
		});
	};
});