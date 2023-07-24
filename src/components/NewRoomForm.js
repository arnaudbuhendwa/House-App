import React, { useState } from 'react';

export const NewRoomForm = (props) => {
    // State variables for handling input values (name and area)
    const [name, setName] = useState('');
    const [area, setArea] = useState(undefined);

    // Function to handle area input, allowing only non-negative integer values
    const handleAreaInput = (e) => {
        const int = parseInt(e.target.value, 10);
        setArea(int >= 0 ? int : '');
    }

    // Function to handle form submission
    const onSubmit = (e) => {
        e.preventDefault();
        // Check if both name and area are provided and not empty
        if (name && area) {
            // Call the 'addNewRoom' function provided via props to add the new room
            props.addNewRoom({ name, area });
            // Clear the input fields after adding the room
            setName('');
            setArea('');
        }
        else {
            // If name or area is missing, log an error message
            console.log('Invalid Input');
        }
    }

    // Render the component's JSX
    return (
        <div>
            <h4>Add a new room</h4>
            <form onSubmit={onSubmit}>
                {/* Input field for the room name */}
                <input 
                    type='text'
                    placeholder='name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                {/* Input field for the room area */}
                <input 
                    type='text'
                    placeholder='area'
                    onChange={handleAreaInput}
                    value={area}
                />
                {/* Submit button to add the new room */}
                <button type='submit'>Add Room</button>
            </form>
        </div>
    );
}
