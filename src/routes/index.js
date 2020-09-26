const {
    Router
} = require('express');

const router = new Router();
router.get("/", (req, res) => {
  res.json({text: "INGRESAR /test o /api/videoClub"});
});
router.get('/test', (req, res) => {
    const data = {
        name: 'janet muñoz',
        proyect: 'TP 1 - PROGRAMACION DISTRIBUIDAS 2 - UNDAV'
    };
    res.json(data);
});

module.exports = router;