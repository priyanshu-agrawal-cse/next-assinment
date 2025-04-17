// import mongoose from 'mongoose';

// const transactionSchema = new mongoose.Schema({
//   amount: { 
//     type: Number, 
//     required: [true, 'Amount is required'],
//     min: [0.01, 'Amount must be greater than 0']
//   },
//   date: { 
//     type: Date, 
//     default: Date.now 
//   },
//   description: { 
//     type: String, 
//     required: [true, 'Description is required'],
//     trim: true,
//     maxlength: [100, 'Description cannot exceed 100 characters']
//   },
// });

// // Prevent model recompilation in development
// export default mongoose.models.Transaction || 
//        mongoose.model('Transaction', transactionSchema);

// models/Transaction.js
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  amount: { 
    type: Number, 
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be greater than 0']
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [100, 'Description cannot exceed 100 characters']
  },
}, { timestamps: true });

export default mongoose.models.Transaction || 
       mongoose.model('Transaction', transactionSchema);