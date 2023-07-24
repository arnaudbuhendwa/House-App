import React, { useState } from 'react';
import { NewRoomForm } from './NewRoomForm';

export const House = (props) => {
    // Destructure the props to access the 'house' and 'updateHouse' variables
    const { house, updateHouse } = props;

    // Function to delete a room from the house
    const deleteRoom = (roomId) => {
        // Create a new house object with the room removed from the 'rooms' array
        const updatedHouse = {
            ...house,
            rooms: house.rooms.filter((x) => x._id !== roomId),
        };
        // Call the 'updateHouse' function to update the state with the modified house object
        updateHouse(updatedHouse);
    };

    // Function to add a new room to the house
    const addNewRoom = (room) => updateHouse({ ...house, rooms: [...house.rooms, room] });

    // Function to update an existing room in the house
    const updateRoom = (roomId, updatedRoom) => {
        // Create a new house object with the specified room updated in the 'rooms' array
        const updatedHouse = {
            ...house,
            rooms: house.rooms.map((room) => (room._id === roomId ? updatedRoom : room)),
        };
        // Call the 'updateHouse' function to update the state with the modified house object
        updateHouse(updatedHouse);
    };

    // Function to render the list of rooms in the house
    const rooms = () => (
        <ul>
            {house.rooms.map((room, index) => (
                <li key={index}>
                    <label>{`${room.name} Area: ${room.area}`}</label>
                    <span>   </span>
                    <button onClick={(e) => deleteRoom(room._id)}>Delete</button>
                    <span>   </span>
                    <button onClick={() => handleUpdate(room)}>Update</button>
                </li>
            ))}
        </ul>
    );

    // State variables for handling room updates
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatedRoom, setUpdatedRoom] = useState({ name: '', area: '' });

    // Function to initiate the room update process
    const handleUpdate = (room) => {
        setIsUpdating(true);
        setUpdatedRoom({ ...room });
    };

    // Function to handle the form submission during room update
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        updateRoom(updatedRoom._id, updatedRoom);
        setIsUpdating(false);
    };

    // Function to cancel the room update process
    const handleUpdateCancel = () => {
        setIsUpdating(false);
        setUpdatedRoom({ name: '', area: '' });
    };

    // Render the component's JSX
    return (
        <div>
            <h1>{house.name}</h1>
            {isUpdating ? (
                // Render the update form when 'isUpdating' is true
                <div>
                    <form onSubmit={handleUpdateSubmit}>
                        <input
                            type="text"
                            placeholder="name"
                            onChange={(e) => setUpdatedRoom({ ...updatedRoom, name: e.target.value })}
                            value={updatedRoom.name}
                        />
                        <input
                            type="text"
                            placeholder="area"
                            onChange={(e) => setUpdatedRoom({ ...updatedRoom, area: e.target.value })}
                            value={updatedRoom.area}
                        />
                        <button type="submit">Update</button>
                        <button type="button" onClick={handleUpdateCancel}>
                            Cancel
                        </button>
                    </form>
                </div>
            ) : (
                // Render the list of rooms when 'isUpdating' is false
                rooms()
            )}
            {/* Render the 'NewRoomForm' component to add a new room */}
            <NewRoomForm addNewRoom={addNewRoom} />
        </div>
    );
};
