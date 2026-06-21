import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    type: "Expense",
    category: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addTransaction = (e) => {
    e.preventDefault();

    if (
      !formData.category ||
      !formData.amount ||
      !formData.description
    )
      return;

    const newTransaction = {
      id: Date.now(),
      ...formData,
      amount: Number(formData.amount),
    };

    setTransactions([...transactions, newTransaction]);

    setFormData({
      type: "Expense",
      category: "",
      amount: "",
      description: "",
    });
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((item) => item.id !== id)
    );
  };

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expense;

  const categorySummary = {};

  transactions.forEach((item) => {
    if (item.type === "Expense") {
      categorySummary[item.category] =
        (categorySummary[item.category] || 0) +
        item.amount;
    }
  });

  return (
    <div className="container">
      <h1>💰 Daily Expense Analytics Dashboard</h1>

      <form onSubmit={addTransaction} className="form">
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">
          Add Transaction
        </button>
      </form>

      <div className="cards">
        <div className="card">
          <h3>Total Income</h3>
          <p>₹{income}</p>
        </div>

        <div className="card">
          <h3>Total Expense</h3>
          <p>₹{expense}</p>
        </div>

        <div className="card">
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>
      </div>

      <div className="section">
        <h2>Transactions</h2>

        {transactions.length === 0 ? (
          <p>No transactions added.</p>
        ) : (
          transactions.map((item) => (
            <div className="transaction" key={item.id}>
              <div>
                <strong>{item.description}</strong>
                <p>{item.category}</p>
              </div>

              <div>
                <span>
                  {item.type === "Income" ? "+" : "-"}₹
                  {item.amount}
                </span>

                <button
                  onClick={() =>
                    deleteTransaction(item.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="section">
        <h2>Category Summary</h2>

        {Object.keys(categorySummary).length === 0 ? (
          <p>No expense categories.</p>
        ) : (
          <ul>
            {Object.entries(categorySummary).map(
              ([category, amount]) => (
                <li key={category}>
                  {category}: ₹{amount}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}