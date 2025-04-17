// components/TransactionForm.jsx
'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  description: z.string().min(2, 'Description must be at least 2 characters'),
  amount: z.coerce.number().positive('Amount must be positive'),
  date: z.string(),
});

export function TransactionForm({ onSubmit, initialData }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      description: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        date: new Date(initialData.date).toISOString().split('T')[0]
      });
    }
  }, [initialData, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter description" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount Field */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date Field */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {initialData ? 'Update Transaction' : 'Add Transaction'}
        </Button>
      </form>
    </Form>
  );
}