import { NearBindgen, call, view, UnorderedMap } from "near-sdk-js";
import { UserAccount } from "./model";

/*
NearBindgen({}), call & view are decorators from the near-sdk
- `NearBindgen({})` is used to serialize a custom class before storing it on the blockchain.
*/
@NearBindgen({})
class NewsletterContract {
  userAccounts: UnorderedMap = new UnorderedMap("user-accounts"); // create collection for user account

  // - `call` is used to declare that a function is a near-call func | a call func is a function that can modify the data on the blockchain
  @call
  register_user({ userAccount }: { userAccount: UserAccount }) {
    // This func takes a user's details and creates an account

    let user = this.userAccounts.get(userAccount.id); // retrieve user using userId and check if user with that ID exists

    if (user !== null) {
      // If user already exists, throw an error
      throw new Error(`User with ${userAccount.id} ID already exists`);
    }
    this.userAccounts.set(userAccount.id, new UserAccount(userAccount)); // create a new user and add to collection

    return "Successfully Created User account";
  }

  // - `view` is used to declare that a function is a near-view func | a view func only read data from the blockchain without any modification
  @view
  get_user({ userId }: { userId: string }) {
    // This func takes in a user Id and fetches the user with corresponding ID
    let user = this.userAccounts.get(userId); // fetch user

    if (user === null) {
      // if user with provided ID doesn't exist, return null
      return [];
    }
    return user;
  }
}

