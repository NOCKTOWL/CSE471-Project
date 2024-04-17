import React, { useState, useContext } from "react";
import { usePersonalExpense } from "../hooks/usePersonalExpense";
import { useAuthContext } from "../hooks/useAuthContext";
import { ProfileContext } from '../context/ProfileContext';
import ExpenseTagDropdown from './ExpenseTagDropdown';

const PersonalExpenseForm = ({ expenses, setSortedExpenses, sortOption }) => {
  const { dispatch } = usePersonalExpense();
  const { user } = useAuthContext();
  const { profile } = useContext(ProfileContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add an expense");
      return;
    }

    const expense = { title, amount, tag: selectedTag };
    // console.log(expense);
    const response = await fetch("/api/personalExpenses/", {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setAmount("");
      setSelectedTag("");

      // Dispatch the action to create expense
      dispatch({ type: "CREATE_EXPENSE", payload: json });

      // Sort the expenses based on the current sort option
      let sorted;
      switch (sortOption) {
        case "amount-low-high":
          sorted = [json, ...expenses].sort((a, b) => a.amount - b.amount);
          break;
        case "amount-high-low":
          sorted = [json, ...expenses].sort((a, b) => b.amount - a.amount);
          break;
        case "date-recent":
          sorted = [json, ...expenses].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case "date-least-recent":
          sorted = [json, ...expenses].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
        default:
          sorted = [json, ...expenses];
      }
      setSortedExpenses(sorted);
    }
  };

  return (
    <form className="flex flex-col h-max border-1 border-border text-text p-4 rounded-2xl bg-main-dark-bg" onSubmit={handleSubmit}>
      <h1 className="mb-4 text-xl font-bold text-center">Add a New Expense</h1>
      <ExpenseTagDropdown
        expenseTags={profile.expenseTags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <div className="h-10 mb-4">
        {/* <label className="flex items-center mr-4 text-xl col-span-2">Title:</label> */}
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
          className={emptyFields.includes("title") ? "error" : "p-2 bg-transparent text-text w-full border-1 border-border rounded-md"}
        />
      </div>
      <div className="h-10 mb-4">
        {/* <label className="flex items-center mr-4 text-xl col-span-2">Amount:</label> */}
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          placeholder="Amount"
          className={emptyFields.includes("amount") ? "error" : "p-2 bg-transparent text-text w-full border-1 border-border rounded-md"}
        />
      </div>
      <button className="mt-2 p-2 bg-secondary text-text rounded-md hover:bg-secondary/80 transition-colors">Add Expense</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};


export default PersonalExpenseForm;
