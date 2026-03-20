Expense Tracker

A simple and intuitive Personal Expense Tracker Web App that allows users to manage income and expenses, track financial balance, and maintain a persistent transaction history using browser storage.

**Overview**

This application enables users to:

  Add income and expense transactions
  
  Edit existing transactions
  
  Delete transactions with confirmation
  
  Filter transactions (All / Income / Expense)
  
  View real-time financial summaries (Balance, Income, Expense)
  
  Persist data using localStorage

The project is built using Vanilla JavaScript, focusing on clean logic, DOM manipulation, and state management without external libraries.

**Financial Summary**

  Total Balance (auto-calculated)
  
  Total Income
  
  Total Expenses
  
  Dynamic color indication for negative balance

**Filtering System**

**View:**

  All transactions
  
  Only income
  
  Only expenses

**Data Persistence**

  All data is stored in localStorage
  
  Automatically restored on page reload
  
  Includes error handling for corrupted storage data

**Form Validation**

**Prevents:**

  Empty description
  
  Invalid or negative amount
  
  Unselected transaction type
  
  Real-time error clearing on input

**Core Concepts Implemented**

This project demonstrates strong understanding of:

1.DOM manipulation

2.Event delegation

3.Array methods (filter, find, findIndex)

4.State management

5.Conditional rendering

6.Form validation

7.Local storage handling

8.Edit/update workflows

**How It Works**
**1. Adding a Transaction**

  User inputs data
  
  Validation runs
  
  Transaction is added to transactionArray
  
  UI updates
  
  Data saved to localStorage

**2. Editing a Transaction**

  Clicking ✏️ loads data into form
  
  editId tracks the transaction

**On submit:**

  Existing transaction is updated (not duplicated)

**3. Deleting a Transaction**

  Click ❌
  
  Confirmation prompt appears
  
  Transaction removed from array and storage

**4. Filtering**

  Dropdown controls displayed data
  
  Uses filtered arrays without modifying original data


This project was built with a strong focus on understanding core JavaScript concepts deeply.
