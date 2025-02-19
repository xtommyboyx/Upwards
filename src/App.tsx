import './styles/base.css';
import './styles/layout.css';
import './styles/components/AlbumCard.css';
import './styles/components/AlbumDetails.css';
import './styles/components/Modal.css';
import './styles/components/SearchBar.css';
import './styles/components/Pagination.css';

import AlbumList from "./components/AlbumList";

function App() {
  return (
    <div className="App">
      <h1>iTunes Top Albums</h1>
      <AlbumList />
    </div>
  );
}

export default App;
