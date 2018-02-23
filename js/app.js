
$(function() {

	var containerBox = false;

			$.ajax({
				url: 'http://api.tvmaze.com/shows/1/episodes',
				success: function (shows, textStatus, xhr) {
					
					$(".loading").remove();
					localStorage.shows = JSON.stringify(shows);
					render(shows);
				}
			})

		var app = $("#app-row");
		
		app.on("click", "button.heart", function(ev) {
			if(containerBox == false) {
				
			var $this = $(this);

			$this.animate({
				'fontSize' : '30px'
			}, 'fast').parent().addClass('containerBox');

			containerBox = true;

			} else {

				var $this = $(this);

				$this.animate({
				'fontSize' : '22px'
			}, 'fast').parent().removeClass('containerBox');
				containerBox = false;
			}
		})


		function render(shows) {
			
			var loader = '<div class="loading">Loading...</div>';

			var template = '<div class="col-md-3 movies">' + 
				'<div class="card movie">' +
				'<button type="button" class="heart" id="like-button"><span class="glyphicon glyphicon-play-circle" aria-hidden="true"></span></button>' +
				'<div class="card-block">' +
				'<h5 class="">MOVIE</h5>' +
				'<h4 class="card-title title">{{name}}</h4>' +
				'<img src="{{img-url}}" alt="{{img-alt}}">' +
				//'<p></p>' +
				//'<p class="card-text">{{summary}}</p>' +  
				//'<h6 class="">{{airdate}}</h6>' +
				'<i class="fas fa-thumbs-up"></i>' +
				'<i class="fas fa-comment"></i>' +
				'<div class="text">567 like</div>' +
				'</div>' + 	
				'</div>' +
				'</div>';

			var app_row = $('#app-container');

			app_row.empty();

			shows.forEach(function(show) {

				var summary = $(show.summary).text()

				var result = template
				.replace("{{name}}", show.name)
				.replace("{{img-url}}", show.image.medium)
				//.replace("{{summary}}", summary.substr(0,100))
				.replace("{{airdate}}", show.airdate) 
				app_row.append($(result).fadeIn(3000));

			});


		};
	

		$("#formulario").submit(function(ev) { 
		
			ev.preventDefault();
		
			var query = $('#search-input').val();

			$.ajax({
				url: 'http://api.tvmaze.com/search/shows',
				data: { q : query }, 
				success: function (result, textStatus, xhr) {
					$(".loader").remove();
					var shows = result.map(function (el) {
           			 	return el.show;
					})
					render(shows);
				}
			})
		});
	
	});