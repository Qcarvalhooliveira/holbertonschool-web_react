import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import Notifications from '../Notifications/Notifications';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import AppContext from './AppContext';
import { connect } from 'react-redux';
import { displayNotificationDrawer, hideNotificationDrawer, loginRequest, logout } from '../actions/uiActionCreators';
import { fetchNotifications } from '../actions/notificationActionCreators'; 

class App extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.props.fetchNotifications(); 
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      event.preventDefault();
      alert('Logging you out');
      this.props.logout();
    }
  };

  render() {
    const { listCourses, isLoggedIn, displayDrawer, displayNotificationDrawer, hideNotificationDrawer, loginRequest, logout } = this.props;
    const appStyle = displayDrawer ? styles.appHidden : styles.app;

    return (
      <AppContext.Provider value={{ user: { isLoggedIn }, logOut: logout }}>
        <div className={css(appStyle)}>
          <Notifications
            displayDrawer={displayDrawer}
            handleDisplayDrawer={displayNotificationDrawer}
            handleHideDrawer={hideNotificationDrawer}
          />
          <Header />
          <div className={css(styles.appBody)}>
            {isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList listCourses={listCourses} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login logIn={loginRequest} />
              </BodySectionWithMarginBottom>
            )}
            <BodySection title="News from the School">
              <p>Keep up to date with the latest news from our school by checking back here regularly for updates and announcements.</p>
            </BodySection>
          </div>
          <Footer />
        </div>
      </AppContext.Provider>
    );
  }
}

App.propTypes = {
  listCourses: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  displayDrawer: PropTypes.bool.isRequired,
  displayNotificationDrawer: PropTypes.func.isRequired,
  hideNotificationDrawer: PropTypes.func.isRequired,
  loginRequest: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  fetchNotifications: PropTypes.func.isRequired, 
};

export const mapStateToProps = (state) => ({
  listCourses: [ 
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 }
  ],
  isLoggedIn: state.getIn(['ui', 'isUserLoggedIn']), 
  displayDrawer: state.getIn(['ui', 'isNotificationDrawerVisible']),
});

const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
  logout,
  fetchNotifications, 
};

const styles = StyleSheet.create({
  app: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  appHidden: {
    display: 'none',
    '@media (min-width: 769px)': {
      display: 'block',
    },
  },
  appBody: {
    margin: '30px',
    width: '80%',
  },
});

export { App };
export default connect(mapStateToProps, mapDispatchToProps)(App);
