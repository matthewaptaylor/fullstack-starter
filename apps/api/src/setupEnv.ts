import * as dotenv from 'dotenv';

const setupEnv = () => {
  dotenv.config({
    path:
      process.env.NODE_ENV === 'development'
        ? '.env.dev'
        : process.env.NODE_ENV === 'testing'
        ? '.env.test'
        : '.env.prod',
  });
  dotenv.config({ path: '.env' });

  process.env.SETUP_ENV_CALLED = 'true';
};

export default setupEnv;
