import { near } from "near-sdk-js";

export const STORAGE_COST: bigint = BigInt("1000000000000000000000");

export class UserAccount {
  id: string;
  userEmail: string;
  audience: string[];
  accountCreator: string;

  constructor(payload: UserAccount) {
    this.id = payload.id;
    this.userEmail = payload.userEmail;
    this.audience = [];
    this.accountCreator = near.signerAccountId();
  }
}
