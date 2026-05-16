import { useEffect, useState } from "react";
import { db } from "./db";
import type { Note } from "./db";

function App() {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  async function loadNotes() {
    const allNotes = await db.notes.toArray();
    setNotes(allNotes);
  }

  async function addNote() {
    if (!input.trim()) return;

    await db.notes.add({
      text: input,
    });

    setInput("");
    loadNotes();
  }

  useEffect(() => {
    async function fetchNotes() {
      const allNotes = await db.notes.toArray();
      setNotes(allNotes);
    }

    fetchNotes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gym Tracker Test</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Text eingeben"
      />

      <button onClick={addNote}>
        Speichern
      </button>

      <hr />

      {notes.map((note) => (
        <div key={note.id}>
          {note.text}
        </div>
      ))}
    </div>
  );
}

export default App;