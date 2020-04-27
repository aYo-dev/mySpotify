import React, {ReactElement} from 'react';
import {Appbar} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';

const AppBar = (props: Record<string, any>): ReactElement => {
  return (
    <Appbar>
      <Appbar.Action icon="home" onPress={() => Actions.push('Home')} />
      <Appbar.Content title={props.location} />
    </Appbar>
  );
};

export default AppBar;
