import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as typeof globalThis & { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

interface ActionBody {
  action?: 'CREATE' | 'UPDATE_STAGE' | 'DELETE';
  id?: string;
  stage?: string;
  name?: string;
  code?: string;
  client?: string;
  priority?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
      const { action, id, stage, name, code, client, priority } = (req.body || {}) as ActionBody;

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

      if (action === 'UPDATE_STAGE' && id && stage) {
        const updated = await prisma.activity.update({
          where: { id },
          data: { stage }
        });
        return res.status(200).json(updated);
      }

      if (action === 'DELETE' && id) {
        await prisma.activity.delete({
          where: { id }
        });
        return res.status(200).json({ success: true });
      }

      return res.status(400).json({ error: 'Ação inválida' });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (error) {
    console.error('Erro no Prisma/Neon:', error);
    // Se for requisição GET e der erro de tabela, responde com lista vazia para evitar erro 500 no navegador
    if (req.method === 'GET') {
      return res.status(200).json([]);
    }
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return res.status(500).json({ error: message });
  }
}
