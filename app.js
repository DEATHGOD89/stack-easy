/* ==========================================================================
   StackEasy JavaScript Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {



  // --- 1. Dropdown State Manager ---
  const dropdownCols = document.querySelectorAll('.widget-col');
  
  dropdownCols.forEach(col => {
    col.addEventListener('click', (e) => {
      // Prevent event bubbling
      e.stopPropagation();
      
      // Close all other dropdowns
      dropdownCols.forEach(otherCol => {
        if (otherCol !== col) {
          otherCol.classList.remove('active');
        }
      });
      
      // Toggle current
      col.classList.toggle('active');
    });
  });

  // Handle dropdown option selections
  const dropdownOptions = document.querySelectorAll('.dropdown-option');
  
  dropdownOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentCol = option.closest('.widget-col');
      const selectionTrigger = parentCol.querySelector('.selection-value');
      const allOptions = parentCol.querySelectorAll('.dropdown-option');
      
      // Update text value
      const selectedValue = option.getAttribute('data-value');
      selectionTrigger.textContent = selectedValue;
      
      // Update active option class
      allOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      
      // Close dropdown
      parentCol.classList.remove('active');
    });
  });

  // Close dropdowns when clicking anywhere outside the widget
  document.addEventListener('click', () => {
    dropdownCols.forEach(col => col.classList.remove('active'));
  });


  // --- 2. Interactive FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerPanel = item.querySelector('.faq-answer');
    
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQs
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add('active');
        // Smooth slide down based on actual scrollHeight
        answerPanel.style.maxHeight = answerPanel.scrollHeight + 'px';
      }
    });
  });


  // --- 3. Mobile Navigation Menu ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      
      // Animate hamburger lines
      const spans = mobileMenuBtn.querySelectorAll('span');
      if (mobileDrawer.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Smooth close drawer when clicking links
  const drawerLinks = document.querySelectorAll('.drawer-link');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      const spans = mobileMenuBtn.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });


  // --- 4. Stack Explorer Tab & Analogy Logic ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const explorerTextWrapper = document.getElementById('explorer-info-text');

  // Rich Analogy Data Content
  const analogyContent = {
    frontend: {
      title: "The Dining Room & The Menu (Frontend)",
      text: "Imagine walking into a beautiful restaurant. The custom lighting, cozy layout, printed menus, and table setups represent the <strong>Frontend</strong>. It's the visual storefront where customer clicks happen.",
      details: [
        { label: "HTML (The Building Structure)", desc: "Like the load-bearing columns, dining table frames, and doors that anchor the building's skeleton." },
        { label: "CSS (The Decor & Atmosphere)", desc: "The color of the napkins, the cursive fonts, and ambient soft lighting." },
        { label: "JavaScript (The Waiter)", desc: "When you press a menu button to order, the waiter instantly takes your request to the kitchen." }
      ]
    },
    backend: {
      title: "The Kitchen & The Head Chef (Backend)",
      text: "In the back, out of sight, lies the busy kitchen representing the <strong>Backend</strong>. The head chef computes recipes, validates access cards (auth), and prepares dynamic response packages.",
      details: [
        { label: "Server Application (The Chef)", desc: "Fulfills requests, cooks code, handles payments, and monitors tickets in chronological order." },
        { label: "APIs (The Serving Window)", desc: "The designated slot where servers hand orders in, and chefs hand cooked plates out." },
        { label: "Business Logic (Secret Recipes)", desc: "Rigorous step-by-step instructions verifying food safety constraints and user authentication checks." }
      ]
    },
    database: {
      title: "The Pantry & The Storage Racks (Database)",
      text: "Deep in the basement sits the storage room and freezer, representing the <strong>Database</strong>. It holds massive stacks of ingredients structured perfectly for superfast chef access.",
      details: [
        { label: "Tables & Columns (Spice Cabinets)", desc: "Highly structured labels allowing quick lookup of dry goods, salt, and spices." },
        { label: "Queries (Retrieval Lists)", desc: "A checklist telling pantry boys to fetch '5 ripe tomatoes from the top rack' instantly." },
        { label: "NoSQL Crate (Bulk Storage)", desc: "Adaptable bulk containers for irregular ingredients like daily fresh market veggies." }
      ]
    }
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      // Update Tab state
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update Panel state
      tabPanels.forEach(panel => panel.classList.remove('active'));
      document.getElementById(`panel-${tabId}`).classList.add('active');
      
      // Update Info Content Card with smooth animation
      explorerTextWrapper.style.opacity = '0';
      explorerTextWrapper.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        const data = analogyContent[tabId];
        let detailsHtml = '';
        
        data.details.forEach(item => {
          detailsHtml += `<li><strong>${item.label}</strong>: ${item.desc}</li>`;
        });
        
        explorerTextWrapper.innerHTML = `
          <h3 class="info-title">${data.title}</h3>
          <p class="info-analogy">${data.text}</p>
          <div class="info-details-box">
            <h4 class="details-subtitle">Key Concepts Simplified:</h4>
            <ul class="details-list">
              ${detailsHtml}
            </ul>
          </div>
        `;
        
        explorerTextWrapper.style.opacity = '1';
        explorerTextWrapper.style.transform = 'translateY(0)';
      }, 200);
    });
  });


  // --- 5. Dynamic Roadmap Curriculum Generator ---
  const btnGenerate = document.getElementById('btn-generate-roadmap');
  const roadmapSection = document.getElementById('roadmap-results');
  
  // Custom Curriculum Steps Data
  const roadmapsData = {
    "Frontend Dev": [
      {
        num: "Step 1",
        title: "HTML5 Structure: The Building Skeleton",
        analogy: "Think of HTML as the restaurant's concrete walls, windows, and main entry doors. Without it, you don't have a structure to hold anything else!",
        skills: ["Semantic Elements", "DOM Nodes", "Headings & Paragraphs"]
      },
      {
        num: "Step 2",
        title: "CSS3 Styling: Setting the Table Decor",
        analogy: "Like dressing the dining tables with emerald-green linens, lighting candles, and placing a menu board. This governs spacing, layouts, and colors.",
        skills: ["Flexbox Layouts", "CSS Grid", "Responsive Design Rules"]
      },
      {
        num: "Step 3",
        title: "JavaScript Basics: Hiring Your Waiter",
        analogy: "Your waiter notices customer clicks, records drink choices (state), and runs to the backend kitchen to deliver dynamic results.",
        skills: ["Variables & Functions", "Click Event Listeners", "JSON Data Fetching"]
      },
      {
        num: "Step 4",
        title: "Modern Frameworks: Building Franchise Templates",
        analogy: "Instead of hand-drawing a menu for each table, you create reusable template components (like React) to duplicate and manage state easily.",
        skills: ["Component Design", "State Hooks", "Single Page Routing"]
      }
    ],
    "Backend Dev": [
      {
        num: "Step 1",
        title: "Node.js & Express: Hiring Your Head Chef",
        analogy: "The backend server is the Chef in the kitchen. They listen to the waiter's incoming tickets (HTTP requests) and process computations.",
        skills: ["Node Environment", "Express Servers", "HTTP Methods (GET/POST)"]
      },
      {
        num: "Step 2",
        title: "API Protocols: The Serving Window",
        analogy: "The designated shelf where servers place order cards, and chefs deposit cooked dishes. This standardizes request formats.",
        skills: ["REST API Conventions", "JSON Payloads", "Status Codes (200, 404)"]
      },
      {
        num: "Step 3",
        title: "Authentication: Checking VIP Invitations",
        analogy: "Before cooking a premium steak (serving secure profile data), the chef verifies the VIP password or invitation key (JWT token).",
        skills: ["Password Hashing", "JSON Web Tokens (JWT)", "Route Guards"]
      },
      {
        num: "Step 4",
        title: "Server Deployments: Opening Night",
        analogy: "Moving your restaurant kitchen from your home basement (localhost) to a public metropolitan hub where 10,000 eaters can call at once.",
        skills: ["Environment Variables", "Vercel / Render Deploy", "CORS Configuration"]
      }
    ],
    "Database Structure": [
      {
        num: "Step 1",
        title: "Relational Databases: Structured Pantry Shelves",
        analogy: "Organizing your food storage into labeled spice boxes (PostgreSQL columns) where everything follows a precise relational design schema.",
        skills: ["PostgreSQL Schema", "Rows and Columns", "Primary Keys"]
      },
      {
        num: "Step 2",
        title: "SQL Queries: The Chef's Shopping List",
        analogy: "Writing a clear note that retrieves '5 clean garlic bulbs from shelf C where age is under 3 days' to speed up recipe preparations.",
        skills: ["SELECT Queries", "JOIN Operators", "Index Optimization"]
      },
      {
        num: "Step 3",
        title: "NoSQL Flexibility: Crate Organizers",
        analogy: "Using bulk baskets (like MongoDB) for ingredients that arrive in varying formats daily. Easier to scale, less structural constraints.",
        skills: ["BSON Documents", "Collections Store", "Dynamic Schemas"]
      }
    ],
    "Full Stack Path": [
      {
        num: "Step 1",
        title: "The Dining Room Setup (Frontend foundations)",
        analogy: "Drafting the basic visual layout (HTML/CSS) so customers actually have a storefront to look at and click.",
        skills: ["Responsive HTML", "CSS Grid", "JS Event Listeners"]
      },
      {
        num: "Step 2",
        title: "Hiring the Chef (Backend Servers)",
        analogy: "Constructing the primary server system that receives commands from the frontend waiter and executes business equations.",
        skills: ["NodeJS Setup", "HTTP endpoints", "Routing Logic"]
      },
      {
        num: "Step 3",
        title: "Installing the Pantry (Databases)",
        analogy: "Linking the kitchen to a database pantry so that food items and recipes persist even if the power goes out.",
        skills: ["SQL / NoSQL basics", "Database Connection", "Data Persistence"]
      },
      {
        num: "Step 4",
        title: "The Full Dinner Service (Full Integration)",
        analogy: "Connecting the client waiter directly to the chef window and database pantry, completing the entire dynamic workflow loop.",
        skills: ["Full API Integrations", "Security layers", "Production Deploy"]
      }
    ]
  };

  if (btnGenerate && roadmapSection) {
    btnGenerate.addEventListener('click', () => {
      // Get active customizer settings
      const activePath = document.getElementById('val-path').textContent;
      const activeLevel = document.getElementById('val-level').textContent;
      const activePace = document.getElementById('val-pace').textContent;
      
      // Update results header text
      const roadmapTitle = document.getElementById('generated-roadmap-title');
      const roadmapDesc = document.getElementById('generated-roadmap-desc');
      
      roadmapTitle.textContent = `${activePath} Roadmap`;
      roadmapDesc.innerHTML = `Based on your selections, we've structured a step-by-step path designed for a <strong>${activeLevel}</strong> taking <strong>${activePace}</strong>.`;
      
      // Get the correct curriculum data array
      const curriculumSteps = roadmapsData[activePath] || roadmapsData["Frontend Dev"];
      
      // Render timeline cards dynamically
      const cardsContainer = document.getElementById('roadmap-cards-container');
      cardsContainer.innerHTML = ''; // Clear previous
      
      curriculumSteps.forEach((step, idx) => {
        // Build card HTML
        const card = document.createElement('div');
        card.className = 'roadmap-card';
        card.setAttribute('data-step-idx', idx);
        
        let tagsHtml = '';
        step.skills.forEach(skill => {
          tagsHtml += `<span class="skill-tag">${skill}</span>`;
        });
        
        card.innerHTML = `
          <div class="card-top">
            <div class="step-meta">
              <span class="step-num">${step.num}</span>
              <h3 class="step-title">${step.title}</h3>
            </div>
            <label class="step-check-label">
              <input type="checkbox" class="step-checkbox-input">
              <span class="custom-checkbox">
                <svg class="check-svg" viewBox="0 0 24 24" fill="none">
                  <polyline points="20 6 9 17 4 12" stroke="white" stroke-width="3"/>
                </svg>
              </span>
            </label>
          </div>
          <div class="roadmap-analogy-box">
            <span class="analogy-title">💡 The Analogy:</span>
            <p class="analogy-text">${step.analogy}</p>
          </div>
          <div class="skills-tags">
            ${tagsHtml}
          </div>
        `;
        
        cardsContainer.appendChild(card);
      });
      
      // Reveal the Roadmap Results Section with smooth fade in
      roadmapSection.style.display = 'block';
      
      // Trigger dynamic progress calculation bindings
      bindCheckboxProgress();
      
      // Smooth scroll to the results area
      setTimeout(() => {
        roadmapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    });
  }

  // --- 6. Checkbox Progress Binding System ---
  function bindCheckboxProgress() {
    const checkboxes = document.querySelectorAll('.step-checkbox-input');
    const progressFill = document.getElementById('roadmap-progress');
    const progressText = document.getElementById('progress-percent');
    
    // Reset progress on generation
    progressFill.style.width = '0%';
    progressText.textContent = '0%';
    
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const cardElement = checkbox.closest('.roadmap-card');
        
        // Toggle card highlighting classes
        if (checkbox.checked) {
          cardElement.classList.add('completed');
        } else {
          cardElement.classList.remove('completed');
        }
        
        // Calculate new scores
        const totalSteps = checkboxes.length;
        const completedSteps = document.querySelectorAll('.step-checkbox-input:checked').length;
        const percentage = Math.round((completedSteps / totalSteps) * 100);
        
        // Animate DOM progress representations
        progressFill.style.width = percentage + '%';
        progressText.textContent = percentage + '%';
      });
    });
  }


  // --- 7. NEW: Interactive Data Flow Simulator Engine ---
  const btnSimGet = document.getElementById('btn-sim-get');
  const btnSimPost = document.getElementById('btn-sim-post');
  const simConsoleLogs = document.getElementById('sim-console-logs');
  
  const simNodeFe = document.getElementById('sim-node-fe');
  const simNodeBe = document.getElementById('sim-node-be');
  const simNodeDb = document.getElementById('sim-node-db');
  
  const pulseP1 = document.getElementById('pulse-p1');
  const pulseP2 = document.getElementById('pulse-p2');

  function addLog(message, type = 'default') {
    const log = document.createElement('div');
    log.className = `log-line ${type === 'green' ? 'text-green' : type === 'orange' ? 'text-orange' : ''}`;
    log.innerHTML = `&gt; ${message}`;
    simConsoleLogs.appendChild(log);
    // Smooth scroll console to bottom
    simConsoleLogs.scrollTop = simConsoleLogs.scrollHeight;
  }

  function resetSimClasses() {
    simNodeFe.classList.remove('active');
    simNodeBe.classList.remove('active');
    simNodeDb.classList.remove('active');
    pulseP1.style.animation = 'none';
    pulseP2.style.animation = 'none';
  }

  // A helper wait function
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  if (btnSimGet && btnSimPost) {
    
    // GET Users Simulation Flow
    btnSimGet.addEventListener('click', async () => {
      // Prevent multiple parallel simulations
      btnSimGet.disabled = true;
      btnSimPost.disabled = true;
      
      resetSimClasses();
      simConsoleLogs.innerHTML = '';
      
      addLog('Initiating connection cycle: GET /users', 'orange');
      simNodeFe.classList.add('active');
      await wait(600);
      
      addLog('Frontend: User clicks "Load Active Users" button inside React layout state.');
      addLog('Frontend: Fetch request dispatched to URL server: http://api.stackeasy.dev/users');
      await wait(600);
      
      addLog('HTTP: Data packet flowing from waiter to server window...', 'orange');
      pulseP1.style.animation = 'simForward1 1s forwards';
      await wait(1000);
      
      simNodeBe.classList.add('active');
      addLog('Backend: Node.js server captured request endpoint GET /users.', 'green');
      addLog('Backend: Inspecting auth cookie token...');
      await wait(800);
      
      addLog('Backend: Token verified. Formulating SQL Query checklist for pantry Database...');
      pulseP2.style.animation = 'simForward2 1s forwards';
      await wait(1000);
      
      simNodeDb.classList.add('active');
      addLog('Database: MongoDB received query request.', 'green');
      addLog('Database: Scanning dynamic collection tables...');
      await wait(800);
      
      addLog('Database: Success! Found 12 matching users. Compiling BSON payload...');
      await wait(600);
      
      addLog('HTTP: Database returning data to backend Chef...', 'orange');
      pulseP2.style.animation = 'simBackward2 1s forwards';
      await wait(1000);
      
      simNodeDb.classList.remove('active');
      addLog('Backend: Chef received database pantry records.', 'green');
      addLog('Backend: Converting record values to standard JSON and returning HTTP 200 OK...');
      await wait(800);
      
      addLog('HTTP: Packet traveling back from Chef to Waiter...', 'orange');
      pulseP1.style.animation = 'simBackward1 1s forwards';
      await wait(1000);
      
      simNodeBe.classList.remove('active');
      addLog('Frontend: React Waiter captures JSON data payload!', 'green');
      addLog('Frontend: Calling state hooks setUsers() to re-render DOM list cards...');
      await wait(800);
      
      addLog('DOM: UI render complete. 12 active users loaded successfully! 🚀', 'green');
      
      btnSimGet.disabled = false;
      btnSimPost.disabled = false;
    });

    // POST Instagram Like Flow
    btnSimPost.addEventListener('click', async () => {
      btnSimGet.disabled = true;
      btnSimPost.disabled = true;
      
      resetSimClasses();
      simConsoleLogs.innerHTML = '';
      
      addLog('Initiating connection cycle: POST /reels/like', 'orange');
      simNodeFe.classList.add('active');
      await wait(600);
      
      addLog('Frontend (React): Instagram user taps "Heart icon" on a Reel.');
      addLog('Frontend: Dispatched API request: POST /reels/like { reelId: 4492 }');
      await wait(600);
      
      addLog('HTTP: Data packet flowing from phone layout to API gate...', 'orange');
      pulseP1.style.animation = 'simForward1 1s forwards';
      await wait(1000);
      
      simNodeBe.classList.add('active');
      addLog('Backend (Express.js): Server captures POST request.', 'green');
      addLog('Backend: Authenticating user details via Clerk Auth middleware...');
      await wait(800);
      
      addLog('Backend: Valid user! Command database pantry to increment like counter...');
      pulseP2.style.animation = 'simForward2 1s forwards';
      await wait(1000);
      
      simNodeDb.classList.add('active');
      addLog('Database (MongoDB): Database received update count request.', 'green');
      addLog('Database: Editing MongoDB collection "reels" ➔ increment likes by +1.');
      await wait(800);
      
      addLog('Database: Collection modified successfully. Returning updated counts: 2,401 likes.');
      await wait(600);
      
      addLog('HTTP: Returning updated dataset from pantry storage to server...', 'orange');
      pulseP2.style.animation = 'simBackward2 1s forwards';
      await wait(1000);
      
      simNodeDb.classList.remove('active');
      addLog('Backend: Express received DB approval.', 'green');
      addLog('Backend: Triggering recommend algorithms and returning HTTP 201 Created.');
      await wait(800);
      
      addLog('HTTP: Success packet returning to UI browser layout...', 'orange');
      pulseP1.style.animation = 'simBackward1 1s forwards';
      await wait(1000);
      
      simNodeBe.classList.remove('active');
      addLog('Frontend: React captures response. Toggling red heart visual state.', 'green');
      addLog('Frontend: Count label updated instantly from 2,400 to 2,401! ❤️', 'green');
      await wait(800);
      
      addLog('DOM: Instagram Like simulated successfully! 🚀', 'green');
      
      btnSimGet.disabled = false;
      btnSimPost.disabled = false;
    });
  }


  // --- 8. NEW: Clickable Folder Tree Visualizer ---
  const folderTreeRoot = document.querySelector('.folder-tree-root');
  const detailsDisplayCard = document.getElementById('file-details-container');
  
  // Folder tree toggle expand/collapse logic
  if (folderTreeRoot) {
    const folders = folderTreeRoot.querySelectorAll('.tree-item.folder');
    
    folders.forEach(folder => {
      folder.addEventListener('click', (e) => {
        e.stopPropagation();
        const path = folder.getAttribute('data-path');
        const subtree = folderTreeRoot.querySelector(`#tree-${path}`);
        
        folder.classList.toggle('collapsed');
        if (subtree) {
          subtree.classList.toggle('collapsed');
        }
        
        // Update arrow indicator
        const toggleIcon = folder.querySelector('.tree-toggle');
        if (folder.classList.contains('collapsed')) {
          toggleIcon.textContent = '▶';
        } else {
          toggleIcon.textContent = '▼';
        }
      });
    });
  }

  // Pre-configured premium data previews for each project file
  const fileContentsData = {
    "package-json": {
      title: "package.json",
      type: "Configuration file",
      badge: "JSON Config",
      use: "Serves as the <strong>general manifest</strong> for a Node.js project. It lists all frontend <strong>external library dependencies</strong> (like React, Express, or Axios) and maps launch run scripts.",
      concepts: "NPM, Packages, Dependency tree, Semantic Versioning",
      code: `{
  "name": "fullstack-website",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "express": "^4.18.2",
    "mongodb": "^5.6.0"
  },
  "scripts": {
    "dev": "node server.js",
    "start": "next start"
  }
}`
    },
    "index-html": {
      title: "index.html",
      type: "Structure template",
      badge: "HTML5 Layout",
      use: "The <strong>raw entry point</strong> of the entire application layout in the web browser. It lays out the main container tag where dynamic React code mounts.",
      concepts: "DOM mount point, Head tags, Responsive meta layouts",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Frontend App Skeleton</title>
</head>
<body>
  <!-- The React Waiter mounts here! -->
  <div id="root"></div>
</body>
</html>`
    },
    "style-css": {
      title: "style.css",
      type: "Styles & Styling",
      badge: "Vanilla CSS",
      use: "Coordinates page <strong>visual details</strong>. Defines theme root variables, sets responsive spacing constraints, structures flex layouts, and adds glowing hover effects.",
      concepts: "CSS Grid, HSL custom properties, Keyframes transitions",
      code: `:root {
  --primary-color: #FF5A1F;
}
body {
  background-color: #F8F6F0;
}
/* Layout wrappers rules */
.container {
  display: flex;
  justify-content: center;
}`
    },
    "app-js": {
      title: "app.js",
      type: "Interactive script",
      badge: "JavaScript",
      use: "Drives <strong>pure DOM layout transitions</strong>, registers listener triggers, expands collapsable accordion folders, and communicates custom filters state.",
      concepts: "DOM API, Event handling, Async fetch pipelines",
      code: `// Grab the simulator button element
