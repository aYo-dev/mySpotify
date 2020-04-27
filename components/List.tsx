import React, {ReactElement} from 'react';
import {FlatList, StyleSheet, Image, View} from 'react-native';
import {Card, IconButton} from 'react-native-paper';

const styles = StyleSheet.create({
  title: {
    marginLeft: 20,
  },
  card: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const ActionButtons = (props: Record<string, any>): ReactElement => {
  return (
    <View style={styles.buttonWrapper}>
      <IconButton
        icon="music-box-outline"
        size={30}
        onPress={() => props.onShowTracks(props.artistId)}
        color="white"
      />
      <IconButton
        icon="album"
        size={30}
        onPress={() => props.onShowAlbums(props.artistId)}
        color="white"
      />
    </View>
  );
};

const ListItem = (props: Record<string, any>): ReactElement => {
  return (
    <Card.Title
      style={styles.card}
      title={props.item.title}
      titleStyle={styles.title}
      left={() => (
        <Image style={styles.image} source={{uri: props.item.imageUri}} />
      )}
      right={() => props.hasActions ? (
        <ActionButtons
          onShowAlbums={props.onShowAlbums}
          onShowTracks={props.onShowTracks}
          artistId={props.artistId}
        />
        ) : undefined
      }
    />
  );
};

export default ({
  items,
  onShowAlbums,
  hasActions,
  onShowTracks,
}: any): ReactElement => (
  <FlatList
    data={items}
    renderItem={({item}) => (
      <ListItem
        item={item}
        onShowAlbums={onShowAlbums}
        onShowTracks={onShowTracks}
        artistId={item.id}
        hasActions={hasActions}
      />
    )}
    keyExtractor={(item) => item.id.toString()}
  />
);
