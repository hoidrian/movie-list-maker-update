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
//getting api key
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
//api session ends

//appending returned api array into html
    //extracting needed info(objects) from api array and insert into querySelector
    movieApp.displayMovie = function(movieArray) {
        //randonlizing array[i] using math floor
        const i = Math.floor(Math.random() * movieArray.length);
        //creating html to input extracted objects (title and image)
        const title = document.createElement("h2");
        title.innerText = movieArray[i].title;
        const image = document.createElement("img");
        image.src = `https://image.tmdb.org/t/p/original/${movieArray[i].poster_path}`
        image.alt = `${movieArray[i].title} poster`;
        //appending selected object as child element into selected querySelector
        const movieInfo = document.createElement("div");
        movieInfo.appendChild(image);
        movieInfo.appendChild(title);
        document.querySelector(".image-container").appendChild(movieInfo);
        const garbageBin = movieApp.movieList.splice(i,1);
        //console.log(movieApp.movieList);
    }
    
    //execute the function by setting up eventListener
    movieApp.setUpEventListeners = function() {
        //configuring the yes(like) button 
        const yesButton = document.querySelector(".yes");
        yesButton.addEventListener("click", function(){
            // add movie title to watchList
            const newListItem = document.querySelector("h2").innerText;
            console.log(newListItem);
            const listingMovie = document.createElement("p");
            listingMovie.innerText = newListItem;
            document.querySelector("ul").appendChild(listingMovie);
            // remove object from movieArray
            document.querySelector(".image-container").innerHTML = ""
            // run displayMovie function again
            movieApp.displayMovie(movieApp.movieList);
        })
        //configuring the no button
        const noButton = document.querySelector(".no");
        noButton.addEventListener("click", function(){
            // discard the moive
            const newListItem = document.querySelector("h2").innerText;
            console.log(newListItem);
            // remove object from movieArray
            document.querySelector(".image-container").innerHTML = ""
            // run displayMovie function again
            movieApp.displayMovie(movieApp.movieList);
        })
    }
    //upon page load - fecting data (getMovieList) and append data (setUpEventListeners)
    movieApp.init = function () {
        movieApp.getMovieList();
        movieApp.setUpEventListeners();
    }
    //call init fuction upon page load
    movieApp.init()