const express = require('express');
const router = express.Router();

const ensureAuth = require('../middleware/ensureAuth');

router.get('/', ensureAuth, (req, res)=>{
    res.status(200).json([
        {
            "name": "rumi",
            "partyId": 123
        },
        {
            "name": "pumi",
            "partyId": 123
        },
        {
            "name": "sumi",
            "partyId": 123
        }
    ])
});

module.exports = router;