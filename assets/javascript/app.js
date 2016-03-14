var movies = ['Ip Man', 'Shaun of the Dead', 'Up'];
var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10";

// this adds movie buttons and functions before page loads
$(document).ready(function() {
	renderButtons();

	 $('#addMovie').on('click', function(){
		var movie = $('#movie-input').val().trim();
		if (movie == "") {
			return false;
		}

		movies.push(movie);

		appendNewButton(movie);
		return false;
	});

});

	// creates new button and adds it to #buttonsView
	function appendNewButton(movie){ 
	    var a = $('<button>');
	    a.addClass('movie');
	    a.attr('data-name', movie);
	    a.text(movie);
	    a.on('click', getGif);
	    $('#buttonsView').append(a);
	}



	// adds all buttons to webpage
	function renderButtons(){ 
		for (var i = 0; i < movies.length; i++){
		    appendNewButton(movies[i]);
		}
	}



	// searches for movie gifs 
	function getGif(){
		
		var movie = $(this).data('name');
		var url = queryURL + "&q=" + movie;	
		$.ajax({url: url, method: 'GET'}).done(function(response) {
	     	
	     	var results = response.data;
	     	console.log(results);
	    
	    	for (var i = 0; i < results.length; i++) {
				 displayGif(results[i]);
			} 
		});
	}
	
	// Displays the gif 
	function displayGif(results){

		var movieDiv = $('<div>');
        var p = $('<p>').text("Rating: " + results.rating);
        var movieImage = $('<img>');
        movieImage.attr('src', results.images.fixed_height_still.url);
        movieImage.attr('data-still', results.images.fixed_height_still.url);              
        movieImage.attr('data-animate', results.images.fixed_height.url);              
        movieImage.attr('data-state', "still");  
        movieImage.attr('class', "movieImage");    
        movieImage.on('click', toggleGif);           
        movieDiv.append(p);
        movieDiv.append(movieImage);
        $('#gifsAppearHere').prepend(movieDiv);
	}

	// toggles gif
	function toggleGif(){
		var state = $(this).attr('data-state'); 
	 		if ( state == 'still'){
               $(this).attr('src', $(this).data('animate'));
               $(this).attr('data-state', 'animate');
        	}else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
        	}
	}





