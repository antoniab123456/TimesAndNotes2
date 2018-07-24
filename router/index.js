let express = require('express');
    router = express.Router(),
    main = require('../controllers/main')

router.get('/', main.mainPageController);
router.get('/timer', main.timerPageController);
router.get('/time&date', main.timeDateController);
router.get('/weather', main.weatherController);

module.exports = router;