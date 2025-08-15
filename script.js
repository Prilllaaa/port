// ======================
// Pulsating Cyber Grid Background
// ======================
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['rgba(0, 255, 252, 0.15)', 'rgba(255, 42, 109, 0.1)', 'rgba(211, 0, 197, 0.1)'];
const gridSize = 60;
let pulsePhase = 0;

function drawGrid() {
  ctx.fillStyle = 'rgba(10, 10, 23, 0.03)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.lineWidth = 0.3;
  
  // Vertical lines
  for (let x = 0; x < canvas.width; x += gridSize) {
    const pulse = Math.sin(pulsePhase + x * 0.01) * 0.5 + 0.5;
    ctx.strokeStyle = `rgba(0, 255, 252, ${pulse * 0.2})`;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  
  // Horizontal lines
  for (let y = 0; y < canvas.height; y += gridSize) {
    const pulse = Math.cos(pulsePhase + y * 0.01) * 0.5 + 0.5;
    ctx.strokeStyle = `rgba(255, 42, 109, ${pulse * 0.15})`;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  
  // Floating nodes
  if (Math.random() > 0.9) {
    const x = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
    const y = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
    const size = Math.random() * 2 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  pulsePhase += 0.02;
  requestAnimationFrame(drawGrid);
}

// ======================
// Orbiting Particle System
// ======================
const particles = [];
const particleCount = 24;

function initParticles() {
  const badge = document.getElementById('badge');
  const radius = badge.offsetWidth * 0.8;
  const center = radius / 2;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'orbiting-particle';
    
    const angle = (i / particleCount) * Math.PI * 2;
    particle.dataset.angle = angle;
    particle.dataset.speed = 0.003 + Math.random() * 0.004;
    particle.dataset.radius = radius * (0.9 + Math.random() * 0.2);
    
    // Color gradient around circle
    particle.style.background = `hsl(${(i / particleCount) * 360}, 80%, 60%)`;
    
    badge.appendChild(particle);
    particles.push(particle);
  }
}

function orbitParticles() {
  const badge = document.getElementById('badge');
  const centerX = badge.offsetWidth / 2;
  const centerY = badge.offsetHeight / 2;

  particles.forEach(particle => {
    const angle = parseFloat(particle.dataset.angle);
    const speed = parseFloat(particle.dataset.speed);
    const radius = parseFloat(particle.dataset.radius);
    
    const newAngle = angle + speed;
    const x = centerX + Math.cos(newAngle) * radius;
    const y = centerY + Math.sin(newAngle) * radius;
    
    particle.style.transform = `translate(${x}px, ${y}px)`;
    particle.dataset.angle = newAngle;
    
    // Pulsing effect
    const pulse = Math.sin(Date.now() * 0.002 + angle * 2) * 0.3 + 0.7;
    particle.style.opacity = pulse.toString();
    particle.style.transform += ` scale(${pulse})`;
  });

  requestAnimationFrame(orbitParticles);
}

// ======================
// Typing Animation
// ======================
const typingText = document.querySelector('.typing-text');
const roles = [
  "Cybersecurity Specialist", 
  "Digital Forensics Expert",
  "Threat Hunter",
  "SOC Analyst"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 1500;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500;
  }
  
  setTimeout(type, typingSpeed);
}

// ======================
// Interactive Navigation
// ======================
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content-section');
const hoverSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-click-screen-1090.mp3');
const clickSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-plastic-interface-click-1107.mp3');

hoverSound.volume = 0.3;
clickSound.volume = 0.3;

navButtons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
    button.querySelector('.btn-light').style.animation = 'none';
    setTimeout(() => {
      button.querySelector('.btn-light').style.animation = 'pulse 1.5s infinite alternate';
    }, 10);
  });
  
  button.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
    
    navButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const sectionId = button.getAttribute('data-section');
    sections.forEach(section => {
      section.classList.remove('active');
      if (section.id === sectionId) {
        setTimeout(() => {
          section.classList.add('active');
        }, 10);
      }
    });
  });
});

