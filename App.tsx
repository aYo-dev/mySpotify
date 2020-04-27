import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import ArtistPage from './components/ArtistsPage';


const App = () => (
  <PaperProvider>
    <ArtistPage />
  </PaperProvider>
);

export default App;
