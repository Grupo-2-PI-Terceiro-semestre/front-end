const events = [
  {
    id: 1,  
    title: 'Surgery',
    start: new Date(2024, 8, 28, 9, 0),
    end: new Date(2024, 8, 28, 11, 0),
    resourceId: '1',
  },
  {
    id: 2, 
    title: 'Rounds',
    start: new Date(2024, 8, 28, 9, 0),
    end: new Date(2024, 8, 28, 12, 0),
    resourceId: '2',
  },
  {
    id: 3,  
    title: 'Staff Meeting',
    start: new Date(2024, 8, 29, 9, 0),
    end: new Date(2024, 8, 29, 10, 0),
    resourceId: '1',
  },
];

const resources = [
  {
    id: '1',
    title: 'Jenny Brown',
  },
  {
    id: '2',
    title: 'John Smith',
  },
  {
    id: '3',
    title: 'John Smith',
  },
  {
    id: '4',
    title: 'John Smith',
  },
  {
    id: '5',
    title: 'John Smith',
  },
  {
    id: '6',
    title: 'John Smith',
  },

];

export { events, resources };
