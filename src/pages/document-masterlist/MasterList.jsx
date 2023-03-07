import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, Form } from 'react-bootstrap'; 

const MasterList = () => {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage] = useState(5);
  const [titleFilter, setTitleFilter] = useState('');
  const [processFilter, setProcessFilter] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await axios.get('http://localhost:4000/documents');
      setDocuments(response.data.filter(d => d.published && d.active));
    };
    fetchDocuments();
  }, []);

  const filteredDocuments = documents
    .filter(d => d.title.toLowerCase().includes(titleFilter.toLowerCase()))
    .filter(d => processFilter === '' || d.processes.some(p => p.name.toLowerCase().includes(processFilter.toLowerCase())));

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);

  const paginate = (pageNumber) => setCurrentPage(pageNumber); 

  return (
    <>
      <Form>
        <Form.Group controlId="titleFilter">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Filter by title"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="processFilter">
          <Form.Label>Process:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Filter by process"
            value={processFilter}
            onChange={(e) => setProcessFilter(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Code</th>
            <th>Title</th>
            <th>Release Date</th>
            <th>Processes</th>
          </tr>
        </thead>
        <tbody>
          {currentDocuments.map((document) => (
            <tr key={document.id} onClick={() => { window.location = `/details/${document.id}` }}>
              <td>{document.code}</td>
              <td>{document.title}</td>
              <td>{document['release-date']}</td>
              <td>{document.processes.map((process) => process.name).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(Math.ceil(filteredDocuments.length / documentsPerPage)).keys()].map((pageNumber) => (
          <Pagination.Item  
            key={pageNumber + 1}  
            active={pageNumber + 1 === currentPage}   
            onClick={() => paginate(pageNumber + 1)}
          >
            {pageNumber + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default MasterList;
