import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

export default function Admin() {

  const [racks, setRacks] = useState([]);
  const [racquets, setRacquets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/rack")
      .then(resp => resp.json())
      .then(racks => setRacks(racks));
  }, [racks]);

  useEffect(() => {
    fetch("http://localhost:4000/racquet")
      .then(resp => resp.json())
      .then(racquets => setRacquets(racquets));
  }, [racquets]);

  const onDeleteRack = (id) => {
    const deletedId = id;
    fetch(`http://localhost:4000/rack/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => { console.log(`form ${deletedId} has been deleted`) })
      .catch(error => { console.log(error) });
  }

  const onDeleteRacquet = (id) => {
    const deletedId = id;
    fetch(`http://localhost:4000/racquet/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => { console.log(`form ${deletedId} has been deleted`) })
      .catch(error => { console.log(error) });
  }

  // admin login
  const loginForm = document.getElementById("login-form");
  const adminPage = document.getElementById("column");

  function login() {
    const userName = document.getElementById("username").value;
    const passWord = document.getElementById("password").value;
    return fetch("http://localhost:4000/admins")
      .then(resp => resp.json())
      .then(admins => {
        const admin = admins.find(admin => admin.username === userName);
        if (admin && admin.password === passWord) {
          alert('Welcome Back, ' + userName + "!");
          loginForm.style.display = "none";
          adminPage.style.display = "flex";
        } else {
          alert('Intruder Alert!');
        }
      })
  }

  return (
    <>
      <header>
        <NavBar />
      </header>

      <div id="login-form">
        <label htmlFor="username">Username:
          <input required id="username" type="text" placeholder="Enter your username">
          </input>
        </label>
        <label htmlFor="password">Password:
          <input required id="password" type="password" placeholder="Enter your password">
          </input>
        </label>
        <button type="button" id="login-button" onClick={login}>Login</button>

      </div>
      <div id="column">
        <article id="left">
          <h1>Rack's Customers</h1>
          {racks.map(rack => (
            <article key={rack.id}>
              <p>Name: {rack.name}</p>
              <p>Time: {rack.time}</p>
              <p>Date: {rack.date}</p>
              <p>Service: {rack.service}</p>
              <p>Comment: {rack.comment}</p>
              <button type="button" id="check" onClick={() => onDeleteRack(rack.id)}>Check</button>
            </article>
          ))}
        </article>
        <article id="right">
          <h1>Racquet's Customers</h1>
          {racquets.map(racquet => (
            <article key={racquet.id}>
              <p>Name: {racquet.name}</p>
              <p>Time: {racquet.time}</p>
              <p>Date: {racquet.date}</p>
              <p>Service: {racquet.service}</p>
              <p>Comment: {racquet.comment}</p>
              <button type="button" id="check" onClick={() => onDeleteRacquet(racquet.id)}>Check</button>
            </article>
          ))}
        </article>
      </div>

    </>
  );
}
