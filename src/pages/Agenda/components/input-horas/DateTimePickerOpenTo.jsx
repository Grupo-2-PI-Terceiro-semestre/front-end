import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importar a localidade PT-BR
import './style.css';

// Configurar o Day.js para usar a localidade PT-BR
dayjs.locale('pt-br');

export default function DateTimePickerOpenTo({ valordefault }) {
  // Converte o valordefault para um objeto dayjs, se não for null
  const [selectedDateTime, setSelectedDateTime] = React.useState(valordefault ? dayjs(valordefault) : null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <DateTimePicker
          openTo="day"
          ampm={false}
          value={selectedDateTime}
          onChange={(newValue) => setSelectedDateTime(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
}
