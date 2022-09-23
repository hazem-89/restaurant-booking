import { Box, Button, SxProps, TextField, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import DeleteIcon from '@mui/icons-material/Delete';
const AminPage = () => {
  // const [chosenDate, setChosenDate] = useState(new Date());
  const [allBookings, setAllBookings] = useState([]);
  const [openAllBookings, setOpenAllBookings] = useState(false);
  const [searchedByName, setSearchedByName] = useState([{}]);
  const [searchedBox, setSearchedBox] = useState(false);
  const [name, setName] = useState('');
  const [selectedBooking, setSelectedBooking] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)


  /** Get All Bookings */
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `http://localhost:4000/api/bookings`
      );
      setAllBookings(data);

    }
    fetchData()
  }, [])

  /** Search for bookings by name*/
  const searchByName = () => {
    const data: any[] = allBookings
    const foundByName = data.filter(booking => booking.name.toLowerCase().indexOf(name) !== -1)
    console.log(foundByName);
    setSearchedByName(foundByName)
    setSearchedBox(true)
  }

  /** Handel name of the booking */
  const handleChange = (e: { target: { value: any; }; }) => {
    const searchName = e.target.value
    setName(searchName)
  }

  /** Edit booking */
  // async function editBooking() {
  //   await axios.put("http://localhost:4000/bookings/" + selectedBooking, {

  //   }, {
  //     withCredentials: true
  //   }).then((res: AxiosResponse) => {
  //     window.location.reload();
  //     console.log('suc');
  //   }, () => {
  //     console.log("Failure");
  //   })
  // }

  async function deleteBooking() {
    await axios.delete("http://localhost:4000/api/" + selectedBooking,).then((res: AxiosResponse) => {
      window.location.reload();
      console.log('suc');
    }, () => {
      console.log("Failure");
    })
  }
  return (
    <Box  >
      <Header />
      <Box sx={mainBox}>
        <Box sx={mainSearchBox}>
          <Box>
            <Button
              type="submit"
              value="Send"
              variant="contained"
              onClick={() => {
                setOpenAllBookings(true);
                setSearchedBox(false)
              }}
            >
              Get all Bookings
            </Button>
          </Box>
          <Box sx={searchBox}>
            <Box>
              <h5>Search by name</h5>
            </Box>
            <Box>
              <TextField
                id="name"
                name="name"
                label="Name"
                type="text"
                required
                value={name}
                onChange={handleChange}
                sx={textArea}
              />
            </Box>
            <Box>
              <Button
                type="submit"
                value="Send"
                variant="contained"
                onClick={() => {
                  // fetchData();
                  searchByName()
                  setOpenAllBookings(false);
                }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={resultsBox}>
          {allBookings.length > 0 ?
            <Box sx={allBookingsBox}>
              {allBookings.map((booking: any) => (
                <Box sx={allBookingsInnerBox} key={booking._id}>
                  <Box >
                    <Typography variant="h6">
                      Name: {booking.name} <br />
                      Phone: {booking.phone} <br />
                      email: {booking.email} <br />
                    </Typography>
                    <Typography  >Date : {booking.date.toString().substring(0, 10)}</Typography>
                    <Typography> Time: {booking.time}</Typography>
                    <Typography>Number of gusts: {booking.NOG}</Typography>
                  </Box>

                  <DeleteIcon
                    style={{ fill: 'red', width: '30px', height: '40px', cursor: 'pointer' }}
                    onClick={() => {
                      setIsDeleting(true)
                      setSelectedBooking(booking._id)
                      console.log(booking._id);
                    }}

                  />
                  <br />
                  <br />
                  <br />
                </Box>
              ))}

            </Box> : null
          };
          {/* Delete Box */}
          {isDeleting ?
            <Box sx={deleteBox}>
              <Box sx={innerDeleteBox}>
                <Typography sx={{ color: '#f1f1f1' }}>
                  Are you sure you want to delete this Booking?
                </Typography>
                <Box sx={buttonBox}>
                  <Button
                    type="submit"
                    value="Send"
                    variant="contained"
                    sx={button}
                    onClick={() => {
                      deleteBooking()
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    type="submit"
                    value="Send"
                    variant="contained"
                    sx={cancelButton}
                    onClick={() => {
                      setIsDeleting(false)
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>

            </Box> : null}
          <Box sx={byNameBox}>
            {searchedBox ?
              <Box sx={allBookingsBox}>
                {searchedByName.map((booking: any) => (
                  <Box sx={allBookingsInnerBox} key={booking._id}>
                    <Box sx={{ color: '#f1f1f1' }} >
                      <Typography variant="h6">
                        Name: {booking.name} <br />
                        Phone: {booking.phone} <br />
                        email: {booking.email} <br />
                      </Typography>
                      <Typography  >Date : {booking.date.toString().substring(0, 10)}</Typography>
                      <Typography> Time: {booking.time}</Typography>
                      <Typography>Number of gusts: {booking.NOG}</Typography>
                    </Box>
                    <DeleteIcon
                      style={{ fill: 'red', width: '30px', height: '40px' }}
                      onClick={() => {
                        setIsDeleting(true)
                        setSelectedBooking(booking._id)
                        console.log(booking._id);

                      }} />
                    <br />
                    <br />
                    <br />
                  </Box>
                ))}
              </Box>
              : null}
          </Box>

        </Box>
      </Box>
      <Footer />
    </Box>
  )
}


const mainBox: SxProps = {
  minHeight: { xs: '300px', md: '400px', lg: '1000px' },
  display: "flex",
  alignItems: "center",
  // justifyContent: "center",
  flexDirection: 'column',
  maxWidth: "1600px",
}
const mainSearchBox: SxProps = {
  width: { xs: '100%', md: '100%', lg: '100%' },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f1f1f1",

}
const searchBox: SxProps = {
  minWidth: { xs: '300px', md: '400px', lg: '400px' },
  minHeight: { xs: '300px', md: '400px', lg: '300px' },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: 'column',
}
const textArea: SxProps = {
  minWidth: { xs: '200px', md: '300px', lg: '300px' },
  marginBottom: '1em',
  color: 'white',
}
const resultsBox: SxProps = {

}
const allBookingsBox: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '1300px',
  flexWrap: 'wrap',
  paddingTop: '5em'
}
const allBookingsInnerBox: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  flexDirection: 'column',
  color: '#f1f1f1',
  flex: '1 0 30%',
  paddingLeft: '2em',

}

const byNameBox: SxProps = {

}

const deleteBox: SxProps = {
  position: 'absolute',
  left: ' 50%',
  top: ' 50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#022F3E',
  width: '500px',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const innerDeleteBox: SxProps = {
  width: '500px',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}
const buttonBox: SxProps = {
  marginTop: '1em',
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

export default AminPage 