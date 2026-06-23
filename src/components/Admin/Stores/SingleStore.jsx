import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box, Skeleton, Alert, Badge, Button, Stack, Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircleIcon from '@mui/icons-material/Circle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
import AdminLayout from '../Layout/Layout';
import axiosClient from '../../../axios-client';
import { ROUTES } from '../../../routes';

const statusConfig = (storeData) => {
  if (storeData.is_active_by_admin != 1)
    return { label: 'Disabled by admin', icon: <ErrorOutlineIcon sx={{ fontSize: 12 }} />, sx: { background: '#FCEBEB', color: '#A32D2D' } };
  if (storeData.status !== 'active')
    return { label: 'Pending approval', icon: <AccessTimeIcon sx={{ fontSize: 12 }} />, sx: { background: '#FAEEDA', color: '#854F0B' } };
  return { label: 'Active', icon: <CircleIcon sx={{ fontSize: 9 }} />, sx: { background: '#EAF3DE', color: '#3B6D11' } };
};

const pill = {
  display: 'inline-flex', alignItems: 'center', gap: '5px',
  fontSize: 11, fontWeight: 500, padding: '4px 10px',
  borderRadius: 20, whiteSpace: 'nowrap',
};

const actionBtn = {
  fontSize: 12, textTransform: 'none', border: '0.5px solid #ddd',
  borderRadius: '8px', color: '#333', background: '#fff',
  '&:hover': { background: '#f5f5f5' },
  px: 1.5, py: 0.75,
};

const sectionLabel = {
  fontSize: 11, letterSpacing: '0.06em', color: '#aaa',
  textTransform: 'uppercase', mb: 1,
};

