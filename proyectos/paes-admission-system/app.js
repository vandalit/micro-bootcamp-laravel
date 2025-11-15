// Main application logic for PAES admission system

let currentStudent = null;
let selectedCareer = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set up event listeners
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Set up department filter
    populateDepartmentFilter();
    
    // Set up filter event listeners
    document.getElementById('department-filter').addEventListener('change', filterCareers);
    document.getElementById('score-filter').addEventListener('change', filterCareers);
    
    // Close modal when clicking outside
    document.getElementById('career-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const rut = document.getElementById('rut').value.trim();
    const password = document.getElementById('password').value;
    
    // Validate credentials
    if (studentsDB[rut] && studentsDB[rut].password === password) {
        currentStudent = studentsDB[rut];
        showDashboard();
    } else {
        showError('RUT o contraseña incorrectos');
    }
}

// Show dashboard after successful login
function showDashboard() {
    // Hide login page and show dashboard
    document.getElementById('login-page').classList.remove('active');
    document.getElementById('dashboard-page').classList.add('active');
    
    // Populate student information
    populateStudentInfo();
    
    // Load and display careers
    loadCareers();
}

// Populate student information in dashboard
function populateStudentInfo() {
    document.getElementById('user-name').textContent = currentStudent.name.split(' ')[0];
    document.getElementById('student-name').textContent = currentStudent.name;
    document.getElementById('student-rut').textContent = currentStudent.rut;
    document.getElementById('paes-score').textContent = currentStudent.paesScore + ' pts';
    
    const scholarshipPercentage = calculateScholarship(currentStudent.paesScore);
    document.getElementById('scholarship-percentage').textContent = scholarshipPercentage + '%';
}

// Populate department filter dropdown
function populateDepartmentFilter() {
    const departmentFilter = document.getElementById('department-filter');
    
    Object.entries(departments).forEach(([key, value]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = value;
        departmentFilter.appendChild(option);
    });
}

// Load and display careers
function loadCareers() {
    const careersGrid = document.getElementById('careers-grid');
    careersGrid.innerHTML = '';
    
    careersDB.forEach(career => {
        const careerCard = createCareerCard(career);
        careersGrid.appendChild(careerCard);
    });
}

// Create career card element
function createCareerCard(career) {
    const eligible = isEligible(currentStudent.paesScore, career.minScore);
    const scholarshipPercentage = calculateScholarship(currentStudent.paesScore);
    
    const card = document.createElement('div');
    card.className = `career-card ${eligible ? 'eligible' : 'not-eligible'}`;
    card.setAttribute('data-department', career.department);
    card.setAttribute('data-min-score', career.minScore);
    
    card.innerHTML = `
        <div class="career-header">
            <div>
                <div class="career-name">${career.name}</div>
                <div class="career-department">${departments[career.department]}</div>
            </div>
            <div class="eligibility-badge ${eligible ? 'eligible-badge' : 'not-eligible-badge'}">
                ${eligible ? 'Elegible' : 'No Elegible'}
            </div>
        </div>
        
        <div class="career-info">
            <div class="career-description">
                ${career.description.substring(0, 120)}...
            </div>
            
            <div class="career-stats">
                <div class="stat">
                    <span class="stat-value">${career.duration}</span>
                    <span class="stat-label">Duración</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${career.minScore}</span>
                    <span class="stat-label">Puntaje Mín.</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${eligible ? scholarshipPercentage + '%' : '0%'}</span>
                    <span class="stat-label">Tu Beca</span>
                </div>
            </div>
        </div>
    `;
    
    // Add click event to open modal
    card.addEventListener('click', () => openCareerModal(career));
    
    return card;
}

