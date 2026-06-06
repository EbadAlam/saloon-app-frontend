import React, { useEffect, useRef, useState } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import axiosClient from "../../axios-client";
import { Box, Button, Checkbox, FormControl, InputLabel, MenuItem,  Select, Typography } from "@mui/material";
import { ROUTES } from "../../routes";
import StarRating from "../../components/StarRating/StarRating";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DummyImage from "../../components/DummyImage/DummyImage";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import Slider from 'react-slick';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useAuth } from "../../contexts/AuthContext";
import LoginModal from "../../components/LoginModal/LoginModal";
import { useSnackbar } from "../../contexts/SnackBarContext";
import BookingConfirmModal from "../../components/BookingConfirmModal/BookingConfirmModal";

function BookingPage() {
  const { state } = useLocation();
  const { slug } = useParams();
  const { user,token,login } = useAuth();
  const [storeDetails, setStoreDetails] = useState(state?.storeDetails || null);
  const [loading, setLoading] = useState(!state?.storeDetails);
  const [loginLoading, setLoginLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loginMessage, setLoginMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [step, setStep] = useState(1);
  const { showSnackbar } = useSnackbar();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [indWorker, setIndWorker] = useState(false);
  const [closeStore, setCloseStore] = useState(false);
  const [thankyou, setThankyou] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedServices, setSelectedServices] = useState(() => {
    if (state?.service) {
        return [{
            ...state.service,
            worker_id: "",
            worker_name: "",
        }];
    }
    return [];
});
  const [selectedProfessional, setSelectedProfessional] = useState({
    id: "",
    username: "any professional",
  });
  const sideBarRef = useRef(null);
  
  useEffect(() => {
    const fetchStoreDetails = async () => {
        setLoading(true);
        try {
        const { data } = await axiosClient.get(`/getStoreBySlug/${slug}`);
        // console.log('data', data.storeDetails);
        setStoreDetails(data.storeDetails);
        } catch (error) {
        console.error("Failed to fetch store details:", error);
        } finally {
        setLoading(false);
        }
    };
    if (!storeDetails && slug) {
      fetchStoreDetails();
    }

  }, [storeDetails,slug]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(
              entry.target.getAttribute("id").replace("cat-", "")
            );
            setSelectedCategory(id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0.1,
      }
    );

    const sections = document.querySelectorAll(".service-category-section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [storeDetails]);
    const navigate = useNavigate();
    const handleClick = () => {
        if(step > 1) {
            setStep(step - 1);
            setIndWorker(false);
        } else {
            if (window.history.length > 1) {
                navigate(-1);
            } else {
                navigate(ROUTES.getStoreFrontPage(storeDetails.slug));
            }
        }
        
    }
    const handleClickClose = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(ROUTES.getStoreFrontPage(storeDetails.slug));
        }        
    }
