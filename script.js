let currentUserRole = null;

const users = [
  { username: "simon", password: "fitness123", role: "admin" },
  { username: "staff1", password: "staffpass", role: "staff" },
  { username: "sales1", password: "salespass", role: "sales" }
];

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const account = users.find(u => u.username === user && u.password === pass);

  if (account) {
    currentUserRole = account.role;
    document.getElementById("loginMessage").innerText = "Login successful!";
    document.querySelector(".login").style.display = "none";
    document.querySelector(".crm-content").style.display = "block";

    if (account.role === "staff") {
      document.querySelector(".revenue-dashboard").style.display = "none";
    }
    if (account.role === "sales") {
      document.querySelector(".clients").style.display = "none";
      document.querySelector(".attendance").style.display = "none";
      document.querySelector(".payments").style.display = "none";
      document.querySelector(".revenue-dashboard").style.display = "none";
    }
  } else {
    document.getElementById("loginMessage").innerText = "Invalid credentials.";
  }
}
);
// Membership Prices
const membershipPrices = {
  registration: 500,
  monthly: 200,
  "3months": 500,
  "6months": 1000,
  yearly: 2000
};

// Add Client Manually
document.getElementById("clientForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("clientName").value;
  const type = document.getElementById("membershipType").value;
  const payment = document.getElementById("paymentMethod").value;
  const amount = membershipPrices[type];

  // Expiry Dates
  let expiry = new Date();
  if (type === "monthly") expiry.setMonth(expiry.getMonth() + 1);
  if (type === "3months") expiry.setMonth(expiry.getMonth() + 3);
  if (type === "6months") expiry.setMonth(expiry.getMonth() + 6);
  if (type === "yearly") expiry.setFullYear(expiry.getFullYear() + 1);

  const row = `<tr>
    <td>${name}</td>
    <td>${type}</td>
    <td>${amount}</td>
    <td>${payment}</td>
    <td>${expiry.toISOString().split('T')[0]}</td>
  </tr>`;
  document.querySelector("#clientTable tbody").innerHTML += row;
});

// CSV Import
function importCSV() {
  const file = document.getElementById("csvFile").files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const rows = e.target.result.split("\n");
    rows.forEach(row => {
      const cols = row.split(",");
      if (cols.length >= 4) {
        const [name, type, amount, payment] = cols;
        const rowHTML = `<tr>
          <td>${name}</td>
          <td>${type}</td>
          <td>${amount}</td>
          <td>${payment}</td>
          <td></td>
        </tr>`;
        document.querySelector("#clientTable tbody").innerHTML += rowHTML;
      }
    });
  };
  reader.readAsText(file);
}

// Water Sales
document.getElementById("waterForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const type = document.getElementById("waterType").value;
  const payment = document.getElementById("waterPayment").value;
  const prices = { small: 3, medium: 5, large: 8 };
  const price = prices[type];
  const date = new Date().toISOString().split('T')[0];

  const row = `<tr>
    <td>${date}</td>
    <td>${type}</td>
    <td>${price}</td>
    <td>${payment}</td>
  </tr>`;
  document.querySelector("#waterTable tbody").innerHTML += row;
});

// Inventory Add
document.getElementById("itemForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("itemName").value;
  const price = document.getElementById("itemPrice").value;

  const row = `<tr>
    <td>${name}</td>
    <td>${price}</td>
  </tr>`;
  document.querySelector("#inventoryTable tbody").innerHTML += row;
});

// Expiry Reminder (3 days before expiry)
function checkExpiryReminders() {
  const rows = document.querySelectorAll("#clientTable tbody tr");
  const today = new Date();
  rows.forEach(row => {
    const expiry = new Date(row.cells[4].innerText);
    const diff = (expiry - today) / (1000 * 60 * 60 * 24);
    if (diff <= 3 && diff > 0) {
      alert(`Reminder: ${row.cells[0].innerText}'s membership expires in ${Math.ceil(diff)} days!`);
    }
  });
}
setInterval(checkExpiryReminders, 86400000); // check daily

// Daily Revenue Tracker
function calculateDailyRevenue() {
  let total = 0;
  const today = new Date().toISOString().split('T')[0];
  const rows = document.querySelectorAll("#clientTable tbody tr");
  rows.forEach(row => {
    if (row.cells[4].innerText === today) {
      total += parseInt(row.cells[2].innerText);
    }
  });
  document.getElementById("dailyRevenue").innerText = "Today's Revenue: GH₵ " + total;
}