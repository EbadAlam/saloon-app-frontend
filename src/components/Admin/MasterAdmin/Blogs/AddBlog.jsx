import React, { useEffect, useState } from 'react';
import {
  Typography,
  Stack,
  TextField,
  Button,
  MenuItem,
  Box,
} from '@mui/material';
import axiosClient from '../../../../axios-client';
import AdminLayout from '../../Layout/Layout';
import Loader from '../../../Loader/Loader';
import BackButton from '../../../BackButton/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../../../../contexts/SnackBarContext';
import { ROUTES } from '../../../../routes';

function MasterAddEditBlogPage() {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    id:"",
    title: "",
    category: "",
    tags: "",
    short_description:"",
    sections: [{ heading: "", content: "", image: null }],
    status: "published",
  });
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (blogId) {
      fetchBlogDetail(blogId);
    }
  }, [blogId]);
  const fetchBlogDetail = async(id) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getBlogDetailsById/${id}`);
      setForm({
        id:data.blog.id,
        title: data.blog.title ?? "",
        category: data.blog.category ?? "",
        short_description: data.blog.short_description ?? "",
        status: data.blog.status ?? "",
        sections: JSON.parse(data.blog.sections) ?? "",
        tags: Array.isArray(data.blog.tags)
          ? data.blog.tags
          : JSON.parse(data.blog.tags ?? "[]"),
      });
      setThumbnail(data.blog.thumbnail ?? null);
    } catch (error) {
      console.log('error fetching blog details ',error);
    } finally {
      setLoading(false);
    }
  }
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSectionChange = (index, field, value) => {
      setForm(prev => {
        const updated = [...prev.sections];
        updated[index][field] = value;
        return { ...prev, sections: updated };
      });
    };

    const addSection = () => {
      setForm(prev => ({
        ...prev,
        sections: [...prev.sections, { heading: "", content: "", image: null }]
      }));
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const tagsArray = form.tags
      ? form.tags.length > 1 ? form.tags.split(",").map(tag => tag.trim()).filter(Boolean)
      : [] : form.tags.map(tag => tag.trim()).filter(Boolean);
      const formData = new FormData();
      formData.append("id", form.id);
      formData.append("title", form.title);
      formData.append("thumbnail", thumbnail);
      formData.append("category", form.category);
      formData.append("tags", JSON.stringify(tagsArray));
      formData.append("short_description", form.short_description);
      formData.append("status", form.status);
      form.sections.forEach((section, index) => {
        formData.append(`sections[${index}][heading]`, section.heading);
        formData.append(`sections[${index}][content]`, section.content);

        if (section.image) {
          formData.append(`sections[${index}][image]`, section.image);
        }
      });
      try {
        await axiosClient.post('/addBlog',formData);
        showSnackbar(`Blog ${blogId ? "updated" : "created"} successfully!`,'success');
        navigate(ROUTES.masterAdminBlogs)
      } catch (error) {
        console.error('error adding blog', error);
      } finally {
        setLoading(false);
      }
    };
  return (
    <AdminLayout>
      {loading && <Loader />}
      <div className="container-fluid dashboard-content">
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">{blogId ? 'Edit' : 'Add'} Blog</Typography>
            <Stack direction="row" gap={2}>
              <BackButton />
            </Stack>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Blog Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Tags (comma separated)"
              name="tags"
              value={form.tags ?? ""}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  tags: e.target.value,
                }));
              }}
              fullWidth
            />

            <div>
              <TextField
                label="Short Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={form.short_description}
                onChange={(e) => setForm(prev => ({ ...prev, short_description: e.target.value }))}
              />
            </div>

            <TextField
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="published">Published</MenuItem>
            </TextField>

            <Button variant="outlined" component="label">
              Upload Thumbnail
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </Button>
            {thumbnail && <Typography variant="body2">{thumbnail.name}</Typography>}
            {form.sections.map((section, index) => (
              <Box key={index} sx={{ mt: 3, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
                <TextField
                  label="Section Heading"
                  fullWidth
                  margin="normal"
                  value={section.heading}
                  onChange={(e) => handleSectionChange(index, "heading", e.target.value)}
                />
                <TextField
                  label="Section Content"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  value={section.content}
                  onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                />
                <Button component="label" variant="outlined" sx={{ mt: 1 }}>
                  Upload Section Image
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleSectionChange(index, "image", e.target.files[0])}
                  />
                </Button>
              </Box>
            ))}

            <Button onClick={addSection} sx={{ mt: 2 }} variant="outlined">
              ➕ Add Section
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {blogId ? "Update Blog" : "Create Blog"}
            </Button>
          </Stack>
        </form>
      </div>
    </AdminLayout>
  );
}

export default MasterAddEditBlogPage;
