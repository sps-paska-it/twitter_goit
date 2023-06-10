import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    query: '',
  };
  handleInput = event => {
    // console.log(event.target.value);
    console.log(this);
    this.setState({ query: event.target.value });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    if (!this.state.query) {
      alert('Please enter a query');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <SearchFormStyled onSubmit={this.handleOnSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          onChange={this.handleInput}
          placeholder="What do you want to write?"
          name="search"
          required
          value={this.state.query}
          autoFocus
        />
      </SearchFormStyled>
    );
  }
}
