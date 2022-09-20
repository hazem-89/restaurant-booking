import { useState } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import DatePicker from "react-datepicker";
import { Button, SxProps } from '@mui/material';
import axios, { AxiosResponse } from "axios";
import { ReservationsInterface, BookingInterface } from "../../Interfaces"
import "react-datepicker/dist/react-datepicker.css";


const ReservationForm = () => {
  const [numberOfPersons, setNumberOfPersons] = useState(0);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [chosenTime, setChosenTime] = useState('');
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [allAvailableTables, setAllAvailableTables] = useState([]);
  const [tableId, setTableId] = useState('');
  const [error, setError] = useState('');
  console.log(name, phoneNum, email);


  const getAvailableTables = () => {
    const date = chosenDate.toLocaleDateString();
    try {
      axios
        .post(`http://localhost:4000/api/availability`, {
          date: date
        })
        .then((response) => {
          const data = response.data.availableTables
          console.log(data);
          console.log();
          console.log(typeof data);
          setAllAvailableTables(data);

        })
    } catch (error) {
      console.log("Failure", error);
    }


    console.log("date", date);
  }
  const createBooking = () => {
    // registered customer
    const newBooking: ReservationsInterface = {
      NOG: numberOfPersons,
      name: name,
      phone: phoneNum,
      date: chosenDate.toLocaleDateString(),
      time: chosenTime,
      tableId: tableId
    };
    axios
      .post<BookingInterface>("http://localhost:4000/api/newBooking", newBooking)
      .then((response) => {
        console.log(response);


      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handelDate = (newDate: Date) => {
    const curDate = new Date(new Date().toString().substring(0, 15))
    if (newDate > curDate) {
      setChosenDate(newDate)
      console.log("bigger");
      setError('')

    } else {

      const errText = "The date has passed, please give a new date"
      setError(errText)
      console.log("lower");
      console.log(curDate);
      console.log(newDate);
    }
  }
  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setChosenTime(time);
  };
  const handleChange = ((e: { target: { value: any; }; }, child: any) => {
    const value = e.target.value;
    const gussetsNumber = parseInt(value)
    setNumberOfPersons(gussetsNumber);
  });
  return (
    <Box sx={mainBox}>
      {!bookingFormOpen ?
        <Box sx={innerBox}>
          <Box sx={selectBox}>
            <Box sx={{ height: '300px', width: '150px' }}>
              <h5>Number of gusts</h5>
              <FormControl fullWidth sx={{ backgroundColor: '#1397B4', }}>
                <InputLabel id="demo-simple-select-label">Persons</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={numberOfPersons}
                  label="Amount"
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

            <Box sx={{ height: '300px', marginLeft: '1em' }} >
              <Box>
                <h5>Please chose a date</h5>
              </Box>
              <DatePicker selected={chosenDate} onChange={handelDate} />
            </Box>
          </Box>
          <Box>
            {chosenDate && numberOfPersons && error === '' ? <Box>
              <Button
                variant="contained"
                onClick={() => {
                  getAvailableTables()
                  // setBookingFormOpen(true)
                }
                }
                sx={button}
              >
                Confirm
              </Button>
            </Box> : null
            }
          </Box>
        </Box>
        : null}
      {error ? <Box>
        <p>{error}</p>
      </Box> : null}
      {allAvailableTables.length !== 0 ?
        <Box sx={{ backgroundColor: "black", width: "1000px", height: "1500px", color: "white" }}>
          <h1 style={{ color: 'white' }}>allAvailableTables</h1>
          {allAvailableTables.map((table: any) => (
            <Box key={table.tableId}>
              <p style={{ color: 'white' }}>{table.tableName}</p>
              {table.isAvailableAt18 ?
                <Box
                  onClick={() => setTableId(table.tableId)}
                >
                  <input
                    type="radio"
                    id="18:00"
                    name="time"
                    value="18:00"
                    checked={chosenTime === "18:00"}
                    onChange={handleTime}
                  ></input>
                  <label>18:00</label>
                </Box> : <p>no 18</p>
              }
              {table.isAvailableAt21 ?
                <Box
                  onClick={() => setTableId(table.tableId)}
                >
                  <input
                    type="radio"
                    id="21:00"
                    name="time"
                    value="21:00"
                    checked={chosenTime === "21:00"}
                    onChange={handleTime}
                  ></input>
                  <label>21:00</label>
                </Box>
                : <p>no 21</p>}
            </Box>
          ))}
          <Box>
            <Button
              type="submit"
              value="Send"
              variant="contained"
              onClick={() => {
                setBookingFormOpen(true)
              }}
              sx={button}
            >
              Confirm
            </Button>
          </Box>
        </Box>
        : null
      }

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
              onChange={(newValue: { target: { value: React.SetStateAction<string>; }; }) => setName(newValue.target.value)}
              sx={textArea}
            />
            <TextField
              id="name-input"
              name="phone"
              label="Phone"
              type="phone"
              required
              onChange={(newValue: { target: { value: React.SetStateAction<string>; }; }) => setPhoneNum(newValue.target.value)}
              sx={textArea}
            />
            <TextField
              id="name-input"
              name="email"
              label="Email"
              type="email"
              required
              onChange={(newValue: { target: { value: React.SetStateAction<string>; }; }) => setEmail(newValue.target.value)}
              sx={textArea}
            />
            <Box>
              <Box>

                <br></br>

              </Box>
              <Button
                type="submit"
                value="Send"
                variant="contained"
                onClick={() => {
                  createBooking()
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
  justifyContent: 'center',
  maxHeight: '200px'

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