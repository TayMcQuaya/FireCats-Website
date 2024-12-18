# FireCats AI Website

A web3-enabled website featuring an AI assistant and NFT gallery for FireCats. This guide explains how to implement wallet connectivity and AI backend integration.

## Project Structure
```
firecats/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── images/
│   │   └── firecat #1-100.png
│   └── icons/
│       ├── discord-icon.svg
│       └── twitter-icon.svg
├── backend/
│   ├── server.js
│   ├── ai/
│   │   └── terminal.js
│   └── config/
│       └── .env
└── README.md
```

## Wallet Integration

### 1. Install Web3 Dependencies
```bash
npm install web3 @web3-react/core @web3-react/injected-connector
```

### 2. Create Wallet Connection Handler
Add this to a new file `wallet.js`:
```javascript
import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3Provider } from '@ethersproject/providers';

export const injected = new InjectedConnector({
  supportedChainIds: [1] // Ethereum Mainnet
});

export async function connectWallet() {
  try {
    await injected.activate();
    const provider = new Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
}
```

### 3. Integrate with Existing Code
Modify the wallet connection button handler in `script.js`:
```javascript
import { connectWallet } from './wallet.js';

connectWallet?.addEventListener('click', async () => {
    try {
        await connectWallet();
        addTerminalLine('system>', 'Wallet connected successfully! 🔥');
    } catch (error) {
        addTerminalLine('system>', 'Failed to connect wallet. Please try again.');
    }
});
```

## AI Terminal Backend

### 1. Set Up Backend Environment
```bash
npm init
npm install express cors dotenv openai socket.io
```

### 2. Create Server Configuration
Create `.env` file:
```env
PORT=3000
OPENAI_API_KEY=your_openai_api_key
```

### 3. Implement Backend Server
Create `server.js`:
```javascript
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
const socketIo = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// Socket.io setup for real-time communication
const server = require('http').createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('terminal-input', async (message) => {
        try {
            const response = await openai.createCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
                max_tokens: 150
            });
            
            socket.emit('terminal-response', response.data.choices[0].message.content);
        } catch (error) {
            socket.emit('terminal-error', 'Error processing request');
        }
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
```

### 4. Update Frontend Terminal
Modify terminal handling in `script.js`:
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    addTerminalLine('system>', 'AI System connected successfully! 🤖');
});

socket.on('terminal-response', (response) => {
    addTerminalLine('firecat>', response);
});

terminalInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && terminalInput.value.trim() !== '') {
        const message = terminalInput.value;
        addTerminalLine('you>', message);
        socket.emit('terminal-input', message);
        terminalInput.value = '';
    }
});
```

## Development Setup

1. Install Dependencies
```bash
# Frontend dependencies
npm install web3 @web3-react/core @web3-react/injected-connector socket.io-client

# Backend dependencies
cd backend
npm install
```

2. Start the Development Environment
```bash
# Start backend server
cd backend
npm run start

# Start frontend (using your preferred method, e.g., live-server)
cd frontend
live-server
```

## Security Considerations

1. Never commit your `.env` file
2. Implement rate limiting for the AI endpoint
3. Add proper error handling for wallet connections
4. Implement secure WebSocket connections
5. Add input validation and sanitization

## Additional Features to Consider

1. Wallet transaction history
2. NFT minting integration
3. AI conversation history storage
4. User authentication
5. Multiple wallet support

## Troubleshooting

Common issues and solutions:
1. CORS errors: Check your CORS configuration in server.js
2. Wallet connection issues: Ensure MetaMask is installed and network is correct
3. WebSocket disconnections: Implement reconnection logic
4. API rate limiting: Implement request queuing

## Resources

- [Web3.js Documentation](https://web3js.readthedocs.io/)
- [OpenAI API Documentation](https://platform.openai.com/docs/)
- [Socket.io Documentation](https://socket.io/docs/v4/)