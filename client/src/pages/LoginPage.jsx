import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Paper,
  IconButton,
  InputAdornment,
  Stack,
  Divider,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCart } from "../redux/cartSlice";


export default function LoginPage() {
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
   
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isSignup && !name)) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      const url = isSignup
        ? "http://localhost:5000/api/auth/signup"
        : "http://localhost:5000/api/auth/login";

      const bodyData = isSignup
        ? { name, email, password }
        : { email, password };
               
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      //Save token + user in localStorage
       localStorage.setItem("userInfo", JSON.stringify(data));
       window.dispatchEvent(new Event("authChanged"));
       console.log(isSignup ? "Signup Success:" : "Login Success:", data);

      dispatch(fetchCart());
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ 
        minHeight: "100vh",
        bgcolor: "#f1f3f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt:7,
        pd:1.5
      }}
    >
      <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            height: 560,
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          {/* left sec */}
          <Box
            sx={{
              width: { xs: 260, sm: 320 },
              bgcolor: " #1d4e9cff",
              color: "#fff",
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                {isSignup ? "Sign Up" : "Login"}
              </Typography>

              <Typography sx={{ lineHeight: 1.6 }}>
                Get access to your Orders,
                <br />
                Wishlist and Recommendations
              </Typography>
            </Box>

            
          </Box>

          {/* right sec*/}
          <Box sx={{ flex: 1, p: { xs: 3, md: 6 }, bgcolor: "#fff" }}>
            <form onSubmit={handleSubmit} style={{ height: "100%" }}>
              <Stack spacing={3} sx={{ height: "100%" }}>
                {error && <Alert severity="error">{error}</Alert>}

                  <Box>
                    {/* name field(signup) */}
                    {isSignup && (
                      <TextField
                        label="Enter Full Name"
                        variant="standard"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 3 }}
                      />
                    )}

                  <TextField
                    label="Enter Email"
                    variant="standard"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <TextField
                    label="Enter Password"
                    variant="standard"
                    fullWidth
                    sx={{ mt: 3 }}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((p) => !p)}
                            size="small"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary">
                  By continuing, you agree to Ekart's{" "}
                  <Link href="#" underline="hover">
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link href="#" underline="hover">
                    Privacy Policy
                  </Link>
                  .
                </Typography>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    bgcolor: " #f5c500 ",
                    color: "#fff",
                    py: 1.8,
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#f4c60fc1" },
                  }}
                >
                  {loading
                    ? isSignup
                      ? "Creating Account..."
                      : "Logging in..."
                    : isSignup
                    ? "Sign Up"
                    : "Login"}
                </Button>

                <Box sx={{ flexGrow: 1 }} />

                <Divider />

                {/* toggle login, signup */}
                <Box sx={{ textAlign: "center" }}>
                  <Link
                    component="button"
                    onClick={() => setIsSignup(!isSignup)}
                    underline="hover"
                    sx={{ fontWeight: 600 }}
                  >
                    {isSignup
                      ? "Already have an account? Login"
                      : "New to Ekart? Create an account"}
                  </Link>
                </Box>
              </Stack>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
