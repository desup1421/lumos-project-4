import React, { Component } from 'react';
import StudentsTable from '../components/StudentsTable';

class StudentsContainer extends Component {
  
  render() {
    return (
      <div>
        <StudentsTable 
          handleShowModal={this.props.handleShowModal}
          students={this.props.students}
          handleDelete={this.props.handleDelete}
          isSearch={this.props.isSearch}
          searchInput={this.props.searchInput}
          handleSearch={this.props.handleSearch}
          searchResults={this.props.searchResults}
        />
      </div>
    );
  }
}

export default StudentsContainer;