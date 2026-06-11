// Staff Database (in localStorage)
let staffDatabase = JSON.parse(localStorage.getItem('staffDatabase')) || {
  admin: { 
    password: 'fitness123', 
    role: 'admin', 
    fullName: 'Admin',
    email: 'admin@wbft.com',
    securityQuestion: 'pet',
    securityAnswer: 'admin123'
  }
};

let clientDatabase = JSON.parse(localStorage.getItem('clientDatabase')) || [];
let attendanceDatabase = JSON.parse(localStorage.getItem('attendanceDatabase')) || [];
let currentUserRole = null;
let currentUsername = null;
let resetUsername = null;

// ==================== AUTH SECTION ====================

// Toggle between Login and Register
document.getElementById('toggleRegister').addEventListener('click', function() {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('registerSection').style.display = 'block';
});

document.getElementById('toggleLogin').addEventListener('click', function() {
  document.getElementById('registerSection').style.display = 'none';
  document.getElementById('loginSection').style.display = 'block';
});

// Toggle Password Reset
document.getElementById('toggleResetPassword').addEventListener('click', function() {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('resetSection').style.display = 'block';
});

document.getElementById('toggleLoginFromReset').addEventListener('click', function() {
  document.getElementById('resetSection').style.display = 'block';
  document.getElementById('securitySection').style.display = 'none';
  document.getElementById('newPasswordSection').style.display = 'none';
  document.getElementById('loginSection').style.display = 'none';
});

// Login Form
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  
  if (staffDatabase[username] && staffDatabase[username].password === password) {
    currentUserRole = staffDatabase[username].role;
    currentUsername = username;
    document.getElementById('authContainer').style.display = 'none';
    document.querySelector('.crm-content').style.display = 'block';
    document.getElementById('userDisplay').innerText = `👤 ${staffDatabase[username].fullName} (${currentUserRole})`;
    setupRolePermissions();
    document.getElementById('loginMessage').innerText = '';
  } else {
    document.getElementById('loginMessage').innerText = '❌ Invalid username or password';
    document.getElementById('loginMessage').style.color = '#d32f2f';
  }
});

// Registration Form
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const securityQuestion = document.getElementById('securityQuestion').value;
  const securityAnswer = document.getElementById('securityAnswer').value;
  const role = document.getElementById('roleSelect').value;

  // Validation
  if (password !== confirmPassword) {
    document.getElementById('registerMessage').innerText = '❌ Passwords do not match';
    document.getElementById('registerMessage').style.color = '#d32f2f';
    return;
  }

  if (staffDatabase[username]) {
    document.getElementById('registerMessage').innerText = '❌ Username already exists';
    document.getElementById('registerMessage').style.color = '#d32f2f';
    return;
  }

  if (password.length < 6) {
    document.getElementById('registerMessage').innerText = '❌ Password must be at least 6 characters';
    document.getElementById('registerMessage').style.color = '#d32f2f';
    return;
  }

  if (!securityAnswer.trim()) {
    document.getElementById('registerMessage').innerText = '❌ Please provide a security answer';
    document.getElementById('registerMessage').style.color = '#d32f2f';
    return;
  }

  // Register new staff member
  staffDatabase[username] = {
    password: password,
    role: role,
    fullName: fullName,
    email: email,
    securityQuestion: securityQuestion,
    securityAnswer: securityAnswer.toLowerCase(),
    registeredAt: new Date().toISOString()
  };

  // Save to localStorage
  localStorage.setItem('staffDatabase', JSON.stringify(staffDatabase));

  document.getElementById('registerMessage').innerText = '✅ Registration successful! Please login with your credentials.';
  document.getElementById('registerMessage').style.color = '#4caf50';

  // Reset form
  document.getElementById('registerForm').reset();

  // Switch to login after 2 seconds
  setTimeout(() => {
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
  }, 2000);
});

// ==================== PASSWORD RESET ====================

document.getElementById('resetPasswordForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('resetUsername').value;
  const email = document.getElementById('resetEmail').value;

  if (staffDatabase[username] && staffDatabase[username].email === email) {
    resetUsername = username;
    // Show security question
    const user = staffDatabase[username];
    const questions = {
      pet: "What is your pet's name?",
      city: "What city were you born in?",
      school: "What was your school name?",
      color: "What is your favorite color?"
    };
    
    document.getElementById('securityQuestionDisplay').innerText = questions[user.securityQuestion];
    document.getElementById('resetSection').style.display = 'none';
    document.getElementById('securitySection').style.display = 'block';
    document.getElementById('resetMessage').innerText = '';
  } else {
    document.getElementById('resetMessage').innerText = '❌ Username and email do not match';
    document.getElementById('resetMessage').style.color = '#d32f2f';
  }
});

