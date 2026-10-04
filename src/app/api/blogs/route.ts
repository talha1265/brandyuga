import { NextRequest, NextResponse } from 'next/server';
import { getBlogs, createBlog, deleteBlog, toggleBlogPublish } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';

export async function GET() {
  const blogs = await getBlogs();
  return NextResponse.json({ blogs });
}

export async function POST(req: NextRequest) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, category, excerpt, content, cover_image, author, read_time } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const blog = await createBlog({
      slug,
      title,
      category: category || 'E-Commerce Strategy',
      excerpt: excerpt || title,
      content,
      cover_image: cover_image || 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=80',
      author: author || 'BrandYuga Editorial',
      read_time: read_time || '5 min read',
      published: true,
    });

    return NextResponse.json({ success: true, blog }, { status: 201 });
  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const isAdmin = await checkAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    const updated = await toggleBlogPublish(id);
    return NextResponse.json({ success: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to toggle blog status' }, { status: 500 });
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
    return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
  }

  const deleted = await deleteBlog(id);
  return NextResponse.json({ success: deleted });
}
