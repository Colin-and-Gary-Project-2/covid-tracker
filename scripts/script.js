const App = {};
App.init = function () {
  App.apiCall();
};
App.apiCall = function () {
  // Retrieve API data
  async function getAPIData() {
    const apiURL = "https://api.covid19tracker.ca/summary/split/";
    const url = new URL("http://proxy.hackeryou.com");
    url.search = new URLSearchParams({
      reqUrl: apiURL,
    });
    const response = await fetch(url);
    if (response) {
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData.data;
    } else {
      // console.log(error);
    }
  }
  // Promise to grab API data
  const apiPromise = getAPIData();
  apiPromise
    .then((data) => {
      // console.log(data);
      App.showData(data);
    })
    .catch((error) => {
      // console.log(error);
    });
};




//ADD ERROR MESSAGE IF USER DOESN'T SELECT PROVINCE.
App.showData = (data) => {
  const form = document.querySelector("#search-form");
  const province = document.querySelector("#provinceChoice");
  // console.log(province);
  if (province.value === "noInput") {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const errorMessage = document.querySelector(".errorMessage");
      errorMessage.innerHTML = "Please select province";
    });
  }


  // WHENEVER USER SELECTS(CHANGES) PROVINCE VALUE, THEN RUN THIS CODE.
  province.addEventListener("change", (event) => {
    // console.log("Working Yet?")
    // console.log(event.originalTarget.value);
    let userInput = event.originalTarget.value;
    // console.log(data);
    let userData = {};

    //GO THRU ARRAY, COMPARING EACH data.province value to USER SELECTED VALUE
    for (let i = 0; i < data.length; i++) {
      if (data[i].province === userInput) {
        userData = data[i];
      }
    }
    // console.log(userData);

    //ON FORM SUBMIT AFTER USER SELECTS PROVINCE, THEN RENDER RESULTS.
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // console.log(userData);
      const caseHtml = `
        <h2>Total Cases</h2>
        <div>${userData.total_cases}</div>
        `;
      const totalTestedHTML = `
        <h2>Total tested</h2>
        <div>${userData.total_tests}</div> 
        `;
      const totalVaccinationHTML = `
        <h2>Total Vaccinations</h2>
        <div>${userData.total_vaccinations}</div> 
        `;
      const totalVaccCase = document.querySelector(".total-cases");
      const totalTested = document.querySelector(".total-tested");
      const totalVaccination = document.querySelector(".total-vaccine");
      totalVaccCase.innerHTML = caseHtml;
      totalTested.innerHTML = totalTestedHTML;
      totalVaccination.innerHTML = totalVaccinationHTML;
    });
  });
  // const loop = data.data.forEach((province) => {
  //     console.log(province.change_hospitalizations)
  // });
  // console.log(loop);
};
App.init();





// Create namespace object
// create async function to call API (at least twice, once for province data, once for covid data (summary/split))
// create a function to append province names to dropdown
// create a function to
// Before thursday:
// build java script functions
// beautiful styling
// Thursday meeting goals: Have our working MVP, review each other's code.
// Stretch goals:
// Form that dynamically appears as user makes selections
// Data visualization, and extrapolation (graphs, and things like "X days till Ontario is fully vaxxed)
// App.testCall = function(){
//     const apiURL = 'https://api.covid19tracker.ca/summary/split/'
//     const url = new URL('http://proxy.hackeryou.com');
//             url.search = new URLSearchParams({
//             reqUrl: apiURL
//             });
//     fetch(url)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(jsonResult){
//         console.log('it worked!', jsonResult)
//     })
// };
