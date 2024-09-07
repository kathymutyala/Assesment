const express = require('express');
const axios = require('axios');
const db = require('../db');
const router = express.Router();

const FRESHSALES_API_KEY = process.env.FRESHSALES_API_KEY;
const FRESHSALES_DOMAIN = process.env.FRESHSALES_DOMAIN;


// Create Contact
router.post('/createContact', async (req, res) => {
    const { first_name, last_name, email, mobile_number, data_store } = req.body;

    if (data_store === 'DATABASE') {
        const query = 'INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES (?, ?, ?, ?)';
        db.query(query, [first_name, last_name, email, mobile_number], (err, results) => {
            if (err) throw err;
            res.json({ id: results.insertId, first_name, last_name, email, mobile_number });
        });
    } else if (data_store === 'CRM') {

        try {
            const response = await axios.post(`${FRESHSALES_DOMAIN}contacts`, {
                contact: {
                    first_name,
                    last_name,
                    email,
                    mobile_number
                }
            }, {
                headers: {
                    'Authorization': `Token token=${FRESHSALES_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            res.json(response.data);
        } catch (err) {
            //console.error('Error details:', err.response ? err.response.data : err.message);
            res.status(500).json({ error: 'Failed to Create CRM', details: err.response ? err.response.data : err.message });
        }
    } else {
        res.status(400).json({ error: 'Invalid data_store value' });
    }
});

//Get Contact

router.get('/getContact', (req, res) => {
    const { contact_id, data_store} = req.query;

    if (data_store === 'DATABASE') {
        const query = 'SELECT * FROM contacts WHERE id = ?';
        db.query(query, [contact_id], (err, results) => {
            if (err) throw err;
            if (results.length > 0) {

                res.json(results[0]);

            } else {

                res.status(404).json({ error: 'Contact not found' });

            } 
        });
    } else if (data_store === 'CRM') {
        axios.get(`${FRESHSALES_BASE_URL}contacts/${contact_id}`, {
            headers : {
                'Authorization' : `Token token=${FRESHSALES_API_KEY}`
            }
        })
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Failed to retrieve contact from CRM' }));

    } else {
        res.status(400).json({ error: 'Invalid data_store value' });
    }
});

//Update Contact

router.post('/updateContact', (req, res) => {
    const { contact_id, new_email, new_mobile_number, data_store} = req.body;

    if (data_store === 'DATABASE') {
        const query = 'UPDATE contacts SET email = ?, mobile_number = ? WHERE id = ?';
        db.query(query, [new_email, new_mobile_number, contact_id], (err, results) => {
            if (err) throw err;
            if (results.affectedRows > 0) {
                res.json({ message: 'Contact updated successfully' });
            } else {
                res.status(404).json({ error: 'Contact not found' });
            } 

        });
    } else if(data_store === 'CRM') {
        axios.put(`${FRESHSALES_BASE_URL}contacts/${contact_id}`, {
            contact: {
                email: new_email,
                mobile_number: new_mobile_number
            },
            
        },{
            headers: {
                'Authorization': `Token token=${FRESHSALES_API_KEY}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Failed to update contact in CRM' }));

    } else {
        res.status(400).json({ error: 'Invalid data_store value' });
    }
});

//Delete contact

router.post('/deleteContact', (req, res) => {
    const { contact_id, data_store } = req.body;

    if (data_store === 'DATABASE') {
        const query = 'DELETE FROM contacts WHERE id = ?';
        db.query(query, [contact_id], (err, results) => {
            if (err) throw err;
            if (results.affectedRows > 0) {
                res.json({ message: 'Contact deleted successfully' });
            } else {
                res.status(404).json({ error: 'Contact not found' });
            }
        });
    } else if (data_store === 'CRM') {
        axios.delete(`{FRESHSALES_BASE_URL}contacts/${contact_id}`, {
            headers: {
                'Authorization': `Token token=${FRESHSALES_API_KEY}`
            }
        }).then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: 'Failed to Delete contact in CRM' }));

    } else {
        res.status(400).json({ error: 'Invalid data_store value' });
    }
});

module.exports = router;
