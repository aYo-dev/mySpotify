import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'react-native-paper';

import Search from './Search';
import AppBar from './AppBar';
import ResultList from './List';
import Artist from '../interfaces/Artist';
import * as spotifyService from '../services/spotify';

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
    console.log('go to albums page', artistId);
  };

  return (
    <View style={styles.container}>
      <AppBar location={'Home'} />
      <Search onSearchChange={handleSearchChange} value={query} />
      <ResultList items={artists} onShowAlbums={handleShowAlbumsClicked} />
    </View>
  );
};

export default ArtistPage;
