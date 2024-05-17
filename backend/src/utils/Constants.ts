export enum Status {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
}

export enum ErrorMessages {
  PASSWORD_RULES = 'The password must contain at least one digit, one lowercase letter,one uppercase letter, one special character and no whitespace.',
}

export enum Exceptions {
  INCORRECT_CREDENTIALS = 'Incorrect username or password!',
  USERNAME_UNAVAILABLE = 'Username already taken!',
}
