# Form renderer 

## Part 1

Create a form renderer engine that will rely on some sort of a json schema to dynamically create different types of field. 
Supported field types are `text, number, tel, email, password`.

### Example

Note: the below schema is just a basic example or a starting point.

```json
 [
  {
    "id": 1,
    "type": "text"
  },
  {
    "id": 2,
    "type": "email"
  },
  
 ]
 
```

After passing the above schema to a function. It should output a form.

Form output
```html

<form>
  <input id="1" type="text"/>
  <input id="2" type="email"/>
</form>

```

### Tech

Use HTML/CSS/JS.


## Part 2

Support more field types in the schema such as `textarea, select, checkbox, radio`. Bare in mind, fields like select, checkbox and radiobox
will also require extra data to display various options e.g. What is your gender? `Male, Female`
