let currentId = 0;
let ticketSold = 0;
let maximumCapacity = 0;

document.addEventListener('DOMContentLoaded',()=>{
    getFirstMovie();
    getAllMovie();
    updateMovieTicket();
})


function getFirstMovie(){
    fetch('http://localhost:3000/films/1')
    .then(res => res.json())
    .then(handleGetFirstMovie)
};



let movieTitle = document.getElementById('movieTitle')
const movieDescription = document.getElementById('movieDescription')
const poster = document.querySelector('div.card img')
const showTime = document.getElementById('showTime')
const runTime = document.getElementById('runTime')
const capacity = document.getElementById('capacity')
const soldTickets = document.getElementById('ticketsSold')
const availableTickets = document.getElementById('availableTickets')
const button = document.getElementById('buyTicket')
const movieName = document.getElementById('movieList')


function getAllMovie(){
    fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(data =>data.map(handleGetAllMovie))
};


function handleGetAllMovie(movie){
    const movieN = document.createElement('li');
    movieN.style.cursor = "pointer";

    const movieLink = document.createElement('a')
    movieN.innerText = movie.title
    movieLink.appendChild(movieN);
    movieName.appendChild(movieLink);
    movieLink.addEventListener('click', (event)=>{
        handleGetFirstMovie(movie)
        
    })
}


function handleButtonClick(){
    if (ticketSold > 0 && ticketSold < maximumCapacity){
        ticketSold = ticketSold + 1
        fetch(`http://localhost:3000/films/${currentId}`, {
            method : 'PATCH',
            headers : {
            'content-type': 'application/json',
            'accept': 'application/json'
            },
            body : JSON.stringify({
                tickets_sold : ticketSold

            })
        })
    }
    else{
        button.innerText = 'Sold Out'
    }
    
}

function handleGetFirstMovie(movie){
    currentId = movie.id
    ticketSold = movie.tickets_sold
    movieTitle.innerText = movie.title
    movieDescription.innerText = movie.description
    poster.src = movie.poster
    showTime.innerText = movie.showtime
    runTime.innerText = (movie.runtime + " minutes")
    maximumCapacity = movie.capacity
    capacity.innerText = movie.capacity
    soldTickets.innerText = ticketSold
    availableTickets.innerText = movie.capacity - movie.tickets_sold

}


function updateMovieTicket(currentId) {
    button.addEventListener("click", handleButtonClick)

};


