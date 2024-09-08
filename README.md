# Interactly

Interactly is a Node.js-based project that provides a set of API endpoints for managing contacts and integrating with the Twilio service for IVR (Interactive Voice Response) calls. The system supports CRUD operations for contacts stored in a CRM and Twilio call handling.

## Features

- Create, retrieve, update, and delete contacts in a CRM system.
- Integrate with Twilio to make IVR calls and handle user input during calls.

## Installation

To install the dependencies, run:

```bash
npm install
```

## Usage

To start the server, run:

```bash
npm start
```

Ensure you have all the necessary environment variables set for CRM and Twilio integration, such as API keys, tokens, etc.


## API Endpoints

### 1. Create a Contact
This API creates a new contact in the CRM.

#### Endpoint:
`POST /createContact`

#### Request:
```bash
curl --location 'http://localhost:3000/createContact' \
--header 'Authorization: nmTrepcYkW6IHGcjVvg2gQ' \
--header 'Content-Type: application/json' \
--data-raw '{
    "first_name": "Nirmaa",
    "last_name": "Joshai",
    "email": "NirmaaJoshi@gmail.com",
    "mobile_number":"9553146702",
    "data_store": "CRM"
}'
```

### 2. Get a Contact
This API retrieves a contact by their ID from the CRM.

#### Endpoint:
`GET /getContact`

#### Request:
```bash
curl --location 'http://localhost:3000/getContact?contact_id=402096948363&data_store=CRM'
```

### 3. Update a Contact
This API updates the contact details, such as email and mobile number.

#### Endpoint:
`POST /updateContact`

#### Request:
```bash
curl --location 'http://localhost:3000/updateContact' \
--header 'Content-Type: application/json' \
--data-raw '{
    "contact_id": 402096948363, 
    "new_email": "neveiy@example.com",
    "new_mobile_number": "1234337890",
    "data_store": "CRM"
}'
```

### 4. Delete a Contact
This API deletes a contact by their ID from the CRM.

#### Endpoint:
`POST /deleteContact`

#### Request:
```bash
curl --location 'http://localhost:3000/deleteContact' \
--header 'Content-Type: application/json' \
--data '{
    "contact_id": 402096948363,
    "data_store": "CRM"
}'
```

### 5. Make a Twilio IVR Call
This API initiates a call using Twilio.

#### Endpoint:
`POST /twilio/makeCall`

#### Request:
```bash
curl --location 'http://localhost:3000/twilio/makeCall'
```

### 6. Handle Twilio IVR Interaction
This API handles the IVR interaction and gathers input from the user during a call.

#### Endpoint:
`POST /twilio/ivr`

#### Request:
```bash
curl --location --request POST 'http://localhost:3000/twilio/ivr'
```

### 7. Gather User Input (Twilio)
This API gathers user input (like pressing a digit) during the IVR call.

#### Endpoint:
`POST /twilio/gather`

#### Request:
```bash
curl --location 'http://localhost:3000/twilio/gather' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'Digits=1'
```



