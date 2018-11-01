import React, { Component } from 'react';
import {getMovies} from "../services/fakeMovieService";
import {getGenres} from "../services/fakeGenreService";
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable'
import _ from 'lodash';
class Movies extends Component {
	state = {
		selectedGenre : [],
		movies : [],
		genres : [],
		pageSize : 4,
		currentPage : 1,
		sortColumn : {path : 'title', order: 'asc'}
	};
	componentDidMount (){

		const genres = [{_id : '', name : 'All Genre'}, ...getGenres()]
		this.setState({movies : getMovies(), genres})
	}



	handleDelete = (movie) => {
		const movies = this.state.movies.filter(m => m._id !== movie._id);
		this.setState({movies });
	}

	handleLiked = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = {...movies[index]};
		movies[index].liked = !movies[index].liked;
		this.setState({movies});
	}
	handlePageChange = page => {
		this.setState({currentPage : page});
	}
	handleGenreSelect = genre => {
		this.setState({selectedGenre : genre, currentPage : 1});
	}
	handleSort = (sortColumn) => {
		this.setState({sortColumn})

	};
	getPageData = () => {
		const {pageSize,
			sortColumn ,
			selectedGenre, 
			currentPage, 
			movies: allMovies} = this.state;
		const filtered = selectedGenre  && selectedGenre._id ? 
		allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
		const movies = paginate(sorted , currentPage, pageSize);
		return {totalCount : filtered.length, data : movies}
	}

	render(){
		//object Destrusctring
		const {pageSize,
			 sortColumn ,
			 currentPage
			} = this.state;
		const {length: count} = this.state.movies;
		if(count === 0) return <p>There are no movies in the database.</p>;
		const {totalCount, data : movies} = this.getPageData()
		
		return(
			<div className = "row">
			<div className="col-3">
			<ListGroup 
			items = {this.state.genres} 
			onItemSelect = {this.handleGenreSelect}
			selectedItem = {this.state.selectedGenre}/>
			</div>
			<div className="col">
			<p>There are {totalCount} Showing movies in the database.</p>
			<MoviesTable movies = {movies} 
			onLike = {this.handleLiked} 
			sortColumn = {sortColumn}
			onDelete = {this.handleDelete}
			onSort = {this.handleSort}/>
			<Pagination 
			itemsCount = {totalCount} 
			pageSize = {pageSize} 
			currentPage = {currentPage}
			onPageChange = {this.handlePageChange}/>
			
			</div>
		 
			</div>

		)
	}
}
export default Movies;
