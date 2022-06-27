//Declare varaiables
const card_group = document.querySelector("#card-group");
const form = document.querySelector("#form");
const button = document.querySelector("#button");
const input = document.querySelector("#input");
const body = document.querySelector("body");

const searchBox_form = document.querySelector("#searchBox_form");
const searchBox_input = document.querySelector("#searchBox_input");
const searchBox_button = document.querySelector("#searchBox_button");
const container = document.querySelector(".container");

const modal_title = document.querySelector("#modal-title");
const modal_image = document.querySelector("#modal-image");
const modal_summary = document.querySelector("#modal-summary");
const modal_p_language = document.querySelector("#p-language");
const modal_p_premiered = document.querySelector("#p-premiered");
const modal_p_genres = document.querySelector("#p-genres");
const modal_p_status = document.querySelector("#p-status");
const modal_p_runTime = document.querySelector("#p-runTime");

form.style.visibility = "hidden";

input.value = " ";
searchBox_input.value = " ";

//Create an array that will be populated with objects
let showArray = [];

//Create a function that will load shows
const load_TV_Shows = async (user_input) => {
  try {
    const response = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${user_input}`
    );
    console.log("Data", response.data);

    for (let re of response.data) {
      //Create an object
      let obj = {};

      if (re.show.image === null) {
        console.log("Image null");
        continue;
      }

      if (re.show.summary === null) {
        console.log("Summary null");
        re.show.summary = "N/A";
      }

      if (re.show.averageRuntime === null) {
        console.log("averageRunTime null");
        re.show.averageRuntime = "N/A";
      }

      if (re.show.genres.length === 0) {
        console.log("Genres Empty");
        re.show.genres = "N/A";
      }

      if (re.show.premiered === null) {
        console.log("Air Date null");
        re.show.premiered = "N/A";
      }

      if (re.show.premiered === null) {
        console.log("Air Date null");
        re.show.premiered = "N/A";
      }

      //Assign values to the object
      //Optimized obj
      obj.imageSrc = re.show.image.medium;
      obj.id = re.show.id;
      obj.name = re.show.name;
      obj.language = re.show.language;
      obj.genres = re.show.genres;
      obj.premiered = re.show.premiered;
      obj.summary = re.show.summary;
      obj.status = re.show.status;
      obj.runTime = re.show.averageRuntime;
      showArray.push(obj);

      //updateDOM(re.show.image.medium, re.show.name, re.show.summary);
    }
    console.log("Inside Load", showArray);

    //Updtae the DOM
    updateDOM(showArray);
  } catch (err) {
    console.log("Error is: ", err);
  }
};

//Remove HTML tags
const removeTags = (str) => {
  if (str === null || str === "") {
    return false;
  } else {
    str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  }
};

//Remove shows function
const removeShows = () => {
  while (card_group.firstChild) {
    card_group.removeChild(card_group.firstChild);
  }
};

//Update DOM
const updateDOM = (showArray) => {
  console.log("Inside Update", showArray);

  form.style.visibility = "visible";

  container.remove();

  for (let sh of showArray) {
    const div_col = document.createElement("div");
    div_col.classList.add("col");

    card_group.append(div_col);

    const div_card = document.createElement("div");
    div_card.classList.add("card", "h-100");
    div_card.id = sh.id;

    div_col.append(div_card);

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = sh.imageSrc;
    img.alt = "...";

    div_card.append(img);

    const card_body = document.createElement("div");
    card_body.classList.add("card-body");

    img.after(card_body);

    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerText = sh.name;

    card_body.append(h5);

    const p = document.createElement("p");
    p.classList.add("card-text");
    p.innerText = removeTags(sh.summary);

    h5.after(p);

    const footer = document.createElement("div");
    footer.classList.add("footer");

    card_body.after(footer);

    const button = document.createElement("button");
    button.classList.add("stretched-link", "btn", "btn-secondary");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#exampleModal");
    button.innerText = "Learn more";

    footer.append(button);
  }
};

const updateModal = (Event_id) => {
  console.log("Inside updateModal", Event_id);

  for (let show of showArray) {
    if (Event_id == show.id) {
      modal_title.innerText = show.name;
      modal_p_language.innerText = `Language: ${show.language}`;
      modal_p_premiered.innerText = `Air Date: ${show.premiered}`;
      modal_p_genres.innerText = `Genres: ${show.genres} `;
      modal_p_status.innerText = `Air Status: ${show.status}`;
      modal_p_runTime.innerText = `Duration(episode): ${show.runTime.toString()} minutes`;
      modal_image.src = show.imageSrc;
      modal_summary.innerText = removeTags(show.summary);
    }
  }
};

//If search button is clicked
button.addEventListener("click", (e) => {
  //console.log('Pressed');
  e.preventDefault();

  if (input.value !== " ") {
    //Check if card group is empty, if so
    if (card_group.childNodes.length === 0) {
      //Load shows according to the user input
      console.log("Inside if");
      load_TV_Shows(input.value);
    } else {
      console.log("Inside else");

      //Clear the array of objects
      showArray = [];

      //Remove previous shows
      removeShows();

      //Load new shows
      load_TV_Shows(input.value);
      // load_TV_Shows(searchBox_input.value);
    }
  } else {
    console.log("Empty");
  }
});

card_group.addEventListener("click", (Event) => {
  console.log("Pressed");

  //Check the id of the card just clicked
  console.log(Event.target.parentNode.parentNode.id);

  //Update Modal
  updateModal(Event.target.parentNode.parentNode.id);
});

searchBox_button.addEventListener("click", (e) => {
  e.preventDefault();

  if (searchBox_input.value !== " ") {
    load_TV_Shows(searchBox_input.value);
  } else {
    console.log("Empty");
  }
});
