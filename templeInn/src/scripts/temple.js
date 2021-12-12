// This file contains all the JavaScript for the temples page.



// The code to display the temples api data.
// Create an object of the temples to be displayed.
idObject = {
  // Temple Name  : [Temple ID, Weather API ID]
    "Idaho Falls" : [103, 5596475],
    "Rexburg" : [198, 5605242],
    "Kansas City" : [108, 4393217],
    "Oakland" : [109, 4544379],
}

// Display the temples.
async function displayTemples(idObject){

    // For each temple in the object of temples.
    for (let key in idObject) {
        
        // Use the id to fetch the temple data.
        const url = 'https://nathan-byui-api.herokuapp.com/temples/' + idObject[key][0];
        const apiKey = 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68XwZj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';
        await fetch(url, {
            headers: {
                contentType: 'application/json',
                apiKey: apiKey
            }
        })
        .then((response) => response.json())
        .then((templeObject) => {
            console.log(templeObject);

            // Create the html elements.
            let card = document.createElement('section');
            let name = document.createElement('h2');
            let phone = document.createElement('h3');
            let address = document.createElement('h3');
            let image = document.createElement('img');
            let summary = document.createElement('p');
            let weather = document.createElement('p');
            let milestonesTitle = document.createElement('h4');
            let milestones = document.createElement('ul');
            let servicesTitle = document.createElement('h4');
            let services = document.createElement('ul');
            let cardTop = document.createElement('div');
            cardTop.classList.add('card-top');
            let cardBottom = document.createElement('div');
            cardBottom.classList.add('card-bottom');

            // Assign the html elements the deconstrcuted api values.
            name.textContent = templeObject.name;
            phone.textContent = templeObject.phone;
            address.textContent = templeObject.address1 + " " + templeObject.city + " " + templeObject.state + " " + templeObject.zip;
            image.setAttribute('src', templeObject.imageurl);

            // Each for loop gets rid of the "," separating each item in the templesObject array.
            for (i=0; i<templeObject.Summary.facts.length; i++){
                summary.textContent += templeObject.Summary.facts[i] + " ";
            }

            // Weather will be added later, we will only add a class for now.
            weather.classList.add('weather');
            weather.id = templeObject.temple_id + '-weather';
            
            milestonesTitle.textContent = "Milestones";
            for (i=0; i<templeObject.milestones.length; i++){
                let item = document.createElement('li');
                item.textContent += templeObject.milestones[i];
                milestones.appendChild(item);
            }
            
            servicesTitle.textContent = "Services";
            for (i=0; i<templeObject.services.length; i++){
                let item = document.createElement('li');
                item.textContent += templeObject.services[i];
                services.appendChild(item);
            }

            // Add the created elements to html.
            topChilds = [name, image, address, phone]
            for (i = 0; i < topChilds.length; i++) {
                // Wrap the top card elements 
                cardTop.appendChild(topChilds[i]);
            }
            bottomChilds = [summary, weather, milestonesTitle, servicesTitle, milestones, services];
            for (i = 0; i < bottomChilds.length; i++) {
                // Wrap the bottom card elements 
                cardBottom.appendChild(bottomChilds[i]);
            }
            card.appendChild(cardTop);
            card.appendChild(cardBottom);
            // Add an id 
            // card.id = templeObject.temple_id + '-card';
            document.querySelector('div.cards').appendChild(card);
        })
    }
}

// NOTE: This function breaks on the third temple because it cannot fetch the id from the document. The id exists but I can not been able to figure out why it does not display. 
// async function addWeather(idObject){
//     for (let key in idObject) {
        
//         const apiURL = 'https://api.openweathermap.org/data/2.5/forecast?id=' +idObject[key][1] +'&units=imperial&appid=a12d75a861d9cada98d7c5f0a788010f';
//         await fetch(apiURL)
//         .then((response) => response.json())
//         .then((weatherObject) => {
//             ids = ['103-weather', '198-weather', '108-weather', '109-weather']
//             for (id in ids) {
//                 // get the element created earlier from the document.
//                 element = document.getElementById(id);
//                 console.log(element);
//                 element.textContent = weatherObject.list[0].weather[0].description;
//                 document.getElementById(id).appendChild(element);
//             }
//         })
//     }
// }

// Call the function when the page loads.
window.onload = displayTemples(idObject);
// window.onload = addWeather(idObject);