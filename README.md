# Collab-Sketch

Collab-Sketch a real-time collaborative whiteboard application using Vue.js, Node.js, Redis, and WebSockets. Users can draw, add text, and insert images on a shared canvas in real-time. This project demonstrates proficiency in real-time collaboration and WebSockets.

## Features

- Real-time drawing on a collaborative canvas.
- Text insertion with synchronization between users.
- Image insertion through URL with synchronized updates.
- WebSocket-based communication for seamless real-time collaboration.
- Redis integration for handling data synchronization between users.

### Prerequisites

- Node.js and npm: Make sure you have Node.js and npm (Node Package Manager) installed on your machine.

## Getting Started

Follow these steps to set up and run both the frontend and backend of the Collab-Sketch application.

### Frontend
1. Navigate to the frontend directory:

   ```bash
   cd collab-sketch-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run serve
   ```
- Open your web browser and go to http://localhost:8080 to access the Collab-Sketch frontend.

### Backend
1. Navigate to the backend directory:

   ```bash
   cd collab-sketch-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   node server.js
   ```

- The backend server will now be running and listening for WebSocket connections.



## Usage

1. Open your web browser and navigate to the provided Vue.js development server URL (`http://localhost:8080`).
2. Collaborate with other users by drawing, adding text, and inserting images in real time on the whiteboard canvas.
3. Changes made by one user will be instantly reflected on the canvas of other connected users.

## Technologies Used

- Vue.js: Frontend JavaScript framework.
- Node.js: Backend JavaScript runtime.
- Express: Web application framework for Node.js.
- WebSocket: Real-time communication protocol.
- Redis: In-memory data store for data synchronization.
- HTML5 Canvas API: Drawing functionality on the frontend.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- This project was inspired by the need for real-time collaborative tools and was developed as a learning exercise.
- Thanks to the open-source communities behind Vue.js, Node.js, Redis, and Socket.io for providing the tools and resources necessary for this project.

