import React, { Component } from 'react'

export class Searchbar extends Component {

    state = {
        term: ''
    }

    onInputChange = (e) => {
        this.setState({ term: e.target.value });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.term);
    };

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <input type="text" placeholder="Search..." className="searchbar" value={this.state.term} onChange={this.onInputChange}/>
            </form>
        )
    }
}

export default Searchbar;