// Security Question Verification
document.getElementById('securityForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const answer = document.getElementById('securityAnswerInput').value.toLowerCase();
  const user = staffDatabase[resetUsername];

  if (answer === user.securityAnswer) {
    document.getElementById('securitySection').style.display = 'none';
    document.getElementById('newPasswordSection').style.display = 'block';
    document.getElementById('securityMessage').innerText = '';
  } else {
    document.getElementById('securityMessage').innerText = '❌ Incorrect answer. Please try again.';
    document.getElementById('securityMessage').style.color = '#d32f2f';
  }
});

// Set New Password
document.getElementById('newPasswordForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const newPassword = document.getElementById('newPassword').value;
  const confirmNewPassword = document.getElementById('confirmNewPassword').value;

  if (newPassword !== confirmNewPassword) {
    document.getElementById('newPasswordMessage').innerText = '❌ Passwords do not match';
    document.getElementById('newPasswordMessage').style.color = '#d32f2f';
    return;
  }

  if (newPassword.length < 6) {
    document.getElementById('newPasswordMessage').innerText = '❌ Password must be at least 6 characters';
    document.getElementById('newPasswordMessage').style.color = '#d32f2f';
    return;
  }

  // Update password
  staffDatabase[resetUsername].password = newPassword;
  localStorage.setItem('staffDatabase', JSON.stringify(staffDatabase));

  document.getElementById('newPasswordMessage').innerText = '✅ Password reset successful! Redirecting to login...';
  document.getElementById('newPasswordMessage').style.color = '#4caf50';

  // Reset form and go back to login
  setTimeout(() => {
    document.getElementById('newPasswordForm').reset();
    document.getElementById('securitySection').style.display = 'none';
    document.getElementById('newPasswordSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
    resetUsername = null;
  }, 2000);
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', function() {
  currentUserRole = null;
  currentUsername = null;
  document.querySelector('.crm-content').style.display = 'none';
  document.getElementById('authContainer').style.display = 'block';
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('registerSection').style.display = 'none';
  document.getElementById('resetSection').style.display = 'none';
  document.getElementById('securitySection').style.display = 'none';
  document.getElementById('newPasswordSection').style.display = 'none';
  document.getElementById('loginForm').reset();
});

// ==================== ROLE PERMISSIONS ====================

function setupRolePermissions() {
  // Show door access for staff and admin
  if (currentUserRole === 'admin' || currentUserRole === 'staff') {
    document.getElementById('doorAccessSection').style.display = 'block';
    document.getElementById('attendanceSection').style.display = 'block';
    document.getElementById('accessCheckSection').style.display = 'block';
  } else {
    document.getElementById('doorAccessSection').style.display = 'none';
    document.getElementById('attendanceSection').style.display = 'none';
    document.getElementById('accessCheckSection').style.display = 'none';
  }

  // Hide sections based on role
  if (currentUserRole === 'staff') {
    document.getElementById('revenueDashboard').style.display = 'none';
    document.getElementById('reportsSection').style.display = 'none';
    document.querySelector('.sales').style.display = 'block';
  } else if (currentUserRole === 'sales') {
    document.querySelector('.clients').style.display = 'none';
    document.querySelector('.attendance').style.display = 'none';
    document.querySelector('.payments').style.display = 'none';
    document.getElementById('revenueDashboard').style.display = 'none';
    document.getElementById('reportsSection').style.display = 'none';
    document.getElementById('doorAccessSection').style.display = 'none';
    document.getElementById('attendanceSection').style.display = 'none';
    document.getElementById('accessCheckSection').style.display = 'none';
  } else if (currentUserRole === 'admin') {
    // Admin has access to everything
    document.getElementById('revenueDashboard').style.display = 'block';
    document.getElementById('reportsSection').style.display = 'block';
  }
}

// ==================== CLIENT MANAGEMENT ====================

const membershipPrices = {
  registration: 500,
  monthly: 200,
  '3months': 500,
  '6months': 1000,
  yearly: 2000
};

