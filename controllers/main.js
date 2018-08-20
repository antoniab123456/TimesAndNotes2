
const main = {
    mainPageController: (req, res) => {
        res.render('index');
    },
    timerPageController: (req, res) => {
        res.render('timer');
    },
    timeDateController: (req, res) => {
        res.render('time_date');
    }
}

module.exports = main;