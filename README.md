# 🎓 Student Management Dashboard - BrightGrade ✨

A responsive and interactive **Student Dashboard Web App** built with **React**, designed to help you add, edit, delete, search, and manage student records efficiently. Includes PDF export functionality and local storage saving — all in a colorful, smooth UI.

## 🚀 Live Demo
🔗 [Click here to try it out](https://basak-anushka13.github.io/student-dashboard)

---

## 📌 Features

- ✅ Add new students with details like Name, Reg No, Department, Year, Marks
- ✏️ Edit existing student info inline (vertically stacked for mobile-friendly UX)
- 🗑️ Delete student records with confirmation
- 🔍 Search students by name or department
- 💾 Data stored in browser `localStorage` (persists on reload)
- 📄 Export full student table as a PDF
- 📱 Fully responsive, mobile-friendly layout
- 🎨 Clean orange-yellow gradient theme (cheerful + professional)

---

## 📸 Screenshot

![Dashboard Screenshot](./screenshot.png)

---

## 🛠️ Built With

- React (with hooks)
- Tailwind CSS
- Lucide React Icons
- jsPDF + html2canvas (PDF generation)
- React Hot Toast (Notifications)

---

## 🧠 How it works

- On load, the app fetches student data from localStorage.
- When you add/edit/delete, the changes are automatically saved.
- Exporting as PDF uses `html2canvas` to capture the visible dashboard, and `jsPDF` to save it.

---

## 📦 Installation (Optional for Local Setup)

```bash
git clone https://github.com/basak-anushka13/student-dashboard.git
cd student-dashboard
npm install
npm run dev
📤 Deployment
Deployed using GitHub Pages from the main branch using Vite's static build.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
