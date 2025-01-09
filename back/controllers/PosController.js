const Customer = require ('../models/PosBck.js');
const Counter = require('../models/counterSchema.js');






// // Helper function to generate unique 12-digit BillNo
// const generateBillNo = async () => {
//   const latestTransaction = await Customer.findOne()
//     .sort({ 'transactions.BillNo': -1 })
//     .select('transactions.BillNo')
//     .lean();

//   let lastBillNo = latestTransaction?.transactions?.[0]?.BillNo || '000000000000';
//   let nextBillNo = (parseInt(lastBillNo, 10) + 1).toString().padStart(12, '0');
  
//   return nextBillNo;
// };

// // Helper function to generate unique TransactionId
// const generateTransactionId = async (transactionType) => {
//   const prefix = transactionType.slice(0, 3).toUpperCase();
//   const latestTransaction = await Customer.findOne()
//     .sort({ 'transactions.TransactionId': -1 })
//     .select('transactions.TransactionId')
//     .lean();

//   let lastTransactionId = latestTransaction?.transactions?.[0]?.TransactionId || `${prefix}000000000`;
//   let numericPart = parseInt(lastTransactionId.slice(3), 10) + 1;
//   let nextTransactionId = `${prefix}${numericPart.toString().padStart(9, '0')}`;

//   return nextTransactionId;
// };


// exports.createOrUpdateCustomer = async (req, res) => {
//   try {
//     const { 
//       CustomerName, CusName,
//       CustomerMobile, CusMob,
//       transactions 
//     } = req.body;

//     let name = CustomerName || CusName;
//     let mobile = CustomerMobile || CusMob;

//     if (!name || !mobile || !transactions || transactions.length === 0) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Validate and prepare each transaction
//     const validatedTransactions = [];
//     for (let transaction of transactions) {
//       if (!transaction.Date || !transaction.TransactionType) {
//         return res.status(400).json({ message: 'Invalid transaction format' });
//       }

//       // Generate BillNo if not provided
//       if (!transaction.BillNo) {
//         transaction.BillNo = await generateBillNo();
//       }

//       // Generate TransactionId if not provided
//       if (!transaction.TransactionId) {
//         transaction.TransactionId = await generateTransactionId(transaction.TransactionType);
//       }

//       // Validate items
//       if (transaction.items && Array.isArray(transaction.items)) {
//         transaction.items.forEach(item => {
//           if (!item.itemName || !item.quantity || !item.price) {
//             return res.status(400).json({ message: 'Invalid item format' });
//           }
//         });
//       }

//       validatedTransactions.push(transaction);
//     }

//     // Find or create customer
//     let customer = await Customer.findOneAndUpdate(
//       { CustomerMobile: mobile },
//       {
//         $setOnInsert: {
//           CustomerName: name,
//           CustomerMobile: mobile
//         },
//         $addToSet: {
//           transactions: { $each: validatedTransactions }
//         }
//       },
//       { 
//         new: true, 
//         upsert: true 
//       }
//     );

//     if (!customer) {
//       return res.status(500).json({ message: 'Failed to create or update customer' });
//     }

//     res.status(201).json({ message: 'Customer updated successfully', data: customer });
//   } catch (error) {
//     console.error('Error updating customer:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


// const generateBillNo = async () => {
//   const latestTransaction = await Customer.findOne()
//     .sort({ 'transactions.BillNo': -1 })
//     .select('transactions.BillNo')
//     .lean();

//   let lastBillNo = latestTransaction?.transactions?.[0]?.BillNo || '000000000000';
//   let nextBillNo = (parseInt(lastBillNo, 10) + 1).toString().padStart(12, '0');
  
//   return nextBillNo;
// };

// const generateTransactionId = async (transactionType) => {
//   const prefix = transactionType.slice(0, 3).toUpperCase();
//   const latestTransaction = await Customer.findOne()
//     .sort({ 'transactions.TransactionId': -1 })
//     .select('transactions.TransactionId')
//     .lean();

//   let lastTransactionId = latestTransaction?.transactions?.[0]?.TransactionId || `${prefix}000000000`;
//   let numericPart = parseInt(lastTransactionId.slice(3), 10) + 1;
//   let nextTransactionId = `${prefix}${numericPart.toString().padStart(9, '0')}`;

//   return nextTransactionId;
// };

