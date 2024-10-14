# CRUD Application with Next.js 14, TypeScript, MongoDB, and Ant Design

## Overview

This is a full-stack CRUD (Create, Read, Update, Delete) application built with Next.js 14, TypeScript, and MongoDB. The application allows users to manage items with a user-friendly interface created using Ant Design.

## Features

- **Create, Read, Update, Delete** functionality for items.
- **Responsive** user interface using Ant Design.
- **Type safety** provided by TypeScript.
- **MongoDB** for data storage.
- **Next.js API Routes** for backend services.

## Technology Stack

- **Frontend**: Next.js 14, React.js, TypeScript, Ant Design
- **Backend**: Next.js API Routes
- **Database**: MongoDB

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed locally or a cloud-based MongoDB service

### Clone the Repository

git clone https://github.com/yourusername/my-crud-app.git
cd my-crud-app

Install Dependencies

npm install
Environment Variables
Create a .env.local file in the root directory of the project:


MONGODB_URI=mongodb://localhost:27017/task_Manager
Make sure to replace the MONGODB_URI with your actual MongoDB connection string if using a cloud database.

Running the Application
Development Mode
To start the development server, run the following command:


npm run dev
Visit http://localhost:3000 in your browser to view the application.