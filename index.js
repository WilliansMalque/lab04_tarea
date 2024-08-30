// index.js
const express = require('express');
const app = express();
app.use(express.json()); // Middleware para analizar JSON

// Datos de ejemplo
const clientes = [
    { id: 1, nombre: 'Cliente 1', email: 'cliente1@example.com' },
    { id: 2, nombre: 'Cliente 2', email: 'cliente2@example.com' },
    { id: 3, nombre: 'Cliente 3', email: 'cliente3@example.com' }
];

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});

// Obtener clientes
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Obtener productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Agregar cliente
app.post('/clientes', (req, res) => {
    const { nombre, email } = req.body;
    const nuevoCliente = {
        id: clientes.length + 1,
        nombre,
        email
    };
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// Actualizar cliente
app.put('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { nombre, email } = req.body;
    const clienteIndex = clientes.findIndex(c => c.id === id);

    if (clienteIndex !== -1) {
        clientes[clienteIndex] = { id, nombre, email };
        res.json(clientes[clienteIndex]);
    } else {
        res.status(404).json({ message: 'Cliente no encontrado' });
    }
});

// Eliminar cliente
app.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const clienteIndex = clientes.findIndex(c => c.id === id);

    if (clienteIndex !== -1) {
        clientes.splice(clienteIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Cliente no encontrado' });
    }
});

// Agregar producto
app.post('/productos', (req, res) => {
    const { nombre, precio } = req.body;
    const nuevoProducto = {
        id: productos.length + 1,
        nombre,
        precio
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Actualizar producto
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { nombre, precio } = req.body;
    const productoIndex = productos.findIndex(p => p.id === id);

    if (productoIndex !== -1) {
        productos[productoIndex] = { id, nombre, precio };
        res.json(productos[productoIndex]);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Eliminar producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const productoIndex = productos.findIndex(p => p.id === id);

    if (productoIndex !== -1) {
        productos.splice(productoIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