// exports.createOrUpdateCustomer = async (req, res) => {
//   try {
//     const { CustomerName, CusName, CustomerMobile, CusMob, transactions } = req.body;

//     let name = CustomerName || CusName;
//     let mobile = CustomerMobile || CusMob;

//     if (!name || !mobile || !transactions || transactions.length === 0) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Validate and prepare transactions
//     const validatedTransactions = [];
//     for (let transaction of transactions) {
//       if (!transaction.Date || !transaction.TransactionType) {
//         return res.status(400).json({ message: 'Invalid transaction format' });
//       }

//       // Generate BillNo and TransactionId in the backend only
//       transaction.BillNo = await generateBillNo();
//       transaction.TransactionId = await generateTransactionId(transaction.TransactionType);

//       // Validate items
//       if (transaction.items && Array.isArray(transaction.items)) {
//         transaction.items.forEach(item => {
//           if (!item.itemName || !item.quantity || !item.price) {
//             throw new Error('Invalid item format');
//           }
//         });
//       }

//       validatedTransactions.push(transaction);
//     }

//     // Create or update customer
//     const result = await Customer.updateOne(
//       { CustomerMobile: mobile },
//       {
//         $setOnInsert: { CustomerName: name, CustomerMobile: mobile },
//         $push: { transactions: { $each: validatedTransactions } }
//       },
//       { upsert: true }
//     );

//     if (result.upsertedCount > 0) {
//       // New customer created
//       return res.status(201).json({ message: 'Customer created successfully', data: { name, mobile, transactions: validatedTransactions } });
//     }

//     // Existing customer updated
//     res.status(200).json({ message: 'Transactions added to customer history', data: { name, mobile, transactions: validatedTransactions } });
//   } catch (error) {
//     console.error('Error updating customer:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


// const generateNextBillNo = (lastBillNo) => {
//   return (parseInt(lastBillNo, 10) + 1).toString().padStart(12, '0');
// };

// const generateNextTransactionId = (lastTransactionId, prefix) => {
//   const numericPart = parseInt(lastTransactionId.slice(3), 10) + 1;
//   return `${prefix}${numericPart.toString().padStart(9, '0')}`;
// };

// exports.createOrUpdateCustomer = async (req, res) => {
//   try {
//     const { CustomerName, CusName, CustomerMobile, CusMob, transactions } = req.body;

//     let name = CustomerName || CusName;
//     let mobile = CustomerMobile || CusMob;

//     if (!name || !mobile || !transactions || transactions.length === 0) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Fetch the latest BillNo and TransactionIds
//     const latestTransaction = await Customer.findOne()
//       .sort({ 'transactions.BillNo': -1 })
//       .select('transactions.BillNo transactions.TransactionId')
//       .lean();

//     let lastBillNo = latestTransaction?.transactions?.[0]?.BillNo || '000000000000';
//     const lastTransactionIds = {};

//     // Prepare unique BillNo and TransactionId for each transaction
//     const validatedTransactions = [];
//     for (let transaction of transactions) {
//       if (!transaction.Date || !transaction.TransactionType) {
//         return res.status(400).json({ message: 'Invalid transaction format' });
//       }

//       // Generate unique BillNo
//       lastBillNo = (parseInt(lastBillNo, 10) + 1).toString().padStart(12, '0');
//       transaction.BillNo = lastBillNo;

//       // Generate unique TransactionId based on type
//       const prefix = transaction.TransactionType.slice(0, 3).toUpperCase();
//       if (!lastTransactionIds[prefix]) {
//         const lastTransaction = latestTransaction?.transactions?.find(t => t.TransactionId.startsWith(prefix));
//         lastTransactionIds[prefix] = lastTransaction
//           ? lastTransaction.TransactionId.slice(3)
//           : '000000000';
//       }
//       lastTransactionIds[prefix] = (parseInt(lastTransactionIds[prefix], 10) + 1).toString().padStart(9, '0');
//       transaction.TransactionId = `${prefix}${lastTransactionIds[prefix]}`;

//       // Validate items
//       if (transaction.items && Array.isArray(transaction.items)) {
//         transaction.items.forEach(item => {
//           if (!item.itemName || !item.quantity || !item.price) {
//             throw new Error('Invalid item format');
//           }
//         });
//       }

//       validatedTransactions.push(transaction);
//     }

