import React from 'react';
import { Badge } from 'react-bootstrap';

const CustomEvent = ({ event }) => (
  <div style={{
    padding: '5px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    border: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    <span>{event.title}</span>
    <Badge bg="primary">{event.resourceId}</Badge>
  </div>
);

export default CustomEvent;
