
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination } from 'react-bootstrap';


const MasterList = () => {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage, setDocumentsPerPage] = useState(5);
  const [titleFilter, setTitleFilter] = useState('');
  const [processFilter, setProcessFilter] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
        const response = await axios.get('http://localhost:4000/documents');
        setDocuments(response.data.slice(0, documentsPerPage));
      };
     fetchDocuments()      
  }, []);

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(indexOfFirstDocument, indexOfLastDocument);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
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
            <tr key={document.id}>
              <td>{document.code}</td>
              <td>{document.title}</td>
              <td>{document['release-date']}</td>
              <td>{document.processes.map((process) => process.name).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(Math.ceil(documents.length / documentsPerPage)).keys()].map((pageNumber) => (
          <Pagination.Item  

          key={pageNumber + 1}  
          active={pageNumber + 1 === currentPage}   
          onClick={() =>    
          paginate(pageNumber + 1)}>
            {pageNumber + 1}
            
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default MasterList;
