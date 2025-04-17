import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Transaction from '@/models/Transaction';

export async function GET() {
  try {
    await dbConnect();
    
    const monthlyData = await Transaction.aggregate([
      {
        $group: {
          _id: { 
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          _id: 0,
          month: { 
            $dateToString: { 
              format: "%Y-%m", 
              date: { 
                $dateFromParts: { 
                  year: "$_id.year", 
                  month: "$_id.month" 
                } 
              } 
            } 
          },
          total: 1
        }
      }
    ]);

    return NextResponse.json(monthlyData);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching monthly data", error },
      { status: 500 }
    );
  }
}