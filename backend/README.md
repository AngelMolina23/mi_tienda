# E-commerce DJ - Backend

Backend desarrollado con Django REST Framework y MySQL 8 para un e-commerce de venta de mesas para DJ y contratación de servicios/eventos.

## Tecnologías

- Python
- Django
- Django REST Framework
- MySQL 8
- JWT Authentication
- Postman
- Git/GitHub

## Módulos desarrollados

- Usuarios personalizados con roles ADMIN y CLIENT
- Autenticación JWT
- Productos
- Carrito de compras
- Pedidos
- Detalle de pedidos
- Eventos/servicios DJ
- Contrataciones de eventos
- Validación de stock
- Panel administrador de Django

## Endpoints principales

- POST `/api/token/`
- POST `/api/token/refresh/`
- GET `/api/profile/`
- GET `/api/products/`
- POST `/api/cart/`
- GET `/api/cart/`
- PATCH `/api/cart/{id}/`
- DELETE `/api/cart/{id}/`
- POST `/api/checkout/`
- GET `/api/orders/`

## Flujo implementado

1. El usuario inicia sesión.
2. Recibe un token JWT.
3. Consulta productos disponibles.
4. Agrega mesas DJ al carrito.
5. Realiza checkout.
6. Se genera un pedido.
7. Se descuenta stock automáticamente.
8. El carrito se vacía.