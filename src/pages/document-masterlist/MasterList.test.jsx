import React from 'react';
import { render } from '@testing-library/react';
import MasterList from './MasterList';

test('renders documents correctly', () => {
  const documents = [
    {
      id: 1,
      code: 'DOC-001',
      title: 'Document 1',
      'release-date': '2021-01-01',
      processes: [{ name: 'Process A' }, { name: 'Process B' }]
    },
    {
      id: 2,
      code: 'DOC-002',
      title: 'Document 2',
      'release-date': '2021-02-01',
      processes: [{ name: 'Process C' }, { name: 'Process D' }]
    }
  ];
  const { getByText } = render(<MasterList />);
  documents.forEach((doc) => {
    const codeElement = getByText(doc.code);
    const titleElement = getByText(doc.title);
    const dateElement = getByText(doc['release-date']);
    const processesElement = getByText(doc.processes.map((p) => p.name).join(', '));
    expect(codeElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
    expect(processesElement).toBeInTheDocument();
  });
});

