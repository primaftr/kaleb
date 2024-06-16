# Kaleb Assignment

This is a simple web application featuring login, register, and dashboard functionality. The backend is built using NestJS, while the frontend is built using Vue.js.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher) or Yarn

### Installation

#### Clone the repository

```console

git clone https://github.com/primaftr/kaleb.git

cd kaleb
```

### Backend Setup

1. Navigate to the `backend` directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

#### or

```bash
yarn install
```

3. Create a `.env` file in the `backend` directory and configure your environment variables. You can use the `.env.example` as a template.

4. Run the application:

```bash
npm run start
```

#### or

```bash
yarn start
```

5. The backend API will be available at `http://localhost:3000`.

### Frontend Setup

1. Navigate to the `frontend` directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

#### or

```bash
yarn install
```

3. Create a `.env` file in the `frontend` directory and configure your environment variables. You can use the `.env.example` as a template.

4. Run the application:

```bash
npm run serve
```

#### or

```bash
yarn serve
```

5. The frontend application will be available at `http://localhost:5173`.

## Building for Production

### Backend

To build the backend for production, navigate to the `backend` directory and use:

```bash
npm run build
```

#### or

```bash
yarn build
```

### Frontend

To build the frontend for production, navigate to the `frontend` directory and use:

```bash
npm run build
```

#### or

```bash
yarn build
```

## Deployment

### Backend

Follow your cloud provider's guidelines to deploy the backend. Make sure to set the environment variables on the server.

### Frontend

Deploy the built frontend files (dist directory) to your preferred static file hosting service.

## Acknowledgements

- NestJS (https://nestjs.com/)
- Vue.js (https://vuejs.org/)
