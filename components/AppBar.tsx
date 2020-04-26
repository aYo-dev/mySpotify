import React, {ReactElement} from 'react';
import {Appbar} from 'react-native-paper';

const AppBar = (props: Record<string, any>): ReactElement => {
  return (
    <Appbar>
      <Appbar.Action
        icon="home"
        onPress={() => console.log('I am going home')}
      />
      <Appbar.Content title={props.location} />
    </Appbar>
  );
};

export default AppBar;
