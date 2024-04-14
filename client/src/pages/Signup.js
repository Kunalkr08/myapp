
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);

  const submitForm = async () => {
    const Url = "https://myapp-six-azure.vercel.app/signup"; // Assuming your server listens on /api/signup
    try {
      const response = await fetch(Url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setRedirect(true);
        const data = await response.json();
        alert("Signup successful");
        console.log("Signup successful:", data);
      } else {
        console.error("Signup failed:", response.status, response.statusText);
      }
    } catch (error) {
      alert("Password not found Try another password")
      console.error("Error during signup:", error);
    }
  };

  if(redirect){
    return <Navigate to={'/login'} />
  }

  return (
    <form className='signup' onSubmit={(e) => { submitForm(); e.preventDefault(); }}>
      <h1>SignUp</h1>
      <input
        type="text"
        placeholder='username'
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder='password'
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button type="submit">Signup</button>
    </form>
  );
}
