const events = [
    {
      title: 'Surgery',
      start: new Date(2024, 8, 5, 9, 0),  // 9 de Setembro de 2024 às 09:00
      end: new Date(2024, 8, 5, 11, 0),   // 9 de Setembro de 2024 às 11:00
      resourceId: '1',  // Identificador do funcionário
    },
    {
      title: 'Rounds',
      start: new Date(2024, 8, 5, 9, 0), // 12 de Setembro de 2024 às 09:00
      end: new Date(2024, 8, 5, 12, 0),  // 12 de Setembro de 2024 às 12:00
      resourceId: '2',  // Identificador do funcionário
    },
    {
      title: 'Staff Meeting',
      start: new Date(2024, 8, 5, 9, 0), // 13 de Setembro de 2024 às 09:00
      end: new Date(2024, 8, 5, 10, 0),  // 13 de Setembro de 2024 às 10:00
      resourceId: '1',  // Identificador do funcionário
    },
  ];
  
  const resources = [
    {
      id: '1',
      title: 'Jenny Brown',
    },

  ];
  
  export { events, resources };
  