// Add Client
document.getElementById('clientForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('clientName').value;
  const phone = document.getElementById('clientPhone').value;
  const type = document.getElementById('membershipType').value;
  const payment = document.getElementById('paymentMethod').value;
  const amount = membershipPrices[type];

  // Calculate Expiry Date
  let expiry = new Date();
  if (type === 'monthly') expiry.setMonth(expiry.getMonth() + 1);
  if (type === '3months') expiry.setMonth(expiry.getMonth() + 3);
  if (type === '6months') expiry.setMonth(expiry.getMonth() + 6);
  if (type === 'yearly') expiry.setFullYear(expiry.getFullYear() + 1);

  const expiryDate = expiry.toISOString().split('T')[0];
  const isActive = new Date(expiryDate) > new Date();

  const clientData = {
    id: Date.now(),
    name: name,
    phone: phone,
    membership: type,
    amount: amount,
    paymentMethod: payment,
    expiryDate: expiryDate,
    registeredBy: currentUsername,
    registeredAt: new Date().toISOString(),
    isActive: isActive
  };

  clientDatabase.push(clientData);
  localStorage.setItem('clientDatabase', JSON.stringify(clientDatabase));

  displayClients();
  document.getElementById('clientForm').reset();
  alert('✅ Client added successfully!');
});

// Display Clients
function displayClients() {
  const tbody = document.querySelector('#clientTable tbody');
  tbody.innerHTML = '';

  clientDatabase.forEach(client => {
    const isActive = new Date(client.expiryDate) > new Date();
    const status = isActive ? '✅ Active' : '❌ Expired';
    const statusClass = isActive ? 'status-active' : 'status-expired';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${client.name}</td>
      <td>${client.phone}</td>
      <td>${client.membership}</td>
      <td>${client.amount}</td>
      <td>${client.paymentMethod}</td>
      <td>${client.expiryDate}</td>
      <td><span class="${statusClass}">${status}</span></td>
      <td><button class="btn-small" onclick="viewClientDetails(${client.id})">Details</button></td>
    `;
    tbody.appendChild(row);
  });
}

// View Client Details
function viewClientDetails(clientId) {
  const client = clientDatabase.find(c => c.id === clientId);
  if (client) {
    alert(`
📋 CLIENT DETAILS
═══════════════════
Name: ${client.name}
Phone: ${client.phone}
Membership: ${client.membership}
Amount: GH₵ ${client.amount}
Payment: ${client.paymentMethod}
Expiry: ${client.expiryDate}
Registered By: ${client.registeredBy}
Status: ${new Date(client.expiryDate) > new Date() ? 'Active' : 'Expired'}
    `);
  }
}

// ==================== DOOR ACCESS & ATTENDANCE ====================

// Door Access Check
document.getElementById('doorAccessForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const searchName = document.getElementById('doorClientName').value.toLowerCase();
  const foundClient = clientDatabase.find(c => c.name.toLowerCase().includes(searchName));

  const resultDiv = document.getElementById('doorAccessResult');

  if (foundClient) {
    const isActive = new Date(foundClient.expiryDate) > new Date();
    const daysLeft = Math.ceil((new Date(foundClient.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));

    if (isActive) {
      resultDiv.innerHTML = `
        <div class="access-granted">
          <h3>✅ ENTRY GRANTED</h3>
          <p><strong>Name:</strong> ${foundClient.name}</p>
          <p><strong>Membership:</strong> ${foundClient.membership}</p>
          <p><strong>Expiry:</strong> ${foundClient.expiryDate}</p>
          <p><strong>Days Valid:</strong> ${daysLeft} days</p>
          <p style="font-weight: bold; color: #4caf50;">✓ Welcome to WBFT!</p>
          <button class="btn-gold" onclick="quickCheckIn('${foundClient.name}')">Check In Now</button>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `
        <div class="access-denied">
          <h3>❌ ENTRY DENIED</h3>
          <p><strong>Name:</strong> ${foundClient.name}</p>
          <p><strong>Membership Expired:</strong> ${foundClient.expiryDate}</p>
          <p style="color: #d32f2f; font-weight: bold;">✗ Membership expired. Please renew.</p>
        </div>
      `;
    }
  } else {
    resultDiv.innerHTML = `
      <div class="access-not-found">
        <h3>⚠️ CLIENT NOT FOUND</h3>
        <p>No client found with the name "${document.getElementById('doorClientName').value}"</p>
      </div>
    `;
  }
});

