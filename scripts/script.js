const App = {};

App.init = function () {
  App.apiCall();
};

App.apiCall = function () {
  // Retrieve API data
  async function getAPIData() {
    const apiURL = "https://api.covid19tracker.ca/summary/split/";
    const url = new URL("https://proxy.hackeryou.com");
    url.search = new URLSearchParams({
      reqUrl: apiURL,
    });
    const response = await fetch(url);
    if (response) {
      const jsonData = await response.json();
      return jsonData.data;
    }
  }
  // Promise to grab API data
  const apiPromise = getAPIData();
  apiPromise
    .then((data) => {
      App.showData(data);
    })
    .catch((error) => {
      App.apiError()
    });
};

App.showData = (data) => {
  const form = document.querySelector("#search-form");
  const province = document.querySelector("#provinceChoice");
  const errorMessage = document.querySelector(".errorMessage");
  // WHENEVER USER SELECTS(CHANGES) PROVINCE VALUE, THEN RUN THIS CODE.
  province.addEventListener("change", (event) => {
    let userInput = event.currentTarget.value;
    //GO THRU ARRAY, COMPARING EACH data.province value to USER SELECTED VALUE
    for (let i = 0; i < data.length; i++) {
      if (data[i].province === userInput) {
        userData = data[i];
      }
    }
    //ON FORM SUBMIT AFTER USER SELECTS PROVINCE, THEN RENDER RESULTS.
  });
  if (province.value === "noInput") {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      errorMessage.innerHTML = `<i class="far fa-hand-point-down blink-me"></i>Please select a <b>PROVINCE</b> below`;
    });
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (province.value !== "noInput") {
      errorMessage.innerHTML = "";
    }
    if (userData) {
      const caseHtml = `
      <div>${userData.total_cases}</div>
      `;
      const totalTestedHTML = `
      <div>${userData.total_tests}</div> 
      `;
      const totalRecoveryHTML = `
      <div>${userData.total_recoveries}</div> 
      `;
      const partialVaccinatedHTML = `
      <div>${userData.total_vaccines_distributed}</div> 
      `;
      const fullVaccinatedHTML = `
      <div>${userData.total_vaccinated}</div> 
      `;
      const totalVaccCase = document.querySelector(".total-cases-results");
      const totalTested = document.querySelector(".total-tested-results");
      const totalRecovery = document.querySelector(".total-recovery-results");
      const partialVaccinated = document.querySelector(".partial-vaccine-results");
      const fullVaccinated = document.querySelector(".full-vaccine-results");
      totalVaccCase.innerHTML = caseHtml;
      totalTested.innerHTML = totalTestedHTML;
      totalRecovery.innerHTML = totalRecoveryHTML;
      partialVaccinated.innerHTML = partialVaccinatedHTML;
      fullVaccinated.innerHTML = fullVaccinatedHTML;
    }
  });
};

App.apiError = () =>{
  // if API doesn't retrieve data, display error message
  const errorDiv = document.querySelector(".errorMessage");
  const apiErrorMessage = "<p>Error Retrieving Data. Try Again Later!</p>"
  errorDiv.innerHTML = apiErrorMessage;
}
App.init();


