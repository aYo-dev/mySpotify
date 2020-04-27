import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Search from './Search';
import AppBar from './AppBar';
import ResultList from './List';
import searchMock from '../mocks/artistsMock';
import Artist from '../interfaces/Artist';
import * as spotifyService from '../services/spotify';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
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

  const getMockAtrists = async (q: string) => {
    const newArtists = await searchMock({
      offset: 10,
      limit: 10,
      q,
    });

    setArtists(newArtists);
  };

  const getArtists = async () => {
    const newArtists = await spotifyService.searchArtists(1, 10, query, token);
    // getMockAtrists(query);
    setArtists(newArtists);
  };

  useEffect(() => {
    getArtists();
  }, [query, token]);

  return (
    <View style={styles.container}>
      <AppBar location={'Home'} />
      <Search onSearchChange={handleSearchChange} value={query} />
      <ResultList items={artists} />
    </View>
  );
};

export default ArtistPage;
