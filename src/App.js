import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlbumList from './pages/AlbumList';
import AlbumDetail from './pages/AlbumDetail';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AlbumList />} />
        <Route path="/albums" element={<AlbumList />} />
        <Route path="/albums/:albumId" element={<AlbumDetail />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:userId" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
