const prisma = require('../config/db');

class ApplicationRepository {
  async create(data) {
    return await prisma.application.create({ data });
  }

  async findAll(statusFilter) {
    return await prisma.application.findMany({
      where: statusFilter ? { status: statusFilter } : {},
      orderBy: { created_at: 'desc' }
    });
  }

  async findById(id) {
    return await prisma.application.findUnique({
      where: { id }
    });
  }

  async updateStatus(id, status) {
    return await prisma.application.update({
      where: { id },
      data: { status }
    });
  }

  async getDashboardSummary() {
    const aggregations = await prisma.application.aggregate({
      _count: { id: true },
      _sum: { amount: true }
    });

    const statusCounts = await prisma.application.groupBy({
      by: ['status'],
      _count: { id: true }
    });

    const countPerStatus = { pending: 0, approved: 0, rejected: 0 };
    statusCounts.forEach(item => {
      countPerStatus[item.status] = item._count.id;
    });

    return {
      totalApplications: aggregations._count.id,
      totalAmountRequested: aggregations._sum.amount || 0,
      countPerStatus
    };
  }
}

module.exports = new ApplicationRepository();