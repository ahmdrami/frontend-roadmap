# Form renderer 

## Part 1

- Create a form renderer engine that will rely on a json schema to dynamically create different types of field. 
- Supported field types are `text, number, tel, email, password`.
- Each field should have a label.

### Example

Note: the below schema is just a basic example to start. 

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

Form renderer output
```html

<form>
  <input id="1" type="text"/>
  <input id="2" type="email"/>
</form>

```

### Tech

Use HTML/CSS/JS.


## Part 2

- Support more field types in the schema such as `textarea, select, checkbox, radio`.
- Fields like select, checkbox and radiobox will also require extra data to display options e.g. What is your gender? `Male, Female` or a Country selection dropdown.


```json
 [
  {
    "id": 1,
    "type": "select"
    "options": [
     {
      "id": 1,
      "label": "United Kingdon"
      "value": "GB"
     }
    ]
  },

  
 ]
 
```
## Part 3

- Fields should also be validated incase of an invalid data entered. Update the schema to support this feature. 
- Not every field will require validation e.g. first and last name are required but not middle name. Should be optional

```json
 [
  {
    "id": 1,
    "type": "text"
    "validations": [
     {
      "id": 1,
      "type": "pattern"
      "value": "/\w/"
     }
    ]
  },
  {
    "id": 2,
    "type": "email",
    "validations": [
     {
      "id": 1,
      "type": "required"
      "value": "true"
     }
    ]
  },
  
 ]
 ```
 
 ## Part 4
 
 - Make it functional by adding a submit button that will print all of the input values to the end user.
 
 