// ======================
// Interactive Badge
// ======================
const badge = document.getElementById('badge');
const badgeSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-positiv-notification-266.mp3');
badgeSound.volume = 0.3;

badge.addEventListener('mouseenter', () => {
  badgeSound.currentTime = 0;
  badgeSound.play();
});

// ======================
// Skills Grid
// ======================
const skills = [
  { name: "Digital Forensics", level: 90, icon: "🔍" },
  { name: "Threat Hunting", level: 85, icon: "🎯" },
  { name: "Incident Response", level: 88, icon: "🚨" },
  { name: "Malware Analysis", level: 75, icon: "🦠" },
  { name: "Network Security", level: 82, icon: "🛡️" },
  { name: "Python Scripting", level: 85, icon: "🐍" }
];

const skillGrid = document.querySelector('.skill-grid');
skills.forEach(skill => {
  const skillItem = document.createElement('div');
  skillItem.className = 'skill-item';
  skillItem.innerHTML = `
    <div class="skill-icon">${skill.icon}</div>
    <h3>${skill.name}</h3>
    <div class="skill-level">
      <div class="level-bar" style="width: 0"></div>
      <span>0%</span>
    </div>
  `;
  skillGrid.appendChild(skillItem);
  
  // Animate progress bar after a delay
  setTimeout(() => {
    const bar = skillItem.querySelector('.level-bar');
    const percent = skillItem.querySelector('span');
    bar.style.width = `${skill.level}%`;
    percent.textContent = `${skill.level}%`;
  }, 300);
});

// ======================
// Project Carousel
// ======================
const projects = [
  { 
    title: "Threat Intelligence Platform", 
    description: "Developed real-time threat detection using machine learning algorithms",
    tags: ["Python", "ML", "ELK Stack"]
  },
  { 
    title: "Forensic Analysis Tool", 
    description: "Automated disk image and memory dump analysis for incident response",
    tags: ["Python", "Volatility", "DFIR"]
  }
];

const projectCarousel = document.querySelector('.project-carousel');
projects.forEach(project => {
  const projectCard = document.createElement('div');
  projectCard.className = 'project-card';
  projectCard.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="project-tags">
      ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
    </div>
  `;
  projectCarousel.appendChild(projectCard);
});

// ======================
// Terminal Interaction
// ======================
const terminalForm = document.querySelector('.terminal-form');
const terminalInput = document.querySelector('.terminal-input');
const terminalBody = document.querySelector('.terminal-body');

terminalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const command = terminalInput.value.trim();
  
  if (command) {
    addTerminalLine(`> ${command}`);
    
    let response;
    switch(command.toLowerCase()) {
      case 'help':
        response = "Available commands: about, skills, projects, contact, clear";
        break;
      case 'clear':
        terminalBody.innerHTML = '';
        terminalInput.value = '';
        return;
      case 'about':
        response = "Priscilla Ocansey | Cybersecurity Specialist | Digital Forensics Expert";
        break;
      case 'contact':
        response = "Email: priscilla@cybersec.com | Twitter: @cyberpriscilla";
        break;
      default:
        response = `Command not recognized: ${command}`;
    }
    
    setTimeout(() => addTerminalLine(response), 300);
  }
  
  terminalInput.value = '';
});

function addTerminalLine(text) {
  const line = document.createElement('div');
  line.className = 'terminal-line';
  line.textContent = text;
  terminalBody.appendChild(line);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

// ======================
// Initialize Everything
// ======================
window.addEventListener('load', () => {
  // Start animations
  drawGrid();
  initParticles();
  orbitParticles();
  setTimeout(type, 1000);
  
  // Initial terminal message
  setTimeout(() => {
    addTerminalLine("> Type 'help' for available commands");
  }, 1500);
  
  // Set first nav button as active
  navButtons[0].click();
  
  // Fade in particles after a delay
  setTimeout(() => {
    document.querySelectorAll('.orbiting-particle').forEach(p => {
      p.style.opacity = '0.8';
      p.style.transform = 'translate(0, 0) scale(1)';
    });
  }, 800);
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

