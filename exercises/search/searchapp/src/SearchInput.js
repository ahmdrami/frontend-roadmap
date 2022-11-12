import React from "react";

const styles = {
  width: "100%",
  display: "block",
  margin: "0 auto",
  border: "1px solid #ccc",
  padding: "0.8rem",
  borderRadius: "4px",
  background: "#eee",
};

const SearchInput = () => {
  const [json, setJson] = React.useState(null);
  const [results, setResults] = React.useState(null);

  React.useEffect(() => {
    try {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((r) => r.json())
        .then((json) => setJson(json));
    } catch (error) {
      console.error(error);
    }
  });

  const handleChange = ({ target }) => {
    let word = `${target.value ? target.value.trim() : ""}`;
    const regex = new RegExp(word);
    setResults(
      json.filter((item) => {
        return regex.test(item.title);
      }),
    );
  };

  return (
    <>
      <input
        type="search"
        name="search"
        style={styles}
        placeholder="search posts"
        onChange={handleChange}
      />
      {results
        ? results.map((item) => (
            <div key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </div>
          ))
        : results}
    </>
  );
};

export default SearchInput;
