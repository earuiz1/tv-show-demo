//Declare varaiables
const card_group = document.querySelector('#card-group');
const button = document.querySelector('#button');
const input = document.querySelector('#input');
const body = document.querySelector('body');

//Create a function that will load shows
const load_TV_Shows = async (user_input) => {
    try {
    
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${user_input}`);
        console.log('Data', response.data);

        //Iterate through the response data
        for(let res of response.data) {
            console.log(res.show);

            //Update the Dom
            updateDOM(res.show.image.medium, res.show.name, res.show.summary);
        }
        
    }
    catch(err){
        console.log('Error is: ', err);
    }
}

//Create a function that will update the DOM 
const updateDOM = (api_img, api_name, api_desc) => {

    //Create a card dynamically with the data fecthed from the api
    const div_col = document.createElement('div');
    div_col.classList.add('col');
    
    card_group.append(div_col);

    const div_card = document.createElement('div');
    div_card.classList.add('card', 'h-100'); 

    div_col.append(div_card);

    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = api_img;
    img.alt = '...';

    div_card.append(img);

    const card_body = document.createElement('div');
    card_body.classList.add('card-body');
    
    img.after(card_body);

    const h5 = document.createElement('h5');
    h5.classList.add('card-title');
    h5.innerText = api_name;

    card_body.append(h5);

    const p = document.createElement('p');
    p.classList.add('card-text');
    p.innerText = api_desc;
  

    h5.after(p);
}

//If search button is clicked
button.addEventListener('click', (e) => {

    //Prevent the form from being submitted
    e.preventDefault();

    console.log('Pressed');

    //Load shows
    load_TV_Shows(input.value);

})




