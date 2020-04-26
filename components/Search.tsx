import React, {ReactElement} from 'react';
import {Searchbar} from 'react-native-paper';

const SearchBar = (): ReactElement => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={() => console.log('search')}
      value=""
      icon="magnify"
    />
  );
};

export default SearchBar;
