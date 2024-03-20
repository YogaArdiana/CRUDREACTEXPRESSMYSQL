import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {

    const [users, setUser] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () =>{
        const response = await axios.get('http://localhost:5000/users');
        setUser(response.data)
    }

    const deleteUser = async (id)=>{
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            getUsers();
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <div className='columns mt-5 is-centered'>
        <div className="column is-half">
            <Link to={`add`} className="button is-success">Add New</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td><button onClick={() => deleteUser(user.id)} className='button is-danger me-2'>Delete</button><Link to={`edit/${user.id}`} className='button is-success'>Edit</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default UserList
