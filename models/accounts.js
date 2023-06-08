import { databases } from "~/utils/web-init";


export async function getAccountById(accountId) {
  try {
    const { data: account } = await databases.getDocument('accounts', accountId);
    return account;
  } catch (error) {
    console.error('Error retrieving account:', error);
    throw error;
  }
}

export async function updateAccountBalance(accountId, newBalance) {
  try {
    const { data: account } = await databases.updateDocument('accounts', accountId, {
      balance: newBalance,
    });
    return account;
  } catch (error) {
    console.error('Error updating account balance:', error);
    throw error;
  }
}

export async function createTransaction(accountId, amount, type) {
  try {
    const { data: transaction } = await databases.createDocument('transactions', {
      accountId,
      amount,
      type,
    });
    return transaction;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
}
