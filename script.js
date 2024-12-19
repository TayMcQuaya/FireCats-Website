// script.js
import config from './config.js';
import { images } from './imageData.js';


// Chat history management
const chatHistory = {
    messages: [],
    maxMessages: 50,

    add(role, content) {
        this.messages.push({ role, content });
        if (this.messages.length > this.maxMessages) {
            this.messages.shift();
        }
        localStorage.setItem('chatHistory', JSON.stringify(this.messages));
    },

    load() {
        const saved = localStorage.getItem('chatHistory');
        if (saved) {
            this.messages = JSON.parse(saved);
        }
    },

    clear() {
        this.messages = [];
        localStorage.removeItem('chatHistory');
    }
};

// Core UI Functions
function toggleSection(sectionId) {
    const sections = ['about', 'terminal', 'table', 'contact'];
    
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            if (id === sectionId) {
                if (section.classList.contains('textblock-hide')) {
                    section.classList.remove('textblock-hide');
                    section.classList.add('textblock-show');
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    section.classList.add('textblock-hide');
                    section.classList.remove('textblock-show');
                }
            } else {
                section.classList.add('textblock-hide');
                section.classList.remove('textblock-show');
            }
        }
    });
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function loadGallery(tableDiv) {
    if (!tableDiv) {
        console.error('Table div not found');
        return;
    }

    // Debug: Try loading a single test image first
    const testImg = document.createElement('img');
    const testPath = 'images/firecat #1.png';
    testImg.src = testPath;
    testImg.onload = () => console.log('Test image loaded successfully:', testPath);
    testImg.onerror = () => console.error('Test image failed to load:', testPath);
    tableDiv.appendChild(testImg);

    // Wait a moment before loading all images
    setTimeout(() => {
        let currentRow;
        images.forEach(([number, imageId], index) => {
            // Create new row every 5 images
            if (index % 5 === 0) {
                currentRow = document.createElement('div');
                currentRow.className = 'row';
                tableDiv.appendChild(currentRow);
            }

            const link = document.createElement('a');
            link.href = `https://ordinals.com/inscription/${imageId}`;
            link.target = '_blank';

            const img = document.createElement('img');
            
            // Try different path formats
            const paths = [
                `images/firecat #${number}.png`,
                `/images/firecat #${number}.png`,
                `./images/firecat #${number}.png`,
                `../images/firecat #${number}.png`
            ];

            // Try each path
            let pathIndex = 0;
            img.onerror = () => {
                console.log(`Failed to load image with path: ${paths[pathIndex]}`);
                pathIndex++;
                if (pathIndex < paths.length) {
                    console.log(`Trying next path: ${paths[pathIndex]}`);
                    img.src = paths[pathIndex];
                } else {
                    console.error(`All paths failed for image ${number}`);
                    img.src = 'https://via.placeholder.com/200';
                }
            };

            img.src = paths[0];
            img.alt = `Firecat #${number}`;
            img.style.cursor = 'pointer';
            
            link.appendChild(img);
            currentRow.appendChild(link);
        });
    }, 1000);
}

// Terminal Functions
function createMessageElement(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'terminal-line';
    const prompt = role === 'user' ? 'you>' : role === 'system' ? 'system>' : 'firecat>';
    
    let promptColor = '';
    let contentColor = '';
    
    if (role === 'assistant') {
        promptColor = '#ff6b00'; // Orange for 'firecat>'
        contentColor = '#ffd700'; // Yellow for assistant's response
    }
    
    messageDiv.innerHTML = `
        <span class="prompt" style="color: ${promptColor}">${prompt}</span>
        <span style="color: ${contentColor}">${content}</span>
    `;
    return messageDiv;
}

function addLoadingIndicator(messageContainer) {
    const loadingDiv = createMessageElement('assistant', 'Processing... 🔥');
    loadingDiv.id = 'loading-indicator';
    messageContainer.appendChild(loadingDiv);
    return loadingDiv;
}

async function sendMessage(message) {
    try {
        const response = await fetch(config.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    ...chatHistory.messages,
                    { role: 'user', content: message }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, I encountered an error. Please try again.';
    }
}

function initializeTerminal() {
    const terminalInput = document.getElementById('terminal-input');
    const messageContainer = document.getElementById('message-container');
    const terminalBody = document.getElementById('terminal-body');
    let isProcessing = false;

    async function handleUserInput(userMessage) {
        if (isProcessing) return;
        isProcessing = true;

        chatHistory.add('user', userMessage);
        messageContainer.appendChild(createMessageElement('user', userMessage));
        
        const loadingIndicator = addLoadingIndicator(messageContainer);
        const response = await sendMessage(userMessage);
        
        chatHistory.add('assistant', response);
        loadingIndicator.remove();
        messageContainer.appendChild(createMessageElement('assistant', response));
        
        terminalBody.scrollTop = terminalBody.scrollHeight;
        isProcessing = false;
    }

    // Load chat history
    chatHistory.load();
    if (chatHistory.messages.length === 0) {
        const initialMessage = 'AI System initialized. Ready to assist.';
        chatHistory.add('assistant', initialMessage);
        messageContainer.appendChild(createMessageElement('assistant', initialMessage));
    } else {
        chatHistory.messages.forEach(msg => {
            messageContainer.appendChild(createMessageElement(msg.role, msg.content));
        });
    }

    // Event listeners
    terminalInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter' && terminalInput.value.trim() !== '') {
            const userMessage = terminalInput.value.trim();
            terminalInput.value = '';
            await handleUserInput(userMessage);
        }
    });

    terminalBody.addEventListener('click', () => terminalInput.focus());
    terminalInput.focus();
}

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        terminalInput: document.getElementById('terminal-input'),
        terminalBody: document.getElementById('terminal-body'),
        connectWallet: document.getElementById('connect-wallet'),
        themeToggleBtn: document.getElementById('theme-toggle-btn'),
        tableDiv: document.getElementById('table')
    };

    // Initialize components
    initTheme();
    initializeTerminal();
    if (elements.tableDiv) loadGallery(elements.tableDiv);

    // Event listeners
    elements.themeToggleBtn?.addEventListener('click', toggleTheme);
    
    document.querySelectorAll('.header-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const section = e.target.textContent.toLowerCase();
            toggleSection(section === 'ai terminal' ? 'terminal' : 
                         section === 'gallery' ? 'table' : section);
        });
    });

    elements.connectWallet?.addEventListener('click', () => {
        const messageContainer = document.getElementById('message-container');
        messageContainer.appendChild(createMessageElement('system', 'Connecting wallet...'));
        elements.terminalBody.scrollTop = elements.terminalBody.scrollHeight;
    });
});