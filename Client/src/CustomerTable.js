import React, { useState, useEffect } from 'react';
import TransactionGraph from './TransactionGraph';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/data')
      .then(response => response.json())
      .then(data => {
        setCustomers(data.customers);
        setFilteredCustomers(data.customers);
        setTransactions(data.transactions);
      });
  }, []);

  const filterCustomers = (searchTerm) => {
    const filtered = customers.filter(customer => customer.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredCustomers(filtered);
  };

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomerId(customerId);
  };

  return (
    <div className='bg-slate-700 min-h-screen flex items-center justify-center p-8'>
      <div className='w-full max-w-4xl bg-white rounded-lg shadow-lg p-6'>
        <input 
          type="text" 
          placeholder="Filter by customer name" 
          onChange={(e) => filterCustomers(e.target.value)} 
          className="mb-6 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className='overflow-x-auto'>
          <table className='w-full table-auto text-center'>
            <thead>
              <tr className='bg-indigo-200 text-gray-700 uppercase text-sm leading-normal'>
                <th className='py-3 px-6'>Customer Id</th>
                <th className='py-3 px-6'>Customer Name</th>
                <th className='py-3 px-6'>Transaction Amount</th>
                <th className='py-3 px-6'>Date</th>
              </tr>
            </thead>
            <tbody className='text-gray-600 text-sm font-light'>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map(customer => (
                  transactions.filter(transaction => transaction.customer_id === customer.id).map(transaction => (
                    <tr 
                      className='border-b border-gray-200 hover:bg-indigo-100 hover:text-indigo-900 cursor-pointer transition duration-200' 
                      key={`${customer.id}-${transaction.id}`} 
                      onClick={() => handleCustomerSelect(customer.id)}
                    >
                      <td className='py-3 px-6 hover:bg-indigo-50 transition duration-200'>{customer.id}</td>
                      <td className='py-3 px-6 hover:bg-indigo-50 transition duration-200'>{customer.name}</td>
                      <td className='py-3 px-6 hover:bg-indigo-50 transition duration-200'>{transaction.amount}</td>
                      <td className='py-3 px-6 hover:bg-indigo-50 transition duration-200'>{transaction.date}</td>
                    </tr>
                  ))
                ))
              ) : (
                <tr>
                  <td colSpan="4" className='py-3 px-6'>No customers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {selectedCustomerId && (
          <div className='mt-8'>
            <TransactionGraph customerId={selectedCustomerId} transactions={transactions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerTable;
