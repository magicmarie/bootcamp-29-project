import expressJoi from 'express-joi-validator';
import centerSchema from '../validators/centerValidator';
import centerWithIdSchema from '../validators/centerWithIdValidator';

const eventsController = require('../controllers').events;
const centersController = require('../controllers').centers;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Event Manager App'
  }));

  app.post('/events', eventsController.create);
  app.delete('/events', eventsController.delete);
  app.get('/events/:eventId');
  app.put('/events/:eventId', eventsController.edit);

  app.post('/centers', expressJoi(centerSchema), centersController.create);
  app.put('/centers/:centerId', expressJoi(centerWithIdSchema), centersController.edit);
  app.delete('/centers/:centerId', expressJoi(centerWithIdSchema), centersController.delete);
  // error handler
  app.use((err, req, res, next) => {
    if (err.isBoom) {
      return res.status(err.output.statusCode).json(err.output.payload);
    }
  });
};
