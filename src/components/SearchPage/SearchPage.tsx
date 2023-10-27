import { Component } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import Loader from '../Loader';
import { apiResponse } from '../../utils/types';

class SearchPage extends Component {
  static pageSize = 10;

  state = {
    loading: false,
    searchValue: localStorage.getItem('searchValue') || '',
    pageNumber: 0,
    searchResultsArray: [],
    errorOccured: false,
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
    this.setState({ loading: true });
    localStorage.setItem('searchValue', this.state.searchValue);
    const pageAddress = `https://stapi.co/api/v1/rest/animal/search?pageNumber=${this.state.pageNumber}&pageSize=${SearchPage.pageSize}`;
    try {
      const response = this.state.searchValue
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

      const json: apiResponse = await response.json();
      this.setState({ loading: false });
      this.setState({ searchResultsArray: json.animals });
    } catch {
      this.setState({ errorOccured: true });
    }
  };

  render() {
    if (this.state.errorOccured) {
      throw new Error("Hello, I'm Error with server!");
    }
    return (
      <>
        <main className="min-h-screen flex flex-col">
          <section className="bg-lime-200 py-10">
            <SearchForm
              searchValue={this.state.searchValue}
              changeSearchValue={this.changeSearchValue}
              search={this.search}
            />
          </section>
          <section className="search-results grow">
            <SearchResults searchResultsArray={this.state.searchResultsArray} />
          </section>
        </main>
        {this.state.loading && <Loader />}
      </>
    );
  }
}

export default SearchPage;
