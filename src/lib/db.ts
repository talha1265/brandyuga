import { Pool } from '@neondatabase/serverless';
import { initialServices, initialProjects, initialBlogs } from './initialData';
import { Lead, ServiceItem, ProjectItem, BlogPost, AdminStats, SubscriptionOrder } from '@/types';
import fs from 'fs';
import path from 'path';

// Check for Neon Database URL
const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.NEON_DATABASE_URL ||
  '';

let neonPool: Pool | null = null;
if (connectionString && connectionString.startsWith('postgres')) {
  try {
    neonPool = new Pool({ connectionString });
  } catch (err) {
    console.error('Failed to initialize Neon pool:', err);
    neonPool = null;
  }
}

// Fallback file-based storage path for local development / testing without active Neon credentials
const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'brandyuga_store.json');

interface LocalStore {
  leads: Lead[];
  services: ServiceItem[];
  projects: ProjectItem[];
  blogs: BlogPost[];
  subscriptions?: SubscriptionOrder[];
}

function getLocalStore(): LocalStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (!parsed.subscriptions) {
        parsed.subscriptions = [];
      }
      return parsed;
    }
  } catch (e) {
    console.error('Error reading local store:', e);
  }

  // Initial fallback store
  const defaultStore: LocalStore = {
    leads: [
      {
        id: 'lead-demo-1',
        type: 'trial',
        name: 'Aarav Mehta',
        email: 'aarav@organichealth.in',
        phone: '+91 98765 43210',
        service: 'Marketplace Management (Amazon)',
        details: 'Looking to launch ayurvedic health supplements on Amazon & Flipkart.',
        status: 'new',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: 'lead-demo-2',
        type: 'referral',
        name: 'Priya Sharma (Client: Urban Threads)',
        email: 'priya@urbanthreads.com',
        phone: '+91 98220 11223',
        referrer_name: 'Vikram Joshi',
        referrer_phone: '+91 97112 33445',
        service: 'D2C Website & Video Shoots',
        details: 'D2C fashion apparel brand wanting a high-speed Shopify/Next.js store and reels video shoot.',
        status: 'contacted',
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      }
    ],
    services: initialServices,
    projects: initialProjects,
    blogs: initialBlogs,
    subscriptions: [],
  };

  saveLocalStore(defaultStore);
  return defaultStore;
}

function saveLocalStore(store: LocalStore) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving local store:', e);
  }
}

