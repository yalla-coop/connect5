export const HOME_URL = '/';
export const LOGIN_URL = '/login';
export const SIGN_UP_URL = '/signup';
export const PARTICIPANT_LOGIN = '/participant-login';

// ALL
export const DASHBOARD_URL = '/dashboard';
export const ADD_SESSION_URL = '/create-session';
export const SURVEY_URL = '/survey/:id';
export const SESSION_DETAILS_URL = '/session-details/:id';
export const MY_PROFILE_URL = '/my-profile';
export const MY_RESULTS_URL = '/my-results';
export const MY_SESSIONS_URL = '/my-sessions';
export const ALL_SESSIONS_URL = '/all-sessions';
export const ABOUT_URL = '/about';

// trainer
export const TRAINER_RESULTS_URL = '/trainer-results/:trainerId?';
export const TRAINER_SESSIONS_URL = '/trainer-sessions/trainerId?';
export const TRAINER_FEEDBACK_URL = '/feedback';
export const TRAINER_VIEW_PARTICIPANT = '/participant/:PIN';
export const TRAINER_MANAGERS_GROUPS = '/trainer-managers-groups';
export const REMOVE_TRAINER_FROM_GROUP = '/remove/:localLead/:trainer';

// local lead & admin
// for menu & navbar
export const MY_GROUP_RESULTS_URL = '/group-results';
export const MY_GROUP_SESSIONS_URL = '/group-sessions';
// for App react router
export const GROUP_RESULTS_URL = `${MY_GROUP_RESULTS_URL}/:localLeadId?`;
export const GROUP_SESSIONS_URL = `${MY_GROUP_SESSIONS_URL}/:localLeadId?`;
export const TRAINERS_URL = '/trainers';
export const ADD_TRAINER_URL = '/add-trainer';
// export const DECIDE_VIEW_URL = '/welcome-back';

// local lead
export const LOCAL_LEAD_SESSIONS_URL = '/localLead-sessions';

// admin
export const DEMOGRAPHICS_URL = '/demographics';
export const ALL_RESULTS_URL = '/all-results';

// user
export const USER_INSIGHTS = '/my-insights';
export const USER_PROGRESS = '/my-progress';
export const USER_LOGIN = '/user-login';
export const USER_DASHBOARD = '/my-dashboard';
export const FORGET_PASSWORD = '/forget-password';
export const PARTICIPANT_DASHBOARD = '/participant-dashboard';
export const PARTICIPANT_SESSIONS_LIST = '/participant-sessions-list';
