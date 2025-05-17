import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { FaFolder, FaUser,FaEye } from 'react-icons/fa';
import '../css/AlbumList.css';

const PAGE_SIZE = 10;

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Pagination state synced with URL - mặt định là trang 1
  const page = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/albums').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
    ]).then(([albumsData, usersData]) => {
      setAlbums(albumsData);
      setUsers(usersData);
      setLoading(false);
    });
  }, []);

  const getUser = (userId) => users.find(u => u.id === userId);

  const paginatedAlbums = albums.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(albums.length / PAGE_SIZE);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="main-layout">
      <aside className="sidebar">
        <div className="logo">
          <img src="https://agency.brvn.vn/u/geekup-logo_1682658002.jpg" alt="GeekUp Logo" style={{ width: 150,height:150 }} />
        </div>
        <nav style={{width: 150}}>
          <ul>
             <li className="active"><FaFolder /> Albums</li>
             <li><Link to="/users"><FaUser /> Users</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <div className="table-container">
          <table className="album-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>User</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAlbums.map(album => {
                const user = getUser(album.userId);
                return (
                  <tr key={album.id}>
                    <td>{album.id}</td>
                    <td>{album.title}</td>
                    <td>
                      {user && (
                        <div className="user-info">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ea4c89&color=fff&size=32`}
                            alt={user.name}
                            className="avatar"
                          />
                          <Link to={`/users/${user.id}`} className="user-link">{user.name}</Link>
                        </div>
                      )}
                    </td>
                    <td>
                      <button className="show-btn" onClick={() => navigate(`/albums/${album.id}`)}>
                        <span role="img" aria-label="show"><FaEye /></span> Show
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
            >
              &lt;
            </button>
            <span>Page {page} / {totalPages}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlbumList;
