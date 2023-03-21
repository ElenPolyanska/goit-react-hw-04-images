import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import { Header, Form, Input, SearchBtn } from './Searchbar.styled';

export const Searchbar = ({ handleSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleSearch = e => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      return toast.info('Необхідно ввести слово для пошуку');
    }

    handleSubmit(inputValue);
    setInputValue('');
  };

  return (
    <Header>
      <Form onSubmit={handleSearch}>
        <Input onChange={handleChange} value={inputValue} />
        <SearchBtn>
          <FaSearch />
        </SearchBtn>
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
