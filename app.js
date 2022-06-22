//Declare varaiables
const card_group = document.querySelector('#card-group');
const button = document.querySelector('#button');
const input = document.querySelector('#input');
const body = document.querySelector('body');

//Load shows function
const load_TV_Shows = async (user_input) => {
    try {
    
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${user_input}`);
        console.log('Data', response.data);
        
    }
    catch(err){
        console.log('Error is: ', err);
    }
}


//If search button is clicked
button.addEventListener('click', (e) => {

    //Prevent the form from being submitted
    e.preventDefault();

    console.log('Pressed');

    //Load shows
    load_TV_Shows(input.value);

})




