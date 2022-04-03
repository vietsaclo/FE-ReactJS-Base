const Apis = {
  API_HOST: process.env.REACT_APP_API_END_POINT,
  APP_HOST: process.env.REACT_APP_APP_HOST,
  NODE_ENV_PROD: String(process.env.REACT_APP_NODE_ENV).toLowerCase().trim() === 'prod',
}

export default Apis;
