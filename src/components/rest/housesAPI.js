const HOUSES_ENDPOINT = 'https://ancient-taiga-31359.herokuapp.com/api/houses';


class HousesAPI {
    // Define an asynchronous method called 'get' for fetching data from the API
    get = async () => {
        try {
            // Fetch data from the specified API endpoint using the 'fetch' function
            const resp = await fetch(HOUSES_ENDPOINT);
            // analyze the response body as JSON and store it in the 'data' variable
            const data = await resp.json();

            // Log the fetched data to the console
            console.log(data);
            // Return the fetched data as the result of this method
            return data;
        }
        catch (e) {
            // If any error occurs during the fetch or parsing process, log the error to the console
            console.log(e);
        }
    }

    // Define an asynchronous method called 'put' for updating data in the API
    put = async (house) => {
        try {
            // Send a PUT request to the API with the updated house data
            const resp = await fetch(`${HOUSES_ENDPOINT}/${house._id}`, {
                method: 'PUT',
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(house),
            });
            // analyze the response body as JSON and return it as the result of this method
            return await resp.json();
        }
        catch (e) {
            // If any error occurs during the PUT request, log the error to the console
            console.log(e);
        }
    }
}

// Create an instance of the 'HousesAPI' class
const housesAPIInstance = new HousesAPI();

// Export the instance as 'housesAPI' to make it available for other modules to use
export { housesAPIInstance as housesAPI };
