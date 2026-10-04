import { NextResponse } from 'next/server';
import { getDatabaseStatus, getLeads, getServices, getProjects, getBlogs } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';

export async function GET() {
  const isAdmin = await checkAdminSession();
  const dbStatus = getDatabaseStatus();

  const leads = await getLeads();
  const services = await getServices();
  const projects = await getProjects();
  const blogs = await getBlogs();

  return NextResponse.json({
    ...dbStatus,
    isAdmin,
    stats: {
      leadsCount: leads.length,
      servicesCount: services.length,
      projectsCount: projects.length,
      blogsCount: blogs.length,
    }
  });
}
