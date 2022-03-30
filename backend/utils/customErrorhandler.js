class customErrorhandler extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
    Error.captureStackTrace(this, this.constructor);
  }
  // product not found
  static notFound(message) {
    return new customErrorhandler(404, message);
  }
  static badUser(message) {
    return new customErrorhandler(400, message);
  }
  static unauthenticate(message) {
    return new customErrorhandler(401, message);
  }
  static notAdmin(message) {
    return new customErrorhandler(403, message);
  }
  //password reset email error
  static emailSentError(message) {
    return new customErrorhandler(403, message);
  }
  //user not found
  static usernotfound(message) {
    return new customErrorhandler(404, message);
  }
}
module.exports = customErrorhandler;