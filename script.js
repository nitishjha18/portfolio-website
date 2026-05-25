const TYPE_SPEED = 18;
const LINE_DELAY = 120;

const bootLines = [
  "[OK] power signal acquired",
  "[OK] loading NITISH_OS kernel modules",
  "[OK] mounting /portfolio",
  "[OK] indexing about.txt projects/ skills.db contact.sh",
  "[OK] enabling CRT scanline renderer",
  "[OK] syncing matrix background process",
  "[READY] visitor session initialized",
];

const commandAliases = {
  1: "intro",
  2: "experience",
  3: "education",
  4: "projects",
  5: "skills",
};

const autoCompleteCommands = [
  "intro",
  "experience",
  "education",
  "projects",
  "skills",
];

const selectableOptions = [
  "intro",
  "experience",
  "education",
  "projects",
  "skills",
];

const externalLinks = {
  github: "https://github.com/nitishjha18",
  linkedin: "https://www.linkedin.com/in/nitishjha11/",
  gmail: "mailto:nitish11jha@gmail.com",
};

const helpLines = [
  "Available commands:",
  "",
  { text: "[1] intro          → about me", command: "intro" },
  { text: "[2] experience     → work experience", command: "experience" },
  { text: "[3] education      → academic background", command: "education" },
  { text: "[4] projects       → things i've built", command: "projects" },
  { text: "[5] skills         → technical stack", command: "skills" },
];

const backToMenuLines = [
  "",
  {
    text: "─────────────────────────────────────",
    className: "dim",
  },
  {
    text: "> [clear]   → back to menu",
    command: "clear",
    className: "output-action-row",
  },
];

const commandOutput = {
  intro: [
    "> Name    : Nitish Jha",
    "> Role    : Full Stack Developer",
    "> Based   : Noida, U.P, India",
    "> Status  : Open to opportunities (Backend-focused roles)",
    "> Email   : nitish11jha@gmail.com",
    "> Bio     : Full Stack Developer with hands-on internship experience building",
    "            and shipping production-grade SaaS platforms. Skilled in JavaScript,",
    "            TypeScript, Node.js, PostgreSQL, and REST API design — with practical",
    "            exposure to AI integrations, automated pipelines, and role-based",
    "            backend systems.",
  ],
  experience: [
    "> [Nov 2025 – Present]  Garage Collective — AI Trainee",
    "                        Noida, India",
    "",
    "    Project 1: AI-Powered Brand Content Platform",
    "    Stack: Next.js, React.js, Node.js, PostgreSQL, Supabase, OpenAI API, TailwindCSS",
    "",
    "    - Designed backend architecture and modelled PostgreSQL schema with 20+ REST API",
    "      endpoints covering onboarding, session history, and content generation flows.",
    "    - Engineered OpenAI integration with custom system prompts that inject brand context",
    "      dynamically across 19 tools (Instagram, LinkedIn, YouTube, X, Google Ads).",
    "    - Implemented a 4-scenario content engine (3 hooks → 1 selection → 10 variants)",
    "      with stateful session logic via the OpenAI API.",
    "",
    "    Project 2: Startup Funding Discovery Platform",
    "    Stack: Next.js, Node.js, Supabase, PostgreSQL, Puppeteer, Playwright, GPT-4o, GitHub Actions",
    "",
    "    - Built a scheduled RSS feed scraper using GitHub Actions cron workflows aggregating",
    "      daily funding news from Inc42, YourStory, Crunchbase, Reddit, and Google News",
    "      with automated deduplication.",
    "    - Collaborated on a Playwright-based scraper for JavaScript-rendered SPA sites.",
    "    - Built backend logic for an AI-powered cold outreach email composer using GPT-4o",
    "      with prompt templating and Supabase RLS policies for data access control.",
  ],
  education: [
    "> [Aug 2022 – Jul 2026]  B.Tech in Computer Science and Engineering",
    "                         JECRC University, India",
  ],
  projects: [
    "> [01] expense-tracker",
    "       Solo full-stack expense management system with 3-tier RBAC model",
    "       (Admin → Department Lead → Employee) with approval routing workflows.",
    "       stack : Node.js · Express.js · MongoDB · React.js · Redux Toolkit · JWT · Tailwind",
    "       date  : Sep 2025",
    {
      text: "       link  : [view →]",
      linkText: "[view →]",
      href: "https://github.com/nitishjha18/Expense-Tracker",
    },
    "",
    "> [02] scholar-circle",
    "       Solo full-stack article publishing platform using Appwrite as BaaS —",
    "       secure auth, TinyMCE rich text editing, image uploads, full CRUD.",
    "       stack : React.js · Appwrite · TinyMCE · Redux Toolkit · Tailwind · Vite",
    "       date  : Jul 2025",
    {
      text: "       link  : [view →]",
      linkText: "[view →]",
      href: "https://github.com/nitishjha18/Scholar-Circle",
    },
    "",
    "> [03] portfolio-os",
    "       This terminal — a Matrix-inspired interactive CLI portfolio with boot",
    "       sequence, keyboard navigation, and typewriter animations.",
    "       stack : HTML · CSS · Vanilla JS",
    {
      text: "       link  : [view →]",
      linkText: "[view →]",
      href: "https://github.com/nitishjha18/portfolio-website",
    },
  ],
  skills: [
    "Languages   JavaScript · TypeScript · Java · HTML · CSS",
    "",
    "Frontend    React.js · Next.js · Redux Toolkit · Tailwind CSS · Vite · React Router DOM",
    "",
    "Backend     Node.js · Express.js · REST API Design · Zod · Prisma ORM · Rate Limiting",
    "",
    "Database    MongoDB · PostgreSQL · Supabase",
    "",
    "DevOps      Git · GitHub · Vercel · GitHub Actions · Postman · Playwright · Puppeteer",
    "",
    "Auth        JWT · Google OAuth · Supabase Auth · Clerk · NextAuth.js",
    "",
    "Proficiency bars:",
    "JavaScript/TS   [█████████░]  90%",
    "React / Next.js [████████░░]  82%",
    "Node / Express  [████████░░]  80%",
    "PostgreSQL      [███████░░░]  72%",
    "REST API Design [█████████░]  88%",
    "DevOps / CI-CD  [██████░░░░]  62%",
  ],
};

