import { auth, checkRole } from '../middlewares';
import { changePassword, getAll, login, logout, me, register, remove, sendRecoveryCode, updateOwn, updateUser, userProfile, verifyEmail, verifyRecoveryEmail } from './user.entity';

export default function user() {

  /**
  * POST /user
  * @description This route is used to create a user.
  * @response {Object} 200 - the new user.
  */
  this.route.post('/user/register', register(this));

  /**
  * POST /user/login
  * @description this route is used to login a user.
  * @response {Object} 200 - the user.
  */
  this.route.post('/user/login', login(this));

  /**
  * GET /user/me
  * @description this route is used to get user profile.
  * @response {Object} 200 - the user.
  */
  this.route.get('/user/me', auth, me(this));

  /**
  * POST /user/logout
  * @description this route is used to logout a user.
  * @response {Object} 200 - the user.
  */
  this.route.post('/user/logout', auth, logout(this));

  /**
  * GET /user
  * @description this route is used to used get all user.
  * @response {Object} 200 - the users.
  */
  this.route.get('/user', auth, getAll(this));

  /**
  * GET user/profile/:id
  * @description this route is used to get a user profile by id.
  * @response {Object} 200 - the user.
  */
  this.route.get('/user/profile/:id', auth, userProfile(this));

  /**
  * PATCH ‘/user/me’
  * @description this route is used to update own profile.
  * @response {Object} 200 - the user.
  */
  this.route.patch('/user/me', auth, updateOwn(this));

  /**
  * PATCH ‘/user/:id’
  * @description this route is used to update user profile.
  * @response {Object} 200 - the user.
  */
  this.route.patch('/user/:id', auth, checkRole(['admin']), updateUser(this));


  // Verify new Email
  this.route.post('/user/verify', verifyEmail(this));


  // Send Recovery Code
  this.route.post('/user/sendOtp', sendRecoveryCode(this));


  // Verify recovery email
  this.route.post('/user/verifyRecoveryEmail', verifyRecoveryEmail(this));


  // Change Password
  this.route.post('/user/changePassword', changePassword(this));

  /**
* DELETE ‘/user/:id’
* @description this route is used to delte user profile.
* @response {Object} 200 - the user.
*/
  this.route.delete('/user/removeAccount', auth, checkRole(['user', 'admin', 'super-admin']), remove(this));
}