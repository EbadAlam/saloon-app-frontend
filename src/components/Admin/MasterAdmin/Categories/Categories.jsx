import React, { useEffect, useRef, useState } from "react";
import { Pagination, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import axiosClient from "../../../../axios-client";
import AdminLayout from "../../Layout/Layout";
import Loader from "../../../Loader/Loader";
import BackButton from "../../../BackButton/BackButton";
import ActiveDeactiveSwitch from "../../../ActiveDeactiveSwitch/ActiveDeactiveSwitch";
import DeleteButton from "../../../DeleteButton/DeleteButton";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "../../../../contexts/SnackBarContext";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const S = {
  page: { padding: "24px", background: "#f5f4f0", minHeight: "100vh" },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  title: { fontSize: "20px", fontWeight: 600, color: "#1a1a2e", margin: 0 },
  headerActions: { display: "flex", alignItems: "center", gap: "10px" },
  addBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 18px",
    borderRadius: "8px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
  },
  select: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "0.5px solid #e0dfd8",
    background: "#fff",
    fontSize: "13px",
    color: "#1a1a2e",
  },
  applyBtn: {
    padding: "8px 18px",
    borderRadius: "8px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  },
  form: {
    background: "#fff",
    borderRadius: "12px",
    border: "0.5px solid #e0dfd8",
    padding: "20px",
    marginBottom: "20px",
  },
  formTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: "14px",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "0.5px solid #e0dfd8",
    fontSize: "13px",
    marginBottom: "12px",
    boxSizing: "border-box",
  },
  uploadBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    borderRadius: "8px",
    background: "#fff",
    color: "#1a1a2e",
    border: "1px solid #1a1a2e",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
    marginBottom: "12px",
  },
  fileName: { fontSize: "12px", color: "#888", marginLeft: "10px" },
  saveBtn: {
    marginTop: "6px",
    padding: "9px 20px",
    borderRadius: "8px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 500,
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    border: "0.5px solid #e0dfd8",
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: {
    padding: "12px 14px",
    textAlign: "left",
    color: "#888",
    fontWeight: 500,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    borderBottom: "1px solid #f0efe8",
  },
  td: {
    padding: "12px 14px",
    color: "#1a1a2e",
    fontSize: "13px",
    borderBottom: "0.5px solid #f5f4f0",
    verticalAlign: "middle",
  },
  tdNum: {
    padding: "12px 14px",
    color: "#aaa",
    fontSize: "12px",
    borderBottom: "0.5px solid #f5f4f0",
  },
  dragHandle: {
    cursor: "grab",
    color: "#bbb",
    display: "flex",
    alignItems: "center",
  },
  badgeActive: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    background: "#eaf3de",
    color: "#27500a",
    textTransform: "capitalize",
  },
  badgeDisabled: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: 500,
    background: "#fcebeb",
    color: "#791f1f",
    textTransform: "capitalize",
  },
  editBtn: {
    padding: "5px 14px",
    borderRadius: "7px",
    background: "#1a1a2e",
    color: "#fff",
    border: "none",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: 500,
  },
};

function SortableRow({ category, index, pageOffset, onEdit }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: isDragging ? "#faf7f8" : index % 2 === 0 ? "#fff" : "#fafaf8",
  };

  return (
    <tr ref={setNodeRef} style={style} className={category._highlight ? "blink-highlight" : ""}>
      <td style={S.td}>
        <span style={S.dragHandle} {...attributes} {...listeners}>
          <DragIndicatorIcon style={{ fontSize: 18 }} />
        </span>
      </td>
      <td style={S.td}>
        <input
          className="allCheckboxes"
          type="checkbox"
          checked={!!category.isChecked}
          onChange={category._onCheckboxChange}
        />
      </td>
      <td style={S.tdNum}>{pageOffset + index + 1}</td>
      <td style={{ ...S.td, fontWeight: 500 }}>{category.title}</td>
      <td style={S.td}>{category.services_count ?? 0}</td>
      <td style={S.td}>
        <span style={category.status === "active" ? S.badgeActive : S.badgeDisabled}>
          {category.status}
        </span>
      </td>
      <td style={S.td}>
        <ActiveDeactiveSwitch
          id={category.id}
          apiUrl="/updateServicesCategoryStatus"
          status={category.status}
          onStatusChange={category._onStatusChange}
        />
      </td>
      <td style={S.td}>
        <button style={S.editBtn} onClick={() => onEdit(category.id, category.title)}>
          Edit
        </button>
      </td>
      <td style={S.td}>
        <DeleteButton
          id={category.id}
          url="/deleteServicesCategory"
          onStatusChange={category._onStatusChange}
        />
      </td>
    </tr>
  );
}

function MasterCategoriesPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [categoryId, setCategoryId] = useState("");
  const location = useLocation();
  const [highlightId, setHighlightId] = useState(
    location.state?.highlightId ?? ""
  );
  const highlightedRef = useRef(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOption, setSelectedOption] = useState("active");
  const [alertOpen, setAlertOpen] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 15,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(
        `/getAllCategoriesMaster?page=${page}`
      );
      setCategories(data.categories.data);
      setPagination({
        current_page: data.categories.current_page,
        last_page: data.categories.last_page,
        total: data.categories.total,
        per_page: data.categories.per_page,
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (e, page) => {
    fetchCategories(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleForm = () => {
    setTitle("");
    setCategoryId("");
    setThumbnail(null);
    setShowForm((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      if (categoryId) formData.append("id", categoryId);
      formData.append("title", title);
      if (thumbnail) formData.append("thumbnail", thumbnail);

      const { data } = await axiosClient.post(`/addNewCategory`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showSnackbar(data.message || "New category added", "success");
      fetchCategories(pagination.current_page);
      setTitle("");
      setThumbnail(null);
    } catch (error) {
      console.error("Failed to add/edit category:", error);
      showSnackbar("Failed to save category", "error");
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };

  const handleStatusChange = (newStatus, fetch = true) => {
    showSnackbar(newStatus.message, newStatus.success ? "success" : "error");
    if (fetch) fetchCategories(pagination.current_page);
  };

  useEffect(() => {
    if (!loading && highlightedRef.current) {
      highlightedRef.current.classList.add("blink-highlight");
      const timeout = setTimeout(() => {
        highlightedRef.current.classList.remove("blink-highlight");
        setHighlightId("");
      }, 2400);
      return () => clearTimeout(timeout);
    }
  }, [highlightId, loading, categories]);

  const handleToggleEditForm = (id, title) => {
    setCategoryId(id);
    setTitle(title);
    setShowForm(true);
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setCategories(categories.map((c) => ({ ...c, isChecked })));
  };

  const handleCheckboxChange = (event, categoryId) => {
    const isChecked = event.target.checked;
    setCategories(
      categories.map((c) => (c.id === categoryId ? { ...c, isChecked } : c))
    );
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleApply = () => {
    if (selectedOption === "delete") {
      setAlertOpen(true);
    } else {
      bulkActionFunction();
    }
  };

  const bulkActionFunction = async () => {
    const selectedIds = categories
      .filter((category) => category.isChecked)
      .map((category) => category.id);
    if (selectedIds.length === 0) {
      showSnackbar("Select any category to update", "error");
      setAlertOpen(false);
      return;
    }
    setLoading(true);
    try {
      const payload = {
        model: "ServicesCategory",
        selectedIds,
        action: selectedOption,
      };
      const { data } = await axiosClient.post("/bulkOptionPerform", payload);
      showSnackbar(data.message || "Bulk action performed", "success");
      fetchCategories(pagination.current_page);
    } catch (error) {
      console.error("Error performing bulk options ", error);
    } finally {
      setSelectAll(false);
      setLoading(false);
      setAlertOpen(false);
    }
  };

  const pageOffset = (pagination.current_page - 1) * pagination.per_page;

  const persistOrder = (orderedCategories) => {
    const order = orderedCategories.map((c, index) => ({
      id: c.id,
      order: pageOffset + index,
    }));
    axiosClient
      .post("/categories/reorder", { order })
      .catch((e) => console.error(e));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setCategories((prev) => {
      const oldIndex = prev.findIndex((c) => c.id === active.id);
      const newIndex = prev.findIndex((c) => c.id === over.id);
      const reordered = arrayMove(prev, oldIndex, newIndex);
      persistOrder(reordered);
      return reordered;
    });
  };

  return (
    <AdminLayout>
      <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete these items? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlertOpen(false)}>Cancel</Button>
          <Button color="error" onClick={bulkActionFunction} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {loading && <Loader />}
      <div style={S.page}>
        <div style={S.header}>
          <h5 style={S.title}>Categories</h5>
          <div style={S.headerActions}>
            <BackButton />
            <button style={S.addBtn} onClick={handleToggleForm}>
              {showForm ? "Cancel" : "+ Add Category"}
            </button>
          </div>
        </div>

        <div style={S.toolbar}>
          <select style={S.select} value={selectedOption} onChange={handleOptionChange}>
            {[{label:"Active",value:"active"}, {label:"Deactive",value:"inactive"},{label:"delete",value:"delete"}].map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <button style={S.applyBtn} onClick={handleApply}>
            Save
          </button>
        </div>

        {showForm && (
          <div style={S.form}>
            <div style={S.formTitle}>
              {categoryId ? "Update" : "Add new"} category
            </div>
            <form onSubmit={handleFormSubmit}>
              <input
                style={S.input}
                type="text"
                placeholder="Category name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <div>
                <label style={S.uploadBtn}>
                  Upload Thumbnail
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setThumbnail(e.target.files[0])}
                  />
                </label>
                {thumbnail && <span style={S.fileName}>Selected: {thumbnail.name}</span>}
              </div>
              <button type="submit" style={S.saveBtn}>
                {categoryId ? "Update Category" : "Add Category"}
              </button>
            </form>
          </div>
        )}

        <div style={S.card}>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}></th>
                <th style={S.th}>
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </th>
                <th style={S.th}>#</th>
                <th style={S.th}>Title</th>
                <th style={S.th}>Services Associated</th>
                <th style={S.th}>Status</th>
                <th style={S.th}>Change Status</th>
                <th style={S.th}>Edit</th>
                <th style={S.th}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {categories && categories.length > 0 ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={categories.map((c) => c.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {categories.sort((a,b) => a.order - b.order).map((singleCat, index) => (
                      <SortableRow
                        key={singleCat.id}
                        category={{
                          ...singleCat,
                          _onCheckboxChange: (e) =>
                            handleCheckboxChange(e, singleCat.id),
                          _onStatusChange: handleStatusChange,
                          _highlight: singleCat.id === highlightId,
                        }}
                        index={index}
                        pageOffset={pageOffset}
                        onEdit={handleToggleEditForm}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    style={{ ...S.td, textAlign: "center", color: "#aaa", padding: "32px" }}
                  >
                    No Categories
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "16px" }}>
          <Pagination
            count={pagination.last_page}
            page={pagination.current_page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </div>
      </div>
    </AdminLayout>
  );
}

export default MasterCategoriesPage;