const btn = document.getElementById('btn-sim');
btn.addEventListener('click', () => {
  console.log("Captured click!");
  triggerDataFlow();
});`
    },
    "main-tsx": {
      title: "main.tsx",
      type: "React mounting core",
      badge: "TSX Entry",
      use: "Locks the React application onto the DOM's <strong>root div layout block</strong> and starts compiled TypeScript syntax verification.",
      concepts: "React StrictMode, DOM Mounting, Compilation gates",
      code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';

ReactDOM.createRoot(
  document.getElementById('root')!
).render(<App />);`
    },
    "navbar-jsx": {
      title: "Navbar.jsx",
      type: "Reusable element component",
      badge: "React JSX",
      use: "Structures the reusable navbar <strong>navigation panel header</strong> inside separate clean components so pages share matching layouts easily.",
      concepts: "Props, JSX elements rendering, SPA Link systems",
      code: `export default function Navbar() {
  return (
    <nav class="nav-bar">
      <a href="/">Home</a>
      <a href="/fullstack">FullStack</a>
    </nav>
  );
}`
    },
    "home-tsx": {
      title: "Home.tsx",
      type: "Page layout screen",
      badge: "TSX Page",
      use: "Draws the primary landing page <strong>UI layouts card structures</strong>, pulling dynamic backend API items inside local variables.",
      concepts: "TypeScript State variables, fetch Hooks",
      code: `import React, { useState } from 'react';

export default function Home() {
  const [likes, setLikes] = useState(2400);
  return (
    <div className="card">
      <button onClick={() => setLikes(likes + 1)}>
        Like: {likes}
      </button>
    </div>
  );
}`
    },
    "server-js": {
      title: "server.js",
      type: "Backend Brain application",
      badge: "Node.js express",
      use: "Starts the active <strong>server application</strong>, binds API route windows, triggers authentication middleware logic, and connects to databases.",
      concepts: "Server bindings, Route pathways, Middleware layers",
      code: `const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(\`Server gate opened on port \${port}\`);
});`
    },
    "routes-js": {
      title: "routes.js",
      type: "API path routers",
      badge: "Express routes",
      use: "Draws the serve routes windows, connecting incoming <strong>GET/POST requests</strong> directly to backend database query scripts.",
      concepts: "REST endpoints, Response structures, JSON encoders",
      code: `const express = require('express');
const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await db.fetchUsers();
  res.status(200).json(users);
});`
    },
    "auth-js": {
      title: "auth.js",
      type: "Security validation guard",
      badge: "JWT Middleware",
      use: "Inspects incoming packets, verifying secure <strong>user login signatures</strong> before permitting access to server data drawers.",
      concepts: "Token decryption, JWT Verification, HTTP Route Guards",
      code: `const jwt = require('jsonwebtoken');

function authGuard(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.sendStatus(403);
    next();
  });
}`
    },
    "env-file": {
      title: ".env",
      type: "Credentials vault",
      badge: "Environment Variables",
      use: "Securely hides sensitive information (like <strong>database passwords, API keys</strong>) from being pushed to public GitHub code vaults.",
      concepts: "Variable encryptions, Security keys configuration",
      code: `DB_CONNECTION_STRING=mongodb+srv://admin:pass@cluster
JWT_SECRET=super_secret_pantry_key_99
STRIPE_API_KEY=sk_test_51Mz2`
    },
    "schema-sql": {
      title: "schema.sql",
      type: "Database storage schema",
      badge: "SQL Blueprint",
      use: "Instructs SQL databases how to arrange <strong>pantry tables, columns types</strong>, and link primary relations indices together.",
      concepts: "SQL schemas, Relational tables, Foreign key keys",
      code: `CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
    },
    "readme-md": {
      title: "README.md",
      type: "System documentation guide",
      badge: "Markdown Doc",
      use: "Documents exactly how to initialize, launch, test, and deploy the project so future team members build with <strong>standard rules</strong>.",
      concepts: "Documentation guidelines, Launch CLI logs",
      code: `# Project Stack Documentation

## Installation
Run \`npm install\` to pull core dependency templates.

## Run Development Server
Run \`npm run dev\` to launch on localhost:8000.`
    }
  };

  // Manage folder files click interactions
  if (folderTreeRoot && detailsDisplayCard) {
    const files = folderTreeRoot.querySelectorAll('.tree-item.file');
    
    files.forEach(file => {
      file.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Update active class state on files list
        files.forEach(f => f.classList.remove('active'));
        file.classList.add('active');
        
        const fileKey = file.getAttribute('data-file');
        const data = fileContentsData[fileKey];
        
        if (data) {
          // Dynamic smooth details card injection
          detailsDisplayCard.innerHTML = `
            <div class="file-preview-box">
              <div class="preview-file-header">
                <h4 class="preview-file-title">
                  <span>📄</span>
                  ${data.title}
                </h4>
                <span class="preview-badge">${data.badge}</span>
              </div>
              
              <div class="preview-body">
                <ul class="preview-meta-list">
                  <li>
                    <span class="meta-label">📁 File Type:</span>
                    <span class="meta-value">${data.type}</span>
                  </li>
                  <li>
                    <span class="meta-label">💡 Practical Use:</span>
                    <span class="meta-value">${data.use}</span>
                  </li>
                  <li>
                    <span class="meta-label">🧠 Key Concepts:</span>
                    <span class="concepts-badge">${data.concepts}</span>
                  </li>
                </ul>
              </div>

              <div class="preview-editor-window">
                <div class="code-comment">// Visual Demonstration Preview:</div>
                <pre><code>${escapeHtml(data.code)}</code></pre>
              </div>
            </div>
          `;
        }
      });
    });
  }

  // Simple HTML escaper to render templates safely in editor window
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  // --- 9. NEW: Glossary Instant Search Filter ---
  const glossarySearchInput = document.getElementById('glossary-search-input');
  
  if (glossarySearchInput) {
    glossarySearchInput.addEventListener('input', () => {
      const query = glossarySearchInput.value.toLowerCase().trim();
      const searchableRows = document.querySelectorAll('.searchable-row');
      
      searchableRows.forEach(row => {
        const textContent = row.textContent.toLowerCase();
        
        if (textContent.includes(query)) {
          row.classList.remove('hidden');
        } else {
          row.classList.add('hidden');
        }
      });
    });
  }

});
