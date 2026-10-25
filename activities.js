import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const activities = await prisma.activity.findMany({
        orderBy: { createdAt: 'asc' }
      });
      return res.status(200).json(activities);
    }

    if (req.method === 'POST') {
      const { action, id, stage, name, code, client, priority } = req.body || {};

      if (action === 'CREATE') {
        const newAct = await prisma.activity.create({
          data: {
            name: name || 'Sem Nome',
            code: code || 'MST-000',
            client: client || '',
            stage: stage || 'Preparo do Material',
            priority: priority || 'Média'
          }
        });
        return res.status(200).json(newAct);
      }

      if (action === 'UPDATE_STAGE') {
        const updated = await prisma.activity.update({
          where: { id },
          data: { stage }
        });
        return res.status(200).json(updated);
      }

      if (action === 'DELETE') {
        await prisma.activity.delete({
          where: { id }
        });
        return res.status(200).json({ success: true });
      }

      return res.status(400).json({ error: 'Ação inválida' });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (error) {
    console.error('Erro na API Prisma/Neon:', error);
    return res.status(500).json({ error: error.message });
  }
}