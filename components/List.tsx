import {Card} from 'react-native-paper';
import React, {ReactElement} from 'react';
import {FlatList, StyleSheet, Image} from 'react-native';

const styles = StyleSheet.create({
  avatar: {
    marginLeft: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});

const ListItem = (props: Record<string, any>): ReactElement => {
  return (
    <Card.Title
      title={props.item.title}
      left={() => (
        <Image style={styles.image} source={{uri: props.item.imageUri}} />
      )}
      titleStyle={styles.avatar}
    />
  );
};

export default ({items}: any): ReactElement => (
  <FlatList
    data={items}
    renderItem={({item}) => <ListItem item={item} />}
    keyExtractor={(item) => item.id.toString()}
  />
);
