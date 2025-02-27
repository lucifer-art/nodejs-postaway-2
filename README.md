# Postaway-II: Social Media Backend REST-API

## Objective  
Develop a robust social media backend REST-API that empowers users to:
- Post, comment, and like
- Send and manage friend requests
- Reset passwords using OTP for enhanced security

---

## Technologies Used  
- **Node.js**: Backend runtime environment  
- **Express.js**: Web framework for building RESTful APIs  
- **MongoDB**: NoSQL database for data storage  
- **Nodemailer**: Library for sending OTP emails  
- **ES6 Modules**: For modular and maintainable code structure  

---

## Features and Functionality

### 1. User Authentication  
- **Signup**: Register a new user with name, email, password, and gender  
- **Login & Logout**: Authenticate user sessions  
- **Logout from All Devices**: Extra feature by storing each token in an array field in the user document  
- **JWT Tokens**: Used for secure authentication and authorization  

### 2. Post Management  
- **CRUD Operations**: Create, Read, Update, Delete posts  
- **Post Fields**: Caption and image URL  
- **Authorization**: Only post owners can update or delete their posts  
- **User Reference**: Each post references the user who created it  

### 3. Comment System  
- **Add, Update, and Delete Comments**: Users can manage comments on posts  
- **Authorization**: Only the post owner or the commenter can update or delete a comment  
- **Population**: User information is populated for comments  

### 4. Like Functionality  
- **Like and Unlike Posts and Comments**  
- **Like Count Display**: Shows total likes on posts and comments  
- **Population**: User info (id, name, and email) is populated for likes  

### 5. Friendship Features  
- **User Friend Management**: Get friends, toggle friendships, and accept/reject requests  
- **Pending Requests**: Manage and respond to pending friend requests  

### 6. User Profile Updates  
- **Update Profile**: Users can update name, gender, and avatar  
- **Avatar Uploads**: Implemented with image upload handling  

### 7. OTP-Based Password Reset (Additional Feature)  
- **Send and Verify OTPs**: For password reset  
- **Password Reset**: Securely reset the user's password using verified OTP  
- **Nodemailer Integration**: For email communication  

---

## API Endpoints

### Authentication Routes  
- `POST /api/users/signup`: Register a new user  
- `POST /api/users/signin`: User login  
- `POST /api/users/logout`: Log out from the current device  
- `POST /api/users/logout-all-devices`: Log out from all devices  

### User Profile Routes  
- `GET /api/users/get-details/:userId`: Retrieve user information (excluding sensitive data)  
- `GET /api/users/get-all-details`: Get details of all users  
- `PUT /api/users/update-details/:userId`: Update user profile details  

### Post Routes  
- `GET /api/posts/all`: Retrieve all posts (News Feed)  
- `GET /api/posts/:postId`: Get a specific post by ID  
- `GET /api/posts/:userId`: Get all posts by a user  
- `POST /api/posts`: Create a new post  
- `PUT /api/posts/:postId`: Update a post (Only by post owner)  
- `DELETE /api/posts/:postId`: Delete a post (Only by post owner)  

### Comment Routes  
- `GET /api/comments/:postId`: Get comments for a post  
- `POST /api/comments/:postId`: Add a comment to a post  
- `PUT /api/comments/:commentId`: Update a comment (Only by post owner or commenter)  
- `DELETE /api/comments/:commentId`: Delete a comment (Only by post owner or commenter)  

### Like Routes  
- `GET /api/likes/:id`: Get likes for a specific post or comment  
- `POST /api/likes/toggle/:id`: Toggle like/unlike on a post or comment  

### Friendship Routes  
- `GET /api/friends/get-friends/:userId`: Get a user's friends  
- `GET /api/friends/get-pending-requests`: Get pending friend requests  
- `POST /api/friends/toggle-friendship/:friendId`: Toggle friendship  
- `POST /api/friends/response-to-request/:friendId`: Accept/Reject friend request  

### OTP Routes  
- `POST /api/otp/send`: Send OTP for password reset  
- `POST /api/otp/verify`: Verify OTP  
- `POST /api/otp/reset-password`: Reset password  

---

## Project Setup  

1. Clone the repository  
    ```bash
    git clone <repository-url>
    cd postaway-ii
    ```

2. Install dependencies  
    ```bash
    npm install
    ```

3. Set up environment variables  
   Create a `.env` file with the following:  
    ```env
    PORT=3000
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    SMTP_HOST=<your-smtp-host>
    SMTP_PORT=<your-smtp-port>
    SMTP_USER=<your-smtp-email>
    SMTP_PASS=<your-smtp-password>
    ```

4. Run the server  
    ```bash
    npm start
    ```
    The server will be live at `http://localhost:3000`

---