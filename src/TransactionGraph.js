const TransactionGraph = ({ customerId, transactions }) => {
    const chartRef = useRef(null);
  
    useEffect(() => {
      const ctx = chartRef.current.getContext('2d');
      const filteredTransactions = transactions.filter(transaction => transaction.customer_id === customerId);
  
      const transactionAmountsPerDay = filteredTransactions.reduce((acc, transaction) => {
        const date = transaction.date.slice(0, 10);
        acc.labels.push(date);
        acc.data.push(transaction.amount);
        return acc;
      }, { labels: [], data: [] }); // Initial values for labels and data
  
      // Now you can use transactionAmountsPerDay for Chart.js configuration
      new Chart(ctx, {
        type: 'bar', // Choose a chart type (bar, line, etc.)
        data: {
          labels: transactionAmountsPerDay.labels,
          datasets: [{
            label: 'Transaction Amount per Day',
            data: transactionAmountsPerDay.data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          }]
        },
        options: {
          // Add any additional chart configuration options here
        }
      });
    }, [customerId, transactions]); // Update chart on change of customerId or transactions
  
    return (
      <canvas ref={chartRef} />
    );
  };
  
  export default TransactionGraph;
  