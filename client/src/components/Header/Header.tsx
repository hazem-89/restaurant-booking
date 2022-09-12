import { Box, SxProps, Typography } from '@mui/material'


//logo
import logo from '../../assets/img/logo2.jpg'

const Header = () => {
  return (
    <Box sx={mainBox}>
      <Box sx={logoBox}>
        <img src={logo} alt="logo" style={{ width: '50px', height: '50px', marginLeft: '1em', }} />
        <Typography sx={{ color: '#f1f1f1', fontSize: '2em', textAlign: 'center', paddingLeft: '.5em' }}>
          Mosaic
        </Typography>
      </Box>
      <Box sx={navText}>
        <Typography>
          Home
        </Typography>
        <Typography>
          Reservation
        </Typography>
        <Typography>
          About
        </Typography>
      </Box>
    </Box>
  )
}

const mainBox: SxProps = {
  height: '100px',
  width: '100%',
  backgroundColor: '#022F3E',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const logoBox: SxProps = {
  height: '100px',
  width: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const navText: SxProps = {
  width: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#f1f1f1',
  marginRight: '4em'
};

export default Header