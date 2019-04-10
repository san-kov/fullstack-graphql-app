/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register {
  __typename: "User";
  id: string;
  email: string;
  username: string;
}

export interface Register {
  register: Register_register;
}

export interface RegisterVariables {
  email: string;
  username: string;
  password: string;
}