//     // Create or update customer
//     const result = await Customer.updateOne(
//       { CustomerMobile: mobile },
//       {
//         $setOnInsert: { CustomerName: name, CustomerMobile: mobile },
//         $push: { transactions: { $each: validatedTransactions } }
//       },
//       { upsert: true }
//     );

//     if (result.upsertedCount > 0) {
//       // New customer created
//       return res.status(201).json({
//         message: 'Customer created successfully',
//         data: { name, mobile, transactions: validatedTransactions },
//       });
//     }

//     // Existing customer updated
//     res.status(200).json({
//       message: 'Transactions added to customer history',
//       data: { name, mobile, transactions: validatedTransactions },
//     });
//   } catch (error) {
//     console.error('Error updating customer:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };



// const generateNextBillNo = (lastBillNo) => {
//   return (parseInt(lastBillNo, 10) + 1).toString().padStart(12, '0');
// };

// const generateNextTransactionId = (lastTransactionId, prefix) => {
//   const numericPart = parseInt(lastTransactionId.slice(3), 10) + 1;
//   return `${prefix}${numericPart.toString().padStart(9, '0')}`;
// };

const getNextCounter = async (field, prefix = '') => {
  const counter = await Counter.findOneAndUpdate(
    { field },
    { $inc: { counter: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  const counterValue = counter.counter.toString().padStart(12, '0');
  return `${prefix}${counterValue}`;
};


// exports.createOrUpdateCustomer = async (req, res) => {
//   try {
//     const { CustomerName, CusName, CustomerMobile, CusMob, transactions } = req.body;

//     let name = CustomerName || CusName;
//     let mobile = CustomerMobile || CusMob;

//     if (!name || !mobile || !transactions || !Array.isArray(transactions)) {
//       return res.status(400).json({ message: 'Missing required fields or invalid format' });
//     }

//     // Group items by transaction identifier
//     const groupedTransactions = transactions.reduce((acc, transaction) => {
//       const key = `${transaction.Date}_${transaction.TransactionType}`;
//       if (!acc[key]) {
//         acc[key] = {
//           Date: transaction.Date,
//           TransactionType: transaction.TransactionType,
//           items: [],
//         };
//       }
//       if (transaction.items && Array.isArray(transaction.items)) {
//         acc[key].items.push(...transaction.items);
//       }
//       return acc;
//     }, {});

//     // Process each grouped transaction
//     const processedTransactions = await Promise.all(
//       Object.values(groupedTransactions).map(async (transaction) => {
//         if (!transaction.Date || !transaction.TransactionType) {
//           throw new Error('Transaction must include Date and TransactionType');
//         }

//         transaction.items.forEach((item) => {
//           if (!item.itemName) {
//             throw new Error('Invalid item format: missing required fields');
//           }
//         });

//         // Generate unique BillNo
//         const billNo = await getNextCounter('BillNo');

//         // Generate unique TransactionId
//         const prefix = transaction.TransactionType.slice(0, 3).toUpperCase();
//         const transactionId = await getNextCounter('TransactionId', prefix);

//         return {
//           ...transaction,
//           BillNo: billNo,
//           TransactionId: transactionId,
//         };
//       })
//     );

//     // Create or update customer with grouped transactions
//     const result = await Customer.updateOne(
//       { CustomerMobile: mobile },
//       {
//         $setOnInsert: { CustomerName: name, CustomerMobile: mobile },
//         $push: { transactions: { $each: processedTransactions } },
//       },
//       { upsert: true }
//     );

//     if (result.upsertedCount > 0) {
//       return res.status(201).json({
//         message: 'Customer created successfully',
//         data: { name, mobile, transactions: processedTransactions },
//       });
//     }

//     res.status(200).json({
//       message: 'Transactions added to customer history',
//       data: { name, mobile, transactions: processedTransactions },
//     });
//   } catch (error) {
//     console.error('Error updating customer:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


// exports.createOrUpdateCustomer = async (req, res) => {
//   try {
//     const { CustomerName, CusName, CustomerMobile, CusMob, transactions } = req.body;
    
//     let name = CustomerName || CusName;
//     let mobile = CustomerMobile || CusMob;
    
//     if (!name || !mobile || !transactions || !Array.isArray(transactions)) {
//       return res.status(400).json({ message: 'Missing required fields or invalid format' });
//     }

//     // Fetch the latest transaction details
//     const latestTransaction = await Customer.findOne()
//       .sort({ 'transactions.BillNo': -1 })
//       .select('transactions.BillNo transactions.TransactionId')
//       .lean();

//     let lastBillNo = latestTransaction?.transactions?.[0]?.BillNo || '000000000000';
//     const lastTransactionIds = {};

//     // Group items by transaction identifier (combination of Date and TransactionType)
//     const groupedTransactions = transactions.reduce((acc, transaction) => {
//       const key = `${transaction.Date}_${transaction.TransactionType}`;
      
//       if (!acc[key]) {
//         // Create new transaction group
//         acc[key] = {
//           Date: transaction.Date,
//           TransactionType: transaction.TransactionType,
//           items: []
//         };
//       }
      
//       // Add items to the transaction group
//       if (transaction.items && Array.isArray(transaction.items)) {
//         acc[key].items.push(...transaction.items);
//       }
      
//       return acc;
//     }, {});

//     // Process each grouped transaction
//     const processedTransactions = Object.values(groupedTransactions).map(transaction => {
//       if (!transaction.Date || !transaction.TransactionType) {
//         throw new Error('Transaction must include Date and TransactionType');
//       }

//       // Validate items
//       transaction.items.forEach(item => {
//         if (!item.itemName) {
//           throw new Error('Invalid item format: missing required fields');
//         }
//       });

//       // Generate unique BillNo
//       lastBillNo = generateNextBillNo(lastBillNo);

//       // Generate unique TransactionId
//       const prefix = transaction.TransactionType.slice(0, 3).toUpperCase();
//       if (!lastTransactionIds[prefix]) {
//         const lastTrans = latestTransaction?.transactions?.find(t => t.TransactionId.startsWith(prefix));
//         lastTransactionIds[prefix] = lastTrans ? lastTrans.TransactionId : `${prefix}000000000`;
//       }
      
//       const transactionId = generateNextTransactionId(lastTransactionIds[prefix], prefix);
//       lastTransactionIds[prefix] = transactionId;

//       return {
//         ...transaction,
//         BillNo: lastBillNo,
//         TransactionId: transactionId
//       };
//     });

//     // Create or update customer with grouped transactions
//     const result = await Customer.updateOne(
//       { CustomerMobile: mobile },
//       {
//         $setOnInsert: { CustomerName: name, CustomerMobile: mobile },
//         $push: { transactions: { $each: processedTransactions } }
//       },
//       { upsert: true }
//     );

//     if (result.upsertedCount > 0) {
//       return res.status(201).json({
//         message: 'Customer created successfully',
//         data: { name, mobile, transactions: processedTransactions },
//       });
//     }

//     res.status(200).json({
//       message: 'Transactions added to customer history',
//       data: { name, mobile, transactions: processedTransactions },
//     });
//   } catch (error) {
//     console.error('Error updating customer:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };



// get details by bill number

// exports.createOrUpdateCustomer = async (req, res) => {
//   try {
//     const { CustomerName, CusName, CustomerMobile, CusMob, transactions } = req.body;

//     let name = CustomerName || CusName;
//     let mobile = CustomerMobile || CusMob;

//     if (!name || !mobile || !transactions || !Array.isArray(transactions)) {
//       return res.status(400).json({ message: 'Missing required fields or invalid format' });
//     }

//     // Group items by transaction identifier
//     const groupedTransactions = transactions.reduce((acc, transaction) => {
//       const key = `${transaction.Date}_${transaction.TransactionType}`;
//       if (!acc[key]) {
//         acc[key] = {
//           Date: transaction.Date,
//           TransactionType: transaction.TransactionType,
//           items: [],
//         };
//       }
//       if (transaction.items && Array.isArray(transaction.items)) {
//         acc[key].items.push(...transaction.items);
//       }
//       return acc;
//     }, {});

//     // Process each grouped transaction
//     const processedTransactions = await Promise.all(
//       Object.values(groupedTransactions).map(async (transaction) => {
//         if (!transaction.Date || !transaction.TransactionType) {
//           throw new Error('Transaction must include Date and TransactionType');
//         }

//         transaction.items.forEach((item) => {
//           if (!item.itemName) {
//             throw new Error('Invalid item format: missing required fields');
//           }
//         });

//         // Generate unique BillNo
//         const billNo = await getNextCounter('BillNo');

//         // Generate unique TransactionId
//         const prefix = transaction.TransactionType.slice(0, 3).toUpperCase();
//         const transactionId = await getNextCounter('TransactionId', prefix);

//         return {
//           ...transaction,
//           BillNo: billNo,
//           TransactionId: transactionId,
//         };
//       })
//     );

//     // Create or update customer with grouped transactions
//     const result = await Customer.updateOne(
//       { CustomerMobile: mobile },
//       {
//         $setOnInsert: { CustomerName: name, CustomerMobile: mobile },
//         $push: { transactions: { $each: processedTransactions } },
//       },
//       { upsert: true }
//     );

//     if (result.upsertedCount > 0) {
//       return res.status(201).json({
//         message: 'Customer created successfully',
//         data: { name, mobile, transactions: processedTransactions },
//       });
//     }

//     res.status(200).json({
//       message: 'Transactions added to customer history',
//       data: { name, mobile, transactions: processedTransactions },
//     });
//   } catch (error) {
//     console.error('Error updating customer:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


// exports.createOrUpdateCustomer = async (req, res) => {
//   try {
//     const { CustomerName, CusName, CustomerMobile, CusMob, transactions } = req.body;

//     let name = CustomerName || CusName;
//     let mobile = CustomerMobile || CusMob;

//     if (!name || !mobile || !transactions || !Array.isArray(transactions)) {
//       return res.status(400).json({ message: 'Missing required fields or invalid format' });
//     }

//     // Group items by transaction identifier
//     const groupedTransactions = transactions.reduce((acc, transaction) => {
//       const key = `${transaction.Date}_${transaction.TransactionType}`;
//       if (!acc[key]) {
//         acc[key] = {
//           Date: transaction.Date,
//           TransactionType: transaction.TransactionType,
//           items: [],
//         };
//       }
//       if (transaction.items && Array.isArray(transaction.items)) {
//         acc[key].items.push(...transaction.items);
//       }
//       return acc;
//     }, {});

//     // Process each grouped transaction
//     const processedTransactions = await Promise.all(
//       Object.values(groupedTransactions).map(async (transaction) => {
//         if (!transaction.Date || !transaction.TransactionType) {
//           throw new Error('Transaction must include Date and TransactionType');
//         }

//         transaction.items.forEach((item) => {
//           if (!item.itemName) {
//             throw new Error('Invalid item format: missing required fields');
//           }
//         });

//         // Generate unique BillNo
//         const billNo = await getNextCounter('BillNo');

//         // Generate unique TransactionId
//         const prefix = transaction.TransactionType.slice(0, 3).toUpperCase();
//         const transactionId = await getNextCounter('TransactionId', prefix);

//         return {
//           ...transaction,
//           BillNo: billNo,
//           TransactionId: transactionId,
//         };
//       })
//     );

//     // Create or update customer with grouped transactions
//     const result = await Customer.updateOne(
//       { CustomerMobile: mobile },
//       {
//         $setOnInsert: { CustomerName: name, CustomerMobile: mobile },
//         $push: { transactions: { $each: processedTransactions } },
//       },
//       { upsert: true }
//     );

//     if (result.upsertedCount > 0) {
//       return res.status(201).json({
//         message: 'Customer created successfully',
//         data: { name, mobile, transactions: processedTransactions },
//       });
//     }

//     res.status(200).json({
//       message: 'Transactions added to customer history',
//       data: { name, mobile, transactions: processedTransactions },
//     });
//   } catch (error) {
//     if (error.code === 11000) {
//       const duplicateKey = Object.keys(error.keyPattern)[0];
//       return res
//         .status(400)
//         .json({ message: `Duplicate ${duplicateKey} detected. Please use a unique value.` });
//     }

//     console.error('Error updating customer:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// exports.createOrUpdateCustomer = async (req, res) => {
//   try {
//     const { CustomerName, CusName, CustomerMobile, CusMob, transactions } = req.body;

//     let name = CustomerName || CusName;
//     let mobile = CustomerMobile || CusMob;

//     if (!name || !mobile || !transactions || !Array.isArray(transactions)) {
//       return res.status(400).json({ message: 'Missing required fields or invalid format' });
//     }

//     // Process each transaction without grouping by TransactionType
//     const processedTransactions = await Promise.all(
//       transactions.map(async (transaction) => {
//         if (!transaction.Date || !transaction.TransactionType) {
//           throw new Error('Transaction must include Date and TransactionType');
//         }

//         if (!transaction.items || !Array.isArray(transaction.items)) {
//           throw new Error('Invalid items format: must be an array');
//         }

//         transaction.items.forEach((item) => {
//           if (!item.itemName) {
//             throw new Error('Invalid item format: missing itemName');
//           }
//         });

//         // Generate unique BillNo
//         const billNo = await getNextCounter('BillNo');

//         // Generate unique TransactionId
//         const prefix = transaction.TransactionType.slice(0, 3).toUpperCase();
//         const transactionId = await getNextCounter('TransactionId', prefix);

//         return {
//           ...transaction,
//           BillNo: billNo,
//           TransactionId: transactionId,
//         };
//       })
//     );

//     // Create or update customer with transactions
//     const result = await Customer.updateOne(
//       { CustomerMobile: mobile },
//       {
//         $setOnInsert: { CustomerName: name, CustomerMobile: mobile },
//         $push: { transactions: { $each: processedTransactions } },
//       },
//       { upsert: true }
//     );

//     if (result.upsertedCount > 0) {
//       return res.status(201).json({
//         message: 'Customer created successfully',
//         data: { name, mobile, transactions: processedTransactions },
//       });
//     }

//     res.status(200).json({
//       message: 'Transactions added to customer history',
//       data: { name, mobile, transactions: processedTransactions },
//     });
//   } catch (error) {
//     if (error.code === 11000) {
//       const duplicateKey = Object.keys(error.keyPattern)[0];
//       return res
//         .status(400)
//         .json({ message: `Duplicate ${duplicateKey} detected. Please use a unique value.` });
//     }

//     console.error('Error updating customer:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

exports.createOrUpdateCustomer = async (req, res) => {
  try {
    const { CustomerName, CusName, CustomerMobile, CusMob, transactions } = req.body;

    let name = CustomerName || CusName;
    let mobile = CustomerMobile || CusMob;

    if (!name || !mobile || !transactions || !Array.isArray(transactions)) {
      return res.status(400).json({ message: 'Missing required fields or invalid format' });
    }

    // Process each transaction without grouping by TransactionType
    const processedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        if (!transaction.Date || !transaction.TransactionType) {
          throw new Error('Transaction must include Date and TransactionType');
        }

        if (!transaction.items || !Array.isArray(transaction.items)) {
          throw new Error('Invalid items format: must be an array');
        }

        transaction.items.forEach((item) => {
          if (!item.itemName) {
            throw new Error('Invalid item format: missing itemName');
          }
        });

        // Generate unique BillNo
        const billNo = await getNextCounter('BillNo');

        // Generate unique TransactionId
        const prefix = transaction.TransactionType.slice(0, 3).toUpperCase();
        const transactionId = await getNextCounter('TransactionId', prefix);

        return {
          ...transaction,
          BillNo: billNo,
          TransactionId: transactionId,
        };
      })
    );

    // Create or update customer with transactions
    const result = await Customer.updateOne(
      { CustomerMobile: mobile },
      {
        $setOnInsert: { CustomerName: name, CustomerMobile: mobile },
        $push: { transactions: { $each: processedTransactions } },
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      return res.status(201).json({
        message: 'Customer created successfully',
        data: { name, mobile, transactions: processedTransactions },
      });
    }

    res.status(200).json({
      message: 'Transactions added to customer history',
      data: { name, mobile, transactions: processedTransactions },
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateKey = Object.keys(error.keyPattern)[0];
      return res
        .status(400)
        .json({ message: `Duplicate ${duplicateKey} detected. Please use a unique value.` });
    }

    console.error('Error updating customer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};







exports.getCustomerByBillNo = async (req, res) => {
  try {
    const { billNo } = req.params;

    // Find the customer with the given BillNo in the transactions array
    const customer = await Customer.findOne({ 
      'transactions.BillNo': billNo 
    }, {
      CustomerName: 1, 
      CustomerMobile: 1, 
      transactions: { $elemMatch: { BillNo: billNo } } // Retrieve only the relevant transaction
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer with the given BillNo not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error('Error fetching customer by BillNo:', error);
    res.status(500).json({ message: 'Server error' });
  }
};