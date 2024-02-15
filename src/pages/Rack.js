import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

export default function Rack() {

  const [racks, setRacks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/rack")
      .then(resp => resp.json())
      .then(racks => setRacks(racks));
  }, []);

  const [form, setForm] = useState({ // initial empty form
    name: "",
    time: "",
    date: "",
    service: "",
    comment: ""
  });

  function getCurrentTime() {
    let newTime = new Date()
    let hour = newTime.getHours();
    let minute = newTime.getMinutes();
    return `${hour}:${minute}`
  }

  function getCurrentDate(separator = '/') {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${month < 10 ? `0${month}` : `${month}`}${separator}${date}${separator}${year}`
  }

  function handleChange(event) {
    setForm({ //setForm take from form to update data into new submission for db.json
      ...form,
      [event.target.name]: event.target.value,
      time: getCurrentTime(),
      date: getCurrentDate()
    })
  }

  function handleSubmit(event) { // submit to db.json
    event.preventDefault();
    console.log(form);
    fetch("http://localhost:4000/rack", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(form)
    }).then(response => response.json())
      .then(submittedData => setForm([...racks, submittedData]))
      .then(alert('Form Submitted'));
  }

  return (
    <>
      <header>
        <NavBar></NavBar>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="service">Service:</label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
              required
            >
              <option value="">Select a service</option>
              <option value="lengthen">Lengthen</option>
              <option value="shorten">Shorten</option>
              <option value="widen">Widen</option>
              <option value="tighten">Tighten</option>
            </select>
          </div>
          <div>
            <label>Comment:</label>
            <textarea
              type="text"
              id="comment"
              name="comment"
              value={form.comment}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
};
