# NorthBaliWeb

A full-stack web application for discovering and managing sport tourism spots across **North Bali**. Built using **Flask** for the backend and **React** for the frontend. Users can explore destinations, leave reviews, and admins can upload and manage destination data.

This project was made for fun and practice in full-stack development.

---

## Project Structure

├── backend/ 
│ ├── app.py
│ ├── api
│ ├── Bonus
│ ├── helper
│ ├── database 
│ ├── profileimage <--- storing profile image
│ ├── uploads  <---- Storing Destinatioin Image
│ └── .env 
└── frontend/ 
├── src/
│ ├── components/
│ ├── pages/
│ └── context/AuthContext.js
└── .env 


##  Features

-  Browse sport destinations in North Bali
-  Upload destination info + multiple images (admin only)
-  Leave and view ratings and reviews
-  JWT-based user authentication
-  Admin dashboard for managing users & destinations

---

## Tech Stack

### Frontend
- React + Vite
- Axios
- React Router
- Context API (for Auth)

### Backend
- Flask
- Flask-JWT-Extended
- Flask-CORS
- SQLAlchemy + MySQL
- Werkzeug for file uploads

---

## Installation

### Prerequisites

- Node.js & npm
- Python 3.8+
- MySQL

---

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/northbaliweb.git
cd northbaliweb
```
### 2. Flask Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate      
pip install -r requirements.txt
```

### Enviroment Variables (Add This on the .env)
```bash
FLASK_APP=app.py
FLASK_ENV=development
JWT_SECRET_KEY=your_jwt_secret
DB_URI=mysql://youruser:yourpass@localhost/northbali
```

### 3. Database Setup
- The SQL file is available on the Bonus folder located on the Backend folder.
- Inside, you can either change the database name, or use the database name (choices yours)

### 4. Run the Backend 
```bash
flask run --debug
```
### OR if the default port 5000 unusable

```bash
flask run --debug --port=5001
```

### OPTIONAL
- You can use the Postman API methods located on bonus folder aswell


### 5. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

### Author: 
- ADMxe1 - https://github.com/admex1
- Linthlz - https://github.com/Linthlz