const updateWorkerId = (serviceId, workerId,workerName) => {
    setSelectedServices(prevServices =>
        prevServices.map(service =>
            service.id === serviceId
                ? { ...service, worker_id: workerId,worker_name:workerName }
                : service
        )
    );
};
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const dates = Array.from({ length: 60 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        return date;
    });

    const getDayName = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };
    const getFullDayName = (date) => {
       return date.toLocaleDateString("en-US", { weekday: "long" });
    };

    const getDateNumber = (date) => {
        return String(date.getDate()).padStart(2, '0');
    };

    const getISODate = (date) => {
        return date.toISOString().split('T')[0];
    };
    const [currentMonth, setCurrentMonth] = useState(() => {
        const today = new Date();
        return today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    });

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows: true,
        nextArrow: <NextArrow className={'next-arrow'} />,
        prevArrow: <PrevArrow className={'prev-arrow'} />,
        afterChange: (currentSlide) => {
            const visibleDate = dates[currentSlide];
            const monthYear = visibleDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            setCurrentMonth(monthYear);
        },
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            }
        ]
    };
  const averageRating = storeDetails.reviews?.length
    ? storeDetails.reviews.reduce(
        (acc, review) => acc + parseFloat(review.rating),
        0
      ) / storeDetails.reviews.length
    : 0;
    const formatTo12Hour = (hour, minute) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
    };
    const convertTo24Hour = (time12h) => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM' && hours !== '12') {
            hours = String(parseInt(hours, 10) + 12);
        }

        return `${hours.padStart(2, '0')}:${minutes}`;
    };
    const addMinutesToTime = (time, minutesToAdd) => {
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + minutesToAdd;
        const newHours = Math.floor(totalMinutes / 60) % 24;
        const newMinutes = totalMinutes % 60;
        return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
    };
  const generateTimeSlots = (startTime, endTime) => {
        const slots = [];
        let [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);

        while (
            startHour < endHour ||
            (startHour === endHour && startMinute < endMinute)
        ) {
            const startFormatted = formatTo12Hour(startHour, startMinute);

            let endSlotHour = startHour;
            let endSlotMinute = startMinute + 30;
            if (endSlotMinute >= 60) {
                endSlotHour += 1;
                endSlotMinute = endSlotMinute % 60;
            }

            slots.push(`${startFormatted}`);

            startHour = endSlotHour;
            startMinute = endSlotMinute;
        }

        return slots;
  };
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  const filteredSlots = timeSlots.filter((slot) => {
  const slotStart = convertTo24Hour(slot);
  if (selectedDate === todayStr) {
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    if (slotStart <= currentTime) {
      return false;
    }
  }
  // Group total ETA by worker
  // const workerDurations = {};
  // selectedServices.forEach((service) => {
  //   if (!service.worker_id) return;

  //   let etaMinutes = 0;
  //   const etaMatch = service.eta.match(/(\d+)\s*(hr|hrs|minutes|min|mins)/i);
  //   if (etaMatch) {
  //     etaMinutes = etaMatch[2].startsWith("hr")
  //       ? parseInt(etaMatch[1]) * 60
  //       : parseInt(etaMatch[1]);
  //   }

  //   // Add up duration if worker has multiple services
  //   workerDurations[service.worker_id] =
  //     (workerDurations[service.worker_id] || 0) + etaMinutes;
  // });
  const workerDurations = {};

selectedServices.forEach((service) => {
  if (!service.worker_id) return;

  let etaMinutes = 0;

  const eta = (service.eta || "").toLowerCase();

  const match = eta.match(/(\d+)\s*(hr|hrs|hour|hours|min|mins|minute|minutes)/i);

  if (match) {
    const value = parseInt(match[1], 10);
    const unit = match[2];

    if (unit.includes("hour") || unit.includes("hours") || unit.includes("hr") || unit.includes("hrs")) {
      etaMinutes = value * 60;
    } else {
      etaMinutes = value;
    }
  } else {
    etaMinutes = 30;
  }

  workerDurations[service.worker_id] =
    (workerDurations[service.worker_id] || 0) + etaMinutes;
});

  // Check conflicts for each worker
  const hasConflict = Object.entries(workerDurations).some(
    ([workerId, totalEta]) => {
      const slotEnd = addMinutesToTime(slotStart, totalEta);

      return storeDetails.bookings?.some((booking) => {
        if (booking.booking_date !== selectedDate) return false;
        if (booking.worker_id != workerId) return false;

        const bookingStart = booking.booking_time.slice(0, 5);
        const bookingEnd = booking.booking_time_end.slice(0, 5);

        // Overlap check
        return slotStart < bookingEnd && slotEnd > bookingStart;
      });
    }
  );

  return !hasConflict;
});


const handleDateClick = (date) => {
  setAlertMessage('');
     const isoDate = date.toISOString().split('T')[0]
    setSelectedDate(isoDate);
    setCloseStore(false);

    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

    const dayWorkingHours = storeDetails?.working_hours?.find(
        (day) => day.day === dayName
    );

    if (dayWorkingHours) {
        if (dayWorkingHours.is_closed === 'inactive') {
            setCloseStore(true);
            setTimeSlots([]);
        } else {
            const slots = generateTimeSlots(
                dayWorkingHours.start_time,
                dayWorkingHours.end_time
            );
            setTimeSlots(slots);
        }
    } else {
        setTimeSlots([]);
    }
};
useEffect(() => {
    handleDateClick(new Date());
  }, [storeDetails]);
