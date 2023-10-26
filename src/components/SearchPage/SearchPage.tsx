import { Component } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { apiResponse } from '../../utils/types';

class SearchPage extends Component {
  static pageSize = 10;

  state = {
    searchValue: localStorage.getItem('searchValue') || '',
    pageNumber: 0,
    searchResultsArray: [],
  };

  componentDidMount() {
    this.search();
  }

  changeSearchValue = (newValue: string) => {
    this.setState({
      searchValue: newValue,
    });
  };

  search = async () => {
    localStorage.setItem('searchValue', this.state.searchValue);
    const pageAddress = `https://stapi.co/api/v1/rest/animal/search?pageNumber=${this.state.pageNumber}&pageSize=${SearchPage.pageSize}`;
    const result = this.state.searchValue
      ? await fetch(pageAddress, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `${encodeURIComponent('name')}=${encodeURIComponent(
            this.state.searchValue
          )}`,
        })
      : await fetch(pageAddress, {
          method: 'GET',
        });
    const json: apiResponse = await result.json();
    console.log(this.state.searchResultsArray);
    this.setState({ searchResultsArray: json.animals });
  };

  render() {
    return (
      <main>
        <section className="bg-lime-200 py-10">
          <SearchForm
            searchValue={this.state.searchValue}
            changeSearchValue={this.changeSearchValue}
            search={this.search}
          />
        </section>
        <section>
          <SearchResults searchResultsArray={this.state.searchResultsArray} />
        </section>
      </main>
    );
  }
}

export default SearchPage;
