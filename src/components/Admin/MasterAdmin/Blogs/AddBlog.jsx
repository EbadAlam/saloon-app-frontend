import React, { useEffect, useState } from 'react';
import axiosClient from '../../../../axios-client';
import AdminLayout from '../../Layout/Layout';
import Loader from '../../../Loader/Loader';
import BackButton from '../../../BackButton/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../../../../contexts/SnackBarContext';
import { ROUTES } from '../../../../routes';

const S = {
  page: { padding: '24px', background: '#f5f4f0', minHeight: '100vh' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' },
  title: { fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 },
  headerActions: { display: 'flex', alignItems: 'center', gap: '10px' },
  form: { background: '#fff', borderRadius: '12px', border: '0.5px solid #e0dfd8', padding: '24px' },
  field: { marginBottom: '18px' },
  label: { display: 'block', fontSize: '12px', fontWeight: 500, color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' },
  input: {
    width: '100%', padding: '10px 12px', borderRadius: '8px', border: '0.5px solid #e0dfd8',
    fontSize: '13px', boxSizing: 'border-box', fontFamily: 'inherit', color: '#1a1a2e',
  },
  textarea: {
    width: '100%', padding: '10px 12px', borderRadius: '8px', border: '0.5px solid #e0dfd8',
    fontSize: '13px', boxSizing: 'border-box', fontFamily: 'inherit', color: '#1a1a2e', resize: 'vertical',
  },
  select: {
    width: '100%', padding: '10px 12px', borderRadius: '8px', border: '0.5px solid #e0dfd8',
    fontSize: '13px', background: '#fff', color: '#1a1a2e', boxSizing: 'border-box',
  },
  uploadBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
    borderRadius: '8px', background: '#fff', color: '#1a1a2e', border: '1px solid #1a1a2e',
    fontSize: '13px', cursor: 'pointer', fontWeight: 500,
  },
  fileName: { fontSize: '12px', color: '#888', marginLeft: '10px' },
  sectionCard: { background: '#fafaf8', borderRadius: '10px', border: '0.5px solid #e0dfd8', padding: '18px', marginBottom: '16px' },
  sectionLabel: { fontSize: '13px', fontWeight: 600, color: '#1a1a2e', marginBottom: '12px' },
  addSectionBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px',
    borderRadius: '8px', background: '#fff', color: '#1a1a2e', border: '1px solid #1a1a2e',
    fontSize: '13px', cursor: 'pointer', fontWeight: 500, marginBottom: '20px',
  },
  saveBtn: {
    padding: '10px 24px', borderRadius: '8px', background: '#1a1a2e',
    color: '#fff', border: 'none', fontSize: '13px', cursor: 'pointer', fontWeight: 500,
  },
  actionsRow: { display: 'flex', gap: '10px', marginTop: '8px' },
};

function MasterAddEditBlogPage() {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    id: "",
    title: "",
    category: "",
    tags: "",
    short_description: "",
    sections: [{ heading: "", content: "", image: null }],
    status: "published",
  });
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (blogId) {
      fetchBlogDetail(blogId);
    }
  }, [blogId]);

  const fetchBlogDetail = async (id) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/getBlogDetailsById/${id}`);
      setForm({
        id: data.blog.id,
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
      console.log('error fetching blog details ', error);
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
      await axiosClient.post('/addBlog', formData);
      showSnackbar(`Blog ${blogId ? "updated" : "created"} successfully!`, 'success');
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
      <div style={S.page}>
        <div style={S.header}>
          <h5 style={S.title}>{blogId ? 'Edit' : 'Add'} Blog</h5>
          <div style={S.headerActions}>
            <BackButton />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={S.form}>
            <div style={S.field}>
              <label style={S.label}>Blog Title</label>
              <input
                style={S.input}
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div style={S.field}>
              <label style={S.label}>Category</label>
              <input
                style={S.input}
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>

            <div style={S.field}>
              <label style={S.label}>Tags (comma separated)</label>
              <input
                style={S.input}
                type="text"
                name="tags"
                value={form.tags ?? ""}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    tags: e.target.value,
                  }));
                }}
              />
            </div>

            <div style={S.field}>
              <label style={S.label}>Short Description</label>
              <textarea
                style={S.textarea}
                rows={3}
                value={form.short_description}
                onChange={(e) => setForm(prev => ({ ...prev, short_description: e.target.value }))}
              />
            </div>

            <div style={S.field}>
              <label style={S.label}>Status</label>
              <select style={S.select} name="status" value={form.status} onChange={handleChange}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div style={S.field}>
              <label style={S.uploadBtn}>
                Upload Thumbnail
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
              </label>
              {thumbnail && <span style={S.fileName}>{thumbnail.name}</span>}
            </div>

            {form.sections.map((section, index) => (
              <div key={index} style={S.sectionCard}>
                <div style={S.sectionLabel}>Section {index + 1}</div>
                <div style={S.field}>
                  <label style={S.label}>Section Heading</label>
                  <input
                    style={S.input}
                    type="text"
                    value={section.heading}
                    onChange={(e) => handleSectionChange(index, "heading", e.target.value)}
                  />
                </div>
                <div style={S.field}>
                  <label style={S.label}>Section Content</label>
                  <textarea
                    style={S.textarea}
                    rows={4}
                    value={section.content}
                    onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                  />
                </div>
                <label style={S.uploadBtn}>
                  Upload Section Image
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleSectionChange(index, "image", e.target.files[0])}
                  />
                </label>
                {section.image?.name && <span style={S.fileName}>{section.image.name}</span>}
              </div>
            ))}

            <div style={S.actionsRow}>
              <button type="button" onClick={addSection} style={S.addSectionBtn}>
                + Add Section
              </button>
              <button type="submit" style={S.saveBtn}>
                {blogId ? "Update Blog" : "Create Blog"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default MasterAddEditBlogPage;