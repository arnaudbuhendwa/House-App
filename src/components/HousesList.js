import React, { useEffect, useState } from 'react'; // Import 'useEffect' and 'useState' hooks
import { House } from './House.js'; // Import the 'House' component
import { housesAPI } from './rest/housesAPI'; // Import the 'housesAPI' instance

const HousesList = () => {
    // Use 'useState' hook to manage the state for houses
    const [houses, setHouses] = useState([]);

    // Function to fetch houses from the API
    const fetchHouses = async () => {
        // Use 'housesAPI.get()' to fetch houses data
        const fetchedHouses = await housesAPI.get();
        // Update the 'houses' state with the fetched data
        setHouses(fetchedHouses);
    };

    // Function to update a house in the API
    const updateHouse = async (updatedHouse) => {
        // Use 'housesAPI.put()' to update the house in the API
        await housesAPI.put(updatedHouse);
        // After updating the house, fetch the latest houses data again
        fetchHouses();
    };

    // Use 'useEffect' hook to fetch houses when the component mounts
    useEffect(() => {
        fetchHouses();
    }, []);

    // Render the component's JSX
    return (
        <div>
            {/* Map through the houses state and render the 'House' component for each house */}
            {houses.map((house) => (
                <House
                    house={house}
                    key={house._id}
                    updateHouse={updateHouse}
                />
            ))}
        </div>
    );
};

export default HousesList;
