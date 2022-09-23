import { Box, SxProps, Typography } from "@mui/material"
import AOS from "aos";
import "aos/dist/aos.css";

import menuImg1 from '../../assets/img/breakfast.jpg'

AOS.init();
const Menu = () => {

  return (
    <Box id="skills" sx={mainBox} className="mainBox">
      <Box sx={innerBox}>
        <Box data-aos="fade-in" data-aos-duration="1000" className="textBox">
          {/* <Avatar alt="" src={shape} sx={shapeStyle} /> */}
          <Typography data-aos="fade-in" sx={mainTitle}>
            Our Menu
          </Typography>
        </Box>
        <Box sx={menuMainBox}>
          {menu.map((menu) => (
            <Box sx={menuBox} key={menu.id}>
              <Box
                data-aos="fade-right"
                data-aos-offset="200"
                data-aos-duration="1000"
              >
                <img src={menu.img} alt="" style={{ width: '150px', height: '150px', borderRadius: '2em' }} />
              </Box>
              <Box
                sx={menuInfo}
                data-aos="fade-left"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000"
              >
                <Box>
                  <Typography sx={menuTitle}>{menu.title}</Typography>
                </Box>
                <Box>
                  <Typography>{menu.dis}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
export default Menu

const mainBox: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: { xs: '100%', md: '100%', lg: '100%', xl: '100%' },
  height: { xs: '700px', md: '1350px ', lg: '1500px', xl: '1500px' },
  maxWidth: "1600px"
}

const innerBox: SxProps = {
  display: { xs: 'none', md: 'block', lg: 'block', xl: 'block' },
  width: '90%',
  maxWidth: '1500px',
  position: 'relative',
}

const mainTitle: SxProps = {
  fontSize: { xs: "2em", md: "2em", lg: "3em", xl: "3em" },
  fontWeight: "bolder",
  color: "#f1f1f1",
  position: "absolute",
  top: { xs: '0em', md: `5em`, lg: `3em`, xl: `3em` },
  right: { xs: '0em', md: "1.5em", lg: "2em", xl: "2em" },
  lineHeight: '50px',
};

const menuMainBox: SxProps = {
  display: { xs: "none", md: "flex", lg: "flex", xl: "flex" },
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: "column",
  width: "90%",
  marginTop: "15em",
  "& :nth-child(even)": {
    justifyContent: "flex-end",
  },
}
const menuBox: SxProps = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  position: "relative",
  height: "200px",
  marginBottom: "2em",
  width: "100%",
}
const menuInfo: SxProps = {
  width: { xs: "", md: "450px", lg: "550px", xl: "550px" },
  marginLeft: "2em",
  color: "#f1f1f1",
  position: "relative",
  height: "200px",
};
const menuTitle: SxProps = {
  paddingBottom: { xs: "0.5em", md: "1em", lg: ".5em", xl: ".5em" },
  fontSize: { xs: "1em", md: "1em", lg: "1em", xl: "1em" },
  color: "#f1f1f1",
};




const menu = [
  {
    id: "1",
    img: `${menuImg1}`,
    title: "Breakfast",
    dis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem perspiciatis eligendi perferendis corrupti doloribus magni?",
  },
  {
    id: "2",
    img: ` ${menuImg1}`,
    title: "Something",
    dis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem perspiciatis eligendi perferendis corrupti doloribus magni?",
  },
  {
    id: "3",
    img: `${menuImg1}`,
    title: "Something",
    dis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem perspiciatis eligendi perferendis corrupti doloribus magni?",
  },
  {
    id: "4",
    img: `${menuImg1}`,
    title: "Something",
    dis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem perspiciatis eligendi perferendis corrupti doloribus magni?"
  },
  {
    id: "5",
    img: `${menuImg1}`,
    title: "Something",
    dis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem perspiciatis eligendi perferendis corrupti doloribus magni?"
  },
  {
    id: "6",
    img: `${menuImg1}`,
    title: "Something",
    dis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem perspiciatis eligendi perferendis corrupti doloribus magni?"
  },
];
