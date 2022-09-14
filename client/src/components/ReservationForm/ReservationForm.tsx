import { useState } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SxProps } from '@mui/material';

const ReservationForm = () => {
  const [numberOfPersons, setNumberOfPersons] = useState('');
  const [date, setDate] = React.useState<Dayjs | null>(null);
  console.log(numberOfPersons);
  console.log(date);

  const handleChange = (event: SelectChangeEvent) => {
    setNumberOfPersons(event.target.value as string);
  };
  return (
    <Box sx={mainBox}>
      <Box sx={innerBox}>
        <Box sx={{ height: '200px', width: '150px' }}>
          <FormControl fullWidth sx={{ backgroundColor: '#1397B4', }}>
            <InputLabel id="demo-simple-select-label">Persons</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={numberOfPersons}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={1}>1 person</MenuItem>
              <MenuItem value={2}>2 persons</MenuItem>
              <MenuItem value={3}>3 persons</MenuItem>
              <MenuItem value={4}>4 persons</MenuItem>
              <MenuItem value={5}>5 persons</MenuItem>
              <MenuItem value={6}>6 persons</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ height: '200px', marginLeft: '1em' }} >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Choose a date "
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </Box >
  )
}

export default ReservationForm

const mainBox: SxProps = {
  color: 'black',
  backgroundColor: '#1397B4',
  minHeight: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
const innerBox: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}