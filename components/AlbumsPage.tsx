import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'react-native-paper';

import ResultList from './List';
import * as spotifyService from '../services/spotify';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cyan200,
    flex: 1,
  },
});

const AlbumsPage = (props: Record<string, any>) => {
  const {artistId, token} = props;
  console.log('tokennn', token);
  const [albums, setAlbums] = useState([]);
  const getAlbums = async () => {
    const result = await spotifyService.getAlbums(artistId, token);
    console.log('albumsss', result);
    setAlbums(result);
  };

  useEffect(() => {
    getAlbums();
  }, [artistId, token]);

  return (
    <View style={styles.container}>
      <ResultList items={albums} onShowAlbums={() => false} />
    </View>
  );
};

export default AlbumsPage;
