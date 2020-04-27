import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'react-native-paper';

import AppBar from './AppBar';
import ResultList from './List';
import * as spotifyService from '../services/spotify';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cyan200,
    flex: 1,
  },
});

const SongsPage = (props: Record<string, any>) => {
  const {artistId, token} = props;
  console.log('tokennn songs', token);
  const [songs, setSongs] = useState([]);
  const getSongs = async () => {
    const result = await spotifyService.getTopTracks(artistId, token);
    console.log('songss', result);
    setSongs(result);
  };

  useEffect(() => {
    getSongs();
  }, [artistId, token]);

  return (
    <View style={styles.container}>
      <AppBar location={'Albums'} />
      <ResultList items={songs} />
    </View>
  );
};

export default SongsPage;
