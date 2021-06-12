const App = {};

App.init = function(){
    App.apiCall();
    App.showData();
}

App.apiCall = function(){
    // Retrieve API data
    async function getAPIData(){
        const apiURL = 'https://api.covid19tracker.ca/summary/split/'
        const url = new URL('http://proxy.hackeryou.com');
                    url.search = new URLSearchParams({
                    reqUrl: apiURL
                    });
        const response = await fetch(url);
        if (response){
            const jsonData = await response.json();
            // App.showData(jsonData)
            return jsonData;
        } else {
            console.log(error);
        }
    }
    // Promise to grab API data
    const apiPromise = getAPIData();
    apiPromise.then((data) => {
        console.log(data);
        App.showData(data);
      })
      .catch((error) => {
        console.log(error);
      });
}

App.showData = function(data){
    const loop = data.data.forEach((province) => {
        console.log(province.change_hospitalizations)
    });
    console.log(loop);
}


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