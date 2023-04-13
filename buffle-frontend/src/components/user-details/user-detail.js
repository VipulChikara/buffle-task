import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getAllUsers, addUser } from '../../service/user';
import UserForm from '../user-form/user-form';
import './user-detail.css';

function UserDetails() {
 //dummy user data   
  const [users, setUsers] = useState([
    { _id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1 123-456-7890', country: 'USA' },
    { _id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+44 1234 567890', country: 'UK' },
    { _id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '+61 2 1234 5678', country: 'Australia' }
  ]);
  //flag to avoid reoccuring calls from useeffect   
  const dataFetchedRef = useRef(false);

 // Adding user details using backend api   
  const createUser = async userData => {
    const data = await addUser(userData);
    // appending user data into exicting users state
    setUsers([...users, data]);
  };

 // Fetching user details from backend api   
  const getUsers =  async () => { 
        const data = await getAllUsers();
        // adding users data into exicting users state
        setUsers([...users,...data]);
  }
   
  useEffect(()=>{
    // check for second useEffect call
    if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
    // fetching all users
    getUsers()

   },[])

  return (
    <>
    <UserForm onFormSubmit={createUser} />
    <div className="user-details-container">
      
      <h2>User Details</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default UserDetails;
