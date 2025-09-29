import { useEffect, useState } from "react";
import axios from "../api/axios";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const therapistId = localStorage.getItem("therapistId");

    if (!therapistId) {
      setError("Therapist ID not found. Please login again.");
      setLoading(false);
      return;
    }

    console.log("👤 Therapist ID:", therapistId);

    fetch(`http://localhost:5000/api/patients/by-therapist/${therapistId}`)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((data) => {
        console.log("📥 Patients data:", data);
        setPatients(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        setError("Failed to load patients. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 mb-8 drop-shadow-lg">👥 Manage Patients</h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-purple-600 font-semibold">Loading patients...</p>
        </div>
      ) : error ? (
        <p className="text-red-600 text-lg font-semibold py-8">{error}</p>
      ) : patients.length === 0 ? (
        <p className="text-gray-600 text-lg py-8">No patients found.</p>
      ) : (
        <div className="w-full max-w-4xl mx-auto bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-purple-100">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-100 to-blue-100 text-left">
                <th className="p-2">Photo</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Registered</th>
                <th className="p-2">Upload</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <PatientRow key={p._id} patient={p} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


function PatientRow({ patient }) {
  const [preview, setPreview] = useState(patient.photoUrl ? `http://localhost:5000${patient.photoUrl}` : "");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f) {
      // Show preview instantly
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(f);

      // Upload to backend
      const formData = new FormData();
      formData.append("photo", f);
      setUploading(true);
      try {
        const res = await axios.post(`/patients/${patient._id}/photo`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.data.user && res.data.user.photoUrl) {
          setPreview(`http://localhost:5000${res.data.user.photoUrl}`);
        }
      } catch (err) {
        alert("Upload failed");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <tr className="border-b hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all">
      <td className="p-2">
        {preview ? (
          <img src={preview} alt="Profile" className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-purple-200" />
        ) : (
          <span className="inline-block w-12 h-12 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">👤</span>
        )}
      </td>
      <td className="p-2 font-semibold text-purple-700">{patient.name}</td>
      <td className="p-2 text-blue-700">{patient.email}</td>
      <td className="p-2 text-gray-600">{new Date(patient.createdAt).toLocaleDateString()}</td>
      <td className="p-2">
        <label className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-2 py-1 rounded-full shadow hover:from-purple-200 hover:to-blue-200 transition">
          <span role="img" aria-label="Upload" className="text-blue-600 text-xl">⬆️</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
        </label>
        {uploading && <span className="text-xs text-purple-500 ml-2 animate-pulse">Uploading...</span>}
      </td>
    </tr>
  );
}

export default Patients;