// Check-In Form
document.getElementById('checkInForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const clientName = document.getElementById('checkInClientName').value;
  quickCheckIn(clientName);
});

function quickCheckIn(clientName) {
  const foundClient = clientDatabase.find(c => c.name.toLowerCase() === clientName.toLowerCase());
  
  if (foundClient) {
    const isActive = new Date(foundClient.expiryDate) > new Date();
    
    if (!isActive) {
      document.getElementById('checkInMessage').innerText = '❌ Cannot check in. Membership expired.';
      document.getElementById('checkInMessage').style.color = '#d32f2f';
      return;
    }

    const now = new Date();
    const attendanceRecord = {
      id: Date.now(),
      clientId: foundClient.id,
      clientName: foundClient.name,
      phone: foundClient.phone,
      checkInTime: now.toLocaleString(),
      checkOutTime: null,
      duration: null,
      date: now.toISOString().split('T')[0]
    };

    attendanceDatabase.push(attendanceRecord);
    localStorage.setItem('attendanceDatabase', JSON.stringify(attendanceDatabase));

    document.getElementById('checkInMessage').innerText = `✅ ${foundClient.name} checked in at ${now.toLocaleTimeString()}`;
    document.getElementById('checkInMessage').style.color = '#4caf50';
    document.getElementById('checkInForm').reset();
    displayAttendance();
  } else {
    document.getElementById('checkInMessage').innerText = '❌ Client not found';
    document.getElementById('checkInMessage').style.color = '#d32f2f';
  }
}

function displayAttendance() {
  const tbody = document.querySelector('#attendanceTable tbody');
  tbody.innerHTML = '';

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendanceDatabase.filter(a => a.date === today);

  // Summary stats
  const totalCheckIns = todayAttendance.length;
  const currentlyIn = todayAttendance.filter(a => !a.checkOutTime).length;
  const checkedOutCount = todayAttendance.filter(a => a.checkOutTime).length;

  document.getElementById('totalCheckIns').innerText = totalCheckIns;
  document.getElementById('currentlyInGym').innerText = currentlyIn;
  document.getElementById('checkedOut').innerText = checkedOutCount;

  todayAttendance.forEach(record => {
    const status = record.checkOutTime ? '✅ Checked Out' : '🟢 In Gym';
    const statusClass = record.checkOutTime ? 'status-expired' : 'status-active';
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${record.clientName}</td>
      <td>${record.checkInTime}</td>
      <td>${record.checkOutTime || '-'}</td>
      <td>${record.duration || '-'}</td>
      <td><span class="${statusClass}">${status}</span></td>
      <td>
        ${!record.checkOutTime ? `<button class="btn-small" onclick="checkOut(${record.id})">Check Out</button>` : '-'}
      </td>
    `;
    tbody.appendChild(row);
  });
}

function checkOut(attendanceId) {
  const attendance = attendanceDatabase.find(a => a.id === attendanceId);
  if (attendance && !attendance.checkOutTime) {
    const now = new Date();
    attendance.checkOutTime = now.toLocaleString();

    // Calculate duration
    const checkIn = new Date(attendance.checkInTime);
    const diff = (now - checkIn) / (1000 * 60); // in minutes
    const hours = Math.floor(diff / 60);
    const minutes = Math.floor(diff % 60);
    attendance.duration = `${hours}h ${minutes}m`;

    localStorage.setItem('attendanceDatabase', JSON.stringify(attendanceDatabase));
    displayAttendance();
    alert(`✅ ${attendance.clientName} checked out. Duration: ${attendance.duration}`);
  }
}

// Check Client Access
document.getElementById('accessCheckForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const searchName = document.getElementById('searchClientName').value.toLowerCase();
  const foundClient = clientDatabase.find(c => c.name.toLowerCase().includes(searchName));

  const resultDiv = document.getElementById('accessResult');

  if (foundClient) {
    const isActive = new Date(foundClient.expiryDate) > new Date();
    const daysLeft = Math.ceil((new Date(foundClient.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));

    if (isActive) {
      resultDiv.innerHTML = `
        <div class="access-granted">
          <h3>✅ ACCESS GRANTED</h3>
          <p><strong>Client Name:</strong> ${foundClient.name}</p>
          <p><strong>Phone:</strong> ${foundClient.phone}</p>
          <p><strong>Membership:</strong> ${foundClient.membership}</p>
          <p><strong>Expiry Date:</strong> ${foundClient.expiryDate}</p>
          <p><strong>Days Remaining:</strong> ${daysLeft} days</p>
          <p style="color: #4caf50; font-weight: bold;">✓ Client membership is valid and active</p>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `
        <div class="access-denied">
          <h3>❌ ACCESS DENIED</h3>
          <p><strong>Client Name:</strong> ${foundClient.name}</p>
          <p><strong>Membership Expired:</strong> ${foundClient.expiryDate}</p>
          <p style="color: #d32f2f; font-weight: bold;">✗ Membership has expired. Client needs to renew.</p>
        </div>
      `;
    }
  } else {
    resultDiv.innerHTML = `
      <div class="access-not-found">
        <h3>⚠️ CLIENT NOT FOUND</h3>
        <p>No client found with the name "${document.getElementById('searchClientName').value}"</p>
      </div>
    `;
  }
});

