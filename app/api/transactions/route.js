// app/api/transactions/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Transaction from '@/models/Transaction';

export async function GET() {
  try {
    await dbConnect();
    const transactions = await Transaction.find().sort({ date: -1 });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(
      { 
        message: "Error fetching transactions",
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Validate required fields
    if (!body.amount || !body.description) {
      return NextResponse.json(
        { message: "Amount and description are required" },
        { status: 400 }
      );
    }

    const transaction = await Transaction.create({
      ...body,
      date: body.date || new Date()
    });

    return NextResponse.json(transaction, { status: 201 });
    
  } catch (error) {
    return NextResponse.json(
      { 
        message: "Error creating transaction",
        error: error.message 
      },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params }) {
    try {
      await dbConnect();
      const { id } = params;
      const body = await request.json();
  
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        body,
        { new: true }
      );
  
      if (!updatedTransaction) {
        return NextResponse.json(
          { message: "Transaction not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(updatedTransaction);
      
    } catch (error) {
      return NextResponse.json(
        { message: "Error updating transaction", error: error.message },
        { status: 500 }
      );
    }
  }
  
  export async function DELETE(request, { params }) {
    try {
      await dbConnect();
      const { id } = params;
  
      const deletedTransaction = await Transaction.findByIdAndDelete(id);
  
      if (!deletedTransaction) {
        return NextResponse.json(
          { message: "Transaction not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ message: "Transaction deleted successfully" });
      
    } catch (error) {
      return NextResponse.json(
        { message: "Error deleting transaction", error: error.message },
        { status: 500 }
      );
    }
  }