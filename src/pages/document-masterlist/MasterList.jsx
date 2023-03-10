import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, Form, Button } from 'react-bootstrap';

const MasterList = () => {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage] = useState(5);
  const [titleFilter, setTitleFilter] = useState('');
  const [processFilter, setProcessFilter] = useState('');

  async function handleClick() {
    
  }

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await axios.get('http://localhost:4000/documents');
      setDocuments(response.data.filter(d => d.published && d.active));
    };
    fetchDocuments();
  }, []);

  const filteredDocuments = documents
    .filter((d) => d.title.toLowerCase().includes(titleFilter.toLowerCase()))
    .filter(
      (d) =>
        processFilter === "" ||
        d.processes.some((p) =>
          p.name.toLowerCase().includes(processFilter.toLowerCase())
        )
    );

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleTitleFilter = () => {
    const newFilteredDocuments = documents
      .filter((d) => d.title.toLowerCase().includes(titleFilter.toLowerCase()))
      .filter(
        (d) =>
          processFilter === "" ||
          d.processes.some((p) =>
            p.name.toLowerCase().includes(processFilter.toLowerCase())
          )
      );
    setFilteredDocuments(newFilteredDocuments);
  };

  const handleProcessFilter = () => {
    const newFilteredDocuments = documents
      .filter((d) => d.title.toLowerCase().includes(titleFilter.toLowerCase()))
      .filter(
        (d) =>
          processFilter === "" ||
          d.processes.some((p) =>
            p.name.toLowerCase().includes(processFilter.toLowerCase())
          )
      );
    setFilteredDocuments(newFilteredDocuments);
  };

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
          <Button variant="primary" onClick={handleTitleFilter}>
            Filter Title
          </Button>
        </Form.Group>
        <Form.Group controlId="processFilter">
          <Form.Label>Process:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Filter by process"
            value={processFilter}
            onChange={(e) => setProcessFilter(e.target.value)}
          />
          <Button variant="primary" onClick={handleProcessFilter}>
            Filter Process
          </Button>
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
              <td>{document.code}</td>
              <td>{document.title}</td>
              <td>{document['release-date']}</td>
              <td>{document.processes.map((process) => process.name).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
    <Pagination.First onClick={() => paginate(1)} />
    <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
    {[...Array(Math.ceil(filteredDocuments.length / documentsPerPage)).keys()].map((number) => (
      <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
        {number + 1}
      </Pagination.Item>
    ))}
    <Pagination.Next onClick={() => paginate(currentPage + 1)} />
    <Pagination.Last onClick={() => paginate(Math.ceil(filteredDocuments.length / documentsPerPage))} />
  </Pagination>
</>
);
};

export default MasterList;