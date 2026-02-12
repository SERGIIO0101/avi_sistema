# AVI Sistema

Sistema web de gestión avícola desarrollado bajo la marca GOLDEN para administrar y optimizar los procesos operativos de granjas avícolas mediante una plataforma digital centralizada.

## Descripción

AVI Sistema permite gestionar de manera eficiente la producción, inventario, control sanitario y registros administrativos. Está orientado a mejorar el control interno, la trazabilidad de lotes y la toma de decisiones basada en datos.

## Marca

Este proyecto fue creado y desarrollado bajo la marca GOLDEN.

## Características principales

- Gestión de lotes de aves
- Control de producción (huevos o carne)
- Registro y control de inventario
- Seguimiento sanitario
- Reportes administrativos

## Tecnologías utilizadas

Frontend:
- React
- Vite

Backend:
- Node.js
- Express

Base de datos:
- MySQL (administrado mediante XAMPP)

## Requisitos

- Node.js
- XAMPP (Apache y MySQL activos)

## Estructura del proyecto

avi_sistema/
 ├── backend/
 ├── frontend/
 └── README.md

## Instalación y ejecución

1. Clonar repositorio

git clone https://github.com/SERGIIO0101/avi_sistema.git
cd avi_sistema

2. Configurar base de datos

- Iniciar XAMPP
- Activar MySQL
- Crear la base de datos en phpMyAdmin
- Configurar las variables de entorno en el archivo backend/.env

Ejemplo de configuración en .env:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=avi_sistema
DB_PORT=3306

3. Ejecutar Backend

cd backend
npm install
npm run dev

4. Ejecutar Frontend

cd frontend
npm install
npm run dev

## Estado del proyecto

Proyecto en desarrollo.

## Autor

Sergio Severiche Guerrero
Desarrollador Web Full Stack
Marca: GOLDEN