In this approach I am using , NoSQL (MongoDB) and will be implemented using ExpressJS 

## FLOW
* Using `GET /questions` endpoint , we fetch all the questions and possible options in FE
* We display the questions one-by-one and store user response in local storage
* Using `POST /response` at the end of onboarding we send the responses mapped in an array against the questions back to the server
* On server-side we store the mapped responses and calculate the `sleep_efficiency` with our analytics and send it in response back to FE , which is then shown to user.

To implement the above approach we need the following NoSQL Database Schema (MongoDB):
  
1. **User Collection:**

```json

{

"_id": ObjectId("user_id"),
"nickname": "Udit", //(String)
"password" : "***", //(Hashed Password as String)
}

```

2. **Question Collection:**

```json
{
"_id": ObjectId("question_id"),
"question_text": "What is your sleep goal?", //(String)
"options": ["Sleep Easily" , "Sleep through the night" , "Wake up refreshed"],  //([String])
}

```
  

3. **UserResponses Collection:**

```json

{
"_id": ObjectId("response_id"),
"user_id": ObjectId("user_id"),
"question_id": ObjectId("question_id"),
"answer": "Sleep Easily" //(String)
}

```

  

### REST API Interaction Flows:

  

1. **User Registration:**

  

- **Endpoint:** `POST /users`

- **Request Body:**

```json

{
"username": "Udit",
"password": "***"
}

```

- **Response:**

```json
{
"_id": ObjectId("user_id"),
"username": "Udit"
}
```


2. **Retrieve Questions:**

- **Endpoint:** `GET /questions`

- **Response:**

```json

[

{
"_id": ObjectId("question_id"),
"question_text": "What is your sleep goal?",
"options": ["Sleep Easily" , "Sleep through the night" , "Wake up refreshed"]
},
{
// ...details of other questions
}

]

```

  

3. **Submit Answers:**

- **Endpoint:** `POST /response`

- **Request Body:**

```json
{

"user_id": ObjectId("user_id"),

"responses": [

{ "question_id": ObjectId("question_id"), "answer": "Sleep Easily" },
{// ...details of other questions and answers}

]

}

```

- **Response:**

```json

{

"user_id": ObjectId("user_id"),

"message": "Responses submitted successfully."
"sleep_efficiency" : 83 

}
```

In MongoDB, each document has a unique `_id` field, using these ids to reference other collections we will implement the following flow.

In this approach we have all responses mapped to each question thus when we apply the analytics , we will be able to get quick response for each question as the app functions on a privacy (nicknamed) system we organise our data according to questions.
