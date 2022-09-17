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
import { Button, SxProps } from '@mui/material';

const ReservationForm = () => {
  const [numberOfPersons, setNumberOfPersons] = useState('');
  const [date, setDate] = React.useState<Dayjs | null>(null);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  console.log(name, phoneNum, email);
  console.log(date);


  const handleChange = (event: SelectChangeEvent) => {
    setNumberOfPersons(event.target.value as string);
  };
  return (
    <Box sx={mainBox}>
      {!bookingFormOpen ?
        <Box sx={innerBox}>
          <Box sx={selectBox}>
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
          <Box>
            {date && numberOfPersons ? <Box>
              <Button
                variant="contained"
                onClick={() => setBookingFormOpen(true)}
                sx={button}
              >
                Confirm
              </Button>
            </Box> : null
            }
          </Box>
        </Box>
        : null}


      {bookingFormOpen ?
        // Form Box
        <Box>
          <Box sx={formBox}>
            <p className='title'>
              Your contact information
            </p>
            <TextField
              id="name-input"
              name="from_name"
              label="Name"
              type="text"
              required
              onChange={(newValue) => setName(newValue.target.value)}
              sx={textArea}
            />
            <TextField
              id="name-input"
              name="phone"
              label="Phone"
              type="phone"
              required
              onChange={(newValue) => setPhoneNum(newValue.target.value)}
              sx={textArea}
            />
            <TextField
              id="name-input"
              name="email"
              label="Email"
              type="email"
              required
              onChange={(newValue) => setEmail(newValue.target.value)}
              sx={textArea}
            />
            <Box>
              <Button
                type="submit"
                value="Send"
                variant="contained"
                onClick={() => {
                  window.location.href = "/confirmation"
                }}
                sx={button}
              >
                Confirm
              </Button>
              <Button
                type="submit"
                value="Send"
                variant="contained"
                onClick={() => {
                  setBookingFormOpen(false)
                }}
                sx={cancelButton}
              >
                Cancel
              </Button>
            </Box>

          </Box>
        </Box>
        : null
      }
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
  justifyContent: 'center',
  position: 'relative'
}
const innerBox: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
}
const selectBox: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
const formBox: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  minHeight: { xs: '450px', md: '400px', lg: '600px' },
  minWidth: { xs: '350px', md: '500px', lg: '600px' },
  maxWidth: { xs: '350px', md: '500px', lg: '600px' },
  borderRadius: '1em',
  marginLeft: { xs: '20px', md: '0px', lg: '0px' },
  marginTop: { xs: '100px', md: '0px', lg: '0px' },
  backgroundColor: '#f1f1f1',
}

const textArea: SxProps = {
  minWidth: { xs: '300px', md: '400px', lg: '400px' },
  maxWidth: { xs: '300px', md: '400px', lg: '400px' },
  marginBottom: '1em',
  color: 'white'
}

const button: SxProps = {
  minWidth: { xs: '100px', md: '200px', lg: '150px' },
  backgroundColor: 'rgb(2, 105, 62)',
  color: 'white',
  borderRadius: '.5em',
  textDecoration: 'none',
  "&:hover": {
    border: "1px solid #00FF00",
    backgroundColor: 'rgb(6, 153, 58)'
  },
}
const cancelButton: SxProps = {
  minWidth: { xs: '100px', md: '200px', lg: '150px' },
  marginLeft: '.5em',
  backgroundColor: 'rgb(148, 14, 4)',
  color: 'white',
  borderRadius: '.5em',
  textDecoration: 'none',
  "&:hover": {
    border: "1px solid red",
    backgroundColor: 'rgb(219, 23, 9)'
  },
}