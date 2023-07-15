import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Container, Modal, Box, Button } from '@mui/material';
import LayoutAuthenticated from '../components/layout-authenticated';
import { useRouter } from 'next/router';
import Form from '../components/Form';
import ItemsTable from '../components/ItemsTable';

export default function Phones() {
    
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    smartphone_name: '',
    model: '',
    reference_price: 0,
    selling_price: 0,
    model_year: 0,
  });
  const [editItemId, setEditItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3005/tienda');
      setItems(response.data);
    } catch (error) {
      console.error('Error al obtener los registros:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.smartphone_name ||
      !formData.model ||
      !formData.reference_price ||
      !formData.selling_price ||
      !formData.model_year
    ) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      if (editItemId) {
        // Update item
        const response = await axios.put(`http://localhost:3005/tienda/${editItemId}`, formData);
        console.log('Registro actualizado:', response.data);
      } else {
        // Create item
        const response = await axios.post('http://localhost:3005/tienda', formData);
        console.log('Nuevo registro creado:', response.data);
      }

      fetchItems();
      resetForm();
    } catch (error) {
      console.error('Error al guardar el registro:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:3005/tienda/${itemId}`);
      console.log('Registro eliminado:', response.data);
      fetchItems();
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditItemId(item.id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      smartphone_name: '',
      model: '',
      reference_price: 0,
      selling_price: 0,
      model_year: 0,
    });
    setEditItemId(null);
  };

  return (
    <>
      <LayoutAuthenticated />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          CRUD de Tienda
        </Typography>
        <Form
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          editItemId={editItemId}
        />
        <Typography variant="h5" component="h2" sx={{ mt: 4 }}>
          Registros:
        </Typography>
        <ItemsTable items={items} handleEdit={handleEdit} handleDelete={handleDelete} />
      </Container>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        
<Container maxWidth="sm">
<Box
  sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }}
>
  <Typography variant="h6" component="h2" gutterBottom>
    Editar elemento
  </Typography>
  <Form
    formData={formData}
    handleInputChange={handleInputChange}
    handleSubmit={handleSubmit}
    editItemId={editItemId}
  />
  <Button variant="contained" color="secondary" onClick={handleModalClose} sx={{ mt: 2 }}>
    Cancelar
  </Button>
</Box>
</Container>
</Modal>
</>
);
}