// Database initialization for Neon
let isNeonInitialized = false;
async function initNeonTables() {
  if (!neonPool || isNeonInitialized) return;

  try {
    await neonPool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR(64) PRIMARY KEY,
        type VARCHAR(32) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(64) NOT NULL,
        service VARCHAR(255),
        details TEXT,
        referrer_name VARCHAR(255),
        referrer_phone VARCHAR(64),
        status VARCHAR(32) DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(64) PRIMARY KEY,
        slug VARCHAR(128) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        hindi_tagline VARCHAR(255),
        description TEXT,
        category VARCHAR(64),
        icon VARCHAR(64),
        badge VARCHAR(64),
        features JSONB,
        deliverables JSONB,
        order_index INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE
      );

      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(64) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(128),
        description TEXT,
        image_url TEXT,
        live_url TEXT,
        tags JSONB,
        featured BOOLEAN DEFAULT FALSE,
        order_index INT DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS blogs (
        id VARCHAR(64) PRIMARY KEY,
        slug VARCHAR(128) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(128),
        excerpt TEXT,
        content TEXT,
        cover_image TEXT,
        author VARCHAR(128),
        read_time VARCHAR(32),
        published BOOLEAN DEFAULT TRUE,
        created_at VARCHAR(64)
      );

      CREATE TABLE IF NOT EXISTS subscriptions (
        id VARCHAR(64) PRIMARY KEY,
        txnid VARCHAR(128) UNIQUE NOT NULL,
        plan_id VARCHAR(64) NOT NULL,
        plan_name VARCHAR(255) NOT NULL,
        platforms JSONB,
        duration_months INT DEFAULT 3,
        amount NUMERIC(10, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'INR',
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(64) NOT NULL,
        brand_name VARCHAR(255),
        gst_number VARCHAR(64),
        status VARCHAR(32) DEFAULT 'initiated',
        payu_payment_id VARCHAR(128),
        payu_mode VARCHAR(32),
        payment_date TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if services are seeded
    const srvCheck = await neonPool.query('SELECT COUNT(*) FROM services');
    if (parseInt(srvCheck.rows[0].count) === 0) {
      for (const s of initialServices) {
        await neonPool.query(
          `INSERT INTO services (id, slug, title, hindi_tagline, description, category, icon, badge, features, deliverables, order_index, is_active)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [s.id, s.slug, s.title, s.hindi_tagline, s.description, s.category, s.icon, s.badge || null, JSON.stringify(s.features), JSON.stringify(s.deliverables), s.order_index, s.is_active]
        );
      }
    }

    // Check if projects are seeded
    const projCheck = await neonPool.query('SELECT COUNT(*) FROM projects');
    if (parseInt(projCheck.rows[0].count) === 0) {
      for (const p of initialProjects) {
        await neonPool.query(
          `INSERT INTO projects (id, title, category, description, image_url, live_url, tags, featured, order_index)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [p.id, p.title, p.category, p.description, p.image_url, p.live_url, JSON.stringify(p.tags), p.featured, p.order_index]
        );
      }
    }

    // Check if blogs are seeded
    const blogCheck = await neonPool.query('SELECT COUNT(*) FROM blogs');
    if (parseInt(blogCheck.rows[0].count) === 0) {
      for (const b of initialBlogs) {
        await neonPool.query(
          `INSERT INTO blogs (id, slug, title, category, excerpt, content, cover_image, author, read_time, published, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [b.id, b.slug, b.title, b.category, b.excerpt, b.content, b.cover_image, b.author, b.read_time, b.published, b.created_at]
        );
      }
    }

    isNeonInitialized = true;
    console.log('Neon PostgreSQL tables and seed data initialized successfully.');
  } catch (err) {
    console.error('Error during Neon table initialization:', err);
  }
}

// ----------------- LEADS API -----------------
export async function getLeads(): Promise<Lead[]> {
  if (neonPool) {
    try {
      await initNeonTables();
      const res = await neonPool.query('SELECT * FROM leads ORDER BY created_at DESC');
      return res.rows.map(r => ({
        id: r.id,
        type: r.type,
        name: r.name,
        email: r.email || '',
        phone: r.phone,
        service: r.service,
        details: r.details,
        referrer_name: r.referrer_name,
        referrer_phone: r.referrer_phone,
        status: r.status,
        created_at: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
      }));
    } catch (e) {
      console.error('Neon query failed, using local store:', e);
    }
  }

  const store = getLocalStore();
  return store.leads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function createLead(leadData: Omit<Lead, 'id' | 'status' | 'created_at'>): Promise<Lead> {
  const newLead: Lead = {
    ...leadData,
    id: 'lead-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    status: 'new',
    created_at: new Date().toISOString(),
  };

  if (neonPool) {
    try {
      await initNeonTables();
      await neonPool.query(
        `INSERT INTO leads (id, type, name, email, phone, service, details, referrer_name, referrer_phone, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          newLead.id,
          newLead.type,
          newLead.name,
          newLead.email,
          newLead.phone,
          newLead.service || null,
          newLead.details || null,
          newLead.referrer_name || null,
          newLead.referrer_phone || null,
          newLead.status,
          newLead.created_at,
        ]
      );
      return newLead;
    } catch (e) {
      console.error('Failed to insert lead into Neon, saving to local store:', e);
    }
  }

  const store = getLocalStore();
  store.leads.unshift(newLead);
  saveLocalStore(store);
  return newLead;
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<boolean> {
  if (neonPool) {
    try {
      await initNeonTables();
      await neonPool.query('UPDATE leads SET status = $1 WHERE id = $2', [status, id]);
      return true;
    } catch (e) {
      console.error('Neon updateLeadStatus failed:', e);
    }
  }

  const store = getLocalStore();
  const index = store.leads.findIndex(l => l.id === id);
  if (index !== -1) {
    store.leads[index].status = status;
    saveLocalStore(store);
    return true;
  }
  return false;
}

export async function deleteLead(id: string): Promise<boolean> {
  if (neonPool) {
    try {
      await initNeonTables();
      await neonPool.query('DELETE FROM leads WHERE id = $1', [id]);
      return true;
    } catch (e) {
      console.error('Neon deleteLead failed:', e);
    }
  }

  const store = getLocalStore();
  store.leads = store.leads.filter(l => l.id !== id);
  saveLocalStore(store);
  return true;
}

// ----------------- SERVICES API -----------------
export async function getServices(): Promise<ServiceItem[]> {
  if (neonPool) {
    try {
      await initNeonTables();
      const res = await neonPool.query('SELECT * FROM services ORDER BY order_index ASC');
      if (res.rows.length > 0) {
        return res.rows.map(r => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          hindi_tagline: r.hindi_tagline,
          description: r.description,
          category: r.category,
          icon: r.icon,
          badge: r.badge,
          features: typeof r.features === 'string' ? JSON.parse(r.features) : r.features || [],
          deliverables: typeof r.deliverables === 'string' ? JSON.parse(r.deliverables) : r.deliverables || [],
          order_index: r.order_index,
          is_active: r.is_active,
        }));
      }
    } catch (e) {
      console.error('Neon getServices failed:', e);
    }
  }

  const store = getLocalStore();
  return store.services;
}

export async function updateService(service: ServiceItem): Promise<boolean> {
  if (neonPool) {
    try {
      await initNeonTables();
      await neonPool.query(
        `UPDATE services
         SET title=$1, hindi_tagline=$2, description=$3, category=$4, icon=$5, badge=$6, features=$7, deliverables=$8, order_index=$9, is_active=$10
         WHERE id=$11`,
        [
          service.title,
          service.hindi_tagline,
          service.description,
          service.category,
          service.icon,
          service.badge || null,
          JSON.stringify(service.features),
          JSON.stringify(service.deliverables),
          service.order_index,
          service.is_active,
          service.id,
        ]
      );
      return true;
    } catch (e) {
      console.error('Neon updateService failed:', e);
    }
  }

  const store = getLocalStore();
  const idx = store.services.findIndex(s => s.id === service.id);
  if (idx !== -1) {
    store.services[idx] = service;
    saveLocalStore(store);
    return true;
  }
  return false;
}

// ----------------- PROJECTS API -----------------
export async function getProjects(): Promise<ProjectItem[]> {
  if (neonPool) {
    try {
      await initNeonTables();
      const res = await neonPool.query('SELECT * FROM projects ORDER BY order_index ASC');
      if (res.rows.length > 0) {
        return res.rows.map(r => ({
          id: r.id,
          title: r.title,
          category: r.category,
          description: r.description,
          image_url: r.image_url,
          live_url: r.live_url,
          tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags || [],
          featured: r.featured,
          order_index: r.order_index,
        }));
      }
    } catch (e) {
      console.error('Neon getProjects failed:', e);
    }
  }

  const store = getLocalStore();
  return store.projects;
}

export async function createProject(project: Omit<ProjectItem, 'id'>): Promise<ProjectItem> {
  const newProj: ProjectItem = {
    ...project,
    id: 'proj-' + Date.now(),
  };

  if (neonPool) {
    try {
      await initNeonTables();
      await neonPool.query(
        `INSERT INTO projects (id, title, category, description, image_url, live_url, tags, featured, order_index)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [newProj.id, newProj.title, newProj.category, newProj.description, newProj.image_url, newProj.live_url, JSON.stringify(newProj.tags), newProj.featured, newProj.order_index]
      );
      return newProj;
    } catch (e) {
      console.error('Neon createProject failed:', e);
    }
  }

  const store = getLocalStore();
  store.projects.push(newProj);
  saveLocalStore(store);
  return newProj;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (neonPool) {
    try {
      await initNeonTables();
      await neonPool.query('DELETE FROM projects WHERE id = $1', [id]);
      return true;
    } catch (e) {
      console.error('Neon deleteProject failed:', e);
    }
  }

  const store = getLocalStore();
  store.projects = store.projects.filter(p => p.id !== id);
  saveLocalStore(store);
  return true;
}

// ----------------- BLOGS API -----------------
export async function getBlogs(): Promise<BlogPost[]> {
  if (neonPool) {
    try {
      await initNeonTables();
      const res = await neonPool.query('SELECT * FROM blogs ORDER BY created_at DESC');
      if (res.rows.length > 0) {
        return res.rows;
      }
    } catch (e) {
      console.error('Neon getBlogs failed:', e);
    }
  }

  const store = getLocalStore();
  return store.blogs;
}

export async function createBlog(blog: Omit<BlogPost, 'id' | 'created_at'>): Promise<BlogPost> {
  const newBlog: BlogPost = {
    ...blog,
    id: 'blog-' + Date.now(),
    created_at: new Date().toISOString(),
  };

  if (neonPool) {
    try {
      await initNeonTables();
      await neonPool.query(
        `INSERT INTO blogs (id, slug, title, category, excerpt, content, cover_image, author, read_time, published, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          newBlog.id,
          newBlog.slug,
          newBlog.title,
          newBlog.category,
          newBlog.excerpt,
          newBlog.content,
          newBlog.cover_image,
          newBlog.author,
          newBlog.read_time,
          newBlog.published,
          newBlog.created_at,
        ]
      );
      return newBlog;
    } catch (e) {
      console.error('Neon createBlog failed:', e);
    }
  }

  const store = getLocalStore();
  store.blogs.unshift(newBlog);
  saveLocalStore(store);
  return newBlog;
}

export async function deleteBlog(id: string): Promise<boolean> {
  if (neonPool) {
    try {
      await initNeonTables();
      await neonPool.query('DELETE FROM blogs WHERE id = $1', [id]);
      return true;
    } catch (e) {
      console.error('Neon deleteBlog failed:', e);
    }
  }

  const store = getLocalStore();
  store.blogs = store.blogs.filter(b => b.id !== id);
  saveLocalStore(store);
  return true;
}

export async function toggleBlogPublish(id: string): Promise<boolean> {
  const store = getLocalStore();
  const blog = store.blogs.find(b => b.id === id);
  if (!blog) return false;

  const nextPublished = !blog.published;

  if (neonPool) {
    try {
      await initNeonTables();
      await neonPool.query('UPDATE blogs SET published = $1 WHERE id = $2', [nextPublished, id]);
    } catch (e) {
      console.error('Neon toggleBlogPublish failed:', e);
    }
  }

  blog.published = nextPublished;
  saveLocalStore(store);
  return true;
}

// ----------------- SUBSCRIPTIONS API -----------------
export async function getSubscriptions(): Promise<SubscriptionOrder[]> {
  if (neonPool) {
    try {
      await initNeonTables();
      const res = await neonPool.query('SELECT * FROM subscriptions ORDER BY created_at DESC');
      if (res.rows.length > 0) {
        return res.rows.map(r => ({
          id: r.id,
          txnid: r.txnid,
          planId: r.plan_id,
          planName: r.plan_name,
          platforms: typeof r.platforms === 'string' ? JSON.parse(r.platforms) : r.platforms || [],
          durationMonths: r.duration_months,
          amount: parseFloat(r.amount),
          currency: r.currency || 'INR',
          customerName: r.customer_name,
          customerEmail: r.customer_email,
          customerPhone: r.customer_phone,
          brandName: r.brand_name || '',
          gstNumber: r.gst_number || '',
          status: r.status,
          payuPaymentId: r.payu_payment_id || undefined,
          payuMode: r.payu_mode || undefined,
          paymentDate: r.payment_date ? new Date(r.payment_date).toISOString() : undefined,
          created_at: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
        }));
      }
    } catch (e) {
      console.error('Neon getSubscriptions failed:', e);
    }
  }

  const store = getLocalStore();
  return (store.subscriptions || []).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getSubscriptionByTxnId(txnid: string): Promise<SubscriptionOrder | null> {
  if (neonPool) {
    try {
      await initNeonTables();
      const res = await neonPool.query('SELECT * FROM subscriptions WHERE txnid = $1 LIMIT 1', [txnid]);
      if (res.rows.length > 0) {
        const r = res.rows[0];
        return {
          id: r.id,
          txnid: r.txnid,
          planId: r.plan_id,
          planName: r.plan_name,
          platforms: typeof r.platforms === 'string' ? JSON.parse(r.platforms) : r.platforms || [],
          durationMonths: r.duration_months,
          amount: parseFloat(r.amount),
          currency: r.currency || 'INR',
          customerName: r.customer_name,
          customerEmail: r.customer_email,
          customerPhone: r.customer_phone,
          brandName: r.brand_name || '',
          gstNumber: r.gst_number || '',
          status: r.status,
          payuPaymentId: r.payu_payment_id || undefined,
          payuMode: r.payu_mode || undefined,
          paymentDate: r.payment_date ? new Date(r.payment_date).toISOString() : undefined,
          created_at: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString(),
        };
      }
    } catch (e) {
      console.error('Neon getSubscriptionByTxnId failed:', e);
    }
  }

  const store = getLocalStore();
  const sub = (store.subscriptions || []).find(s => s.txnid === txnid);
  return sub || null;
}

export async function createSubscription(orderData: Omit<SubscriptionOrder, 'id' | 'created_at'>): Promise<SubscriptionOrder> {
  const newOrder: SubscriptionOrder = {
    ...orderData,
    id: 'sub-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    created_at: new Date().toISOString(),
  };

  if (neonPool) {
    try {
      await initNeonTables();
      await neonPool.query(
        `INSERT INTO subscriptions (
          id, txnid, plan_id, plan_name, platforms, duration_months, amount, currency,
          customer_name, customer_email, customer_phone, brand_name, gst_number,
          status, payu_payment_id, payu_mode, payment_date, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
        [
          newOrder.id,
          newOrder.txnid,
          newOrder.planId,
          newOrder.planName,
          JSON.stringify(newOrder.platforms),
          newOrder.durationMonths,
          newOrder.amount,
          newOrder.currency,
          newOrder.customerName,
          newOrder.customerEmail,
          newOrder.customerPhone,
          newOrder.brandName || null,
          newOrder.gstNumber || null,
          newOrder.status,
          newOrder.payuPaymentId || null,
          newOrder.payuMode || null,
          newOrder.paymentDate ? new Date(newOrder.paymentDate) : null,
          newOrder.created_at,
        ]
      );
      return newOrder;
    } catch (e) {
      console.error('Failed to insert subscription into Neon, saving to local store:', e);
    }
  }

  const store = getLocalStore();
  if (!store.subscriptions) {
    store.subscriptions = [];
  }
  store.subscriptions.unshift(newOrder);
  saveLocalStore(store);
  return newOrder;
}

export async function updateSubscriptionStatus(
  txnid: string,
  status: SubscriptionOrder['status'],
  payuPaymentId?: string,
  payuMode?: 'test' | 'live' | 'simulated'
): Promise<boolean> {
  const now = new Date().toISOString();

  if (neonPool) {
    try {
      await initNeonTables();
      await neonPool.query(
        `UPDATE subscriptions
         SET status = $1, payu_payment_id = COALESCE($2, payu_payment_id), payu_mode = COALESCE($3, payu_mode),
             payment_date = CASE WHEN $1 = 'success' THEN CURRENT_TIMESTAMP ELSE payment_date END
         WHERE txnid = $4`,
        [status, payuPaymentId || null, payuMode || null, txnid]
      );
      return true;
    } catch (e) {
      console.error('Neon updateSubscriptionStatus failed:', e);
    }
  }

  const store = getLocalStore();
  if (!store.subscriptions) store.subscriptions = [];
  const index = store.subscriptions.findIndex(s => s.txnid === txnid);
  if (index !== -1) {
    store.subscriptions[index].status = status;
    if (payuPaymentId) store.subscriptions[index].payuPaymentId = payuPaymentId;
    if (payuMode) store.subscriptions[index].payuMode = payuMode;
    if (status === 'success') store.subscriptions[index].paymentDate = now;
    saveLocalStore(store);
    return true;
  }
  return false;
}

// ----------------- ADMIN STATS -----------------
export async function getAdminStats(): Promise<AdminStats> {
  const leads = await getLeads();
  const services = await getServices();
  const projects = await getProjects();
  const subscriptions = await getSubscriptions();

  const successSubs = subscriptions.filter(s => s.status === 'success');
  const totalRevenue = successSubs.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return {
    totalLeads: leads.length,
    newLeads: leads.filter(l => l.status === 'new').length,
    trialRequests: leads.filter(l => l.type === 'trial').length,
    referralRequests: leads.filter(l => l.type === 'referral').length,
    contactMessages: leads.filter(l => l.type === 'contact').length,
    totalProjects: projects.length,
    totalServices: services.length,
    totalSubscriptions: subscriptions.length,
    totalRevenue,
  };
}

export function getDatabaseStatus(): {
  isNeonConnected: boolean;
  provider: string;
  hasConnectionString: boolean;
} {
  return {
    isNeonConnected: !!neonPool,
    provider: neonPool ? 'Neon Serverless PostgreSQL' : 'Local Fast File/Memory Store (Neon Ready)',
    hasConnectionString: !!connectionString,
  };
}
