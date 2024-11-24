import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
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

  const shouldDisableTime = (time) => {
    const hour = time.hour();
    return hour < 6 || hour > 22;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box sx={{  display: 'flex', flexDirection: 'column', gap: 2 }}>
        <MobileDateTimePicker
          openTo="day"
          ampm={false}
          value={selectedDateTime}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params}
             />}
          shouldDisableTime={shouldDisableTime}
          disablePast
        />
      </Box>
    </LocalizationProvider>
  );
}