const bootOutput = document.querySelector("#boot-output");
const bootScreen = document.querySelector("#boot-screen");
const mainUi = document.querySelector("#main-ui");
const terminalOutput = document.querySelector("#terminal-output");
const terminalForm = document.querySelector("#terminal-form");
const terminalInput = document.querySelector("#terminal-input");
const uptimeNode = document.querySelector("#uptime");
const matrixCanvas = document.querySelector("#matrix-canvas");
const matrixContext = matrixCanvas.getContext("2d");

let commandHistory = [];
let historyIndex = 0;
let currentIndex = 0;
let isHelpMenuVisible = false;
let isRendering = false;
let menuOptionElements = [];
let startedAt = Date.now();

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function scrollTerminalToBottom() {
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Writes terminal text one character at a time.
async function typeText(target, text, speed = TYPE_SPEED) {
  for (const character of text) {
    target.textContent += character;
    scrollTerminalToBottom();
    await sleep(speed);
  }
}

function createLine() {
  const line = document.createElement("p");
  line.className = "terminal-line";
  terminalOutput.appendChild(line);
  scrollTerminalToBottom();
  return line;
}

function resetMenuSelector(isVisible) {
  currentIndex = 0;
  isHelpMenuVisible = isVisible;
  menuOptionElements = [];
}

function updateMenuSelector() {
  menuOptionElements.forEach((row, index) => {
    const marker = row.querySelector(".selector-marker");
    const isSelected = index === currentIndex;

    row.classList.toggle("is-selected", isSelected);
    marker.textContent = isSelected ? "> " : "  ";
  });
}

function moveMenuSelector(direction) {
  if (!isHelpMenuVisible || !menuOptionElements.length || isRendering) {
    return;
  }

  currentIndex =
    (currentIndex + direction + menuOptionElements.length) %
    menuOptionElements.length;

  updateMenuSelector();
}

function makeCommandLink(line, item) {
  const command = item.command;
  const externalUrl = externalLinks[command];

  line.textContent = "";

  const isMenuOption =
    isHelpMenuVisible && selectableOptions.includes(command);
  const selector = document.createElement("span");
  const link = document.createElement("a");

  if (isMenuOption) {
    line.classList.add("menu-option-row");
    line.dataset.menuIndex = String(menuOptionElements.length);

    selector.className = "selector-marker";
    selector.textContent = "  ";
    line.appendChild(selector);

    line.addEventListener("mouseenter", () => {
      currentIndex = Number(line.dataset.menuIndex);
      updateMenuSelector();
    });

    menuOptionElements.push(line);
  }

  link.href = "#";
  link.className = "command-option";
  link.dataset.command = command;

  if (externalUrl && line.dataset.text.includes("→")) {
    const [label, hint = ""] = line.dataset.text.split("→");
    const labelText = document.createElement("span");
    const hintText = document.createElement("span");

    link.href = externalUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
    labelText.textContent = `${label}→ `;
    hintText.className = "external-hint";
    hintText.textContent = hint.trim();
    link.append(labelText, hintText);
  } else {
    link.textContent = line.dataset.text;
  }

  line.appendChild(link);
}

function makeInlineLink(line, item) {
  const [before, after = ""] = item.text.split(item.linkText);
  const link = document.createElement("a");

  link.href = item.href;
  link.className = "inline-output-link";
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = item.linkText;
  link.style.color = "#00ff41";
  link.style.textShadow =
    "0 0 6px rgba(0,255,65,0.7), 0 0 16px rgba(0,255,65,0.25)";
  link.style.cursor = "pointer";
  link.style.textDecoration = "none";
  link.addEventListener("mouseenter", () => {
    link.style.textDecoration = "underline";
  });
  link.addEventListener("mouseleave", () => {
    link.style.textDecoration = "none";
  });

  line.appendChild(link);
  line.append(after);
}

async function renderLine(item) {
  const line = createLine();
  const text = typeof item === "string" ? item : item.text;

  if (item.className) {
    line.classList.add(item.className);
  }

  line.dataset.text = text;

  if (item.linkText) {
    const [before] = text.split(item.linkText);
    await typeText(line, before);
    makeInlineLink(line, item);
    await sleep(LINE_DELAY);
    return;
  }

  await typeText(line, text);

  if (item.command) {
    makeCommandLink(line, item);
  }

  await sleep(LINE_DELAY);
}

async function renderLines(lines, shouldClear = true) {
  const hasHelpMenu = lines.some(
    (line) =>
      typeof line === "object" &&
      selectableOptions.includes(line.command)
  );

  resetMenuSelector(hasHelpMenu);
  isRendering = true;
  terminalInput.readOnly = true;
  terminalForm.classList.add("is-busy");

  if (shouldClear) {
    terminalOutput.textContent = "";
  }

  for (const line of lines) {
    await renderLine(line);
  }

  if (isHelpMenuVisible) {
    updateMenuSelector();
  }

  isRendering = false;
  terminalInput.readOnly = false;
  terminalForm.classList.remove("is-busy");
  terminalInput.focus();
}

function normalizeCommand(rawCommand) {
  const normalized = rawCommand.trim().toLowerCase();
  return commandAliases[normalized] || normalized;
}

function openExternalLink(command) {
  const externalUrl = externalLinks[command];

  if (!externalUrl) {
    return false;
  }

  window.open(externalUrl, "_blank", "noopener,noreferrer");
  terminalInput.focus();
  return true;
}

function getUnknownCommandLines(rawCommand) {
  return [
    `bash: ${rawCommand}: command not found`,
    "type 'help' to list available commands.",
  ];
}

function getCommandLines(command, rawCommand) {
  if (command === "help") {
    return ["$ help", "", ...helpLines];
  }

  if (command === "clear") {
    return helpLines;
  }

  if (commandOutput[command]) {
    return [`$ ${command}`, "", ...commandOutput[command], ...backToMenuLines];
  }

  return getUnknownCommandLines(rawCommand);
}

async function runCommand(rawCommand) {
  const trimmedCommand = rawCommand.trim();

  if (!trimmedCommand || isRendering) {
    return;
  }

  commandHistory.push(trimmedCommand);
  historyIndex = commandHistory.length;
  terminalInput.value = "";

  const command = normalizeCommand(trimmedCommand);

  if (openExternalLink(command)) {
    return;
  }

  const lines = getCommandLines(command, trimmedCommand);

  await renderLines(lines);
}

async function showInitialTerminal() {
  const welcomeLines = [
    "Welcome to NITISH_OS v1.0",
    "Type a command or click an option below.",
    "",
    "$ help",
    "",
    ...helpLines,
  ];

  await renderLines(welcomeLines);
}

// Plays the fake boot log before revealing the portfolio UI.
async function runBootSequence() {
  for (const line of bootLines) {
    const row = document.createElement("p");
    bootOutput.appendChild(row);
    await typeText(row, line, 14);
    await sleep(170);
  }

  await sleep(520);
  bootOutput.textContent = "";
  bootScreen.classList.add("hidden");
  mainUi.classList.remove("hidden");
  startedAt = Date.now();
  await showInitialTerminal();
}

function moveHistory(direction) {
  if (!commandHistory.length || isRendering) {
    return;
  }

  historyIndex += direction;
  historyIndex = Math.max(0, Math.min(commandHistory.length, historyIndex));
  terminalInput.value = commandHistory[historyIndex] || "";
  terminalInput.setSelectionRange(
    terminalInput.value.length,
    terminalInput.value.length
  );
}

function autocompleteCommand() {
  const currentValue = terminalInput.value.trim().toLowerCase();

  if (!currentValue || isRendering) {
    return;
  }

  const match = autoCompleteCommands.find((command) =>
    command.startsWith(currentValue)
  );

  if (match) {
    terminalInput.value = match;
    terminalInput.setSelectionRange(match.length, match.length);
  }
}

function handleTerminalKeydown(event) {
  const shouldLeaveKeysForSelector =
    isHelpMenuVisible &&
    !terminalInput.value.trim() &&
    ["ArrowUp", "ArrowDown", "Enter"].includes(event.key);

  if (shouldLeaveKeysForSelector) {
    return;
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveHistory(-1);
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    moveHistory(1);
  }

  if (event.key === "Tab") {
    event.preventDefault();
    autocompleteCommand();
  }
}

function handleMenuSelectorKeydown(event) {
  const shouldUseSelector =
    isHelpMenuVisible &&
    !isRendering &&
    !terminalInput.value.trim() &&
    ["ArrowUp", "ArrowDown", "Enter"].includes(event.key);

  if (!shouldUseSelector) {
    return;
  }

  event.preventDefault();

  if (event.key === "ArrowUp") {
    moveMenuSelector(-1);
  }

  if (event.key === "ArrowDown") {
    moveMenuSelector(1);
  }

  if (event.key === "Enter") {
    const selectedCommand = selectableOptions[currentIndex];

    if (!openExternalLink(selectedCommand)) {
      runCommand(selectedCommand);
    }
  }
}

function handleCommandClick(event) {
  const commandLink = event.target.closest("[data-command]");

  if (!commandLink) {
    return;
  }

  event.preventDefault();

  if (!openExternalLink(commandLink.dataset.command)) {
    runCommand(commandLink.dataset.command);
  }
}

// Keeps the footer uptime tied to the moment the main UI appears.
function updateUptime() {
  const totalSeconds = Math.floor((Date.now() - startedAt) / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  uptimeNode.textContent = `${hours}:${minutes}:${seconds}`;
}

// Low-opacity background animation. It is decorative and ignores pointer input.
function setupMatrixRain() {
  const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&<>/\\[]{}";
  const fontSize = 16;
  let columns = 0;
  let drops = [];

  function resizeCanvas() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    columns = Math.floor(matrixCanvas.width / fontSize);
    drops = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * matrixCanvas.height)
    );
  }

  function drawMatrix() {
    matrixContext.fillStyle = "rgba(0, 0, 0, 0.08)";
    matrixContext.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    matrixContext.fillStyle = "#00ff41";
    matrixContext.font = `${fontSize}px "Courier New", monospace`;

    drops.forEach((drop, index) => {
      const text = characters[Math.floor(Math.random() * characters.length)];
      const x = index * fontSize;
      const y = drop * fontSize;

      matrixContext.fillText(text, x, y);

      if (y > matrixCanvas.height && Math.random() > 0.985) {
        drops[index] = 0;
      } else {
        drops[index] += 1;
      }
    });

    window.requestAnimationFrame(drawMatrix);
  }

  resizeCanvas();
  drawMatrix();
  window.addEventListener("resize", resizeCanvas);
}

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runCommand(terminalInput.value);
});

terminalInput.addEventListener("keydown", handleTerminalKeydown);
terminalOutput.addEventListener("click", handleCommandClick);
document.addEventListener("keydown", handleMenuSelectorKeydown);

document.addEventListener("DOMContentLoaded", () => {
  setupMatrixRain();
  runBootSequence();
  updateUptime();
  window.setInterval(updateUptime, 1000);
});
