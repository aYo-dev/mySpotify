/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Provider as PaperProvider} from 'react-native-paper';

import Search from './components/Search';
import AppBar from './components/AppBar';
import ResultList from './components/List';
import searchMock from './mocks/artistsMock';
import Artist from './interfaces/Artist';
import * as spotifyService from './services/spotify';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
  },
});

const App = () => {
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
  }, [query]);

  const getSongs = async (q: string) => {
    const newArtists = await searchMock({
      offset: 10,
      limit: 10,
      q,
    });

    setArtists(newArtists);
  };

  useEffect(() => {
    // console.log('search');
    getSongs(query);
  }, [query]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <AppBar location={'Home'} />
        <Search onSearchChange={handleSearchChange} value={query} />
        <ResultList items={artists} />
      </View>
    </PaperProvider>
  );
};

export default App;
