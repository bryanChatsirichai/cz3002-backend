class LoginError extends Error {
  constructor(message, status) {
    super(message); // (1)
    this.status = status;
  }
}

module.exports = LoginError;
