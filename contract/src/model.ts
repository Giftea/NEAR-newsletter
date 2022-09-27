import { near } from "near-sdk-js";

// Model of a user account
export class UserAccount {
  id: string; // user ID
  userEmail: string; // user Email
  audience: string[]; // an array of newsletter subscribers
  accountCreator: string; // user identity

  constructor(payload: UserAccount) {
    this.id = payload.id;
    this.userEmail = payload.userEmail;
    this.audience = []; // initialize empty array
    this.accountCreator = near.signerAccountId();
  }
}
