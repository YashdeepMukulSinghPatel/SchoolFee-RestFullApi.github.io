const express = require('express');
const router = express.Router();

const optionsApi = require('../../../controllers/api/v1/options_api');

router.post('/:id/Fee', optionsApi.Fee);
router.delete('/:id/delete', optionsApi.deleteOption);
router.get('/:id', optionsApi.viewOptions);
module.exports = router;