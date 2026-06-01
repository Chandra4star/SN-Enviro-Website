import express from 'express';

const router = express.Router();

let clients = [];

// Helper to broadcast JSON data to all connected clients
export const broadcastNotification = (type, payload) => {
    const message = JSON.stringify({ type, payload, timestamp: new Date() });
    clients.forEach(client => {
        client.write(`data: ${message}\n\n`);
    });
};

// SSE stream endpoint
router.get('/stream', (req, res) => {
    // Set headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // Establish stream connection immediately

    // Add client to active clients list
    clients.push(res);

    // Send initial connection message
    res.write('data: {"type": "system", "payload": "Connected to SN Enviro SSE Stream"}\n\n');

    // Keep connection alive with periodic ping (every 30 seconds)
    const keepAlive = setInterval(() => {
        res.write(':\n\n'); // Comment line ping
    }, 30000);

    // Clean up when client disconnects
    req.on('close', () => {
        clearInterval(keepAlive);
        clients = clients.filter(client => client !== res);
    });
});

export default router;
