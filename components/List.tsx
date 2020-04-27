import {Card, Avatar} from 'react-native-paper';
import React, {ReactElement} from 'react';
import {FlatList, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  avatar: {
    marginLeft: 20,
  },
});

const ListItem = (props: Record<string, any>): ReactElement => {
  return (
    <Card.Title
      title={props.item.title}
      left={() => <Avatar.Image source={props.item.imageUri} size={54} />}
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
