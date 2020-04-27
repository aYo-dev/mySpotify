import React from 'react';
import {Scene, Router, Stack} from 'react-native-router-flux';

import ArtistPage from './components/ArtistsPage';
import AlbumsPage from './components/AlbumsPage';
import SongsPage from './components/SongsPage';

const Routes = () => (
  <Router>
    <Stack key="root">
      <Scene key="home" component={ArtistPage} title="Home" initial={true} />
      <Scene key="albums" component={AlbumsPage} title="Albums" />
      <Scene key="songs" component={SongsPage} title="Top songs" />
    </Stack>
  </Router>
);

export default Routes;
