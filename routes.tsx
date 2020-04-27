import React from 'react';
import {Scene, Router, Stack} from 'react-native-router-flux';

import ArtistPage from './components/ArtistsPage';

const Routes = () => (
  <Router>
    <Stack key="root">
      <Scene key="home" component={ArtistPage} title="Home" initial={true} />
    </Stack>
  </Router>
);

export default Routes;
