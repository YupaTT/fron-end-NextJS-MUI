import React from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button, Box } from '@mui/material';

function ItemsTable({ items, handleEdit, handleDelete }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre del smartphone</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Precio de referencia</TableCell>
            <TableCell>Precio de venta</TableCell>
            <TableCell>Año del modelo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.smartphone_name}</TableCell>
              <TableCell>{item.model}</TableCell>
              <TableCell>{item.reference_price}</TableCell>
              <TableCell>{item.selling_price}</TableCell>
              <TableCell>{item.model_year}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(item)}>
                    Editar
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(item.id)}>
                    Eliminar
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ItemsTable;
