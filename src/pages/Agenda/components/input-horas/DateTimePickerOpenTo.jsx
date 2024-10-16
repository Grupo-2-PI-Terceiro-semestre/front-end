import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import './style.css';

dayjs.locale('pt-br');

export default function DateTimePickerOpenTo({ valordefault, onChange }) {
  const [selectedDateTime, setSelectedDateTime] = React.useState(
    valordefault ? dayjs(valordefault) : null
  );

  const handleDateChange = (newValue) => {
    setSelectedDateTime(newValue);
    onChange(newValue); 
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <DateTimePicker
          openTo="day"
          ampm={false}
          value={selectedDateTime}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
}
