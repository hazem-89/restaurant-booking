import { Box, SxProps, Typography } from '@mui/material'
import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

const ConfirmationPage = () => {
  return (
    <Box style={{ color: 'white' }}>
      <Box>
        <Header />
      </Box>
      <Box sx={mainBox}>
        <Typography sx={{ fontSize: '2em' }}>
          You reservation is done
        </Typography>
        <Typography>
          Thanks for choosing us
        </Typography>
      </Box>

      <Box>
        <Footer />
      </Box>
    </Box>
  )
}

export default ConfirmationPage


const mainBox: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: { xs: '100px', md: '', lg: '500px' }
}