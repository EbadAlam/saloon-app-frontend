// import { CircularProgress, LinearProgress } from '@mui/material'
import React from 'react'

// function Loader({progress}) {
//   return (
//     <div className='loader-div'>
//         {/* <CircularProgress /> */}
//         <LinearProgress variant="determinate" value={progress} />
//     </div>
//   )
// }

// export default Loader

import { CircularProgress } from '@mui/material';

function Loader() {
  // const [progress, setProgress] = useState(10);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress >= 90) {
  //         clearInterval(timer);
  //         return oldProgress;
  //       }
  //       return oldProgress + 10;
  //     });
  //   }, 200);

  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div className='loader-div'>
      <CircularProgress />
      {/* <Box sx={{ width: '100%', mb: 2 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box> */}
    </div>
  );
}

export default Loader;
