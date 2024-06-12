const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json());

app.use('/tasks', createProxyMiddleware({
    target: 'http://task-service:3001',
    changeOrigin: true,
    pathRewrite: {
        '^/tasks': '/tasks', // proxy '/tasks' to 'http://task-service:3001/tasks'
    },
}));

app.use('/users', createProxyMiddleware({
    target: 'http://user-service:3002',
    changeOrigin: true,
    pathRewrite: {
        '^/users': '/users', // proxy '/users' to 'http://user-service:3002/users'
    },
}));

app.listen(port, () => {
    console.log(`API Gateway listening at http://localhost:${port}`);
});
