import { NearBindgen, near, call, view, LookupMap, UnorderedMap, Vector, UnorderedSet, assert } from "near-sdk-js";
import { UserAccount, STORAGE_COST } from "./model";

export function restoreOwners(collection) {
  if (collection == null) {
    return null;
  }
  return UnorderedSet.deserialize(collection as UnorderedSet);
}

@NearBindgen({})
class NewsletterContract {
  userAccounts: UnorderedMap = new UnorderedMap("user-accounts");

  @call
  register_user({ userAccount }: { userAccount: UserAccount }) {
    let user = this.userAccounts.get(userAccount.id);

    if (user !== null) {
      throw new Error(`User with ${userAccount.id} ID already exists`);
    }
    this.userAccounts.set(userAccount.id, new UserAccount(userAccount));

    return "Successfully Created User account";
  }

  @view
  get_user({ userId }: { userId: string }) {
    let user = this.userAccounts.get(userId);

    if (user === null) {
      return [];
    }

    return user;
  }

}

// near call dev-1664284823466-35028972601885 register_user '{"userAccount": {"id": "6", "userEmail": "tea1234@gmail.com"}}' --accountId=giftea.testnet
// near view dev-1664284823466-35028972601885 get_user '{"userId": "6"}'
