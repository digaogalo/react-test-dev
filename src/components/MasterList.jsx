import React, { Component } from 'react';
import axios from 'axios';

class MasterList extends Component {
  state = {
    documents: []
  }

  componentDidMount() {
    axios.get('http://localhost:4000')
      .then(res => {
        this.setState({ document: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { document } = this.state;

    return (
      <ul>
        {document.map(documents => (
          <li key={documents.id}>
            <p>Código: {documents.code}</p>
            <p>Título: {documents.title}</p>
            <p>Data de Publicação: {documents.release-date}</p>
            <p>Processos: {documents.processes}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default MasterList;
