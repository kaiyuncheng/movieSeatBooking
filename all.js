const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const countDOM = document.querySelector('#count');
const totalDOM = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');

let ticketPrice = +movieSelect.value;

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  countDOM.innerText = selectedSeatsCount;
  totalDOM.innerHTML = selectedSeatsCount * ticketPrice;
};

function render() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeats !== null && selectedSeats.length >0){
    seats.forEach((seat, index) =>{
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected');
      }
    });
  };


  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    updateSelectedCount();
  };
};

movieSelect.addEventListener('change', e =>{
  ticketPrice = +e.target.value;

  localStorage.setItem('selectedMovieIndex', e.target.selectedIndex);
  localStorage.setItem('selectedMoviePrice', e.target.value);

  updateSelectedCount();
})

container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
    
  } 
});

// seats.forEach((seat)=>{
//   seat.addEventListener('click', (e)=>{
//     e.target.classList.toggle('selected');
//   })
// });

render();

