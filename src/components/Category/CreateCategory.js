import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Input, Select, Table, Pagination } from 'antd';
import { FaEdit, FaTrash } from 'react-icons/fa';

const { TextArea } = Input;
const { Option } = Select;

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    parentId: ''
  });
  const [existingCategories, setExistingCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  useEffect(() => {
    fetchExistingCategories();
  }, []);

  const fetchExistingCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3002/category');
      setExistingCategories(response.data);
    } catch (error) {
      console.error('Error fetching existing categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (editingCategory) {
        await axios.put(`http://localhost:3002/category/${editingCategory.id}`, formData);
        console.log('Category updated successfully');
      } else {
        await axios.post('http://localhost:3002/category', formData);
        console.log('Category created successfully');
      }
      setFormData({ title: '', image: '', description: '', parentId: '' });
      setEditingCategory(null);
      setModalVisible(false);
      fetchExistingCategories();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (category) => {
    setFormData({
      title: category.title,
      image: category.image || '',
      description: category.description || '',
      parentId: category.parentId || ''
    });
    setEditingCategory(category);
    setModalVisible(true);
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3002/category/${categoryId}`);
      console.log('Category deleted successfully');
      fetchExistingCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditingCategory(null);
    setFormData({ title: '', image: '', description: '', parentId: '' });
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, category) => (
        <div
          style={{
            display: 'flex',

          }}
        >
          <Button type="link" icon={<FaEdit />} onClick={() => handleEdit(category)} />
          <Button type="link" icon={<FaTrash />} danger onClick={() => handleDelete(category.id)} />
        </div>
      ),
    },
  ];

  const paginatedCategories = existingCategories.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create or Update Category</h2>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        {editingCategory ? 'Edit Category' : 'Create Category'}
      </Button>
      <Modal
        title={editingCategory ? 'Edit Category' : 'Create Category'}
        visible={modalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        okText={editingCategory ? 'Update' : 'Create'}
      >
        <form className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block">Title:</label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block">Image:</label>
              <Select
                name="parentId"
                value={formData.image}
                onChange={(value) => setFormData({ ...formData, image: value})}
                className="w-full"
              >
                <Option value="">Select image Name</Option>
                <Option value="0">HEROKU</Option>
                <Option value="1">HTML</Option>
                <Option value="2">JAVASCRIPT</Option>
                <Option value="3">MONGO</Option>
                <Option value="4">MYSQL</Option>
                <Option value="5">NEXT</Option>
                <Option value="6">NODE</Option>
                <Option value="7">PHP</Option>
              </Select>
            </div>
          </div>
          <div>
            <label className="block">Description:</label>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength={200}
              rows={4}
            />
          </div>
          <div>
            <label className="block">Parent Category:</label>
            <Select
              name="parentId"
              value={formData.parentId}
              onChange={(value) => setFormData({ ...formData, parentId: value })}
              className="w-full"
            >
              <Option value="">Select Parent Category</Option>
              {existingCategories.map(category => (
                <Option key={category.id} value={category.id}>{category.title}</Option>
              ))}
            </Select>
          </div>
        </form>
      </Modal>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Existing Categories</h3>
        <Table
          columns={columns}
          dataSource={paginatedCategories}
          pagination={false}
          rowKey="id"
        />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={existingCategories.length}
          onChange={handlePaginationChange}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default CreateCategory;
