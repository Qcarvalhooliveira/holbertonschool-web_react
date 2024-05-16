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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCourses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
      ],
      listNotifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } }
      ],
      displayDrawer: false,
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
  
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this); 
    
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.ctrlKey && event.key === 'h') {
      event.preventDefault();
      alert('Logging you out');
      this.logOut();
    }
  }
  handleDisplayDrawer() {
    this.setState({ displayDrawer: true });
  }

  handleHideDrawer() {
    this.setState({ displayDrawer: false });
  }

  logOut() {
    this.setState({
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
    });
  }
  logIn(email, password) {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    });
  }
  

  render() {
    const { listCourses, listNotifications, displayDrawer, user } = this.state;
    const appStyle = displayDrawer ? styles.appHidden : styles.app;

    return (
      <AppContext.Provider value={{ user, logOut: this.logOut }}>
        <div className={css(appStyle)}>
          <Notifications 
            listNotifications={listNotifications} 
            displayDrawer={displayDrawer} 
            handleDisplayDrawer={this.handleDisplayDrawer} 
            handleHideDrawer={this.handleHideDrawer} 
          />
          <Header />
          <div className={css(styles.appBody)}>
          {user.isLoggedIn ? (
  <BodySectionWithMarginBottom title="Course list">
    <CourseList listCourses={listCourses} />
  </BodySectionWithMarginBottom>
) : (
  <BodySectionWithMarginBottom title="Log in to continue">
    <Login logIn={this.logIn} />
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

};

App.defaultProps = {

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

export default App;