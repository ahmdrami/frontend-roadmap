# Waitlist

Build a waitlist for a new product launch. Users should be able to signup and track their position on the list. 

- Create a basic form with name, email and a check box for terms and condition.
- All of the fields are required. 
- Form shouldnt be submittable if any of the field is empty.
- On a new signup, a user should be given a position number. The position should be total users + 1.
- Save the data in the memory when the form is submitted. An example is provided below.

```js
const waitlist = [
  {
    id: 1,
    name: 'Jon',
    email: 'jon.doe@example.com',
    position: 1
  }
]
```

## Part 2

Install JSON Server

```bash
npm install -g json-server

```

Create a db.json file with some data

```json
{
  "users": [
    { "id": 1, "name": "user 1", "email": "user1@example" }
  ]
}
```

## Start JSON Server

Run this in a terminal.

```bash
json-server --watch db.json

```

Now if you go to `http://localhost:3000/users/1` you'll get

```
{ "id": 1, "name": "user 1", "email": "user1@example" }
```

Once the server is up and running. Your task is to save new signups using the new endpoint `http://localhost:3000/users`

Use `fetch` to make a `POST` call with the body. Verify the new signup once the call is successful by visiting `http://localhost:3000/users` in the browser.

Example of making a `POST` call

```js
const data = { username: 'example' };

fetch('http://localhost:3000/users', {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})

```
