import React, {ReactElement, Props} from 'react';
import {Searchbar} from 'react-native-paper';

interface SearchProps {
  onSearchChange: (t: string) => void;
  value: string;
}

const SearchBar = (props: SearchProps): ReactElement => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={props.onSearchChange}
      icon="magnify"
      value={props.value}
    />
  );
};

export default SearchBar;
