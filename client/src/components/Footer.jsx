import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "#111214", color: "#e6e6e6", mt: 2 }}
    >
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="stretch"
        >
          {/* Column 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" sx={{ color: "#9aa0a6", mb: 2 }}>
              ABOUT
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="#" underline="none" color="inherit">
                Contact Us
              </Link>
              <Link href="#" underline="none" color="inherit">
                About Us
              </Link>
              <Link href="#" underline="none" color="inherit">
                Careers
              </Link>
            </Box>
          </Grid>

         
          <Grid
            item
            sx={{
              display: { xs: "none", md: "flex" }, 
              alignItems: "center", 
              px: 1, 
            }}
          >
            <Box
              sx={{
                width: "2px", 
                bgcolor: "#3a3f44", 
                height: "200px", 
                borderRadius: 1,
              }}
            />
          </Grid>

          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" sx={{ color: "#9aa0a6", mb: 2 }}>
              Mail Us:
            </Typography>

            <Typography
              variant="body2"
              sx={{ mb: 2, color: "#cfcfcf", lineHeight: 1.6 }}
            >
              Flipkart Internet Private Limited,
              <br />
              Buildings Alyssa, Begonia & Clove Embassy Tech Village,
              <br />
              Outer Ring Road, Devarabeesanahalli Village,
              <br />
              Bengaluru, 560103, Karnataka, India
            </Typography>

            <Typography variant="subtitle2" sx={{ color: "#9aa0a6", mb: 1 }}>
              Social:
            </Typography>

            <Box>
              <IconButton sx={{ color: "#fff" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <YouTubeIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
