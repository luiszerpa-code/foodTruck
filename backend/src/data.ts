import bcrypt from 'bcryptjs';
import express, { Request, Response } from 'express';

export const sample_foods: any [] = [
    {
        id:'1',
        name: 'Pizza Pepperoni',
        cookTime: '10-20',
        price: 10,
        favorite: false,
        origins: ['italy'],
        stars: 4.5,
        imageUrl: './assets/food-2.jgp',
        tags: ['FastFood', 'Pizza', 'Lunch'],
      },
      {
        id:'2',
        name: 'Meatball',
        price: 20,
        cookTime: '20-30',
        favorite: true,
        origins: ['persia', 'middle east', 'china'],
        stars: 4.7,
        imageUrl: './assets/food-2.jpg',
        tags: ['SlowFood', 'Lunch'],
      },
      {
        id:'3',
        name: 'Hamburger',
        price: 5,
        cookTime: '10-15',
        favorite: false,
        origins: ['germany', 'us'],
        stars: 3.5,
        imageUrl: 'assets/food-3.jpg',
        tags: ['FastFood', 'Hamburger'],
      },
      {
        id:'4',
        name: 'Fried Potatoes',
        price: 2,
        cookTime: '15-20',
        favorite: true,
        origins: ['belgium', 'france'],
        stars: 3.3,
        imageUrl: 'assets/food-4.jpg',
        tags: ['FastFood', 'Fry'],
      },
      {
        id:'5',
        name: 'Chicken Soup',
        price: 11,
        cookTime: '40-50',
        favorite: false,
        origins: ['india', 'asia'],
        stars: 3.0,
        imageUrl: 'assets/food-5.jpg',
        tags: ['SlowFood', 'Soup'],
      },
      {
        id:'6',
        name: 'Vegetables Pizza',
        price: 9,
        cookTime: '40-50',
        favorite: false,
        origins: ['italy'],
        stars: 4.0,
        imageUrl: 'assets/food-5.jpg',
        tags: ['FastFood', 'Pizza', 'Lunch'],
      },
]

export const sample_tags: any[] = [
  { name: 'All', count: 6 },
  { name: 'FastFood', count: 4 },
  { name: 'Pizza', count: 2 },
  { name: 'Lunch', count: 3 },
  { name: 'SlowFood', count: 2 },
  { name: 'Hamburger', count: 1 },
  { name: 'Fry', count: 1 },
  { name: 'Soup', count: 1 },
]

export const sample_users: any[] = [
  {
    name: "John Doe",
    email: "john@gmail.com",
    password: "12345",
    address: "Toronto On",
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "Jane@gmail.com",
    password: "argentina",
    address: "Shanghai",
    isAdmin: false,
  },
]; 

// Function to simulate user login
const loginUser = async (email: string, password: string): Promise<any> => {
  // Find user by email in sample_users
  const user = sample_users.find(u => u.email === email);

  if (!user) {
    throw new Error("User not found");
  }

  // Compare the provided password with the user's password from sample data
  //const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (password !== user.password) {
    throw new Error("Password does not match");
  }

  // Passwords match, return the user object without the password
  const { password: userPassword, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON bodies

// Login route
app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const loggedInUser = await loginUser(email, password);
    res.send(loggedInUser);
  } catch (error: any) {
    res.status(401).send({ error: error.message });
  }
});
console.log(loginUser)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});