// ================== Dummy Users ==================
const students = {
  "ravi": {
    password: "1234",
    name: "Ravi Kumar",
    roll: "101",
    division: "A",
    institute: "Parul University",
    photo: "https://via.placeholder.com/100",
    attendance: {
      "Math": 75,
      "Science": 80,
      "English": 60,
      "Computer": 90
    }
  },
  "karan": {
    password: "5678",
    name: "Karan Singh",
    roll: "102",
    division: "B",
    institute: "Parul University",
    photo: "https://via.placeholder.com/100",
    attendance: {
      "Math": 55,
      "Science": 70,
      "English": 65,
      "Computer": 85
    }
  }
};

const faculty = {
  "prof_amit": "1111",
  "prof_suman": "2222"
};

// Track current logged-in student
let currentStudent = null;


// ================== Elements ==================
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");

const studentModal = document.getElementById("studentModal");
const facultyModal = document.getElementById("facultyModal");
const closeStudent = document.getElementById("closeStudent");
const closeFaculty = document.getElementById("closeFaculty");

const studentLoginBtn = document.getElementById("studentLoginBtn");
const facultyLoginBtn = document.getElementById("facultyLoginBtn");

const studentSubmit = document.getElementById("studentSubmit");
const facultySubmit = document.getElementById("facultySubmit");

const dashboard = document.getElementById("dashboard");
const backBtn = document.getElementById("backBtn");


// ================== Open/Close Modals ==================
loginBtn.onclick = () => loginModal.style.display = "block";
closeModal.onclick = () => loginModal.style.display = "none";

// Student Modal
studentLoginBtn.onclick = () => {
  loginModal.style.display = "none";
  studentModal.style.display = "block";
};
closeStudent.onclick = () => studentModal.style.display = "none";

// Faculty Modal
facultyLoginBtn.onclick = () => {
  loginModal.style.display = "none";
  facultyModal.style.display = "block";
};
closeFaculty.onclick = () => facultyModal.style.display = "none";


// ================== Student Login ==================
studentSubmit.onclick = () => {
  const id = document.getElementById("studentId").value.toLowerCase();
  const pass = document.getElementById("studentPassword").value;

  if (students[id] && students[id].password === pass) {
    currentStudent = students[id];
    showStudentDashboard(currentStudent);
    studentModal.style.display = "none";
  } else {
    alert("Invalid Student ID or Password");
  }
};


// ================== Faculty Login ==================
facultySubmit.onclick = () => {
  const id = document.getElementById("facultyId").value.toLowerCase();
  const pass = document.getElementById("facultyPassword").value;

  if (faculty[id] && faculty[id] === pass) {
    showFacultyDashboard(id);
    facultyModal.style.display = "none";
  } else {
    alert("Invalid Faculty ID or Password");
  }
};


// ================== Student Dashboard ==================
function showStudentDashboard(student) {
  document.querySelector(".container").style.display = "none";
  dashboard.style.display = "block";

  document.getElementById("studentPhoto").src = student.photo;
  document.getElementById("studentName").innerText = "Welcome, " + student.name;
  document.getElementById("studentInfo").innerText =
    `Roll No: ${student.roll} | Division: ${student.division} | ${student.institute}`;

  // Attendance Table
  const tbody = document.querySelector("#attendanceTable tbody");
  tbody.innerHTML = "";
  for (let subject in student.attendance) {
    let row = `<tr><td>${subject}</td><td>${student.attendance[subject]}%</td></tr>`;
    tbody.innerHTML += row;
  }
}


// ================== Faculty Dashboard ==================
function showFacultyDashboard(facultyName) {
  document.querySelector(".container").style.display = "none";
  dashboard.style.display = "block";

  document.getElementById("studentPhoto").src = "https://via.placeholder.com/100";
  document.getElementById("studentName").innerText = "Welcome Faculty, " + capitalize(facultyName);
  document.getElementById("studentInfo").innerText = "Generate QR for attendance here.";
  
  // Clear old attendance table
  document.querySelector("#attendanceTable tbody").innerHTML = "";
}


// ================== Back Button ==================
backBtn.onclick = () => {
  dashboard.style.display = "none";
  document.querySelector(".container").style.display = "block";
};


// ================== Close Modal Outside Click ==================
window.onclick = (event) => {
  if (event.target == loginModal) loginModal.style.display = "none";
  if (event.target == studentModal) studentModal.style.display = "none";
  if (event.target == facultyModal) facultyModal.style.display = "none";
};


// ================== Capitalize Helper ==================
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


// ================== QR Scanner ==================
document.getElementById("scannerIcon").onclick = () => {
  document.getElementById("scannerModal").style.display = "block";

  const html5QrCode = new Html5Qrcode("reader");
  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    qrCodeMessage => {
      alert("Scanned: " + qrCodeMessage);

      // Update attendance for current student
      if (currentStudent) {
        markAttendance(currentStudent, qrCodeMessage);
      }

      html5QrCode.stop();
      document.getElementById("scannerModal").style.display = "none";
    },
    errorMessage => {
      console.log("Scanning...", errorMessage);
    }
  );
};


// ================== Mark Attendance ==================
function markAttendance(student, qrCodeMessage) {
  // Dummy logic: if QR matches "present", increase each subject attendance by +1%
  if (qrCodeMessage.toLowerCase() === "present") {
    for (let sub in student.attendance) {
      student.attendance[sub] = Math.min(student.attendance[sub] + 1, 100);
    }
    alert("Attendance Updated!");
    showStudentDashboard(student);
  } else {
    alert("Invalid QR code");
  }
}
