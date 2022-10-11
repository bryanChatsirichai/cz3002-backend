class RegisterError extends Error {
  constructor(message) {
    super(message); // (1)
  }
}

module.exports = RegisterError;
