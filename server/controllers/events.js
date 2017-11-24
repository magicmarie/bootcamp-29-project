const events = [
  {
    id: '1',
    name: 'kachi\'s event',
    date: '2011-11-11',
    time: '08:00',
    centerId: '1'
  },
  {
    id: '2',
    name: 'kachi\'s second event',
    date: '2011-11-11',
    time: '08:00',
    centerId: '3'
  },
  {
    id: '3',
    name: 'kachi\'s event',
    date: '2011-11-11',
    time: '08:00',
    centerId: '2'
  }
];
const newEvents = [];

module.exports = {
  create(req, res) {
    if (req.body.name === undefined || req.body.date === undefined || req.body.time === undefined
      || req.body.centerId === undefined) {
      res.status(400).send({
        message: 'Bad Request'
      });
    } else {
      newEvents.push(req.body);
      res.status(201).send({
        message: 'Created successfully'
      });
    }
  },
  edit(req, res) {
    const event = events.find(anEvent => anEvent.id === req.params.eventId);
    if (event === undefined) {
      res.status(404).send('Resource not found');
    } else if (req.body.name === undefined || req.body.date === undefined
      || req.body.time === undefined || req.body.centerId === undefined) {
      res.status(400).send('Bad request');
    } else {
      event.name = req.body.name;
      res.status(200).send({
        message: 'Resource updated successfully',
        data: event
      });
    }
  },
  delete(req, res) {
    const event = events.find(anEvent => anEvent.id === req.params.eventId);
    if (event === undefined) {
      res.status(404).send({
        message: 'Resource not found'
      });
    } else {
      const eventId = events.findIndex(anEvent => anEvent.id === req.params.eventId);
      events.splice(eventId, 1);
      res.status(200).send({
        message: 'Resource deleted successfully'
      });
    }
  }
};
