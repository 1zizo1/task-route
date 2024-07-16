import { useEffect, useRef, useState } from "react";
import {Chart} from "chart.js"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionGraph = ({ customerId, transactions }) => {
    const chartRef = useRef(null);
    let [transactionAmountsPerDay,setTransactionAmountsPerDay] = useState();
    let [data,setData] = useState();
    useEffect(() => {
      
      const filteredTransactions = transactions.filter(transaction => transaction.customer_id === customerId);
  
      const transactionAmount = filteredTransactions.reduce((acc, transaction) => {
        const date = transaction.date.slice(0, 10);
        acc.labels.push(date);
        acc.data.push(transaction.amount);
        return acc;
      }, { labels: [], data: [] }); // Initial values for labels and data
      
      setTransactionAmountsPerDay(transactionAmount);
      outdata.datasets[0].data = transactionAmount.data;
      outdata.labels = transactionAmount.labels;
      // Now you can use transactionAmountsPerDay for Chart.js configuration
      setData(outdata);
      console.log(data)
    }, [customerId, data, transactions]); // Update chart on change of customerId or transactions

    
    return (<div style={{"width":"300px"}}>
       {data ? <Pie redraw data={data} />:<></>}
    </div>
    );
  };
  
  export default TransactionGraph;


  export let outdata = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Transaction Amount',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  