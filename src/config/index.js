const PROD_PEER_HOST = 'funtime-peerserver.herokuapp.com';
const PROD_PEER_PORT = 443;

// const DEV_PEER_HOST = 'localhost';
// const DEV_PEER_PORT = 3001;

const DEV_PEER_HOST = 'funtime-peerserver.herokuapp.com';
const DEV_PEER_PORT = 443;

const PROD_SERVER_HOST = "funtime-server.herokuapp.com";
const DEV_SERVER_HOST = "funtime-server.herokuapp.com";
// const DEV_SERVER_HOST = "localhost:9000";

const PRODUCTION = process.env.NODE_ENV === 'production';

export const PEER_HOST = PRODUCTION ? PROD_PEER_HOST : DEV_PEER_HOST;
export const PEER_PORT = PRODUCTION ? PROD_PEER_PORT : DEV_PEER_PORT;
export const SERVER_HOST = PRODUCTION ? PROD_SERVER_HOST : DEV_SERVER_HOST;