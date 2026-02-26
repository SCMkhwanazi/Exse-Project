const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const app = express();
const port = 3001;
//For connecting to the database and signup
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user_auth',
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected!');
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({ message: 'User registered successfully!' });
    });
});
app.get('/api/viewevent/:id', (req, res) => {
  const eventId = req.params.id;
  const sql = `
  SELECT id, eventName, eventDescription, eventDate, eventTime, location, image
  FROM events WHERE id = ?`;

  db.query(sql, [eventId], (err, results) => {
    if (err) {
      console.error('Error fetching event by ID:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = results[0];
    let imageBase64 = null;

    if (event.image && event.image instanceof Buffer) {
      imageBase64 = `data:image/jpeg;base64,${event.image.toString('base64')}`;
    }

    res.json({
      id: event.id,
      eventName: event.eventName,
      eventDescription: event.eventDescription,
      eventDate: event.eventDate,
      eventTime: event.eventTime,
      location: event.location,
      image: imageBase64,
    });

  });
});

//For sign in
app.use(cors());
app.use(express.json());
app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('DB error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isAdmin = user.email === 'admin111@gmail.com';
        res.json({ message: 'Login successful', isAdmin });
    });
});

// Use multer for handling multipart/form-data
const storage = multer.memoryStorage(); // Image will be stored in memory as Buffer
const upload = multer({ storage });

// POST endpoint to receive form data + image
app.post('/api/events', upload.single('image'), (req, res) => {
  const { eventName, eventDescription, location, eventDate, eventTime } = req.body;
  const image = req.file ? req.file.buffer : null;

  const sql = `INSERT INTO events 
    (eventName, eventDescription, location, eventDate, eventTime, image) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [eventName, eventDescription, location, eventDate, eventTime, image], (err, result) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).send('Database error');
    }
    res.send('Event created successfully');
  });
});

// GET events route
app.get('/api/events', (req, res) => {
  const sql = 'SELECT id AS id, eventName AS eventName, image AS image FROM events';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching events:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const events = results.map(event => {
      let imageBase64 = null;

      if (event.image && event.image instanceof Buffer) {
        // ✅ Convert raw binary buffer to base64 string
        const base64Image = event.image.toString('base64');
        imageBase64 = `data:image/jpeg;base64,${base64Image}`;
      }

      return {
        id: event.id,
        eventName: event.eventName,
        image: imageBase64,
      };
    });

    res.json(events);
  });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// GET all orders
app.get('/api/orders', (req, res) => {
    const sql = `
        SELECT o.id AS orderId, o.total, o.status, o.created_at, u.username
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
    `;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});
// Get all orders with items
app.get('/api/orders', (req, res) => {
  const sql = `
    SELECT 
      o.id AS order_id,
      o.created_at,
      o.total,
      o.status,
      u.username,
      p.name AS product_name,
      oi.quantity,
      p.price
    FROM orders o
    JOIN users u ON o.user_id = u.id
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    ORDER BY o.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});
// POST /api/orders → Create a new order with items
app.post('/api/orders', (req, res) => {
    const { userId, items, total } = req.body;

    if (!userId || !items || items.length === 0 || !total) {
        return res.status(400).json({ message: 'Invalid order data' });
    }

    // 1️⃣ Insert into orders table
    const orderSql = 'INSERT INTO orders (user_id, total, status, created_at) VALUES (?, ?, ?, NOW())';
    db.query(orderSql, [userId, total, 'pending'], (err, orderResult) => {
        if (err) {
            console.error('Error inserting order:', err);
            return res.status(500).json({ message: 'Database error while creating order' });
        }

        const orderId = orderResult.insertId;

        // 2️⃣ Prepare items for insertion into order_items
        const orderItemsValues = items.map(item => [orderId, item.productId, item.quantity]);

        const orderItemsSql = 'INSERT INTO order_items (order_id, product_id, quantity) VALUES ?';
        db.query(orderItemsSql, [orderItemsValues], (err2, itemsResult) => {
            if (err2) {
                console.error('Error inserting order items:', err2);
                return res.status(500).json({ message: 'Database error while adding order items' });
            }

            res.json({ message: 'Order placed successfully!', orderId });
        });
    });
});