# NEAR Newsletter

The smart contract currently has two methods: register_user &  get_user

```ts
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
```

<br />

# Quickstart

1. Make sure you have installed [node.js](https://nodejs.org/en/download/package-manager/) >= 16.
2. Install the [`NEAR CLI`](https://github.com/near/near-cli#setup)

<br />

## 1. Build and Deploy the Contract
You can automatically compile and deploy the contract in the NEAR testnet by running:

```bash
npm run deploy
```

Once finished, check the `neardev/dev-account` file to find the address in which the contract was deployed:

```bash
cat ./neardev/dev-account
# e.g. dev-1659899566943-21539992274727
```

<br />

## 2. Register a new User
`register_user` changes the contract's state, for which it is a `call` method.
This function creates a new User.

`Call` methods can only be invoked using a NEAR account, since the account needs to pay GAS for the transaction.

```bash
# Use near-cli to set a new greeting
near call <dev-account> register_user '{"userAccount": {"id": "6098", "userEmail": "tea1234765@gmail.com"}}' --accountId <dev-account>
```
Example:
```
near call dev-1664284823466-35028972601885 register_user '{"userAccount": {"id": "6098", "userEmail": "tea1234@gmail.com"}}' --accountId=giftea.testnet
```

**Tip:** If you would like to call `register_user` using your own account, first login into NEAR using:

```bash
# Use near-cli to login your NEAR account
near login
```

and then use the logged account to sign the transaction: `--accountId <your-account>`.

<br />

## 3. Retrieve User

`get_user` is a read-only method (aka `view` method).

`View` methods can be called for **free** by anyone, even people **without a NEAR account**!

```bash
# Use near-cli to get the greeting
near view <dev-account> get_user
```

Example:
```
near view dev-1664284823466-35028972601885 get_user '{"userId": "6098"}'
```