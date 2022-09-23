import { Box, Button, SxProps, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import MainBackGroundImg from '../../assets/img/123.jpg'

const MainPageHero = () => {
  return (
    <Box sx={maineBox}>
      <Box>
        <img src={MainBackGroundImg} alt="" style={{ width: '100%', height: '700px', objectFit: 'cover' }} />
      </Box>
      <Box sx={mainText}>
        <Typography sx={{ fontSize: '4em' }}>
          Mosaic
        </Typography>
        <Typography>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos vitae tempora iusto similique aperiam officia non molestias mollitia recusandae. Ullam.
        </Typography>
      </Box>
      <Link to='/reservation'>
        <Button sx={reservationBtn}>
          Reservation
        </Button>
      </Link>
    </Box>
  )
}
const maineBox: SxProps = {
  position: 'relative',
  height: "700px",
  maxWidth: "1600px"
};
const mainText: SxProps = {
  width: { xs: '300px', md: '700px', lg: '900px' },
  height: '280px',
  backgroundColor: "rgba(55, 130, 135, 0.36)",
  color: '#f1f1f1',
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
};
const reservationBtn: SxProps = {
  width: '200px',
  height: '75px',
  position: 'absolute',
  right: '4em',
  bottom: '3em',
  color: '#f1f1f1',
  fontWeight: 'bold',
  fontSize: '1.2em',
  backgroundColor: 'rgba(35, 63, 65, 0.80)',
  "& :hover": {
    backgroundColor: 'black',
  },

};
export default MainPageHero