// Filter careers based on selected filters
function filterCareers() {
    const departmentFilter = document.getElementById('department-filter').value;
    const scoreFilter = document.getElementById('score-filter').value;
    const careerCards = document.querySelectorAll('.career-card');
    
    careerCards.forEach(card => {
        let showCard = true;
        
        // Filter by department
        if (departmentFilter && card.getAttribute('data-department') !== departmentFilter) {
            showCard = false;
        }
        
        // Filter by score range
        if (scoreFilter) {
            const minScore = parseInt(card.getAttribute('data-min-score'));
            switch (scoreFilter) {
                case 'high':
                    if (minScore < 700) showCard = false;
                    break;
                case 'medium':
                    if (minScore < 500 || minScore >= 700) showCard = false;
                    break;
                case 'low':
                    if (minScore < 400 || minScore >= 500) showCard = false;
                    break;
            }
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Open career detail modal
function openCareerModal(career) {
    selectedCareer = career;
    const modal = document.getElementById('career-modal');
    const eligible = isEligible(currentStudent.paesScore, career.minScore);
    const scholarshipPercentage = calculateScholarship(currentStudent.paesScore);
    
    // Populate modal content
    document.getElementById('modal-career-name').textContent = career.name;
    document.getElementById('modal-career-description').textContent = career.description;
    document.getElementById('modal-career-department').textContent = departments[career.department];
    document.getElementById('modal-career-duration').textContent = career.duration;
    document.getElementById('modal-career-min-score').textContent = career.minScore + ' pts';
    document.getElementById('modal-scholarship').textContent = (eligible ? scholarshipPercentage : 0) + '%';
    
    // Populate curriculum
    const curriculumGrid = document.getElementById('modal-curriculum');
    curriculumGrid.innerHTML = '';
    
    career.curriculum.forEach(semester => {
        const semesterDiv = document.createElement('div');
        semesterDiv.className = 'semester';
        
        semesterDiv.innerHTML = `
            <h4>${semester.semester}</h4>
            ${semester.subjects.map(subject => `<div class="subject">${subject}</div>`).join('')}
        `;
        
        curriculumGrid.appendChild(semesterDiv);
    });
    
    // Update enroll button
    const enrollBtn = document.getElementById('enroll-btn');
    if (eligible) {
        enrollBtn.disabled = false;
        enrollBtn.innerHTML = '<i class="fas fa-check"></i> Matricularme';
    } else {
        enrollBtn.disabled = true;
        enrollBtn.innerHTML = '<i class="fas fa-times"></i> Puntaje Insuficiente';
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close career modal
function closeModal() {
    const modal = document.getElementById('career-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    selectedCareer = null;
}

// Handle career enrollment
function enrollInCareer() {
    if (!selectedCareer) return;
    
    const eligible = isEligible(currentStudent.paesScore, selectedCareer.minScore);
    
    if (eligible) {
        const scholarshipPercentage = calculateScholarship(currentStudent.paesScore);
        
        // Show success message
        showSuccess(`¡Felicitaciones! Te has matriculado exitosamente en ${selectedCareer.name}. 
                    Tu beca es del ${scholarshipPercentage}%. 
                    Recibirás más información por correo electrónico.`);
        
        closeModal();
    } else {
        showError('No cumples con el puntaje mínimo requerido para esta carrera.');
    }
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// Logout function
function logout() {
    currentStudent = null;
    selectedCareer = null;
    
    // Reset forms
    document.getElementById('login-form').reset();
    document.getElementById('department-filter').value = '';
    document.getElementById('score-filter').value = '';
    
    // Show login page
    document.getElementById('dashboard-page').classList.remove('active');
    document.getElementById('login-page').classList.add('active');
    
    // Close any open modals
    closeModal();
}

// Utility functions for showing messages
function showSuccess(message) {
    showMessage(message, 'success');
}

function showError(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="message-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles for message
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
        border-radius: 10px;
        padding: 15px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        animation: slideInRight 0.3s ease-out;
    `;
    
    messageDiv.querySelector('.message-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    messageDiv.querySelector('.message-close').style.cssText = `
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 5px;
        margin-left: auto;
    `;
    
    // Add to document
    document.body.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}

// Add CSS animation for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
