import React, { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  };
  const fetchIndexes = async () => {
    const test = await axios.get("/api/values/all");
    console.log("test.data", test.data);
    setSeenIndexes(test.data);
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entry = [];
    for (let key in values) {
      entry.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }
    return entry;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/values", {
        index: index,
      })
      .then((res) => {
        setIndex("");
        fetchValues();
        fetchIndexes();
      })
      .catch((err) => {
        setIndex("");
        alert(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter the index</label>
        <input
          // style={margin-left:10px; margin-right:10px}
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen</h3>
      {renderSeenIndexes()}
      <h3>Calculated Values</h3>
      {renderValues()}
    </div>
  );
};
