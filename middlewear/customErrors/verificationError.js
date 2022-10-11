class VerificationError extends Error {
  constructor(message, status) {
    super(message); // (1)
    this.status = status;
  }
}

module.exports = VerificationError;
