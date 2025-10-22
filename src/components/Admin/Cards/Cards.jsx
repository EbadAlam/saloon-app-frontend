import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ROUTES } from "../../../routes";
import { Link } from "react-router-dom";
import { Alert, Badge, Box, Stack } from "@mui/material";

export default function Cards({ storeData }) {
  return (
    <Card sx={{ maxWidth: 800,position:'relative' }}>
      {storeData.is_active_by_admin != 1 && <Box className="overlay disabledStore">This store is disabled by admin</Box>}
      <CardMedia
        sx={{ height: 300 }}
        image={`${process.env.REACT_APP_IMG_URL}${storeData.thumbnail}`}
        title={storeData.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {storeData.title}
          {storeData.status != 'active' && <span style={{color:'red'}}> (Waiting for approval by admin)</span>}
          
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ color: "text.secondary" }}
        >
          Address: {storeData.address}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {storeData.about ? storeData.about : "No details about this store"}
        </Typography>
        {storeData && storeData?.services_categories?.length < 1 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Your store doesn't have service categories!&nbsp;
            <Link to={ROUTES.getAdminAddCategory(storeData.id)}>Add now</Link>
          </Alert>
        )}

        {storeData && storeData?.services?.length < 1 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {storeData?.services_categories?.length < 1 ? (
              <>
                Your store doesn't have services! You must&nbsp;
                <Link to={ROUTES.getAdminAddCategory(storeData.id)}>
                  add service categories
                </Link>
                &nbsp; before you can add services.
              </>
            ) : (
              <>
                Your store doesn't have services!&nbsp;
                <Link
                  to={ROUTES.getAdminAddServices(storeData.id)}
                  state={{ servicesCategories: storeData.services_categories }}
                >
                  Add now
                </Link>
              </>
            )}
          </Alert>
        )}

        {storeData && storeData?.working_hours?.length < 1 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Your store doesn't have working hours!{" "}
            <Link to={ROUTES.getAdminAddWorkingHours(storeData.id)}>
              Add now
            </Link>
          </Alert>
        )}
      </CardContent>
      <CardActions className="store_btns">
        <Stack direction="row" gap={2} flexWrap="wrap">
          <Link
            component="a"
            to={ROUTES.getStoreFrontPage(storeData.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="small">
              View Store
            </Button>
          </Link>
          <Link
            to={ROUTES.getAdminEditStore(storeData.id)}
            rel="noopener noreferrer"
          >
            <Button size="small">Edit store</Button>
          </Link>
        </Stack>
        <Stack direction="row" gap={2} flexWrap="wrap">
          <Link
            to={ROUTES.getAdminAddCategory(storeData.id)}
            rel="noopener noreferrer"
          >
            <Button size="small">Services Categories ({storeData.services_categories?.length ?? 0})</Button>
          </Link>
          {storeData?.services_categories?.length > 0 && (
            <Link
              to={ROUTES.getAdminAddServices(storeData.id)}
              state={{ servicesCategories: storeData.services_categories }}
              rel="noopener noreferrer"
            >
              <Button size="small">Services ({storeData.services?.length ?? 0})</Button>
            </Link>
          )}
        </Stack>
        <Stack direction="row" gap={2} flexWrap="wrap">
          <Link
            to={ROUTES.getAdminAddWorkingHours(storeData.id)}
            rel="noopener noreferrer"
          >
            <Button size="small">Working Hours ({storeData.working_hours?.length ?? 0})</Button>
          </Link>
          <Link
            to={ROUTES.getAdminAddTeamMembers(storeData.id)}
            rel="noopener noreferrer"
          >
            <Button size="small">Team Members ({storeData.workers?.length ?? 0})</Button>
          </Link>
        </Stack>
        <Stack direction="row" gap={2} flexWrap="wrap">
          <Link
            to={ROUTES.getAdminBookings(storeData.id)}
            rel="noopener noreferrer"
          >
            <Badge badgeContent={storeData?.bookings.filter(b => b.is_seen == 'false').length} color="primary">
            <Button size="small">Bookings ({storeData.bookings?.length ?? 0})</Button>
            </Badge>
          </Link>
          <Link
            to={ROUTES.getAdminReviews(storeData.id)}
            rel="noopener noreferrer"
          >
            <Button size="small">Reviews ({storeData.reviews?.length ?? 0})</Button>
          </Link>
        </Stack>
      </CardActions>
    </Card>
  );
}
