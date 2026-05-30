const validateApplicationInput = (req, res, next) => {
  const { name, mobile, amount, purpose, language } = req.body;
  const validLanguages = ['Hindi', 'Tamil', 'Telugu', 'Marathi', 'English'];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: "Invalid or missing 'name'." });
  }

  if (!mobile || typeof mobile !== 'string' || !/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ error: "Mobile number must be a valid 10-digit string." });
  }

  if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: "Amount must be a positive number." });
  }

  if (!purpose || typeof purpose !== 'string' || purpose.trim() === '') {
    return res.status(400).json({ error: "Invalid or missing 'purpose'." });
  }

  if (!language || !validLanguages.includes(language)) {
    return res.status(400).json({ error: `Language must be one of: ${validLanguages.join(', ')}` });
  }
  
  next();
};

const validateStatusUpdate = (req, res, next) => {
  const { status } = req.body;
  const validStatuses = ['approved', 'rejected'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: "Status must be updated to either 'approved' or 'rejected'." });
  }

  next();
};

module.exports = {
  validateApplicationInput,
  validateStatusUpdate
};