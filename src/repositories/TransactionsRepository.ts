import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const balance = this.transactions.reduce((acc: Balance, curr: Transaction) => {
      if (curr.type == 'income') {
        acc.income += curr.value;
      } else {
        acc.outcome += curr.value;
      }
      acc.total = acc.income - acc.outcome;

      return acc;
    }, {
      income: 0,
      outcome: 0,
      total: 0
    });
    
    return balance;
  }

  public create({ title, value, type }:CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
