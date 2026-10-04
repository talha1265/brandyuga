import { NextRequest, NextResponse } from 'next/server';
import { getProjects, createProject, deleteProject } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, category, description, image_url, live_url, tags, featured, order_index } = body;
    if (!title) {
      return NextResponse.json({ error: 'Project title is required' }, { status: 400 });
    }

    const newProj = await createProject({
      title,
      category: category || 'E-Commerce',
      description: description || '',
      image_url: image_url || '/assets/uploads/dezignxo.png',
      live_url: live_url || '#',
      tags: tags || [],
      featured: !!featured,
      order_index: order_index || 99,
    });

    return NextResponse.json({ success: true, project: newProj }, { status: 201 });
  } catch (error) {
    console.error('Project creation error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing project ID' }, { status: 400 });
  }

  const deleted = await deleteProject(id);
  return NextResponse.json({ success: deleted });
}
