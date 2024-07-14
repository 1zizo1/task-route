import React, { useState, useEffect } from 'react';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        setCustomers(data.customers);
        setTransactions(data.transactions);
      });
  }, []);

  const filterCustomers = (searchTerm) => {
    const filtered = customers.filter(customer => customer.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredCustomers(filtered);
  };

  const filterTransactions = (amount) => {
    if (!amount) {
      setFilteredCustomers(customers);
      return;
    }
    const filteredCustomersWithTransactions = customers.filter(customer => {
      const customerTransactions = transactions.filter(transaction => transaction.customer_id === customer.id);
      return customerTransactions.some(transaction => transaction.amount === Number(amount));
    });
    setFilteredCustomers(filteredCustomersWithTransactions);
  };

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomerId(customerId);
  };

  return (
    <div>
      <input type="text" placeholder="Filter by customer name" onChange={(e) => filterCustomers(e.target.value)} />
      <input type="number" placeholder="Filter by transaction amount" onChange={(e) => filterTransactions(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Transactions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map(customer => (
              <tr key={customer.id} onClick={() => handleCustomerSelect(customer.id)}>
                <td>{customer.name}</td>
                <td>{transactions.filter(transaction => transaction.customer_id === customer.id).length}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No customers found</td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedCustomerId && <TransactionGraph customerId={selectedCustomerId} transactions={transactions} />}
    </div>
  );
};

export default CustomerTable;
