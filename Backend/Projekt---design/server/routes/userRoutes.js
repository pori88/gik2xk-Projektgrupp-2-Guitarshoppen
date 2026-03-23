const router = require('express').Router();                             // Detta är en router för användare i Express.
const userService = require('../services/userService');                 // Den använder userService för att hantera logik och databas.

router.get('/', (req, res) => {                                         // GET hämtar alla användare.
  userService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/:id', (req, res) => {                                      // GET med id hämtar en specifik användare.
  userService.getById(req.params.id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.post('/', (req, res) => {                                        // POST skapar en ny användare.
  userService.create(req.body).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.put('/:id', (req, res) => {                                      // PUT uppdaterar en användare.
  userService.update(req.params.id, req.body).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.delete('/:id', (req, res) => {                                   // DELETE tar bort en användare. (Vi använder den inte ännu, men vi kan göra det i framtiden!)
  userService.destroy(req.params.id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.post('/register', (req, res) => {                                // /register används för att registrera en ny användare.
  userService.register(req.body).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.post('/login', (req, res) => {                                   // /login används för att logga in en användare.
  userService.login(req.body).then((result) => {                        // Alla requests skickas till userService som returnerar status och data.
    res.status(result.status).json(result.data);                    
  });
});

module.exports = router;                                                // Routern exporteras så att den kan användas i appen.