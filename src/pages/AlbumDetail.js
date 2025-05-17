import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaFolder, FaUser, FaArrowLeft } from 'react-icons/fa';
import '../css/AlbumDetail.css';

const AlbumDetail = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
      .then(res => res.json())
      .then(albumData => {
        setAlbum(albumData);
        fetch(`https://jsonplaceholder.typicode.com/users/${albumData.userId}`)
          .then(res => res.json())
          .then(setUser);
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
          .then(res => res.json())
          .then(data => setPhotos(data.slice(0, 10))) 
          .finally(() => setLoading(false));
      })
      .catch(() => {
        setLoading(false);
        navigate('/albums');
      });
  }, [albumId, navigate]);

  if (loading || !album || !user) {
    return <div className="loading">Loading...</div>;
  }

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
            <li className="active"><Link to="/albums"><FaFolder /> Albums</Link></li>
            <li><Link to="/users"><FaUser /> Users</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <div className="user-detail">
          <div className="breadcrumb">
            <button  style={{backgroundColor:'white',color:'black',fontSize:"15px"}}  onClick={() => navigate(-1)}>
              <FaFolder /> Albums/  Show
            </button>
          </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button className='back-button' onClick={() => navigate(-1)}>
                      <FaArrowLeft />
                    </button>
                    <h2 style={{ margin: 0 }}>Show Album</h2>
                  </div>
        
          <div className="user-info" style={{ marginBottom: 24 }}>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ea4c89&color=fff&size=32`}
              alt={user.name}
              className="avatar"
            />
            <div style={{ marginLeft: 12 }}>
              <Link to={`/users/${user.id}`} className="user-link">{user.name}</Link>
              <a href={`mailto:${user.email}`} style={{ display: 'block', fontSize: 14 }}>{user.email}</a>
            </div>
          </div>

          <h3>{album.title}</h3>

          <div
            className="album-photos"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 16,
              marginTop: 20,
            }}
          >
            {photos.length > 0 ? (
              photos.map(photo => (
              <div
                key={photo.id}
                className="photo-wrapper"
                style={{
                  borderRadius: 12,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <a
                 href={photo.url.replace('https://via.placeholder.com', 'https://dummyjson.com/image')}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ width: '100%', position: 'relative', display: 'block' }}
                >
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = photo.url.replace('https://via.placeholder.com', 'https://dummyjson.com/image');
                    }}
                  />
                    <div className="overlay">
                    <span>Preview</span>
                    <FaArrowLeft style={{ marginLeft: 6 }} />
                  </div>
                  </a>
                  <div style={{ padding: '8px 12px', fontSize: 13, color: '#333', textAlign: 'center' }}>
                    {photo.title}
                  </div>
                </div>
              ))
            ) : (
              <p>No photos found in this album.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlbumDetail;
