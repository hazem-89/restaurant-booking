import { Box, IconButton, Typography, Button } from "@mui/material";
import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useNavigate } from "react-router-dom";

const mapstyling = {
  border: "0",
  marginTop: "2.4rem",
  borderRadius: "7px",
  width: "60rem",
  height: "20rem",
  "@media (max-width: 990px)": {
    width: "30rem",
  },
};

function Footer() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#000E1A",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          mt: "2rem",
          mb: "3rem",
          maxWidth: "100%",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2132.1242005580093!2d11.929122752000868!3d57.69735968102509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464ff3c57ea2292b%3A0x76edaa44d070a47a!2sMosaik%20konstcaf%C3%A9!5e0!3m2!1sen!2sse!4v1662984921846!5m2!1sen!2sse"
          style={mapstyling}
          allowFullScreen
          loading="lazy"
          title="map"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              p: "2rem",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bolder", color: "white" }}
            >
              Mosaic
            </Typography>
            <Typography sx={{ color: "white" }}>
              Allmänna vägen 16, 414 60 Göteborg
            </Typography>
            <Typography sx={{ color: "white" }}>416 64 Göteborg</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: "2rem",
            }}
          >
            <Typography sx={{ color: "white", pt: "1rem" }}>
              mosaic@gmail.com
            </Typography>
            <Typography sx={{ color: "white" }}>070 666 666</Typography>

            <Box>
              <IconButton sx={{ pl: "0" }}>
                <LinkedInIcon
                  sx={{
                    height: "40px",
                    width: "40px",
                    color: "white",
                  }}
                />
              </IconButton>
              <IconButton>


              </IconButton>
              <IconButton>
                <FacebookIcon
                  sx={{ height: "40px", width: "40px", color: "white" }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;