import db from '../../models/index';
// import { User } from '../../models/index';
// import { Center } from '../../models/index';

module.exports = {
  /**
 * @swagger
 * definitions:
 *   CenterV2:
 *     properties:
 *       name:
 *         type: string
 *       detail:
 *         type: string
 *       image:
 *         type: integer
 *       address:
 *         type: string
 *       state:
 *         type: string
 *       projector:
 *         type: number
 *       chairs:
 *         type: number
 *       capacity:
 *         type: number
 */
  /**
* @swagger
* definitions:
*   InvalidCenterV2:
*     properties:
*       name:
*         type: undefined
*       detail:
*         type: undefined
*       image:
*         type: undefined
*       address:
*         type: undefined
*       state:
*         type: undefined
*       projector:
*         type: undefined
*       chairs:
*         type: undefined
*       capacity:
*         type: undefined
*/
  /**
 * @swagger
 * /api/v2/centers:
 *   post:
 *     tags:
 *       - V2 Centers
 *     description: Create a new center
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: A successful message
 *         schema:
 *           $ref: '#/definitions/CenterV2'
 *       400:
 *         description: Bad requests
 *         schema:
 *           $ref: '#definitions/InvalidCenter'
 *       403:
 *         description: User is not an admin
 *         schema:
 *           $ref: '#definitions/CenterV2'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#definitions/CenterV2'
 */
  /**/
  create(req, res) {
    db.User
      .findOne({
        where: { id: req.decoded.id }
      })
      .then((user) => {
        if (!user.isAdmin) {
          res.status(401).send({
            success: false,
            message: 'User is not an admin'
          });
        } else if (user.isAdmin) {
          db.Center
            .findOne({
              where: { name: req.body.name }
            })
            .then((center) => {
              if (center) {
                res.status(409).send({
                  success: false,
                  message: 'Center already exists'
                });
              } else if (!center) {
                db.Center
                  .create({
                    name: req.body.name,
                    detail: req.body.detail,
                    capacity: req.body.capacity,
                    address: req.body.address,
                    state: req.body.state,
                    userId: req.decoded.id
                  })
                  .then(() => {
                    res.status(201).send({
                      success: true,
                      message: 'Center created successfully'
                    });
                  })
                  .catch(() => res.status(400).send({
                    success: false,
                    message: 'Center not created'
                  }));
              }
            })
            .catch(() => {
              res.status(400).send({
                success: false,
                message: 'An error occured'
              });
            });
        }
      });
  },
  /**
  * @swagger
  * /api/v2/centers/:
  *   get:
  *     tags:
  *       - V2 Centers
  *     description: Get all centers
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: An array of centers
  *       404:
  *         description: Resource not found
  */
  /**/
  getSingleCenter(req, res) {
    db.Center
      .findOne({
        where: { id: parseInt(req.params.centerId, 10) }
      })
      .then((center) => {
        if (!center) {
          res.status(404).send({
            success: false,
            message: 'Center not found'
          });
        } else if (center) {
          res.status(200).send({
            success: true,
            center
          });
        }
      })
      .catch(() => res.status(400).send({
        success: false,
        message: 'An error occured'
      }));
  },
  /**
  * @swagger
  * /api/v2/centers/:id:
  *   get:
  *     tags:
  *       - V2 Centers
  *     description: Get a single center
  *     produces:
  *       - application/json
  *     responses:
  *       200:
  *         description: An object with a center in it
  *       404:
  *         description: Resource not found
  */
  /**/
  getAllCenters(req, res) {
    db.Center
      .findAll({})
      .then((centers) => {
        if (!centers) {
          res.status(404).send({
            success: false,
            message: 'There are no users yet'
          });
        } else if (centers) {
          res.status(200).send({
            success: true,
            centers
          });
        }
      })
      .catch(() => {
        res.status(400).send({
          success: false,
          message: 'An error occured'
        });
      });
  },
  /**
 * @swagger
 * /api/v2/centers/:centerId:
 *   put:
 *     tags:
 *       - V2 Centers
 *     description: Update center
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A successful message
 *         schema:
 *           $ref: '#/definitions/CenterV2'
 *       400:
 *         description: Bad requests
 *         schema:
 *           $ref: '#definitions/InvalidCenter'
 *       403:
 *         description: User is not an admin
 *         schema:
 *           $ref: '#definitions/CenterV2'
 *       404:
 *         description: Center not found
 *         schema:
 *           $ref: '#definitions/CenterV2'
 */
  /**/
  edit(req, res) {
    db.User
      .findOne({
        where: { id: req.decoded.id }
      })
      .then((user) => {
        if (!user.isAdmin) {
          res.status(401).send({
            success: false,
            message: 'User is not an admin'
          });
        } else if (user.isAdmin) {
          db.Center
            .findOne({
              where: { id: parseInt(req.params.centerId, 10) }
            })
            .then((center) => {
              if (!center) {
                res.status(404).send({
                  success: false,
                  message: 'Center not found'
                });
              } else if (center) {
                db.Center
                  .findOne({
                    where: { name: req.body.name }
                  })
                  .then((exists) => {
                    if (exists) {
                      res.status(409).send({
                        success: false,
                        message: 'Center name exists'
                      });
                    } else if (!exists) {
                      db.Center
                        .update({ name: req.body.name }, {
                          where: { id: parseInt(req.params.centerId, 10) }
                        })
                        .then(() => {
                          res.status(200).send({
                            success: true,
                            message: 'Center updated successfully'
                          });
                        })
                        .catch(() => {
                          res.status(400).send({
                            success: false,
                            message: 'An error occured in the centers update'
                          });
                        });
                    }
                  })
                  .catch(() => {
                    res.status(400).send({
                      success: false,
                      message: 'An error occured finding if a center exists'
                    });
                  });
              }
            })
            .catch(() => {
              res.status(400).send({
                success: false,
                message: 'An error occured in finding the center'
              });
            });
        }
      })
      .catch(() => {
        res.status(400).send({
          success: false,
          message: 'An error occured in finding users'
        });
      });
  }
};
