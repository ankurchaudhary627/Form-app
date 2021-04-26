import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import UserForm from './components/UserForm';
import FormsList from './components/FormsList';
import './App.css';

const App = () => {
  const [history, sethistory] = useState([]);
  const [id, setid] = useState(1);

  const handleChange = (id, history) => {
    sethistory(history);
    setid(id);
  };

  const redirect = () => {
    if (history) {
      if (id === 1) {
        history.push("/");
      } else if (id === 2) {
        history.push("/forms");
      }
    }
  };

  useEffect(() => {
    redirect();
  }, [id, history]);

  return (
    <BrowserRouter>
      <Route
        exact
        path="/"
        render={() => <UserForm onChange={handleChange} />}
      />
      <Route
        path="/forms"
        render={() => (
          <FormsList onChange={handleChange} />
        )}
      />
    </BrowserRouter>
  );
}

export default App;
