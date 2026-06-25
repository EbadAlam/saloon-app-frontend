import React, { useEffect, useState } from "react";
import axiosClient from "./axios-client";
import { Box, CircularProgress } from "@mui/material";


function AppWrapper({ children }) {
  const [serverUp, setServerUp] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkServer = async () => {
      try {
        const { data } = await axiosClient.get('/health', { timeout: 5000 });
        if (data?.status === "ok") {
          setServerUp(true);
        } else {
          setServerUp(false);
        }
      } catch (error) {
        console.error('Error in server: ',error);
        setServerUp(false);
      } finally {
        setChecking(false);
      }
    };

    checkServer();
  }, []);

  if (checking) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' sx={{height:'100vh'}}>
        <h1>🔄 Checking server status...</h1>
        <CircularProgress />
      </Box>
    );
  }

  if (!serverUp) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' sx={{height:'100vh'}}>
        <div style={{border:'5px solid red',width:'fit-content',padding:'5px 10px',rotate:'5deg'}}>
          <h1 style={{color:'red',margin:0}}>🚨 Server Down</h1>
        </div>
        <p>Please try again later.</p>
      </Box>
    );
  }

  return children;
}

export default AppWrapper;