// Tab Switching
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  if (tabName === 'checkin') {
    document.getElementById('checkinTab').style.display = 'block';
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
  } else if (tabName === 'attendance') {
    document.getElementById('attendanceTab').style.display = 'block';
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
    displayAttendance();
  }
}

// CSV Import
function importCSV() {
  const file = document.getElementById('csvFile').files[0];
  if (!file) {
    alert('Please select a CSV file');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const rows = e.target.result.split('\n');
    let importCount = 0;

    rows.forEach((row, index) => {
      if (index === 0 || !row.trim()) return;
      const cols = row.split(',');
      if (cols.length >= 5) {
        const [name, phone, type, amount, payment] = cols.map(c => c.trim());
        if (name && phone && type && amount && payment) {
          let expiry = new Date();
          if (type === 'monthly') expiry.setMonth(expiry.getMonth() + 1);
          if (type === '3months') expiry.setMonth(expiry.getMonth() + 3);
          if (type === '6months') expiry.setMonth(expiry.getMonth() + 6);
          if (type === 'yearly') expiry.setFullYear(expiry.getFullYear() + 1);

          const expiryDate = expiry.toISOString().split('T')[0];
          const clientData = {
            id: Date.now() + importCount,
            name: name,
            phone: phone,
            membership: type,
            amount: parseInt(amount),
            paymentMethod: payment,
            expiryDate: expiryDate,
            registeredBy: currentUsername,
            registeredAt: new Date().toISOString(),
            isActive: true
          };
          clientDatabase.push(clientData);
          importCount++;
        }
      }
    });

    if (importCount > 0) {
      localStorage.setItem('clientDatabase', JSON.stringify(clientDatabase));
      displayClients();
      alert(`✅ Successfully imported ${importCount} clients!`);
    }
  };
  reader.readAsText(file);
}

// ==================== WATER SALES ====================

document.getElementById('waterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const type = document.getElementById('waterType').value;
  const payment = document.getElementById('waterPayment').value;
  const prices = { small: 3, medium: 5, large: 8 };
  const price = prices[type];
  const date = new Date().toISOString().split('T')[0];

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${date}</td>
    <td>${type}</td>
    <td>${price}</td>
    <td>${payment}</td>
  `;
  document.querySelector('#waterTable tbody').appendChild(row);
  document.getElementById('waterForm').reset();
});

// ==================== INVENTORY ====================

document.getElementById('itemForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('itemName').value;
  const price = document.getElementById('itemPrice').value;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${name}</td>
    <td>${price}</td>
  `;
  document.querySelector('#inventoryTable tbody').appendChild(row);
  document.getElementById('itemForm').reset();
});

// ==================== EXPIRY REMINDERS ====================

function checkExpiryReminders() {
  const today = new Date();
  clientDatabase.forEach(client => {
    const expiry = new Date(client.expiryDate);
    const diff = (expiry - today) / (1000 * 60 * 60 * 24);
    if (diff <= 3 && diff > 0) {
      console.log(`🔔 Reminder: ${client.name}'s membership expires in ${Math.ceil(diff)} days!`);
    }
  });
}

setInterval(checkExpiryReminders, 86400000);

// Load data on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    displayClients();
    displayAttendance();
  });
} else {
  displayClients();
  displayAttendance();
}