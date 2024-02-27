# Language Translator Server

This server provides endpoints for language translation services. Below are the available routes:

- **GET** `/api`
- **POST** `/api/translate`

## Route Details

### GET `/api`

This route returns information about the language translator server.

### POST `/api/translate`

This route translates text from English to French.

#### Request Body

```
{
    "text": "english text"
}
```

#### Response
```
{
    "translation": "equivalent fr translated text"
}
```

#### Example Request using cURL
```
curl --location 'https://lang-translator-cs1g.onrender.com/api/translate' \
--header 'Content-Type: application/json' \
--data ' {
    "text": "Hello, how are you?"
 }'
```

