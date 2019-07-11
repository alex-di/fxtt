module.exports = {
  Unauthorized: {
    "code": "ERR_UNATHORIZED",
    "message": "No auth token provided"
  },
  TokenExpired: {
    "code": "ERR_AUTH_TOKEN_EXPIRED",
    "message": "Auth token expired"
  },
  ValidationError: {
    "code": "ERR_VALIDATION",
    "message": "Validation failed",
    "details": [
      {
        "message": "'amount' field is required",
        "path": ["amount"],
        "value": "null"
      }
    ],
  },
  CannotApprove: {
    "code": "ERR_CANNOT_APPROVE",
    "message": "Cannot approve a payment that has already been cancelled"
  },
  CannotCancel: {
    "code": "ERR_CANNOT_CANCEL",
    "message": "Cannot cancel a payment that has already been approved"
  }
}
