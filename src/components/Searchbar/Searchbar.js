import PropTypes from 'prop-types';
import { ErrorMessage, Formik } from 'formik';
import { object, string } from 'yup';
import { GoSearch } from 'react-icons/go';
import { toast } from 'react-toastify';
import {
  SearchbarBox,
  SearchbarInput,
  SearchButton,
  SearchForm,
} from './Searchbar.styled';

const initialValues = { query: '' };
const userSchema = object({ query: string() });

  export default function SearchBar({
  searchQuery,
  setSearchQuery,
  setIsBtnLoadMoreVisible,
  resetPage,
  resetImages,
}) 

  render() {
    const { newSearchQuery } = this.state;
    return (
      <SearchbarBox>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <GoSearch />
          </SearchButton>
          <SearchbarInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search Images and photos"
            value={newSearchQuery}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchbarBox>
    );
  }
}

Searchbar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
