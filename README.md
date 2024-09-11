# Taskly - a task manager app

**Taskly** is a task manager built with Vite, React, JavaScript, Node.js, Express, MongoDB, and Tailwind CSS. This app is designed for seamless task management, offering a beautiful and intuitive interface that works flawlessly across both web and mobile devices.

## 🚀 Features

### 🔑 Authentication
- Sign up and log in functionality with secure password storage.
- Update user details like name, email, role, and password in the settings page.
- Log out and account deletion options.

### 📝 Task Management
- **Add Task**: Create tasks with various attributes like title, priority, status, start date, end date, tags, and descriptions.
- **Update Task**: Edit task details as needed.
- **Delete Task**: Remove tasks with ease.

### 🗂 Task Dashboard
- View all tasks in a centralized dashboard, organized by their status (To Do, In Progress, Completed).
- **Drag and Drop**: Reorder tasks within their containers and move tasks between different status categories. Changes are saved to the backend and persist on page refresh.

### 🏷 Tags
- Add and delete tags for tasks to better organize and categorize them.

### 🎨 User Interface
- Fully responsive design, ensuring a smooth experience on both desktop and mobile devices.
- **Dark Mode**: Toggle between light and dark themes for a comfortable viewing experience.

### 🔧 Settings
- Update user profile information, including name, email, and role.
- Change security details such as password.
- Log out or delete your account from the settings page.

## 🛠️ Main Technologies
- React
- JavaScript
- Node.js & Express
- MongoDB & Mongoose
- Vite
- Tailwind CSS

## 📝 Process

I started by listing the essential features I wanted in a task manager, drawing inspiration from popular tools like Trello and Notion. The development process began with setting up the backend using Node.js, Express, and MongoDB to handle user authentication and task management.

Once the backend was ready, I moved on to setting up Vite for the frontend and integrating it with React and JavaScript. I focused on creating a user-friendly dashboard that allowed easy task management with drag-and-drop functionality. The styling was handled using Tailwind CSS, making the interface clean and responsive.

The most challenging part was implementing the drag-and-drop functionality and ensuring that the changes were reflected in the backend and persisted on page refresh. Learning how to efficiently manage state across different components was also a significant part of the process. Since it was my first time building a fullstack application using MERN, I found it challenging but equally rewarding to implement authentication features and security using packages such as JWT and bcrypt🔐.

## 📁 Environment Setup
- **Frontend**: A sample environment file is located in the `frontend` folder. It includes placeholders for environment variables used by the React application.
- **Backend**: A sample environment file is located in the `backend` folder. It includes placeholders for environment variables used by the Node.js/Express application.

Please make sure to replace the placeholders in these `.env.sample` files with your actual values in the `.env` files to run the application successfully.

## 📁 Running the Project

### Frontend
1. Navigate to the `frontend` directory.
2. Create a `.env` file from the `.env.sample` file provided.
3. Replace the placeholders in the `.env` file with your actual values.
4. Install the required dependencies by running:
   ```bash
   npm install
5. Start the development server by running
   ```bash
   npm run dev

### Backend 
1. Navigate to the `backend` directory.
2. Create a `.env` file from the `.env.sample` file provided.
3. Replace the placeholders in the `.env` file with your actual values.
4. Install the required dependencies by running:
   ```bash
   npm install
5. Start the development server by running
   ```bash
   npm run start

## 🤔 How Can It Be Improved?
While the current version of Taskly is robust and feature-rich, there are several areas for improvement:
- **Profile Picture**: Allow users to upload and manage a profile picture.
- **Additional Task Attributes**: Include more detailed attributes like start time, end time, and estimated time for tasks.
- **Inbuilt Calendar**: Integrate a calendar feature to track tasks and events visually.
- **Password Reset**: Implement a password reset functionality for enhanced user security.
- **Notifications**: Add in-app notifications for task updates and deadlines.

## 🐛 Current Bugs
So far, Taskly performs well on the web and on mobile devices. If you encounter any bugs or issues, please let me know!

## Credits 🙏
- Favicon by Flaticon
- Cover picture on Auth page from Dribble

## 🎥 A short Demo
I couldn't include all the features in this short video, but tried to include the main ones.

https://github.com/user-attachments/assets/ed74edf0-c151-47ba-a833-433b04ba8e22
