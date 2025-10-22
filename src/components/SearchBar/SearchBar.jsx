import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Autocomplete, TextField, CircularProgress, MenuItem, Select, useMediaQuery, Popper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Seperator from '../Seperator/Seperator';
import axiosClient from '../../axios-client';
import { ROUTES } from '../../routes';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSnackbar } from '../../contexts/SnackBarContext';

const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12;
  const suffix = i < 12 ? 'AM' : 'PM';
  return `${hour}:00 ${suffix}`;
});
let debounceTimer;
function SearchBar() {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [hasTyped, setHasTyped] = useState(false);
  const [locationLoading, setLcoationLoading] = useState(false);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [showTimeBox, setShowTimeBox] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const locationHook = useLocation();
  useEffect(() => {
    const fetchCombinedCategories = async () => {
      try {
        const { data } = await axiosClient.get('/getCombinedCategories');
        setServiceOptions(
          data.categories.map((cat) => capitalize(cat))
        );
      } catch (err) {
        console.error('Error fetching categories ', err);
      }
    };
    fetchCombinedCategories();
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(locationHook.search);

    const serviceParam = params.get('service') || '';
    const locationParam = params.get('location') || '';
    const startParam = params.get('startTime') || '';
    const endParam = params.get('endTime') || '';

    setService(serviceParam);
    setLocation(locationParam);
    setStartTime(startParam);
    setEndTime(endParam);
  }, [locationHook.search]);
  const fetchLocationSuggestions = async (input) => {
    // if (!input) return;
    // setLcoationLoading(true);
    // try {
    //   const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${input}`);
    //   const data = await res.json();
    //   const results = data.map((item) => item.display_name);
    //   setSuggestions(['Use Current Location', ...results]);
    // } catch (error) {
    //   console.error('Error fetching location suggestions:', error);
    // } finally {
    //   setLcoationLoading(false);
    // }
  };
  useEffect(() => {
    if (!hasTyped || location.trim() === '') return;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchLocationSuggestions(location);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [location, hasTyped]);
   const handleUseCurrentLocation = async () => {
      if (!navigator.geolocation) {
        showSnackbar('Geolocation is not supported by your browser.','warning')
        return;
      }
    setLcoationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const address = data.display_name || 'Current Location';
          setLocation(address);
        } catch (error) {
          console.error('Error during reverse geocoding:', error);
        } finally {
          setLcoationLoading(false);
        }
      },
      (err) => {
        showSnackbar('Failed to get your location. Please allow access.','warning');
        console.error(err);
      }
    );
  };

  const handleTimePreset = (type) => {
    if (type === 'all time') {
      setStartTime('');
      setEndTime('');
    } else if (type === 'morning') {
      setStartTime('6:00 AM');
      setEndTime('11:00 AM');
    } else if (type === 'afternoon') {
      setStartTime('11:00 AM');
      setEndTime('5:00 PM');
    } else if (type === 'evening') {
      setStartTime('5:00 PM');
      setEndTime('11:00 PM');
    }
  };
  const timeBoxRef = useRef();

  useEffect(() => {
  function handleClickOutside(event) {
    if (timeBoxRef.current && timeBoxRef.current.contains(event.target)) {
      return;
    }

    if (event.target.closest('.MuiPopover-root')) {
      return;
    }

    setShowTimeBox(false);
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
const isMobile = useMediaQuery("(max-width:600px)");
const CustomPopper = (props) => (
  <Popper
    {...props}
    style={{
      width: "auto",
      minWidth: props.anchorEl?.clientWidth,
    }}
    placement="bottom-start"
  />
);
  return (
    <Box className="searchBarDiv gradient-border" display="flex" justifyContent="end" flexWrap='wrap'>
      <Box className="movingBorder" 
          sx={{
            position: 'absolute',
            padding: '16px',
            zIndex: -1,
            overflow: 'hidden',
            top: '-5px',
            left: '-5px',
            right: '-5px',
            bottom: '-5px',

            '&::before': {
              content: '""',
              position: 'absolute',
              top: '0px',
              left: '0px',
              right: '0px',
              bottom: '0px',
              zIndex: -1,
              borderRadius: '9999px',
              background: 'linear-gradient(270deg, #D8A7B1, #ffffff, #D8A7B1)',
              backgroundSize: '600% 600%',
              animation: 'gradientMove 8s linear infinite',
            },

            '@keyframes gradientMove': {
              '0%': { backgroundPosition: '0% 50%' },
              '100%': { backgroundPosition: '100% 50%' },
            },
          }}
        ></Box>
        <Box className="white-bg"></Box>
      <Box
        className="inputDivMain"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        flexWrap='wrap'
        gap="15px"
        sx={{ width: '85%' }}
      >
        
        
        <Box className="input_services inputDiv" display="flex" alignItems="center">
          <Box className="icon">
            <SearchIcon />
          </Box>
          <Box className="input">
            <Autocomplete
              freeSolo
              options={serviceOptions}
              value={service}
              onChange={(e, newValue) => setService(newValue)}
              onInputChange={(e, newInput) => setService(newInput)}
              clearIcon={isMobile ? null : undefined}
              PopperComponent={CustomPopper}
              renderInput={(params) => (
                <TextField {...params} placeholder="All treatments and venues" variant="standard" />
              )}
            />
          </Box>
        </Box>

        <Seperator />

        <Box className="input_location inputDiv" display="flex" alignItems="center">
          <Box className="icon">
            {locationLoading ? <CircularProgress size="20px" /> : <AccessTimeOutlinedIcon />}
          </Box>
          <Box className="input">
            <Autocomplete
              freeSolo
              options={hasTyped ? suggestions : ['Current Location']}
              inputValue={location}
              PopperComponent={CustomPopper}
              clearIcon={isMobile ? null : undefined}
              onInputChange={(e, value, reason) => {
                setLocation(value);
                setHasTyped(reason === 'input');
              }}
              onChange={(e, newValue) => {
                if (!newValue) {
                  setLocation('');
                  return;
                }
                if (newValue === 'Current Location') {
                  handleUseCurrentLocation();
                } else {
                  setLocation(newValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Current Location"
                  variant="standard"
                  onFocus={() => {
                    setSuggestions(['Current Location']);
                    setHasTyped(false);
                  }}
                />
              )}
            />
          </Box>
        </Box>

        <Seperator />

        <Box className="input_time inputDiv" display="flex" alignItems="center" position="relative">
          <Box className="icon">
            <DateRangeIcon />
          </Box>
          <Box className="input">
            <TextField
              variant="standard"
              placeholder="Time"
              value={startTime && endTime ? `${startTime} - ${endTime}` : ''}
              onFocus={() => setShowTimeBox(true)}
              autoComplete="off" 
            />
          </Box>

          {showTimeBox && (
            <Box
              className="time-box"
              ref={timeBoxRef}
              sx={{
                position: 'absolute',
                top: '60px',
                left: 0,
                mt: 1,
                background: '#fff8f0',
                boxShadow: 3,
                borderRadius: 1,
                zIndex: 10,
                p: 2,
                width: 400,
              }}
            >
              <Box display="flex" justifyContent="space-between" mb={2} flexWrap='wrap' rowGap='10px'>
                {['All Time', 'Morning', 'Afternoon', 'Evening'].map((label) => (
                  <Button
                    key={label}
                    onClick={() => handleTimePreset(label.toLowerCase())}
                    size="small"
                    variant="outlined"
                  >
                    {label}
                  </Button>
                ))}
              </Box>
              <Box display="flex" gap={2}>
                <Select
                  fullWidth
                  onClick={(e) => e.stopPropagation()}
                  value={startTime}
                  displayEmpty
                  onChange={(e) => setStartTime(e.target.value)}
                >
                  <MenuItem value="">Start Time</MenuItem>
                  {TIME_OPTIONS.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  fullWidth
                  value={endTime}
                  displayEmpty
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  <MenuItem value="">End Time</MenuItem>
                  {TIME_OPTIONS.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Box className="search_btn">
        <Button
          className="search"
          onClick={() => {
            const params = new URLSearchParams();

            if (service) params.append('service', service);
            if (location) params.append('location', location);
            if (startTime && endTime) {
              params.append('startTime', startTime);
              params.append('endTime', endTime);
            }

            navigate(`${ROUTES.searchPage}?${params.toString()}`);
          }}
        >
          Search
        </Button>
      </Box>
      <Box className="search_btn_mobile">
        <Button
          onClick={() => {
            const params = new URLSearchParams();

            if (service) params.append('service', service);
            if (location) params.append('location', location);
            if (startTime && endTime) {
              params.append('startTime', startTime);
              params.append('endTime', endTime);
            }

            navigate(`${ROUTES.searchPage}?${params.toString()}`);
          }}
        >
          <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default SearchBar;
