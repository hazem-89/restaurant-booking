import { Box } from '@mui/material'
import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import ReservationForm from '../../components/ReservationForm/ReservationForm'

const Reservation = () => {
  return (
    <Box>
      <Header />
      <ReservationForm />
      <Footer />
    </Box>
  )
}

export default Reservation