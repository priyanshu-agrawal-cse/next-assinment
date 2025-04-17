// app/transactions/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TransactionForm } from '@/components/TransactionForm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    setTransactions(data);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
      fetchTransactions();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Transactions</h1>
      
      <TransactionForm 
        onSubmit={async (values) => {
          const url = selectedTransaction 
            ? `/api/transactions/${selectedTransaction._id}`
            : '/api/transactions';
            
          const method = selectedTransaction ? 'PUT' : 'POST';
          
          await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          });
          
          setSelectedTransaction(null);
          fetchTransactions();
        }}
        initialData={selectedTransaction}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(transaction => (
            <TableRow key={transaction._id}>
              <TableCell>
                {new Date(transaction.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>${transaction.amount.toFixed(2)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedTransaction(transaction)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-500"
                      onClick={() => handleDelete(transaction._id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}