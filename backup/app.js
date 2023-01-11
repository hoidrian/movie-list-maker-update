const movieApp = {};
movieApp.apiKey = "320ba0a49f5e07afcf455a1e14abb997"
movieApp.getMovie = function() {
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
        // movieApp.displayMovie(jsonResponse);
        //console.log(jsonResponse);
        movieApp.displayMovie(jsonResponse.results);
    })
}
// movieApp.displayMovie = function(movieArray) {
//     movieArray.foreach(function(movieObject){
//         //populate html with information from movieArray (poster, title, runtime, etc.)
//     });
// }



movieApp.displayMovie = function(movieArray){
    const i = Math.floor(Math.random() * movieArray.length);
    const title = document.createElement('h2');
    title.innerText = movieArray[i].title;
    const image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/original/${movieArray[i].poster_path}`
    image.alt = `${movieArray[i].title} poster`
    const movieInfo = document.createElement('div');
    movieInfo.appendChild(title);
    movieInfo.appendChild(image);
    document.querySelector('main').appendChild(movieInfo);
}


movieApp.setUpEventListners = function() {
    const yesButton = document.querySelector('.yes');
    yesButton.addEventListener('click',function(){
        //add title(varible) to the watch list
        const watchListitem = document.querySelector('h2').innerText;
        console.log(watchListitem);
        //remove object from moviearry

        // run the display movie function again
        movieApp.getMovie();
    })
    const noButton = document.querySelector('.no');
    noButton.addEventListener('click',function(){
        //add title(varible) to the watch list
        const watchListitem = document.querySelector('h2').innerText;
        console.log(watchListitem);
        //remove object from moviearry

        // run the display movie function again
    })
    
}



movieApp.init = function () {
    movieApp.getMovie();
    movieApp.setUpEventListners();
}
movieApp.init()