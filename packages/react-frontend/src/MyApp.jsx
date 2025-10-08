import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const characterToDelete = characters[index];
    const id = characterToDelete.id;
    
    fetch(`http://localhost:8000/users/${id}`, {
      method: 'DELETE'
    })
    .then((response) => {
      if (response.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      } else if (response.status === 404) {
        throw new Error('User not found on server');
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    })
    .catch((error) => {
      console.log('Failed to delete user:', error);
    });
  }

  function updateList(person) { 
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error(`Unexpected status code: ${response.status}`);
        }
      })
      .then((newUser) => setCharacters([...characters, newUser]))
      .catch((error) => {
        console.log("Failed to add user:", error);
      })
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
