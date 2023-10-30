import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [formData, setformData] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    async function postInfo() {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/index.php", {
          method: "POST",
          mode: "cors",
          headers: {
            // "Content-Type": "application/json",
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(formData),
        });
        console.log(response);

        const data = await response.json();

        setLoading(false);

        console.log(data);
        setResult(data);
      } catch (error) {
        setError(error);
      }
    }

    e.preventDefault();
    // const formdata = { name: name, email: "congthanhbkit03@gmail.com" };
    postInfo();
  };

  if (error.length > 0) {
    return (
      <div className="App">
        <h2 className="alert alert-danger my-3">Có lỗi xảy ra</h2>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="App">
        <div className="d-flex align-items-center">
          <strong>Loading...</strong>
          <div
            className="spinner-border ms-auto"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    );
  }

  if (result.status === "ok")
    return (
      <div className="App">
        <h2>Xin chào {result.name} </h2>
      </div>
    );

  return (
    <div className="App">
      <form method="post" onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        {result.status == "failed" && (
          <h4 className="alert alert-danger my-3">
            Email / password không đúng
          </h4>
        )}
        <div class="mb-3">
          <label htmlFor="name" className="form-label">
            Email:{" "}
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="name" className="form-label">
            Password:{" "}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
