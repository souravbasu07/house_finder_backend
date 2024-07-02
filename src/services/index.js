import demo from './demo/demo';
import user from './user/user';
import listings from './listings/listings';

export const services = (app) => {
  app.configure(demo);
  app.configure(user);
  app.configure(listings);
};
