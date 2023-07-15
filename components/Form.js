import React from 'react';
import { Grid, TextField, Button } from '@mui/material';

function Form({ formData, handleInputChange, handleSubmit, editItemId }) {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre del smartphone"
            name="smartphone_name"
            value={formData.smartphone_name}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Modelo"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Precio de referencia"
            name="reference_price"
            type="number"
            value={formData.reference_price}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Precio de venta"
            name="selling_price"
            type="number"
            value={formData.selling_price}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Año del modelo"
            name="model_year"
            type="number"
            value={formData.model_year}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {editItemId ? 'Actualizar' : 'Crear'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Form;