export default function SingleStore() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get(`/getStoreDetails/${storeId}`)
      .then(({ data }) => { setStoreData(data.storeDetails);console.log('Store details:', data.storeDetails); setLoading(false); })
      .catch((err) => console.error('Error fetching store details:', err));
  }, [storeId]);

  const unseenBookings = storeData?.bookings?.filter(b => b.is_seen === 'false').length ?? 0;
  const hasCategories = (storeData?.services_categories?.length ?? 0) > 0;
  const hasServices   = (storeData?.services?.length ?? 0) > 0;
  const hasHours      = (storeData?.working_hours?.length ?? 0) > 0;
  const status        = storeData ? statusConfig(storeData) : null;

  return (
    <AdminLayout>
      <div className="container-fluid dashboard-content">

        <Box display="flex" alignItems="center" gap={1.5} mb={3.5}>
          <Button
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon sx={{ fontSize: 14 }} />}
            sx={{ ...actionBtn, fontSize: 13 }}
          >
            Back
          </Button>
          <Typography fontSize={13} color="#aaa">
            Stores &rsaquo; <span style={{ color: '#555' }}>{storeData?.title ?? '...'}</span>
          </Typography>
        </Box>

        <Box sx={{ border: '0.5px solid #e0e0e0', borderRadius: 4, overflow: 'hidden', background: '#fff',maxWidth:"50%" }}>

          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={240} />
          ) : (
            <Box position="relative">
              {storeData.thumbnail ? (
                <img
                  src={`${process.env.REACT_APP_IMG_URL}${storeData.thumbnail}`}
                  alt={storeData.title}
                  style={{ width: '100%', height: 240, objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <Box sx={{ width: '100%', height: 240, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: 13 }}>
                  No thumbnail
                </Box>
              )}
              {storeData.is_active_by_admin != 1 && (
                <Box sx={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 500 }}>
                  This store is disabled by admin
                </Box>
              )}
            </Box>
          )}

          {/* Body */}
          <Box p={{ xs: 2.5, md: 3.5 }}>

            {/* Title + status */}
            {loading ? (
              <Box mb={2}><Skeleton width="50%" height={30} /><Skeleton width="25%" height={20} /></Box>
            ) : (
              <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={1.5} mb={1}>
                <Typography fontSize={21} fontWeight={500} color="#111">{storeData.title}</Typography>
                <Box component="span" sx={{ ...pill, ...status.sx }}>{status.icon} {status.label}</Box>
              </Box>
            )}

            {/* Address + about */}
            {!loading && (
              <>
                {storeData.address && (
                  <Typography fontSize={13} color="#888" mb={0.75}>{storeData.address}</Typography>
                )}
                <Typography fontSize={13} color="#666" lineHeight={1.7} mb={2.5}>
                  {storeData.about ?? 'No details about this store.'}
                </Typography>
              </>
            )}

            {/* Alerts */}
            {!loading && (
              <Stack gap={1} mb={2.5}>
                {!hasCategories && (
                  <Alert severity="error" sx={{ fontSize: 12, py: 0.5 }}>
                    No service categories yet.{' '}
                    <Link to={ROUTES.getAdminAddCategory(storeData.id)}>Add now</Link>
                  </Alert>
                )}
                {!hasServices && (
                  <Alert severity="error" sx={{ fontSize: 12, py: 0.5 }}>
                    {!hasCategories ? (
                      <>No services yet. <Link to={ROUTES.getAdminAddCategory(storeData.id)}>Add categories first</Link></>
                    ) : (
                      <><Link to={ROUTES.getAdminAddServices(storeData.id)} state={{ servicesCategories: storeData.services_categories }}>Add services</Link> — your store has none yet.</>
                    )}
                  </Alert>
                )}
                {!hasHours && (
                  <Alert severity="error" sx={{ fontSize: 12, py: 0.5 }}>
                    No working hours set.{' '}
                    <Link to={ROUTES.getAdminAddWorkingHours(storeData.id)}>Add now</Link>
                  </Alert>
                )}
              </Stack>
            )}

            <Box sx={{ height: '0.5px', background: '#efefef', mb: 2.5 }} />

            {/* Stats */}
            {loading ? (
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.5} mb={2.5}>
                <Skeleton variant="rectangular" height={72} sx={{ borderRadius: 2 }} />
                <Skeleton variant="rectangular" height={72} sx={{ borderRadius: 2 }} />
              </Box>
            ) : (
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.5} mb={2.5}>
                {[
                  { label: 'Store leads', val: storeData.store_leads_count ?? 0, sub: 'total submissions' },
                  { label: 'WhatsApp leads', val: storeData.whatsapp_leads_count ?? 0, sub: 'click-throughs' },
                ].map(s => (
                  <Box key={s.label} sx={{ background: '#f8f8f8', borderRadius: 2, p: '12px 14px' }}>
                    <Typography fontSize={11} color="#999" mb={0.5}>{s.label}</Typography>
                    <Typography fontSize={19} fontWeight={500} color="#111">{s.val}</Typography>
                    <Typography fontSize={11} color="#bbb" mt={0.25}>{s.sub}</Typography>
                  </Box>
                ))}
              </Box>
            )}

            <Box sx={{ height: '0.5px', background: '#efefef', mb: 2.5 }} />

            {/* Quick actions */}
            {!loading && (
              <>
                <Typography sx={sectionLabel}>Quick actions</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1} mb={3}>
                  <Link to={ROUTES.getStoreFrontPage(storeData.slug)} target="_blank" rel="noopener noreferrer">
                    <Button sx={{ ...actionBtn, background: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a', '&:hover': { background: '#333' } }}
                      endIcon={<OpenInNewIcon sx={{ fontSize: 13 }} />}>
                      View store
                    </Button>
                  </Link>
                  <Link to={ROUTES.getAdminEditStore(storeData.id)}>
                    <Button sx={actionBtn} startIcon={<EditIcon sx={{ fontSize: 13 }} />}>Edit store</Button>
                  </Link>
                </Stack>

                {/* Manage */}
                <Typography sx={sectionLabel}>Manage</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  <Link to={ROUTES.getAdminAddCategory(storeData.id)}>
                    <Button sx={actionBtn}>
                      Service categories ({storeData.services_categories?.length ?? 0})
                    </Button>
                  </Link>

                  {hasCategories && (
                    <Link to={ROUTES.getAdminAddServices(storeData.id)} state={{ servicesCategories: storeData.services_categories }}>
                      <Button sx={actionBtn}>
                        Services ({storeData.services?.length ?? 0})
                      </Button>
                    </Link>
                  )}

                  <Link to={ROUTES.getAdminAddWorkingHours(storeData.id)}>
                    <Button sx={actionBtn}>
                      Working hours ({storeData.working_hours?.length ?? 0})
                    </Button>
                  </Link>

                  <Link to={ROUTES.getAdminAddTeamMembers(storeData.id)}>
                    <Button sx={actionBtn}>
                      Team members ({storeData.workers?.length ?? 0})
                    </Button>
                  </Link>

                  <Link to={ROUTES.getAdminBookings(storeData.id)}>
                    <Badge badgeContent={unseenBookings} color="primary">
                      <Button sx={actionBtn}>
                        Bookings ({storeData.bookings?.length ?? 0})
                      </Button>
                    </Badge>
                  </Link>

                  <Link to={ROUTES.getAdminReviews(storeData.id)}>
                    <Button sx={actionBtn}>
                      Reviews ({storeData.reviews?.length ?? 0})
                    </Button>
                  </Link>
                </Stack>
              </>
            )}
          </Box>
        </Box>
      </div>
    </AdminLayout>
  );
}