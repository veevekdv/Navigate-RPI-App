//grabs user input from the search bar
const search = document.getElementById("search");
search.addEventListener('input', ()=>searchClubs(search.value));
/*everytime the user types into the input box we need to call the searchStates function  with the user  input as the parameter */

//gets the output id
const output = document.getElementById("output");
//parameter - searchText
const searchClubs = async searchText => {
    //fetch data from the clubs json file
    const data = await fetch("clubs.json");
    /*with the fetch api, we dont get the data right away so we have to  tell this to be a json*/
    const clubs = await data.json();
    //returns the the entire list of clubs if no input
    outputHtml(clubs);
    
    //Get maches to current text input
    //loops through each club and returns an eaary based on the condtions
    let matches = clubs.filter(club =>{
        //Regular expressions are patterns used to match character combinations in strings. 
        return club.name.match(new RegExp(`^${searchText}`, 'gi')) || club.abbr.match(new RegExp(`^${searchText}`, 'gi')) || club.cat.match(new RegExp(`^${searchText}`, 'gi')) || club.loc.match(new RegExp(`^${searchText}`, 'gi')) || club.time.match(new RegExp(`^${searchText}`, 'gi'));
    });
    outputHtml(matches);
};

//outputs the array of matched clubs using .map function
const outputHtml = matches =>{
    const html = matches.map(match => `
        <div class="card card-body">
            <img src="${match.image}" height = 250px width = 500px placement = center>
            <h3>${match.name} (${match.abbr})</h3>
            <h5>Category: ${match.cat}</h5>
            <p style="color:#FFFF00">${match.desc}</p>
            <h5>Time: ${match.time}</h5> 
            <h5>Location: ${match.loc}</h5>
            <a href="${match.web}" >Website</a>
        </div>`).join('');
    output.innerHTML = html;
}