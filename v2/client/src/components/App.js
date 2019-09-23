import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
// PLEASE DO NOT PUT ANTD STYLING SHEET HERE AS OVERRIDES EXISTING STYLES
// import 'antd/dist/antd.css';
import styled from 'styled-components';
import moment from 'moment';

import { checkAuth } from '../actions/authAction';
import { checkBrowserWidth } from '../actions/checkBrowserWidth';

import { colors } from '../theme';

// PAGES
// import Login from './pages/auth/login';
import CreateSession from './pages/CreateSession';
import Login from './pages/Login/Login';
import ParticipantLogin from './pages/Login/LoginParticipant';
import UserDashboard from './pages/userDashboard';
import Dashboard from './pages/Dashboard';
import Home from './pages/LandingPage';
import SignUp from './pages/SignUp';
import UserResults from './pages/UserResults';
import AddTrainer from './pages/AddTrainer';
import Survey from './pages/survey/index';
import TrainerListPage from './pages/TrainerListPage';
import ViewSessions from './pages/ViewSessions';
import ParticipantBehavioral from './pages/ParticipantBehavioral';
import SessionDetails from './pages/SessionDetails';
import EditSession from './pages/SessionDetails/SessionActions/SessionEdit';
import SurveyResults from './pages/SurveyResults';
import ViewParticipant from './pages/ViewParticipant';
import ChangePassword from './pages/ChangePassword';
import ParticipantProgress from './pages/ParticipantProgress';
import Certificate from './pages/Certificate';
import AdminDemographic from './pages/AdminDemographic';
// import DecideView from './pages/DecideView';
import ThankYouPage from './pages/ThankYouPage';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ForgetPassword/ResetPassword';
import SessionsFiles from './pages/SessionsFiles';
import ConfirmRegistration from './pages/ConfirmRegistration';
import MyProfile from './pages/MyProfile';
import LocalLeadsAndManagersList from './pages/LocalLeadsAndManagersList';
import AboutUs from './pages/LandingPage/AboutUs';

// Error Pages
import NotFound from './pages/ErrorPages/404';
import ServerError from './pages/ErrorPages/500';
import Unauthorized from './pages/ErrorPages/403';

// COMPONENTS
import PrivateRoute from './common/PrivateRoute';
import Spin from './common/Spin';

// ROUTES
import {
  HOME_URL,
  DASHBOARD_URL,
  SURVEY_URL,
  LOGIN_URL,
  SIGN_UP_URL,
  TRAINERS_URL,
  TRAINER_RESULTS_URL,
  GROUP_RESULTS_URL,
  TRAINER_SESSIONS_URL,
  GROUP_SESSIONS_URL,
  SESSION_DETAILS_URL,
  FORGET_PASSWORD,
  TRAINER_VIEW_PARTICIPANT,
  MY_PROFILE_URL,
  MY_RESULTS_URL,
  ALL_RESULTS_URL,
  ALL_SESSIONS_URL,
  MY_SESSIONS_URL,
  ABOUT_URL,
  LOCAL_LEADS_AND_MANAGERS,
} from '../constants/navigationRoutes';

