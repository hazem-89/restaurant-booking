import { useState } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button, SxProps, Typography } from '@mui/material';
import axios from "axios";
import { ReservationsInterface, BookingInterface } from "../../Interfaces"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';



export interface ReservationsDetails {
  name: string;
  phone: string;
  email: string;
}
// form validate
type BookingSchemaType = Record<keyof ReservationsDetails, Yup.AnySchema>;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const BookingSchema = Yup.object().shape<BookingSchemaType>({
  name: Yup.string().required('Please enter your name.').min(4),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Please enter your phone.').test('len', 'phone number must be 10 characters', val => val?.length === 10),
  email: Yup.string().email().required('Please enter your email.'),
});

const emptyForm: ReservationsDetails = {
  name: '',
  phone: '',
  email: '',
};
interface Props {
  defaultReservationsDetails?: ReservationsDetails;
}

const ReservationForm = (_props: Props) => {
  const [numberOfPersons, setNumberOfPersons] = useState(0);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [chosenTime, setChosenTime] = useState('');
  const [allAvailableTables, setAllAvailableTables] = useState([]);
  const [tableId, setTableId] = useState('');
  const [error, setError] = useState('');
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);
  let nav = useNavigate();


  //  formik form 
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik<ReservationsDetails>({
      initialValues: emptyForm,
      validationSchema: BookingSchema,
      onSubmit: (ReservationsDetails, { resetForm }) => {
        setSubmitError(undefined);


        /** Register a new reservation */
        const createBooking = async () => {
          const newBooking: ReservationsInterface = {
            NOG: numberOfPersons,
            name: ReservationsDetails.name.toLowerCase(),
            phone: ReservationsDetails.phone,
            email: ReservationsDetails.email,
            date: chosenDate.toLocaleDateString(),
            time: chosenTime,
            tableId: tableId,
          };
          await axios
            .post<BookingInterface>("http://localhost:4000/api/newBooking", newBooking)
            .then((response) => {
              console.log(response);
              nav("/confirmation")
              resetForm();
              setAvailabilityOpen(false)
              setBookingFormOpen(false)

            })
            .catch((error) => {
              console.log(error);
            });

        };
        createBooking();
      },
    });

  /** Get all available tables */
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
          console.log(date);
          console.log(typeof data);
          if (response.data.availableTables.length <= 0) {
            const errText = "unfortunately we are fully booked, please chose a different Date"
            setError(errText)
          } else {
            setAllAvailableTables(data);
          }

        })
    } catch (error) {
      console.log("Failure", error);
    }
    console.log("date", date);
  }


  /** Compare dates and st chosen date*/
  const handelDate = (newDate: Date) => {
    setChosenDate(newDate)
    setError('')
  }


  /** Set chosen time */
  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setChosenTime(time);
  };

  /** Set number of the gusts */
  const handleNOGChange = ((e: { target: { value: any; }; }, child: any) => {
    const value = e.target.value;
    const gussetsNumber = parseInt(value)
    setNumberOfPersons(gussetsNumber);
  });

  return (
    <Box sx={mainBox}>
      {/* date bicker and number of gusts Box */}
      {!bookingFormOpen ?
        <Box sx={innerBox}>
          <Box sx={selectBox}>
            <Box sx={{ height: '300px', width: '150px' }}>
              <h5>Number of gusts</h5>
              <FormControl fullWidth sx={{ backgroundColor: '#1397B4', height: '100px' }}>
                <InputLabel id="demo-simple-select-label">Gusts</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={numberOfPersons}
                  label="Amount"
                  onChange={handleNOGChange}
                  sx={{ height: '50px' }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* DatePicker */}
            <Box sx={{ height: '300px', marginLeft: '1em' }} >
              <Box>
                <h5>Please chose a date</h5>
              </Box>
              <DatePicker
                selected={chosenDate}
                onChange={handelDate}
                minDate={new Date()}
              />
            </Box>
          </Box>
          <Box>
            {/* check Available Tables button */}
            <Box>
              <Button
                variant="contained"
                disabled={!numberOfPersons || error !== ''}
                onClick={() => {
                  getAvailableTables()
                  setAvailabilityOpen(true)
                }
                }
                sx={button}
              >
                Confirm
              </Button>
            </Box>
          </Box>

        </Box>
        : null}

      {allAvailableTables.length !== 0 && availabilityOpen ?
        <Box sx={maineTablesBox}>
          <Box  >
            <h1 style={{ color: 'white' }}>allAvailableTables</h1>
          </Box>
          <Box sx={AllTables}>
            {allAvailableTables.map((table: any) => (
              <Box sx={tableBox} key={table.tableId}>
                <p style={{ color: 'white' }}>{table.tableName.charAt(0).toUpperCase() + table.tableName.slice(1)}</p>
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
          </Box>
          <Box>
            <Button
              disabled={!chosenTime}
              type="submit"
              value="Send"
              variant="contained"
              onClick={() => {
                setBookingFormOpen(true)
                setAvailabilityOpen(false)

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
                setAvailabilityOpen(false)
                setAllAvailableTables([])
              }}
              sx={cancelButton}
            >
              Cancel
            </Button>
          </Box>
        </Box>
        : null
      }

      {bookingFormOpen ?
        // Form Box
        <Box>
          <form onSubmit={handleSubmit}>
            {/* Display error if invalid input */}
            {!!submitError && (
              <Typography sx={{ color: 'red' }}>{submitError}</Typography>
            )}
            <Box sx={formBox}>
              <p className='title'>
                Your contact information
              </p>
              <TextField
                id="name"
                name="name"
                label="Name"
                type="text"
                required
                value={values.name}
                onChange={handleChange}
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={textArea}
                onBlur={handleBlur}
              />
              <TextField
                id="Phone"
                name="phone"
                label="Phone"
                type="text"
                value={values.phone}
                required
                onChange={handleChange}
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={textArea}
                onBlur={handleBlur}
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                type="text"
                value={values.email}
                required
                onChange={handleChange}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={textArea}
                onBlur={handleBlur}
              />
              <Box>
                <Button
                  type="submit"
                  value="Send"
                  variant="contained"
                  // onClick={() => {
                  //   setAvailabilityOpen(false)
                  //   setBookingFormOpen(false)
                  //   window.location.href = "/confirmation"
                  // }}
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

          </form>

        </Box>
        : null
      }
      <Box sx={errBox}>
        {error ?
          <Box>
            <p>{error}</p>
          </Box> : null}
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
  justifyContent: 'center',
  position: 'relative',
  maxWidth: "1600px"
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
// availableTables style
const maineTablesBox: SxProps = {
  position: 'absolute',
  left: ' 50%',
  top: '0',
  transform: 'translateX(-50%)',
  width: { xs: '100px', md: '600px', lg: '1200px' },
  height: { xs: '100px', md: '600px', lg: '800px' },
  backgroundColor: 'black',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  "&:hover": {
    border: "1px solid red",
  },
}
const AllTables: SxProps = {
  // width: { xs: '100px', md: '600px', lg: '800px' },
  height: { xs: '100px', md: '600px', lg: '600px' },
  color: 'white',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
}
const tableBox: SxProps = {
  flex: '1 0 20%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}

const errBox: SxProps = {
  position: 'absolute',
  transform: 'translateX(-50%)',
  left: ' 50%',
  bottom: '3em',
  color: 'red',
  fontSize: '1.2em',
  fontweight: 'bold',
  textTransform: 'uppercase',
  width: { xs: '100px', md: '600px', lg: '700px' },
  backgroundColor: 'rgb(55, 55, 50)',
  textAlign: 'center',
  userSelect: 'none',
}


