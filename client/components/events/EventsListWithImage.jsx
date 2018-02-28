import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as styles from '../../css/events.module.css';
import owenShaw from '../../img/owen shaw.jpg';

const EventsListWithImage = ({ events, isAdmin }) => (
  <div>
    {events.map(event => (
      <div className="col s12 m6 l4" key={event.id}>
        <div className="card">
          <div className="card-image">
            <Link to={`/events/${event.id}`}><img src={owenShaw} alt="" /></Link>
          </div>
          <div className="card-content">
            <span className={styles['event-focus']}><Link to={`/events/${event.id}`}>{event.name}</Link></span><br />
            <span
              className={styles['event-title']}
            >
              <a href="show-event.html">{event.detail}</a>
            </span><br />
            <span className={styles['event-date']}>{moment(event.date).format('LL')}</span><br />
            <span className={styles['fifteen-percent']}>{moment(event.date).format('LT')}</span>
          </div>
          <div className="card-action">
            <Link
              to={`/events/${event.id}`}
              className="waves-effect waves-light btn navbar-purple round-btn white-color"
              href="show-event.html"
            >
              View
            </Link>
            { isAdmin ? (
              <Link
                to={`/events/${event.id}/edit`}
                className="waves-effect waves-light btn navbar-purple round-btn white-color"
              >
                <i className="material-icons">edit</i>
              </Link>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </div>
        </div>
      </div>
  ))}
  </div>
);
EventsListWithImage.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAdmin: PropTypes.bool.isRequired
};
export default EventsListWithImage;
