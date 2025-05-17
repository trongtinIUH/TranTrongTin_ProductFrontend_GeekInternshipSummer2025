import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { FaFolder, FaUser,FaEye  } from 'react-icons/fa';
import '../css/UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //get data user
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });},[]);

  if (loading) { 
    return <div className="loading">Loading...</div>;
  }

    return(
      <div className='main-layout'>
        <aside className='sidebar'>
          <div className='logo'>
            <img src="https://agency.brvn.vn/u/geekup-logo_1682658002.jpg" alt="GeekUp Logo" style={{ width: 150, height: 150 }} />
          </div>
          <nav style={{width: 150}}>
            <ul>
              <li><Link to="/albums"><FaFolder /> Albums</Link></li>
              <li className='active'><FaUser /> Users</li>
            </ul>
          </nav>
        </aside>

        <main className='content'>
          <div className='table-container'>
             <h2 style={{ margin: 0 }}>User</h2>
            <table className='user-table'>
           
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Website</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <img
                        src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${encodeURIComponent(user.name)}`}
                        alt={user.name}
                        style={{ width: 32, height: 32, borderRadius: '50%' }}
                      />
                    </td>
                    <td>{user.name}</td>
                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                    <td><a href={`tel:${user.phone}`}>{user.phone}</a></td>
                    <td><a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></td>
                    <td>
                      <button className='view-button' onClick={() => navigate(`/users/${user.id}`)}><FaEye />  Show</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    )
  
};

export default UserList;
