import { Router } from 'express';

const router = Router();

// Example todo data (replace this with actual DB logic)
const todos = [
  { _id: '1', title: 'Learn React' },
  { _id: '2', title: 'Learn TypeScript' },
];

// Get all todos
router.get('/todos', (req, res) => {
  res.json(todos);
});

export default router;
