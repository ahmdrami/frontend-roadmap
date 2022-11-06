# Search posts

Create a search page to display posts based on the user input in the search box.

- There should be an input field that will take an `onChange` event. 
- When the user types anything, it should make a `GET` call and query `https://jsonplaceholder.typicode.com/posts?title=${query}` 
- If the API call returns an data then display it to the client.
- The `data` should be saved in a state and then `map` over in the JSX e.g. `data.map((item) => <div key={item.id}> {item.title} </div> )`