import history from '../history';

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${colors.offWhite};
`;

class App extends Component {
  state = {
    width: window.innerWidth,
  };

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentDidMount() {
    const {
      checkAuth: checkAuthActionCreator,
      checkBrowserWidth: checkBrowserWidthActionCreator,
    } = this.props;
    const { width } = this.state;
    const isMobile = width <= 500;
    const isDeskTop = width >= 500;

    const data = {
      width,
      isMobile,
      isDeskTop,
    };
    checkAuthActionCreator();
    checkBrowserWidthActionCreator(data);
  }

  componentDidUpdate() {
    const { checkBrowserWidth: checkBrowserWidthActionCreator } = this.props;

    const { width } = this.state;
    const isMobile = width <= 500;
    const isDeskTop = width >= 500;

    const data = {
      width,
      isMobile,
      isDeskTop,
    };

    checkBrowserWidthActionCreator(data);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { isAuthenticated, loaded, role } = this.props;
    return (
      <Wrapper id="wrapper">
        <Router history={history}>
          <Switch>
            <PrivateRoute
              exact
              path="/survey/:sessionId/:surveyType/results"
              Component={SurveyResults}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['trainer', 'admin', 'localLead']}
              role={role}
              navbar
            />
            <Route exact path="/" component={Home} />
            <Route exact path="/thank-you" component={ThankYouPage} />
            <Route
              exact
              path="/reset-password/:token"
              component={ResetPassword}
            />
            <PrivateRoute
              exact
              path={TRAINER_RESULTS_URL}
              Component={UserResults}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['trainer', 'admin', 'localLead']}
              role={role}
              navbar
            />
            <PrivateRoute
              exact
              path={MY_RESULTS_URL}
              Component={UserResults}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['trainer', 'admin', 'localLead']}
              role={role}
              navbar
            />
            <PrivateRoute
              exact
              path={ALL_RESULTS_URL}
              Component={UserResults}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin']}
              role={role}
              navbar
            />

            <PrivateRoute
              exact
              path={GROUP_RESULTS_URL}
              Component={UserResults}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead']}
              role={role}
              navbar
            />

            <Route exact path={HOME_URL} component={Home} />
            <PrivateRoute
              exact
              path="/add-trainer"
              Component={AddTrainer}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead', 'trainer']}
              role={role}
            />
            <PrivateRoute
              exact
              path={DASHBOARD_URL}
              Component={Dashboard}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead', 'trainer']}
              role={role}
              navbar
            />
            <PrivateRoute
              exact
              path="/change-password"
              Component={ChangePassword}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead', 'trainer']}
              role={role}
              navbar
            />
            <PrivateRoute
              exact
              path={TRAINERS_URL}
              Component={TrainerListPage}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead']}
              role={role}
              navbar
            />
            <PrivateRoute
              exact
              path={SESSION_DETAILS_URL}
              Component={SessionDetails}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead', 'trainer']}
              role={role}
              navbar
            />
            {/* <PrivateRoute
              exact
              path={DECIDE_VIEW_URL}
              Component={DecideView}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead']}
              role={role}
              navbar
            />
          */}
            <PrivateRoute
              exact
              path="/create-session"
              Component={CreateSession}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead', 'trainer']}
              role={role}
              navbar
            />
            <Route exact path={SURVEY_URL} component={Survey} />
            <PrivateRoute
              exact
              path="/session-edit/:id"
              Component={EditSession}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead', 'trainer']}
              role={role}
              navbar
            />
            <PrivateRoute
              path="/demographics"
              Component={AdminDemographic}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin']}
              role={role}
              navbar
            />

            <PrivateRoute
              path={MY_PROFILE_URL}
              Component={MyProfile}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['admin', 'localLead', 'trainer']}
              role={role}
              navbar
            />

            <PrivateRoute
              path={LOCAL_LEADS_AND_MANAGERS}
              Component={LocalLeadsAndManagersList}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
              allowedRoles={['trainer']}
              role={role}
              navbar
            />

            <Route
              exact
              path={LOGIN_URL}
              render={() => {
                if (loaded) {
                  return isAuthenticated ? (
                    <Redirect to={DASHBOARD_URL} />
                  ) : (
                    <Login />
                  );
                }
                return <Spin />;
              }}
            />
            <Route exact path={FORGET_PASSWORD} component={ForgetPassword} />
            <Route
              exact
              path={SIGN_UP_URL}
              render={() => {
                if (loaded) {
                  return isAuthenticated ? (
                    <Redirect to={DASHBOARD_URL} />
                  ) : (
                    <SignUp />
                  );
                }
                return <Spin />;
              }}
            />
            <Route
              exact
              path="/participant-login"
              render={props => {
                if (loaded) {
                  const { location } = props;
                  const { state } = location;

                  return isAuthenticated ||
                    (loaded && role === 'participant') ? (
                    <Redirect
                      to={{
                        pathname: '/participant-dashboard',
                        state,
                      }}
                    />
                  ) : (
                    <ParticipantLogin {...props} />
                  );
                }
                return <Spin />;
              }}
            />
            <PrivateRoute
              exact
              path="/participant-dashboard"
              Component={UserDashboard}
              loaded={loaded}
              isAuthenticated={isAuthenticated}
              allowedRoles={['participant']}
              role={role}
            />
            <PrivateRoute
              exact
              path="/participant/behavioral-insight"
              Component={ParticipantBehavioral}
              loaded={loaded}
              isAuthenticated={isAuthenticated}
              allowedRoles={['participant']}
              role={role}
              navbar
            />
            <PrivateRoute
              exact
              path="/participant/progress"
              Component={ParticipantProgress}
              loaded={loaded}
              isAuthenticated={isAuthenticated}
              allowedRoles={['participant']}
              role={role}
              navbar
            />
            <Route path="/certificate/:sessionId" component={Certificate} />

            <PrivateRoute
              exact
              path={ALL_SESSIONS_URL}
              Component={ViewSessions}
              loaded={loaded}
              isAuthenticated={isAuthenticated}
              allowedRoles={['trainer', 'localLead', 'admin']}
              role={role}
              navbar
            />
            <PrivateRoute
              exact
              path={MY_SESSIONS_URL}
              Component={ViewSessions}
              loaded={loaded}
              isAuthenticated={isAuthenticated}
              allowedRoles={['trainer', 'localLead', 'admin']}
              role={role}
              navbar
            />

            <PrivateRoute
              exact
              path={TRAINER_SESSIONS_URL}
              Component={ViewSessions}
              loaded={loaded}
              isAuthenticated={isAuthenticated}
              allowedRoles={['trainer', 'localLead', 'admin']}
              role={role}
              navbar
            />

            <PrivateRoute
              exact
              path={GROUP_SESSIONS_URL}
              Component={ViewSessions}
              loaded={loaded}
              isAuthenticated={isAuthenticated}
              allowedRoles={['localLead', 'admin']}
              role={role}
              navbar
            />
            <PrivateRoute
              exact
              path={TRAINER_VIEW_PARTICIPANT}
              Component={ViewParticipant}
              loaded={loaded}
              isAuthenticated={isAuthenticated}
              allowedRoles={['trainer', 'localLead', 'admin']}
              role={role}
              navbar
            />
            <PrivateRoute
              exact
              path="/sessions-files"
              loaded={loaded}
              isAuthenticated={isAuthenticated}
              Component={SessionsFiles}
              allowedRoles={['participant']}
              role={role}
              navbar
            />
            <Route
              exact
              path="/confirm/:shortId"
              component={ConfirmRegistration}
            />

            <Route exact path={ABOUT_URL} component={AboutUs} />

            <Route path="/404err" render={() => <NotFound />} />
            <Route path="/500err" render={() => <ServerError />} />
            <Route path="/unauthorized" render={() => <Unauthorized />} />
            <Route render={() => <NotFound />} />
          </Switch>
        </Router>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  id: state.auth.id,
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
  loaded: state.auth.loaded,
});

export default connect(
  mapStateToProps,
  {
    checkAuth,
    checkBrowserWidth,
  }
)(App);
