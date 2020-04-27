import React from 'react';
import {Scene, Router, Stack} from 'react-native-router-flux';

import ArtistPage from './components/ArtistsPage';
import AlbumsPage from './components/AlbumsPage';

const Routes = () => (
  <Router>
    <Stack key="root">
      <Scene key="home" component={ArtistPage} title="Home" initial={true} />
      <Scene key="albums" component={AlbumsPage} title="Albums" />
    </Stack>
  </Router>
);

export default Routes;
