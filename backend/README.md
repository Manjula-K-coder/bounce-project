# bounce-project - Backend

This is the backend for the **NASA Data Explorer** application. It is built using **Node.js** and **Express** and acts as an intermediary between the React frontend and NASA's Open APIs. The backend fetches data from NASA's APIs and serves it to the frontend.

---

## Features
- **Astronomy Picture of the Day (APOD)**:
  - Fetches the daily astronomy image along with its metadata.
- **Mars Rover Photos**:
  - Fetches photos taken by NASA's Mars Rover on a specific date.

---

## Technologies Used
- **Node.js**: Runtime environment for the backend.
- **Express**: Web framework for handling API requests.
- **Axios**: HTTP client for making requests to NASA's APIs.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
- **Dotenv**: For managing environment variables.

---

## Setup Instructions

### Prerequisites
1. **Node.js**: Ensure Node.js is installed on your machine. Download it from [here](https://nodejs.org/).
2. **NASA API Key**: Obtain a free API key from [NASA's API Portal](https://api.nasa.gov/).

---

### Step 1: Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/your-username/nasa-data-explorer.git
cd nasa-data-explorer/backend

### Step 2: Install Dependencies
npm install

### Step 3: Set Up Environment Variables
Create a .env file in the backend directory.

Add your NASA API key to the .env file:

NASA_API_KEY=API KEY

### Step 4: Run the Backend Locally
Start the backend server: node index.js
The backend will run on http://localhost:5000

### Step 5: Test the Backend
1. APOD:
GET http://localhost:5000/apod

2.Photos:
GET http://localhost:5000/mars-rover-photos?earth_date=YYYY-MM-DD
 
