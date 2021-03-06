import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'react-native-paper';

import Search from './Search';
import ResultList from './List';
import Artist from '../interfaces/Artist';
import * as spotifyService from '../services/spotify';
import {Actions} from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cyan200,
    flex: 1,
  },
});

const ArtistPage = () => {
  const [artists, setArtists] = useState([] as Artist[]);
  const [query, setQuery] = useState('Shpongle');
  const [token, setToken] = useState('');

  const handleSearchChange = (artist: string) => {
    console.log(artist);
    setQuery(artist);
  };

  useEffect(() => {
    (async () => {
      const newToken = await spotifyService.getToken();
      setToken(newToken);
    })();
  }, []);

  const getArtists = async (): Promise<void> => {
    const newArtists = await spotifyService.searchArtists(1, 10, query, token);

    setArtists(newArtists);
  };

  useEffect(() => {
    getArtists();
  }, [query, token]);

  const handleShowAlbumsClicked = (artistId: string): void => {
    Actions.albums({artistId, token});
  };

  const handleShowTracksClicked = (artistId: string): void => {
    Actions.songs({artistId, token});
  };

  return (
    <View style={styles.container}>
      <Search onSearchChange={handleSearchChange} value={query} />
      <ResultList
        items={artists}
        onShowAlbums={handleShowAlbumsClicked}
        onShowTracks={handleShowTracksClicked}
        hasActions={true}
      />
    </View>
  );
};

export default ArtistPage;
