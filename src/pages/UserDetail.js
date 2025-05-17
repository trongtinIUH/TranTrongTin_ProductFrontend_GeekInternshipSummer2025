import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaFolder, FaUser, FaArrowLeft } from 'react-icons/fa';
import '../css/UserDetail.css';

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(setUser);

    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then(res => res.json())
      .then(setAlbums);
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="main-layout">
      <aside className="sidebar">
        <div className="logo">
          <img
            src="https://agency.brvn.vn/u/geekup-logo_1682658002.jpg"
            alt="GeekUp Logo"
            style={{ width: 150, height: 150 }}
          />
        </div>
        <nav>
          <ul>
            <li><Link to="/albums"><FaFolder /> Albums</Link></li>
            <li className="active"><FaUser /> Users</li>
          </ul>
        </nav>
      </aside>

      <main className="content">
        <div className="user-detail">
          <div className="breadcrumb">
            <button  style={{backgroundColor:'white',color:'black',fontSize:"20px"}} onClick={() => navigate(-1)}>
              <FaUser /> Users / Show
            </button>
           
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{backgroundColor:'white',color:'black',fontSize:"25px"}} onClick={() => navigate(-1)}>
              <FaArrowLeft />
            </button>
            <h2 style={{ margin: 0 }}>Show User</h2>
          </div>

          <div className="user-info" style={{ marginLeft: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ea4c89&color=fff&size=32`}
              alt={user.name}
              className="avatar"
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: 0 }}>{user.name}</h3>
              <p style={{ margin: 0 }}><a href={`mailto:${user.email}`}>{user.email}</a></p>
            </div>
          </div>

          <h3>Albums</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {albums.map(album => (
                <tr key={album.id}>
                  <td>{album.id}</td>
                  <td>{album.title}</td>
                  <td>
                    <button onClick={() => navigate(`/albums/${album.id}`)}>
                      👁️ Show
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default UserDetail;
