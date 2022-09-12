import { Box } from '@mui/material'
import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import MainPageHero from '../../components/MainPageHero/MainPageHero'
import Menu from '../../components/Menu/Menu'

const HomePage = () => {
  return (
    <Box>
      <Header />
      <MainPageHero />
      <Menu />
      <Footer />
    </Box>
  )
}

export default HomePage