const bookingSubmitHandle = async () => {
  setLoading(true);
    const payload = {
        services: selectedServices,
        time: selectedTimeSlot,
        date: selectedDate,
        user_id:user.id,
        store_id: storeDetails.id,
    };
    try {
        await axiosClient.post('/addBooking',payload);
        setThankyou(true);
    } catch (err) {
        console.error('error adding booking ', err);
    } finally {
        setLoading(false);
        // navigate(ROUTES.userAppointment, { state: { successMessage: 'Booked successfully!' } });
    }
}
const handleFormSubmit = () => {
  setAlertMessage('');
  if(!selectedTimeSlot || !selectedDate){
    setAlertMessage('Please select date and time below!');
  } else {
    if(user && token) {
      bookingSubmitHandle();
    } else {
      setShowLoginForm(true);
    } 
  }
}


// helper
const workerCanDoService = (worker, serviceId) => {
  // console.log('service check: ', worker.services?.some(ws => ws.service_id == serviceId));
    const workerServices = worker.services ?? [];
    if (workerServices.length === 0) return true; // no restriction = all services
    return workerServices.some(ws => ws.service_id == serviceId);
};
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
  const getTotalEta = (services) => {
    let totalMinutes = 0;

    services.forEach((service) => {
      if (!service.eta) return;
      const match = service.eta.match(/(\d+)\s*(hr|hrs|minutes|min|mins)/i);
      if (match) {
        const value = parseInt(match[1]);
        const unit = match[2].toLowerCase();
        totalMinutes += unit.startsWith("hr") ? value * 60 : value;
      }
    });

    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    if (hrs > 0 && mins > 0) return `${hrs} hr${hrs > 1 ? "s" : ""} ${mins} mins`;
    if (hrs > 0) return `${hrs} hr${hrs > 1 ? "s" : ""}`;
    return `${mins} mins`;
  };

  if (loading || !storeDetails) {
    return <Loader />;
  }
  return (
    <>
      <Box sx={{ paddingBlock: "20px",minHeight:'100vh' }}>
        <Box sx={{ maxWidth: "1300px", margin: "0 auto" }}>
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
              />
          </Box>
          <Box>
              <BookingConfirmModal 
                open={thankyou} 
                onClose={() => setThankyou(false)} 
              />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" className="backButtonCp" sx={{padding:'50px 0px'}}>
              <button
                  onClick={handleClick}
              >
                  <ArrowBackIcon />
              </button>
              <button
                  onClick={handleClickClose}
              >
                  <CloseIcon />
              </button>
          </Box>
          <Box
            display="flex"
            alignItems="start"
            gap="50px"
            sx={{ paddingInline: "50px" }}
            >
            <Box sx={{ width: "60%" }} className='booking_steps'>
              <Box
                display="flex"
                alignItems="center"
                gap="5px"
                className="booking_breadCrumbs"
                >
                <Typography
                  variant="body1"
                  className={
                    step === 1 ? "active" : step >= 1 ? "prev-active" : ""
                  }
                  onClick={() => {
                    if (step >= 1) {setStep(1);setIndWorker(false)};
                  }}
                >
                  Services
                </Typography>
                <ArrowForwardIosIcon sx={{ fontSize: "18px" }} />

                <Typography
                  variant="body1"
                  className={
                    step === 2 ? "active" : step >= 2 ? "prev-active" : ""
                  }
                  onClick={() => {
                    if (step >= 2) {setStep(2);setIndWorker(false)};
                  }}
                >
                  Professionals
                </Typography>
                <ArrowForwardIosIcon sx={{ fontSize: "18px" }} />

                <Typography
                  variant="body1"
                  className={
                    step === 3 ? "active" : step >= 3 ? "prev-active" : ""
                  }
                  onClick={() => {
                    if (step >= 3) {setStep(3);setIndWorker(false)};
                  }}
                >
                  Time
                </Typography>
                <ArrowForwardIosIcon sx={{ fontSize: "18px" }} />

                <Typography
                  variant="body1"
                  className={step === 4 ? "active" : ""}
                  onClick={() => {
                    if (step >= 4) {setStep(4);setIndWorker(false)};
                  }}
                >
                  Confirm
                </Typography>
              </Box>
              {step === 1 && !indWorker && (
                <>
                  <Typography variant="h4" className="mt-5">
                    Services
                  </Typography>

                  <div className="services_categories">
                    <div
                      className={`category ${
                        selectedCategory === null ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedCategory(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      All
                    </div>
                    {storeDetails?.services_categories?.length > 0 &&
                      storeDetails.services_categories
                        .filter((singleCat) => singleCat.status === "active")
                        .map((singleCat, index) => (
                          <div
                            key={index}
                            className={`category ${
                              selectedCategory === singleCat.id ? "active" : ""
                            }`}
                            onClick={() => {
                              setSelectedCategory(singleCat.id);
                              const section = document.getElementById(
                                `cat-${singleCat.id}`
                              );
                              if (section) {
                                section.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {singleCat.title}
                          </div>
                        ))}
                  </div>
                  <div className="services">
                    {storeDetails?.services_categories?.map((cat) => {
                      const servicesInCategory = storeDetails.services.filter(
                        (s) => s.service_category_id === cat.id
                      );
                      if (servicesInCategory.length === 0) return null;

                      return (
                        <div
                          key={cat.id}
                          id={`cat-${cat.id}`}
                          className="service-category-section"
                        >
                          <h3 className="category-title">{cat.title}</h3>
                          {servicesInCategory.filter(s => s.status == 'active').map((singleSer,index) => (
                            <label htmlFor={`book_checkbox_${singleSer.id}`} className="service mt-3" key={singleSer.id}>
                                <div className="info">
                                  <h4 className="title">{singleSer.title}</h4>
                                  <p className="eta">{singleSer.eta}</p>
                                  <p className="price">
                                    
                                      {singleSer.currency} {singleSer.price}
                                    
                                  </p>
                                  <p className="gender">
                                    {singleSer.gender &&
                                      `Only for ${singleSer.gender}`}
                                  </p>
                                </div>
                                <div className="book_btn">
                                  <Checkbox
                                    id={`book_checkbox_${singleSer.id}`}
                                    checked={selectedServices.some(
                                      (s) => s.id === singleSer.id
                                    )}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedServices((prev) => [
                                          ...prev,
                                          singleSer,
                                        ]);
                                      } else {
                                        setSelectedServices((prev) =>
                                          prev.filter((s) => s.id !== singleSer.id)
                                        );
                                      }
                                    }}
                                  />
                                </div>
                            </label>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {step === 2 && !indWorker && (
                <>
                  <Typography variant="h4" className="mt-5">
                    Select Professional
                  </Typography>
                  <Box
                    className="professionals mt-3"
                    display="flex"
                    flexWrap="wrap"
                  >
                    <Box
                      className="single-pro"
                      onClick={() => {
                        setSelectedServices((prevServices) =>
                          prevServices.map((service) => ({
                              ...service,
                              worker_id: "",
                              worker_name: "",
                          }))
                      );
                      }}
                    >
                      <Box>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 46 45"
                          fill="none"
                        >
                          <path
                            d="M23 26.25C28.1825 26.25 32.375 22.0538 32.375 16.875C32.375 11.6962 28.1825 7.5 23 7.5C17.8175 7.5 13.625 11.6962 13.625 16.875C13.625 22.0538 17.8175 26.25 23 26.25ZM23 11.25C26.1012 11.25 28.625 13.7737 28.625 16.875C28.625 19.9762 26.1012 22.5 23 22.5C19.8987 22.5 17.375 19.9762 17.375 16.875C17.375 13.7737 19.8987 11.25 23 11.25ZM38 28.125C39.2432 28.125 40.4355 27.6311 41.3146 26.7521C42.1936 25.873 42.6875 24.6807 42.6875 23.4375C42.6875 22.1943 42.1936 21.002 41.3146 20.1229C40.4355 19.2439 39.2432 18.75 38 18.75C36.7568 18.75 35.5645 19.2439 34.6854 20.1229C33.8064 21.002 33.3125 22.1943 33.3125 23.4375C33.3125 24.6807 33.8064 25.873 34.6854 26.7521C35.5645 27.6311 36.7568 28.125 38 28.125ZM38 20.625C39.5506 20.625 40.8125 21.8869 40.8125 23.4375C40.8125 24.9881 39.5506 26.25 38 26.25C36.4494 26.25 35.1875 24.9881 35.1875 23.4375C35.1875 21.8869 36.4494 20.625 38 20.625ZM38 29.2313C35.5044 29.2313 33.6275 29.9925 32.5306 31.0481C30.44 29.3269 27.1344 28.125 23 28.125C18.7512 28.125 15.5094 29.34 13.4525 31.0575C12.335 29.9981 10.4375 29.2294 8 29.2294C3.8975 29.2294 1.4375 31.275 1.4375 33.3225C1.4375 34.3444 3.8975 35.37 8 35.37C9.1325 35.37 10.1487 35.2744 11.0431 35.1206L10.9681 35.6269C10.9681 37.5019 15.4775 39.3769 23 39.3769C30.0537 39.3769 35.0319 37.5019 35.0319 35.6269L34.9925 35.1488C35.8606 35.2856 36.86 35.37 38 35.37C41.8456 35.37 44.5625 34.3444 44.5625 33.3225C44.5625 31.275 41.9881 29.2313 38 29.2313ZM8 33.4931C5.54562 33.4931 4.1225 33.105 3.46812 32.8294C3.91625 32.07 5.34875 31.1044 8 31.1044C10.0756 31.1044 11.4444 31.7625 12.14 32.4281L11.6994 33.0731C10.8519 33.2962 9.62187 33.4931 8 33.4931ZM23 35.625C18.9444 35.625 16.4356 35.04 15.155 34.5731C16.1319 33.3019 18.7512 31.875 23 31.875C27.0669 31.875 29.7312 33.3019 30.7775 34.5469C29.3619 35.0531 26.7237 35.625 23 35.625ZM38 33.4931C36.2862 33.4931 35.1012 33.3 34.3006 33.0938C34.1634 32.8481 34.008 32.613 33.8356 32.3906C34.5031 31.7437 35.8437 31.1063 38 31.1063C40.4825 31.1063 42.0144 32.0456 42.5075 32.8144C41.7762 33.12 40.2481 33.4931 38 33.4931ZM8 28.125C9.2432 28.125 10.4355 27.6311 11.3146 26.7521C12.1936 25.873 12.6875 24.6807 12.6875 23.4375C12.6875 22.1943 12.1936 21.002 11.3146 20.1229C10.4355 19.2439 9.2432 18.75 8 18.75C6.7568 18.75 5.56451 19.2439 4.68544 20.1229C3.80636 21.002 3.3125 22.1943 3.3125 23.4375C3.3125 24.6807 3.80636 25.873 4.68544 26.7521C5.56451 27.6311 6.7568 28.125 8 28.125ZM8 20.625C9.55062 20.625 10.8125 21.8869 10.8125 23.4375C10.8125 24.9881 9.55062 26.25 8 26.25C6.44937 26.25 5.1875 24.9881 5.1875 23.4375C5.1875 21.8869 6.44937 20.625 8 20.625Z"
                            fill="#333333"
                          />
                        </svg>
                      </Box>
                      <Box>
                        <Typography
                          variant="body1"
                          textAlign="center"
                          sx={{
                            fontSize: "16px",
                            color: "#333333",
                            fontWeight: "600",
                          }}
                        >
                          Any Professional
                        </Typography>
                        <Typography
                          variant="body1"
                          textAlign="center"
                          sx={{ fontSize: "14px", color: "#333333" }}
                        >
                          For Maximum Availability
                        </Typography>
                      </Box>
                    </Box>
                    {selectedServices.length > 1 && storeDetails.workers?.length > 0 && (
                      <Box
                          className="single-pro"
                          onClick={() => {
                          setSelectedProfessional({
                              id: "",
                              username: "any professional",
                          });
                          setIndWorker(true);
                          }}
                      >
                          <Box>
                          <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M24.865 26.5a1 1 0 0 1-.343 1.402 1 1 0 0 1-1.387-.402 7.125 7.125 0 0 0-12.27 0 1 1 0 1 1-1.73-1 9 9 0 0 1 4.217-3.74 6 6 0 1 1 7.296 0 9 9 0 0 1 4.217 3.74M17 22a4 4 0 1 0 0-8 4 4 0 0 0 0 8m-7-7a1 1 0 0 0-1-1 3 3 0 1 1 2.905-3.75 1 1 0 0 0 1.938-.5 5 5 0 1 0-8.218 4.939 8.5 8.5 0 0 0-3.425 2.71A1 1 0 1 0 3.8 18.6 6.45 6.45 0 0 1 9 16a1 1 0 0 0 1-1M25 3a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0V8h-2a1 1 0 1 1 0-2h2V4a1 1 0 0 1 1-1"></path></svg>
                          </Box>
                          <Box>
                          <Typography
                              variant="body1"
                              textAlign="center"
                              sx={{ fontSize: "14px", color: "#333333" }}
                          >
                              Select professional per service
                          </Typography>
                          </Box>
                      </Box>
                    )}
                    
                    {storeDetails.workers?.length > 0 &&
                      storeDetails.workers
                        .filter(
                          (singlePro) =>
                            singlePro.user?.account_status === "active"
                        )
                        .filter(singlePro => {
                            return selectedServices.every(service => 
                                workerCanDoService(singlePro, service.id)
                            );
                        })
                        .map((singlePro) => (
                          <Box
                          key={singlePro.id}
                            className={`single-pro ${
                              selectedProfessional.id === singlePro.user.id
                                ? "active"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedServices((prevServices) =>
                                  prevServices.map((service) => ({
                                      ...service,
                                      worker_id: singlePro.user.id,
                                      worker_name: singlePro.user.username,
                                  }))
                              );
                              setSelectedProfessional({
                                id:singlePro.user.id,
                                username:singlePro.user.username,
                              })
                            }}
                          >
                            {singlePro.user?.user_info?.profile_image ? (
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                  borderRadius: "50%",
                                  width: "70px",
                                  height: "70px",
                                  overflow: "hidden",
                                }}
                              >
                                {singlePro.user?.user_info?.signup_platform == 'manual' ? (
                                  <img
                                    style={{ width: "100%" }}
                                    src={`${process.env.REACT_APP_IMG_URL}/${singlePro.user.user_info.profile_image}`}
                                    alt="user profile img"
                                  />
                                ) : (
                                  <img
                                    style={{ width: "100%" }}
                                    src={singlePro.user.user_info.profile_image}
                                    alt="user profile img"
                                  />
                                )}
                              </Box>
                            ) : (
                              <DummyImage username={singlePro.user.username} />
                            )}

                            <Box>
                              <Typography
                                variant="body1"
                                textAlign="center"
                                sx={{
                                  fontSize: "18px",
                                  color: "#333333",
                                  fontWeight: "600",
                                }}
                              >
                                {singlePro.user.username}
                              </Typography>
                              <Typography
                                variant="body1"
                                textAlign="center"
                                sx={{ fontSize: "16px", color: "#333333" }}
                              >
                                {singlePro.user.user_info.designation}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                  </Box>
                </>
              )}
              {indWorker && (
                  <>
                      <Typography variant="h4" className="mt-5">
                          Select Professional
                      </Typography>
                      <Box className="services">
                          {selectedServices.map((singleSer) => (
                              <div className="service mt-3" key={singleSer.id}>
                                  <div className="info" style={{width:'33%'}}>
                                      <h4 className="title">{singleSer.title}</h4>
                                      <p className="eta">{singleSer.eta}</p>
                                      <FormControl fullWidth className="mt-2">
                                          <InputLabel id="demo-simple-select-label">Select Professional</InputLabel>
                                          <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              value={singleSer.worker_id || ''}
                                              label="Select Professional"
                                              onChange={(e) => {
                                                  const selectedPro = storeDetails.workers.find(
                                                      (worker) => worker.user.id === e.target.value
                                                  );
                                                  updateWorkerId(singleSer.id, selectedPro.user.id, selectedPro.user.username);
                                              }}
                                          >
                                              {storeDetails.workers?.length > 0 &&
                                                  storeDetails.workers
                                                  .filter(
                                                      (singlePro) =>
                                                      singlePro.user?.account_status === "active"
                                                  )
                                                  .filter(singlePro => workerCanDoService(singlePro, singleSer.id))
                                                  .map((singlePro) => (
                                                      <MenuItem value={singlePro.user.id}>{singlePro.user.username}</MenuItem>
                                                  ))}
                                          </Select>
                                      </FormControl>
                                  </div>
                              </div>
                          ))}
                      </Box>
                  </>
              )}
              {step === 3 && !indWorker  && (
                  <>
                      <Typography variant="h4" className="mt-5">
                          Select Time
                      </Typography>
                      <Box className="mt-3">
                          <Typography variant="h6">
                              {currentMonth}
                          </Typography>
                          <Box className="mt-3">
                              <Slider {...settings}>
                                {dates.map((date) => {
                                  const isoDate = getISODate(date);
                                  const isSelected = selectedDate === isoDate;

                                  const dayName = getFullDayName(date); // e.g., "Monday"
                                  const workingDay = storeDetails.working_hours?.find(
                                    (d) => d.day.toLowerCase() === dayName.toLowerCase()
                                  );
                                  const isDisabled = !workingDay || workingDay.is_closed !== "active";

                                  return (
                                    <Box
                                      key={isoDate}
                                      className="singleDate"
                                      sx={{
                                        cursor: isDisabled ? "not-allowed" : "pointer",
                                        opacity: isDisabled ? 0.4 : 1,
                                      }}
                                      onClick={() => !isDisabled && handleDateClick(date)}
                                    >
                                      <Box className="day">
                                        <Typography
                                          variant="body1"
                                          sx={{ fontSize: "16px", color: "#333333" }}
                                          textAlign="center"
                                        >
                                          {getDayName(date)}
                                        </Typography>
                                      </Box>
                                      <Box
                                        className="date mt-2"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        sx={{
                                          background: isSelected ? "#D8A7B1" : "transparent",
                                          border: "1px solid #E4E4E4",
                                          borderColor: isSelected ? "white" : "#E4E4E4",
                                          borderRadius: "50%",
                                          width: "40px",
                                          height: "40px",
                                        }}
                                      >
                                        <Typography
                                          variant="body1"
                                          sx={{
                                            fontSize: "16px",
                                            color: isSelected ? "white" : "#333",
                                          }}
                                        >
                                          {getDateNumber(date)}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  );
                                })}
                              </Slider>

                              <Box className="timeSlots">
                                  {filteredSlots.length > 0 ? (
                                      <Box display="flex" flexWrap="wrap" gap="15px" className="mt-4">
                                          {filteredSlots.map((slot, index) => (
                                              <Box
                                                  key={index}
                                                  onClick={() => setSelectedTimeSlot(slot)}
                                                  sx={{
                                                      width: '100%',
                                                      padding: '15px 20px',
                                                      borderRadius: '8px',
                                                      border: '1px solid #E0E0E0',
                                                      backgroundColor: selectedTimeSlot === slot ? '#D8A7B1' : 'transparent',
                                                      borderColor: selectedTimeSlot === slot ? '#D8A7B1' : '#DADADA',
                                                      color: 'black',
                                                      cursor: 'pointer',
                                                      transition: 'all 0.2s ease',
                                                      textAlign: 'left',
                                                      minWidth: '80px',
                                                      fontSize: '18px'
                                                  }}
                                              >
                                                  {slot}
                                              </Box>
                                          ))}
                                      </Box>
                                  ) : (
                                      <Typography variant="body1" className="mt-4" sx={{ color: '#999' }}>
                                          {closeStore ? 'Store is closed today' : 'No Available Slots'}
                                      </Typography>
                                  )}
                              </Box>
                          </Box>
                      </Box>
                  </>
              )}
            </Box>
            <Box 
            ref={sideBarRef}
            sx={{
              width: {
                xs: "100%",
                md: "40%",
              },
              position: {
                xs: "static",
                md: "sticky",
              },
              top: {
                md: "50px",
              },
              right: 0,
            }}
            className='booking_details'>
              {storeDetails && (
                <div 
                className="rating_filter">
                  <Box sx={{ padding: "15px" }}>
                    <Box className="store_info_head" display="flex" gap="20px">
                      <Box
                        display="flex"
                        justifyContent="center"
                        sx={{
                          width: "30%",
                          borderRadius: "10px",
                          overflow: "hidden",
                          height: "85px",
                        }}
                      >
                        <img
                          src={`${process.env.REACT_APP_IMG_URL}/${storeDetails.thumbnail}`}
                          alt="Store Img"
                          style={{ width: "100%" }}
                        />
                      </Box>
                      <Box sx={{ width: "70%" }}>
                        <Typography variant="h4" sx={{ fontSize: "32px" }}>
                          {storeDetails.title}
                        </Typography>
                        <Box
                          display="flex"
                          gap="10px"
                          alignItems="center"
                          sx={{ width: "100%" }}
                        >
                          <Typography variant="p" sx={{ fontSize: "16px" }}>
                            {averageRating.toFixed(1)}
                          </Typography>
                          <StarRating rating={averageRating.toFixed(1)} />
                          <Typography
                            variant="p"
                            sx={{ fontSize: "16px", color: "#D8A7B1" }}
                          >
                            ({storeDetails.reviews.length})
                          </Typography>
                        </Box>
                        <Typography
                          variant="p"
                          display="block"
                          sx={{
                            fontSize: "14px",
                            width: "100%",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          {storeDetails.address}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ width: "100%" }} className="mt-4">
                      <Box sx={{ width: "100%" }} className="mt-4">
                        {selectedServices.map((service) => (
                          <Box
                            key={service.id}
                            display="flex"
                            className="mt-2"
                            justifyContent="space-between"
                            alignItems="start"
                          >
                            <Box>
                              <Typography
                                display="block"
                                variant="body1"
                                sx={{ fontSize: "18px" }}
                              >
                                {service.title}
                              </Typography>
                              <Typography
                                display="block"
                                variant="body2"
                                sx={{ fontSize: "16px" }}
                              >
                                {service.eta} with {!service.worker_id ? 'any professional' : service.worker_name}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                variant="body1"
                                sx={{ fontSize: "18px" }}
                              >
                                {service.currency} {service.price}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  <hr />
                  <Box sx={{ paddingInline: "15px" }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        display="block"
                        variant="body1"
                        sx={{ fontSize: "18px" }}
                      >
                        Subtotal
                      </Typography>
                      <Typography
                        display="block"
                        variant="body1"
                        sx={{ fontSize: "18px" }}
                      >
                        PKR{" "}
                        {selectedServices?.length
                          ? selectedServices.reduce(
                              (acc, service) => acc + parseFloat(service.price),
                              0
                            )
                          : 0}
                      </Typography>
                    </Box>
                  </Box>
                  <hr />
                  <Box sx={{ padding: "15px", paddingTop: "0px" }}>
                    <Box display="flex" justifyContent="space-between">
                      {step < 3 && (
                        <Button
                          sx={{
                            background: "#333333",
                            color: "white",
                            width: "100%",
                            borderRadius: "10px",
                          }}
                          variant="contained"
                          onClick={() => {setStep(step + 1);setIndWorker(false)}}
                        >
                          Next
                        </Button>
                      )}
                      {step === 3 && (
                        <Button
                          sx={{
                            background: "#333333",
                            color: "white",
                            width: "100%",
                            borderRadius: "10px",
                          }}
                          variant="contained"
                          onClick={handleFormSubmit}
                        >
                          Confirm Booking
                        </Button>
                      )}
                    </Box>
                  </Box>
                </div>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="mobile_next_btn">
        <Box className="details_mobile">
          <Typography variant="h3" sx={{fontSize:'18px'}}>
            PKR{" "}
            {selectedServices?.length
              ? selectedServices.reduce(
                  (acc, service) => acc + parseFloat(service.price),
                  0
                )
              : 0}
          </Typography>
          <Typography variant="body1" sx={{fontSize:'16px',color:'#333333a1'}}>{selectedServices.length} {selectedServices.length > 1 ? 'services' : 'service'} • {getTotalEta(selectedServices)}</Typography>
        </Box>
        <Box className="buttn">
          {step < 3 && (
            <Button
              sx={{
                background: "#333333",
                color: "white",
                width: "100%",
                borderRadius: "10px",
              }}
              variant="contained"
              onClick={() => {setStep(step + 1);setIndWorker(false)}}
            >
              Next
            </Button>
          )}
          {step === 3 && (
            <Button
              sx={{
                background: "#333333",
                color: "white",
                width: "100%",
                borderRadius: "10px",
              }}
              variant="contained"
              onClick={handleFormSubmit}
            >
              Confirm Booking
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}

export default BookingPage;

// Custom Prev Arrow
const PrevArrow = ({ className, style, onClick }) => (
    <IconButton
        className={className}
        onClick={onClick}
        sx={{
            ...style,
            backgroundColor: 'transparent',
            color: 'black',
            '&:hover': { color: 'black' },
            position: 'absolute',
            left: '90%',
            top:'-25px',
            zIndex: 1,
        }}
    >
        <ArrowBackIosIcon />
    </IconButton>
);

const NextArrow = ({ className, style, onClick }) => (
    <IconButton
        className={className}
        onClick={onClick}
        sx={{
            ...style,
            backgroundColor: 'transparent',
            color: 'black',
            '&:hover': { color: 'black' },
            position: 'absolute',
            right: '0',
            top:'-25px',
            zIndex: 1,
        }}
    >
        <ArrowForwardIosIcon />
    </IconButton>
);