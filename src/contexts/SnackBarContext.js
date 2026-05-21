// // SnackbarProvider.js
// import React, { createContext, useContext, useState, useCallback } from "react";
// import { Snackbar, Alert } from "@mui/material";

// const SnackbarContext = createContext(undefined);

// export const useSnackbar = () => useContext(SnackbarContext);

// export const SnackbarProvider = ({ children }) => {
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     type: "success",
//   });

//   const showSnackbar = useCallback((message, type = "success") => {
//     setSnackbar({ open: true, message, type });
//   }, []);

//   const handleClose = () => {
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   // ✅ Skip rendering <Snackbar> on the server
//   const isBrowser = typeof window !== "undefined";

//   return (
//     <SnackbarContext.Provider value={{ showSnackbar }}>
//       {children}
//       {isBrowser && (
//         <Snackbar
//           anchorOrigin={{ vertical: "top", horizontal: "right" }}
//           open={snackbar.open}
//           autoHideDuration={4000}
//           onClose={handleClose}
//         >
//           <Alert
//             onClose={handleClose}
//             severity={snackbar.type}
//             variant="filled"
//             sx={{ width: "100%" }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       )}
//     </SnackbarContext.Provider>
//   );
// };

// SnackbarProvider.js
import React, { createContext, useContext, useCallback } from "react";
import { Toaster, toast } from "sonner";

const SnackbarContext = createContext(undefined);

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const showSnackbar = useCallback(
    (message, type = "success") => {
      switch (type) {
        case "success":
          toast.success(message);
          break;

        case "error":
          toast.error(message);
          break;

        case "warning":
          toast.warning(message);
          break;

        case "info":
          toast.info(message);
          break;

        default:
          toast(message);
      }
    },
    []
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={4000}
      />
    </SnackbarContext.Provider>
  );
};