// Pseudocode

// make namespace object for the movie
    // make init function

// make API request to get a random movie data
    // title
    // poster
        // alt text
    // description + run-time

// make a container with 3 elements - h2 for movie title, img for poster, article for movie description

// display the container in the middle of the screen

// add event listener to the buttons
    // right button click stores the object in a list and displays it below in a to-watch list 
        // adds object as a list item to blank ul at bottom of page
            // starts hidden, can be displayed via hover/click (CSS)
            // thumbnail of poster, title, description + run-time
    // left button click gets rid of the object and cycles to the next random movie

    const movieApp = {};

    movieApp.apiKey = "e21d59eeaa5f5c9a061e1be07d38cac1"
    
    movieApp.movieList = [];
    
    movieApp.getMovieList = function() {
        // build url endpoint
        const movieUrl = new URL(`https://api.themoviedb.org/3/movie/popular`);
        //add in params
        movieUrl.search = new URLSearchParams({
            api_key: movieApp.apiKey,
        });
        // make fetch call
        fetch(movieUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(jsonResponse){
            movieApp.movieList = jsonResponse.results;
            movieApp.displayMovie(movieApp.movieList);
        })
    }
    
    
    movieApp.displayMovie = function(movieArray) {
        const i = Math.floor(Math.random() * movieArray.length);
        const title = document.createElement("h2");
        title.innerText = movieArray[i].title;
        const image = document.createElement("img");
        image.src = `https://image.tmdb.org/t/p/original/${movieArray[i].poster_path}`
        image.alt = `${movieArray[i].title} poster`;
        const movieInfo = document.createElement("div");
        movieInfo.appendChild(title);
        movieInfo.appendChild(image);
        document.querySelector(".movie").appendChild(movieInfo);
        return movieArray;
    }
    
    movieApp.setUpEventListeners = function() {
        const yesButton = document.querySelector(".yes");
        yesButton.addEventListener("click", function(){
            // add movie title to watchList
            const newListItem = document.querySelector("h2").innerText;
            console.log(newListItem);
            // remove object from movieArray
            document.querySelector(".movie").innerHTML = ""
            // run displayMovie function again
            movieApp.displayMovie()
        })
        const noButton = document.querySelector(".no");
        noButton.addEventListener("click", function(){
            console.log("next movie");
            // remove object from movieArray
            // run displayMovie function again
        })
    }
    
    movieApp.init = function () {
        movieApp.getMovieList();
        movieApp.setUpEventListeners();
    }
    
    movieApp.init()