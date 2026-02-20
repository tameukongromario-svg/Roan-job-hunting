// User management logic split from index.html for scalability
// Uses localStorage for persistence, but can be swapped for IndexedDB for very large datasets

let users = {};
let profileData = {
    full_name: '', headline: '', email: '', phone: '', location: '', years_exp: 'Less than 1 year',
    skills: [], experience: [], education: [], languages: [], certifications: []
};

function saveToLocalStorage() {
    if (!window.currentUser) return;
    users[window.currentUser].profile = profileData;
    users[window.currentUser].applications = window.applications || [];
    users[window.currentUser].savedJobs = window.savedJobs || [];
    localStorage.setItem('roanUsers', JSON.stringify(users));
}

function loadUsers() {
    let saved = localStorage.getItem('roanUsers');
    if (saved) users = JSON.parse(saved);
}

function authSignup(name, username, email, password) {
    loadUsers();
    if (users[username]) throw new Error('Username exists');
    if (!name) throw new Error('Name is required');
    if (!username) throw new Error('Username is required');
    if (!email) throw new Error('Email is required');
    if (!password) throw new Error('Password is required');
    
    users[username] = {
        name, email, password, joinDate: new Date().toLocaleDateString(),
        profile: { full_name: name, headline: '', email, phone: '', location: '', years_exp: 'Less than 1 year', skills: [], experience: [], education: [], languages: [], certifications: [] },
        applications: [], savedJobs: []
    };
    localStorage.setItem('roanUsers', JSON.stringify(users));
}

function authLogin(username, password) {
    loadUsers();
    if (!users[username] || users[username].password !== password) throw new Error('Invalid credentials');
    
    // Ensure user object has all required fields
    if (!users[username].name) users[username].name = username;
    if (!users[username].email) users[username].email = '';
    if (!users[username].joinDate) users[username].joinDate = new Date().toLocaleDateString();
    
    window.currentUser = username;
    profileData = users[username].profile || profileData;
    window.applications = users[username].applications || [];
    window.savedJobs = users[username].savedJobs || [];
    return users[username];
}

// Expose auth functions under unique names to avoid clashing with UI wrapper functions
window.authSignup = authSignup;
window.authLogin = authLogin;

// For large user bases, consider using IndexedDB for chunked storage and retrieval.
