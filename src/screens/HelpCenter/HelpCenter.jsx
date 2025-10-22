import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import axiosClient from "../../axios-client";
import { useSnackbar } from "../../contexts/SnackBarContext";
import Loader from "../../components/Loader/Loader";
import { useAuth } from "../../contexts/AuthContext";
import LoginModal from "../../components/LoginModal/LoginModal";

function HelpCenter() {
    const { user,login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const { showSnackbar } = useSnackbar();
const [loginLoading, setLoginLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

const [showLoginForm, setShowLoginForm] = useState(false);
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };
    const [loginMessage, setLoginMessage] = useState('');
  
  const [email,setEmail] = useState('random@gmail.com');
  const [password,setPassword] = useState('random123');
  const handleLoginSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
      setLoginLoading(true);
      try { 
        const payload = {
          email:email,
          password:password
        };
        const { data } = await axiosClient.post('/login',payload);
        if(data.success){
          login(data.user, data.token);
          setShowLoginForm(false);
        } else {
          setLoginMessage(data.message);
        }
      } catch (err) {
        console.error('Error login ', err);
      } finally {
        setLoginLoading(false);
      }
  }
  useEffect(() => {
      if (alertMessage) {
        showSnackbar(alertMessage, "error")
      }
    }, [alertMessage]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user){
        setShowLoginForm(true);
        return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("topic", topic);
      formData.append("user_id", user.id);
      formData.append("description", description);
      for (let i = 0; i < files.length; i++) {
        formData.append("attachments[]", files[i]);
      }
      const { data } = await axiosClient.post("/submitInquery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if(data.success) {
        showSnackbar(data.message, "success");
        setTopic("");
        setDescription("");
        setFiles([]);
      }
      console.log("Response:", data);
    } catch (err) {
      console.error("Error:", err);
      showSnackbar("An error occured, please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="help_center">
      {loading && <Loader />}
        <Box>
                <LoginModal 
                open={showLoginForm} 
                onClose={() => setShowLoginForm(false)} 
                email={email} 
                password={password} 
                setEmail={setEmail} 
                setPassword={setPassword} 
                onSubmit={handleLoginSubmit} 
                loading={loginLoading}
                loginMessage={loginMessage}
                message='Login or sign up to submit your inquiry'
                />
            </Box>
      <Box className="container">
        <Box className="bread_crumbs">
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Typography key="1">Help Center</Typography>,
            <Typography key="2">Contact Us</Typography>,
            <Typography key="3" sx={{ color: "text.primary" }}>
              Email Us
            </Typography>
            ,
          </Breadcrumbs>
        </Box>

        <Typography variant="h2" sx={{ mb: 2 }}>
          Email Us
        </Typography>

        <Box className="email_form">
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="help-topic-label">Select a Help Topic</InputLabel>
              <Select
                labelId="help-topic-label"
                value={topic}
                label="Select a Help Topic"
                onChange={(e) => setTopic(e.target.value)}
              >
                <MenuItem value="account">Account Issues</MenuItem>
                <MenuItem value="booking">Booking Help</MenuItem>
                <MenuItem value="payment">Payment Problems</MenuItem>
                <MenuItem value="technical">Technical Support</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Describe your issue"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button variant="outlined" component="label" sx={{ mb: 2 }}>
              Attach Files
              <input type="file" multiple hidden onChange={handleFileChange} />
            </Button>

            {files.length > 0 && (
              <Typography variant="body2" sx={{ mb: 2 }}>
                {files.length} file(s) selected
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              sx={{ width: "100%" }}
              disabled={!topic || !description}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default HelpCenter;
