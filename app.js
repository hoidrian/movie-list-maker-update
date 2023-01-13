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
    movieApp.page = 1;
    movieApp.arrayCounter = 1;
    movieApp.listCounter = 0;
    movieApp.listEventListener = function(listing) {
        listing.addEventListener("click", function() {
            if (confirm("Would you like to delete this from your list?")) {
                document.querySelector("ol").removeChild(this);
                movieApp.listCounter--;
                console.log(movieApp.listCounter);
            }
        });            
    }

    movieApp.getMovieList = function() {
        // build url endpoint
        const movieUrl = new URL(`https://api.themoviedb.org/3/movie/popular`);
        //add in params
        movieUrl.search = new URLSearchParams({
            api_key: movieApp.apiKey,
            page: movieApp.page,
        });
        // make fetch call
        fetch(movieUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(jsonResponse){
            movieApp.movieList = jsonResponse.results;
            console.log(jsonResponse);
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
        document.querySelector(".image-container").innerHTML = "";
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
    }
    
    //execute the function by setting up eventListener
    movieApp.setUpEventListeners = function() {
        //configuring the yes(like) button 
        const yesButton = document.querySelector(".yes");
        yesButton.addEventListener("click", function(){
            // add movie title to watchList
            if (movieApp.listCounter <= 15) {
                const newListItem = document.querySelector("h2").innerText;
                const listingMovie = document.createElement("li");
                listingMovie.innerText = newListItem;
                listingMovie.classList = "list";
                document.querySelector("ol").appendChild(listingMovie);
                // remove object from page
                document.querySelector(".image-container").innerHTML = "";
                movieApp.listEventListener(listingMovie);
                // run displayMovie function again
                movieApp.displayMovie(movieApp.movieList);
                movieApp.arrayCounter++;
                console.log(movieApp.arrayCounter);
                if (movieApp.arrayCounter === 20) {
                    movieApp.page = Math.floor(Math.random() * 500);
                    movieApp.arrayCounter = 1;
                    movieApp.getMovieList();
                }
                movieApp.listCounter++;
                console.log(movieApp.listCounter);
            } else {
                alert("List Full! Remove items before adding you can add more.")
            }
        })
        //configuring the no button
        const noButton = document.querySelector(".no");
        noButton.addEventListener("click", function(){
            console.log("next movie");
            // remove object from page
            document.querySelector(".image-container").innerHTML = "";
            // run displayMovie function again
            movieApp.displayMovie(movieApp.movieList);
            movieApp.listCounter++;
            if (movieApp.listCounter === 20) {
                movieApp.page = Math.floor(Math.random() * 500);
                movieApp.listCounter = 1;
                movieApp.getMovieList();
            }
        })
    }
    //upon page load - fecting data (getMovieList) and append data (setUpEventListeners)
    movieApp.init = function () {
        movieApp.getMovieList();
        movieApp.setUpEventListeners();
    }
    //call init fuction upon page load
    movieApp.init()