import './App.css';
import { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Pencil, Trash2, Save, X } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", regNo: "", dept: "", year: "", marks: "" });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", regNo: "", dept: "", year: "", marks: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const dashboardRef = useRef();      // for full page (not used now)
  const pdfRef = useRef();            // 🆕 only for student table

  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) setStudents(JSON.parse(saved));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    if (form.name && form.regNo) {
      const newStudents = [...students, { ...form, id: Date.now() }];
      setStudents(newStudents);
      setForm({ name: "", regNo: "", dept: "", year: "", marks: "" });
      localStorage.setItem("students", JSON.stringify(newStudents));
      toast.success("Student Added!");
    }
  };

  const handleDelete = (id) => {
    const student = students.find((s) => s.id === id);
    if (window.confirm(`Delete "${student.name}"?`)) {
      const updated = students.filter((s) => s.id !== id);
      setStudents(updated);
      localStorage.setItem("students", JSON.stringify(updated));
      toast("Student Deleted", { icon: "🗑️" });
    }
  };

  const handleEditClick = (student) => {
    setEditId(student.id);
    setEditForm({ ...student });
  };

  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleEditSave = () => {
    const updated = students.map((s) => s.id === editId ? { ...editForm, id: editId } : s);
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
    setEditId(null);
    toast.success("Changes Saved");
  };

  const handleCancelEdit = () => setEditId(null);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportPDF = () => {
    const input = pdfRef.current; // 🆕 use only table area
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("student-dashboard.pdf");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-100 via-orange-200 to-yellow-100 text-gray-800 font-sans">
      <header className="w-full bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 shadow-md sticky top-0 z-50">
        <div className="flex flex-col items-center justify-center text-center py-4">
          <h1 className="text-3xl font-bold text-orange-600 drop-shadow-sm animate-pulse">
            🎓 Student Dashboard
          </h1>
          <p className="text-sm font-semibold text-orange-800 mt-1">
            Powered by BrightGrade ✨
          </p>
        </div>
      </header>

      <div className="p-6" ref={dashboardRef}>
        <Toaster position="top-center" />

        {/* Search Box */}
        <div className="max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search by name or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-orange-300 p-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Add Student Form */}
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          {["name", "regNo", "dept", "year", "marks"].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className="border border-orange-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          ))}
          <button
            onClick={handleAdd}
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-all mt-2 col-span-2"
          >
            ➕ Add Student
          </button>
        </div>

        {/* Student Table */}
        <div ref={pdfRef} className="overflow-x-auto block w-full mt-8 max-w-5xl mx-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-orange-100 text-orange-900">
              <tr className="text-center">
                <th className="p-2 text-sm uppercase tracking-wide">Name</th>
                <th className="p-2 text-sm uppercase tracking-wide">Reg No</th>
                <th className="p-2 text-sm uppercase tracking-wide">Dept</th>
                <th className="p-2 text-sm uppercase tracking-wide">Year</th>
                <th className="p-2 text-sm uppercase tracking-wide">Marks</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No students yet. Add one to get started!
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <>
                    <tr key={s.id} className="text-center border-t hover:bg-yellow-100 transition-all">
                      {editId === s.id ? (
                        <td colSpan={6}>
                          <div className="flex flex-col gap-2 p-4">
                            {["name", "regNo", "dept", "year", "marks"].map((field) => (
                              <input
                                key={field}
                                name={field}
                                value={editForm[field]}
                                onChange={handleEditChange}
                                className="border p-2 rounded text-sm"
                              />
                            ))}
                            <div className="flex justify-center gap-4 mt-2">
                              <button
                                onClick={handleEditSave}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                              >
                                <Save size={16} />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        </td>
                      ) : (
                        <>
                          <td className="p-2">{s.name}</td>
                          <td className="p-2">{s.regNo}</td>
                          <td className="p-2">{s.dept}</td>
                          <td className="p-2">{s.year}</td>
                          <td className="p-2">{s.marks}</td>
                        </>
                      )}
                    </tr>

                    {/* Buttons below the row */}
                    {editId !== s.id && (
                      <tr>
                        <td colSpan={6}>
                          <div className="flex justify-center gap-4 py-2">
                            <button
                              onClick={() => handleEditClick(s)}
                              className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(s.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Export Button */}
        <div className="flex justify-center mt-10">
          <div className="border border-orange-300 rounded-xl p-6 bg-white shadow-md">
            <button
              onClick={exportPDF}
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full shadow text-sm sm:text-base"
            >
              📄 Export as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
