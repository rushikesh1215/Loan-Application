const applicationRepo = require('../repository/application.repository');

const createApplication = async (req, res) => {
  try {
    const { name, mobile, amount, purpose, language } = req.body;
    const newApplication = await applicationRepo.create({ name, mobile, amount, purpose, language });
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({ error: "Internal server error while creating application." });
  }
};

const getApplications = async (req, res) => {
  try {
    const { status } = req.query;
    if (status && !['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: "Invalid status filter value." });
    }
    const applications = await applicationRepo.findAll(status);
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "Internal server error while fetching applications." });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await applicationRepo.findById(id);
    if (!application) {
      return res.status(404).json({ error: "Loan application not found." });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({ error: "Can only update status of 'pending' applications." });
    }

    const updatedApplication = await applicationRepo.updateStatus(id, status);
    res.status(200).json(updatedApplication);
  } catch (error) {
    // Check for Prisma invalid UUID formatting error
    if (error.code === 'P2023') {
       return res.status(400).json({ error: "Provided ID format is an invalid UUID." });
    }
    res.status(500).json({ error: "Internal server error while updating status." });
  }
};

const getSummary = async (req, res) => {
  try {
    const summary = await applicationRepo.getDashboardSummary();
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ error: "Internal server error while compiling stats." });
  }
};

module.exports = {
  createApplication,
  getApplications,
  updateApplicationStatus,
  getSummary
};