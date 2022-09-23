import { Box, Typography, SxProps } from '@mui/material'
import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

const contactPage = () => {
  return (
    <Box>
      <Header />
      <Box sx={mainBox}>
        <Typography sx={{ fontSize: '5em', color: 'white' }}>
          Mosaic
        </Typography>
      </Box>
      <Footer />
    </Box>
  )
}
const mainBox: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: { xs: '100px', md: '', lg: '300px' }
}



export default contactPage 