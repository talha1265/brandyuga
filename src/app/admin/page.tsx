'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  LogOut, 
  Users, 
  Database, 
  Layers, 
  Briefcase, 
  Gift, 
  CheckCircle, 
  Clock, 
  Trash2, 
  MessageCircle, 
  Download, 
  Plus, 
  RefreshCw, 
  Sparkles,
  ExternalLink, 
  Search, 
  Check, 
  AlertCircle,
  Phone,
  Mail,
  ArrowUpRight,
  Filter,
  Eye,
  Edit3,
  X,
  TrendingUp,
  BarChart3,
  BookOpen,
  DollarSign,
  Percent,
  Calendar,
  Share2
} from 'lucide-react';
import { Lead, ServiceItem, ProjectItem, BlogPost } from '@/types';

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState('admin@brandyuga.in');
  const [password, setPassword] = useState('brandyuga2026!');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active View Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'services' | 'projects' | 'blogs' | 'referrals' | 'database'>('overview');

  // Data states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter & Search states for Leads
  const [leadFilterType, setLeadFilterType] = useState<string>('all');
  const [leadFilterStatus, setLeadFilterStatus] = useState<string>('all');
  const [leadSearch, setLeadSearch] = useState<string>('');

  // Selected Lead for Detailed View Modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Manual Lead Creation Form Modal
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'contact' as Lead['type'],
    service: 'Amazon & Marketplace Management',
    details: '',
  });

  // Project creation form modal
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'E-Commerce',
    description: '',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    live_url: 'https://',
    tags: 'Next.js, D2C, Ads, High ROI',
  });

  // Service Edit modal
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Blog creation modal
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [newBlogForm, setNewBlogForm] = useState({
    title: '',
    category: 'Marketplace Scaling',
    excerpt: '',
    content: '',
    cover_image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=80',
    author: 'BrandYuga Strategy Desk',
    read_time: '6 min read',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Check login status on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        fetchAllData();
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchAllData();
        showToast('Secure session established. Welcome back!');
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch {
      setLoginError('Login server request failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
  };

  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const [leadsRes, servicesRes, projectsRes, blogsRes, dbRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/services'),
        fetch('/api/projects'),
        fetch('/api/blogs'),
        fetch('/api/db-status'),
      ]);

      if (leadsRes.ok) {
        const ld = await leadsRes.json();
        setLeads(ld.leads || []);
      }
      if (servicesRes.ok) {
        const sd = await servicesRes.json();
        setServices(sd.services || []);
      }
      if (projectsRes.ok) {
        const pd = await projectsRes.json();
        setProjects(pd.projects || []);
      }
      if (blogsRes.ok) {
        const bd = await blogsRes.json();
        setBlogs(bd.blogs || []);
      }
      if (dbRes.ok) {
        const db = await dbRes.json();
        setDbStatus(db);
      }
    } catch (e) {
      console.error('Data fetch error:', e);
      showToast('Error syncing with database');
    } finally {
      setLoadingData(false);
    }
  };

  // Update lead status
  const handleUpdateStatus = async (id: string, status: Lead['status']) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, status });
        }
        showToast(`Lead marked as ${status.toUpperCase()}`);
      }
    } catch (e) {
      console.error('Update status error:', e);
    }
  };

  // Delete lead
  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry record?')) return;
    try {
      const res = await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
        showToast('Lead inquiry removed');
      }
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  // Manual Lead Creation
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeadForm),
      });
      if (res.ok) {
        setShowAddLeadModal(false);
        setNewLeadForm({
          name: '',
          phone: '',
          email: '',
          type: 'contact',
          service: 'Amazon & Marketplace Management',
          details: '',
        });
        fetchAllData();
        showToast('New client inquiry logged successfully!');
      }
    } catch (e) {
      console.error('Create lead error:', e);
    }
  };

  // Toggle Service Active Status
  const handleToggleServiceActive = async (service: ServiceItem) => {
    const updated = { ...service, is_active: !service.is_active };
    try {
      const res = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setServices(services.map(s => s.id === service.id ? updated : s));
        showToast(`Service "${service.title}" is now ${updated.is_active ? 'ACTIVE' : 'DISABLED'}`);
      }
    } catch (e) {
      console.error('Failed to toggle service:', e);
    }
  };

  // Save Edited Service
  const handleSaveEditedService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    try {
      const res = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });
      if (res.ok) {
        setServices(services.map(s => s.id === editingService.id ? editingService : s));
        setEditingService(null);
        showToast('Service details updated');
      }
    } catch (e) {
      console.error('Failed to update service:', e);
    }
  };

  // Create new project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProject,
          tags: newProject.tags.split(',').map(t => t.trim()),
        }),
      });
      if (res.ok) {
        setShowAddProjectModal(false);
        setNewProject({
          title: '',
          category: 'E-Commerce',
          description: '',
          image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
          live_url: 'https://',
          tags: 'Next.js, D2C, Ads',
        });
        fetchAllData();
        showToast('Portfolio case study published');
      }
    } catch (e) {
      console.error('Create project error:', e);
    }
  };

  // Delete project
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Delete this portfolio project?')) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
        showToast('Project removed');
      }
    } catch (e) {
      console.error('Delete project error:', e);
    }
  };

  // Create Blog Article
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlogForm),
      });
      if (res.ok) {
        setShowAddBlogModal(false);
        setNewBlogForm({
          title: '',
          category: 'Marketplace Scaling',
          excerpt: '',
          content: '',
          cover_image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=80',
          author: 'BrandYuga Strategy Desk',
          read_time: '6 min read',
        });
        fetchAllData();
        showToast('New article published to BrandYuga Insights');
      }
    } catch (e) {
      console.error('Create blog error:', e);
    }
  };

  // Toggle Blog Publish status
  const handleToggleBlogPublish = async (id: string) => {
    try {
      const res = await fetch('/api/blogs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setBlogs(blogs.map(b => b.id === id ? { ...b, published: !b.published } : b));
        showToast('Article publish status updated');
      }
    } catch (e) {
      console.error('Blog toggle error:', e);
    }
  };

  // Delete blog
  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs(blogs.filter(b => b.id !== id));
        showToast('Article deleted');
      }
    } catch (e) {
      console.error('Delete blog error:', e);
    }
  };

  // Export leads to CSV
  const exportToCSV = () => {
    const headers = ['ID,Type,Name,Phone,Email,Service,Status,Details,Referrer,Date'];
    const rows = leads.map(l => 
      `"${l.id}","${l.type}","${l.name}","${l.phone}","${l.email || ''}","${l.service || ''}","${l.status}","${(l.details || '').replace(/"/g, '""')}","${l.referrer_name || ''}","${l.created_at}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `brandyuga_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads CSV file generated & downloaded');
  };

  // Filtered Leads
  const filteredLeads = leads.filter(l => {
    const matchesType = leadFilterType === 'all' || l.type === leadFilterType;
    const matchesStatus = leadFilterStatus === 'all' || l.status === leadFilterStatus;
    const matchesSearch = !leadSearch || 
      l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.phone.includes(leadSearch) ||
      (l.email && l.email.toLowerCase().includes(leadSearch.toLowerCase())) ||
      (l.service && l.service.toLowerCase().includes(leadSearch.toLowerCase())) ||
      (l.details && l.details.toLowerCase().includes(leadSearch.toLowerCase()));
    return matchesType && matchesStatus && matchesSearch;
  });

  // Stats calculation
  const newLeadsCount = leads.filter(l => l.status === 'new').length;
  const contactedLeadsCount = leads.filter(l => l.status === 'contacted').length;
  const convertedLeadsCount = leads.filter(l => l.status === 'converted').length;
  const trialLeadsCount = leads.filter(l => l.type === 'trial').length;
  const referralCount = leads.filter(l => l.type === 'referral').length;

  const conversionRate = leads.length > 0 
    ? Math.round((convertedLeadsCount / leads.length) * 100) 
    : 0;

  // Render Login Screen if not authenticated
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4 relative">
        <div className="max-w-md w-full glass-panel rounded-3xl p-8 sm:p-10 border border-purple-500/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/20 rounded-bl-full pointer-events-none filter blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-indigo-500/20 rounded-tr-full pointer-events-none filter blur-2xl"></div>

          <div className="text-center mb-8 space-y-3">
            {/* Enlarged brand logo emblem */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 p-[2px] mx-auto mb-2 shadow-[0_0_25px_rgba(139,92,246,0.6)]">
              <div className="w-full h-full bg-[#0a0e20] rounded-[14px] flex items-center justify-center p-2">
                <Image
                  src="/assets/images/logo-icon.png"
                  alt="BrandYuga"
                  width={60}
                  height={60}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-1">
                Brand<span className="text-purple-400">Yuga</span> Command Center
              </h1>
              <p className="text-xs text-slate-400 mt-1">E-Commerce Agency Admin Console & Neon Database</p>
            </div>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-50 mt-2 transition-all"
            >
              {loginLoading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Access Secure Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <span className="text-[11px] text-slate-400">
              Default Access: <code className="text-purple-300">admin@brandyuga.in</code> / <code className="text-purple-300">brandyuga2026!</code>
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen pt-36 text-center text-slate-400 text-sm flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>
        <span>Verifying secure BrandYuga admin session...</span>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f172a] border border-purple-500/50 text-white px-4 py-3 rounded-2xl shadow-[0_0_25px_rgba(139,92,246,0.4)] text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar with Brand Logo and System Indicators */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.5)] shrink-0">
            <div className="w-full h-full bg-[#0a0e20] rounded-[14px] flex items-center justify-center p-1.5">
              <Image
                src="/assets/images/logo-icon.png"
                alt="BrandYuga"
                width={50}
                height={50}
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                BrandYuga <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">Command Center</span>
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {dbStatus?.isNeonConnected ? 'Neon Serverless Live' : 'Local Fast-Store Active'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive operations console for leads, 1-month trials, services, portfolio, blogs, and PostgreSQL sync.
            </p>
          </div>
        </div>

        {/* Global Quick Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap self-end md:self-auto">
          <button
            onClick={() => setShowAddLeadModal(true)}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
            title="Log offline or call inquiry"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Lead</span>
          </button>

          <button
            onClick={fetchAllData}
            disabled={loadingData}
            className="p-2 sm:px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition-all"
            title="Refresh All Database Tables"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync</span>
          </button>

          <button
            onClick={exportToCSV}
            className="p-2 sm:px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition-all"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">CSV</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 sm:px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs flex items-center gap-1.5 transition-all"
            title="Sign out of Admin Session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3 mb-6">
        {[
          { id: 'overview', label: 'Overview & Analytics', icon: BarChart3 },
          { id: 'leads', label: 'Inquiries & Pipeline', icon: Users, badge: newLeadsCount },
          { id: 'services', label: 'Services Manager', icon: Layers, count: services.length },
          { id: 'projects', label: 'Portfolio Projects', icon: Briefcase, count: projects.length },
          { id: 'blogs', label: 'Blogs & Articles', icon: BookOpen, count: blogs.length },
          { id: 'referrals', label: 'Referral Engine (10%)', icon: Gift, count: referralCount },
          { id: 'database', label: 'Neon Database Console', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                  : 'bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-black text-[10px] font-black animate-pulse">
                  {tab.badge}
                </span>
              )}
              {tab.count !== undefined && !tab.badge && (
                <span className="text-[10px] opacity-60 font-normal">
                  ({tab.count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: EXECUTIVE OVERVIEW & ANALYTICS                                      */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top KPI Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            <div className="glass-card p-4 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Total Inquiries</span>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-white">{leads.length}</div>
              <div className="text-[10px] text-purple-300/80 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span>All time CRM leads</span>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-amber-500/30 bg-amber-950/15">
              <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-1">
                <span>New Uncontacted</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-300">{newLeadsCount}</div>
              <div className="text-[10px] text-amber-400 mt-1 font-medium">
                ⚡ Requires prompt outreach
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/15">
              <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold mb-1">
                <span>1-Month Free Trials</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-300">{trialLeadsCount}</div>
              <div className="text-[10px] text-emerald-400 mt-1">
                High-intent trial applicants
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Conversion Rate</span>
                <Percent className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-cyan-300">{conversionRate}%</div>
              <div className="text-[10px] text-slate-400 mt-1">
                {convertedLeadsCount} closed / converted
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-white/10 col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Referral Partners</span>
                <Gift className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400">{referralCount}</div>
              <div className="text-[10px] text-slate-400 mt-1">
                10% commission engine
              </div>
            </div>
          </div>

          {/* Pipeline Funnel & Distribution Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversion Pipeline Progress */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">Lead Conversion Funnel</h3>
                  <p className="text-slate-400 text-xs">Stage-wise progression from inquiry to paying client</p>
                </div>
                <span className="text-xs text-purple-400 font-semibold">
                  {convertedLeadsCount} Converted Clients
                </span>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-amber-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      Stage 1: New / Uncontacted
                    </span>
                    <span className="text-slate-300">{newLeadsCount} leads ({leads.length > 0 ? Math.round((newLeadsCount/leads.length)*100) : 0}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/[0.05] overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 rounded-full transition-all duration-500" 
                      style={{ width: `${leads.length > 0 ? (newLeadsCount/leads.length)*100 : 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-cyan-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      Stage 2: In Consultation / Discussion
                    </span>
                    <span className="text-slate-300">{contactedLeadsCount} leads ({leads.length > 0 ? Math.round((contactedLeadsCount/leads.length)*100) : 0}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/[0.05] overflow-hidden">
                    <div 
                      className="h-full bg-cyan-400 rounded-full transition-all duration-500" 
                      style={{ width: `${leads.length > 0 ? (contactedLeadsCount/leads.length)*100 : 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-emerald-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      Stage 3: Converted & Onboarded
                    </span>
                    <span className="text-slate-300">{convertedLeadsCount} leads ({conversionRate}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/[0.05] overflow-hidden">
                    <div 
                      className="h-full bg-emerald-400 rounded-full transition-all duration-500" 
                      style={{ width: `${conversionRate}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Funnel Action */}
              <div className="pt-2 flex items-center justify-between text-xs border-t border-white/10">
                <span className="text-slate-400">Want to reach uncontacted leads immediately?</span>
                <button
                  onClick={() => {
                    setActiveTab('leads');
                    setLeadFilterStatus('new');
                  }}
                  className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                >
                  <span>Filter {newLeadsCount} New Leads</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick System Status Card */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white text-sm mb-1">Platform Infrastructure</h3>
                <p className="text-slate-400 text-xs">Live services, portfolio items, and database health</p>

                <div className="space-y-3 mt-4 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-purple-400" />
                      Active Services
                    </span>
                    <span className="font-bold text-white">{services.filter(s => s.is_active).length} / {services.length}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-indigo-400" />
                      Portfolio Showcases
                    </span>
                    <span className="font-bold text-white">{projects.length} Brands</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      Published Articles
                    </span>
                    <span className="font-bold text-white">{blogs.filter(b => b.published).length} / {blogs.length}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Database className="w-4 h-4 text-emerald-400" />
                      Neon PostgreSQL
                    </span>
                    <span className="font-bold text-emerald-400">
                      {dbStatus?.isNeonConnected ? 'Connected' : 'Local Pool Ready'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('database')}
                  className="w-full py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View Database Diagnostics</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Recent Inquiries Activity Feed */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">Recent Growth Inquiries</h3>
                <p className="text-slate-400 text-xs">Latest business inquiries received across BrandYuga website</p>
              </div>
              <button
                onClick={() => setActiveTab('leads')}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                <span>View All Inquiries ({leads.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-white/5">
              {leads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.01] px-2 rounded-xl transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm">{lead.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        lead.type === 'trial'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : lead.type === 'referral'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {lead.type === 'trial' ? '1-Month Free Trial' : lead.type === 'referral' ? 'Partner Referral' : 'General Contact'}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        lead.status === 'new' ? 'text-amber-400 bg-amber-500/10' :
                        lead.status === 'contacted' ? 'text-cyan-400 bg-cyan-500/10' :
                        lead.status === 'converted' ? 'text-emerald-400 bg-emerald-500/10' :
                        'text-slate-400'
                      }`}>
                        {lead.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-2 flex-wrap">
                      <span>{lead.phone}</span>
                      {lead.email && <span>• {lead.email}</span>}
                      <span>• {lead.service || 'Growth inquiry'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    {lead.phone && lead.phone !== 'N/A' && (
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hi ${lead.name}, this is BrandYuga E-Commerce team following up on your inquiry for ${lead.service || 'growth services'}. When would be convenient for a quick strategy call?`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INQUIRIES & LEADS PIPELINE TABLE                                  */}
      {/* ========================================================================= */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          {/* Search & Filters Header */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 flex-wrap">
              <div className="relative flex-1 min-w-[200px] sm:max-w-xs">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name, phone, email, notes..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-purple-400"
                />
              </div>

              <select
                value={leadFilterType}
                onChange={(e) => setLeadFilterType(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#0c1022] border border-white/10 text-white text-xs"
              >
                <option value="all">All Inquiry Types</option>
                <option value="trial">1-Month Free Trial</option>
                <option value="contact">Contact Messages</option>
                <option value="referral">Referral Submissions</option>
              </select>

              <select
                value={leadFilterStatus}
                onChange={(e) => setLeadFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#0c1022] border border-white/10 text-white text-xs"
              >
                <option value="all">All Pipeline Stages</option>
                <option value="new">✦ New Leads ({newLeadsCount})</option>
                <option value="contacted">In Discussion ({contactedLeadsCount})</option>
                <option value="converted">Converted ({convertedLeadsCount})</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={() => setShowAddLeadModal(true)}
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Lead</span>
              </button>

              <button
                onClick={exportToCSV}
                className="px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs flex items-center gap-1.5"
                title="Download CSV report"
              >
                <Download className="w-3.5 h-3.5 text-purple-400" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Leads Table Container */}
          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-white/[0.03] border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Client Contact</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">Service Needed</th>
                    <th className="py-3.5 px-4">Requirement / Scope</th>
                    <th className="py-3.5 px-4">Pipeline Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Users className="w-8 h-8 text-slate-500 stroke-1" />
                          <p className="text-sm font-medium">No customer inquiries found</p>
                          <p className="text-xs text-slate-500">Try adjusting your filters or search keywords.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-sm">{lead.name}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-purple-400 shrink-0" />
                            <span>{lead.phone}</span>
                          </div>
                          {lead.email && (
                            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                              <span>{lead.email}</span>
                            </div>
                          )}
                          <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
                            <span>
                              {new Date(lead.created_at).toLocaleDateString('en-IN', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                            lead.type === 'trial'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : lead.type === 'referral'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          }`}>
                            {lead.type === 'trial' ? 'Free Trial' : lead.type === 'referral' ? 'Referral' : 'Direct'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-semibold text-slate-200">
                          {lead.service || 'General Growth Inquiry'}
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="text-slate-400 text-xs line-clamp-2">
                            {lead.details || '—'}
                          </p>
                          {lead.referrer_name && (
                            <div className="mt-1 text-[11px] text-amber-300 font-semibold">
                              Referrer: {lead.referrer_name} ({lead.referrer_phone})
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateStatus(lead.id, e.target.value as Lead['status'])}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0c1022] border transition-colors ${
                              lead.status === 'new'
                                ? 'border-amber-500/60 text-amber-300 bg-amber-950/20'
                                : lead.status === 'contacted'
                                ? 'border-cyan-500/60 text-cyan-300 bg-cyan-950/20'
                                : lead.status === 'converted'
                                ? 'border-emerald-500/60 text-emerald-300 bg-emerald-950/20'
                                : 'border-slate-600 text-slate-400'
                            }`}
                          >
                            <option value="new">✦ New Inquiry</option>
                            <option value="contacted">In Discussion</option>
                            <option value="converted">Deal Converted</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-2 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.1] transition-colors"
                              title="View Full Lead Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {lead.phone && lead.phone !== 'N/A' && (
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                  `Hi ${lead.name}, thank you for choosing BrandYuga regarding ${lead.service || 'our growth solutions'}! When would be a great time for a brief 10-minute strategy call?`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                                title="Reply on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            )}

                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SERVICES MANAGER                                                   */}
      {/* ========================================================================= */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-white text-base">BrandYuga Service Catalog</h3>
              <p className="text-xs text-slate-400">
                Manage service titles, Hindi punchlines, features, and live visibility on customer pages.
              </p>
            </div>
            <span className="text-xs text-purple-400 font-semibold">
              {services.filter(s => s.is_active).length} of {services.length} Services Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((srv) => (
              <div 
                key={srv.id} 
                className={`glass-panel p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  srv.is_active ? 'border-white/10 hover:border-purple-500/40' : 'border-white/5 opacity-60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 uppercase tracking-wider">
                      {srv.category}
                    </span>

                    {/* Interactive Active / Disabled Toggle */}
                    <button
                      onClick={() => handleToggleServiceActive(srv)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                        srv.is_active 
                          ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25'
                          : 'bg-slate-700/40 border border-slate-600 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${srv.is_active ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                      <span>{srv.is_active ? 'Live on Site' : 'Disabled'}</span>
                    </button>
                  </div>

                  {srv.hindi_tagline && (
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{srv.hindi_tagline}</span>
                    </div>
                  )}

                  <h3 className="font-black text-white text-lg tracking-tight">{srv.title}</h3>
                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">{srv.description}</p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-semibold text-slate-400">Included Deliverables:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {srv.features.slice(0, 3).map((feat, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/5">
                          ✓ {feat}
                        </span>
                      ))}
                      {srv.features.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300">
                          +{srv.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">ID: {srv.slug}</span>
                  <button
                    onClick={() => setEditingService(srv)}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-purple-300 hover:text-white flex items-center gap-1.5 font-semibold transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Service</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PORTFOLIO PROJECTS                                                 */}
      {/* ========================================================================= */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-white text-base">Portfolio & Client Case Studies</h3>
              <p className="text-xs text-slate-400">Projects showcased to clients to demonstrate BrandYuga scaling track record.</p>
            </div>
            <button
              onClick={() => setShowAddProjectModal(true)}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Case Study</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-purple-500/40 transition-all">
                <div>
                  <div className="h-44 bg-[#0a0e22] relative border-b border-white/10 overflow-hidden group">
                    <img 
                      src={proj.image_url} 
                      alt={proj.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-bold text-white border border-white/10">
                      {proj.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-2.5">
                    <h3 className="font-black text-white text-base tracking-tight">{proj.title}</h3>
                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">{proj.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-white/10 flex items-center justify-between">
                  {proj.live_url && proj.live_url !== '#' ? (
                    <a
                      href={proj.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                    >
                      <span>Visit Live Store</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-medium">Internal Case Study</span>
                  )}

                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Delete Case Study"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: BLOGS & ARTICLES MANAGER                                           */}
      {/* ========================================================================= */}
      {activeTab === 'blogs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-white text-base">E-Commerce Knowledge Hub & Blogs</h3>
              <p className="text-xs text-slate-400">Educational articles and growth guides published on BrandYuga.</p>
            </div>
            <button
              onClick={() => setShowAddBlogModal(true)}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Article</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-purple-500/40 transition-all">
                <div>
                  <div className="h-40 bg-[#0a0e22] relative border-b border-white/10 overflow-hidden">
                    <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
                      {blog.category}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{blog.author}</span>
                      <span>{blog.read_time}</span>
                    </div>
                    <h3 className="font-bold text-white text-sm line-clamp-2">{blog.title}</h3>
                    <p className="text-slate-400 text-xs line-clamp-2">{blog.excerpt}</p>
                  </div>
                </div>

                <div className="p-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleToggleBlogPublish(blog.id)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                      blog.published 
                        ? 'bg-emerald-500/20 text-emerald-300' 
                        : 'bg-slate-700/40 text-slate-400'
                    }`}
                  >
                    {blog.published ? '● Published' : '○ Draft'}
                  </button>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      target="_blank"
                      className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                      <span>Read</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="p-1 text-red-400 hover:bg-red-500/20 rounded"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: REFERRAL PARTNER COMMISSIONS (10%)                                 */}
      {/* ========================================================================= */}
      {activeTab === 'referrals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-white text-base">10% Partner Referral Commission Engine</h3>
              <p className="text-xs text-slate-400">
                Track referral partners, calculate their 10% commission payout on closed deals, and dispatch WhatsApp receipts.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>Flat 10% First-Month Commission Rule</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-white/[0.03] border-b border-white/10 text-slate-400 font-semibold uppercase">
                  <tr>
                    <th className="py-3.5 px-4">Referring Partner</th>
                    <th className="py-3.5 px-4">Referred Client / Business</th>
                    <th className="py-3.5 px-4">Project Scope</th>
                    <th className="py-3.5 px-4">Commission Status</th>
                    <th className="py-3.5 px-4">Partner Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.filter(l => l.type === 'referral').length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-500">
                        No referral leads registered yet. Clients can submit referrals on the /referral page!
                      </td>
                    </tr>
                  ) : (
                    leads.filter(l => l.type === 'referral').map((ref) => (
                      <tr key={ref.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-sm">{ref.referrer_name || ref.name}</div>
                          <div className="text-[11px] text-amber-300 font-medium">{ref.referrer_phone || ref.phone}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            Logged: {new Date(ref.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-purple-300 text-sm">{ref.name}</div>
                          <div className="text-[11px] text-slate-400">{ref.phone}</div>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs text-slate-300">
                          {ref.details || ref.service || 'Comprehensive E-commerce scaling'}
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={ref.status}
                            onChange={(e) => handleUpdateStatus(ref.id, e.target.value as Lead['status'])}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0c1022] border border-amber-500/50 text-amber-300"
                          >
                            <option value="new">✦ Reviewing Referral</option>
                            <option value="contacted">In Active Discussion</option>
                            <option value="converted">Deal Closed (10% Due)</option>
                            <option value="archived">10% Payout Dispatched ✓</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4">
                          <a
                            href={`https://wa.me/${(ref.referrer_phone || ref.phone).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hi ${ref.referrer_name || ref.name}! Thank you for referring ${ref.name} to BrandYuga. We are updating you regarding the 10% commission status on this partnership.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-bold transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                            <span>WhatsApp Partner</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: NEON POSTGRESQL CONSOLE & HEALTH                                  */}
      {/* ========================================================================= */}
      {activeTab === 'database' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">PostgreSQL Neon Serverless Health</h2>
              <p className="text-xs text-slate-400">Database architecture, live connection pool status, and schema diagnostics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
              <div className="text-xs text-slate-400">Active Storage Engine</div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${dbStatus?.isNeonConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                <span>{dbStatus?.provider || 'Neon Ready'}</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                {dbStatus?.isNeonConnected 
                  ? 'Real-time serverless PostgreSQL cluster connected on AWS/Neon.' 
                  : 'Fast zero-latency local persistent store active. Add DATABASE_URL to auto-switch to Neon.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
              <div className="text-xs text-slate-400">Database Tables & Records</div>
              <div className="text-xs text-slate-300 space-y-1 font-medium">
                <div className="flex justify-between">
                  <span>• `leads` table:</span>
                  <strong className="text-white">{leads.length} records</strong>
                </div>
                <div className="flex justify-between">
                  <span>• `services` table:</span>
                  <strong className="text-white">{services.length} records</strong>
                </div>
                <div className="flex justify-between">
                  <span>• `projects` table:</span>
                  <strong className="text-white">{projects.length} records</strong>
                </div>
                <div className="flex justify-between">
                  <span>• `blogs` table:</span>
                  <strong className="text-white">{blogs.length} records</strong>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5">
              <div className="text-xs text-slate-400">Security & Backup</div>
              <div className="text-xs text-slate-300 space-y-2">
                <div>Encryption: <strong className="text-emerald-400">SSL/TLS In-Transit</strong></div>
                <div>Admin Session: <strong className="text-purple-400">Encrypted Cookie Token</strong></div>
                <button
                  onClick={exportToCSV}
                  className="w-full py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white text-[11px] font-semibold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3 h-3" />
                  <span>Download Backup Dump (CSV)</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-xs text-slate-300 space-y-2">
            <div className="font-bold text-purple-300 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>How to attach Neon Cloud PostgreSQL Database:</span>
            </div>
            <p>1. Open your Neon console at <a href="https://neon.tech" target="_blank" rel="noreferrer" className="text-cyan-400 underline">https://neon.tech</a> and copy your connection string.</p>
            <p>2. Put it in <code className="text-purple-300 font-mono">.env.local</code> as:</p>
            <pre className="p-3 rounded-xl bg-black/60 text-emerald-400 font-mono text-[11px] overflow-x-auto">
              DATABASE_URL="postgresql://user:password@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
            </pre>
            <p>3. BrandYuga auto-executes all migrations, table creation, and preserves your data instantly!</p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: LEAD DETAIL VIEW MODAL                                           */}
      {/* ========================================================================= */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0c1022] border border-purple-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">
                  Lead Details & Action Center
                </span>
                <h3 className="text-xl font-black text-white">{selectedLead.name}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                <div>
                  <span className="text-slate-400 block text-[11px]">Phone Number</span>
                  <a href={`tel:${selectedLead.phone}`} className="font-bold text-white hover:text-purple-300 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-purple-400" />
                    <span>{selectedLead.phone}</span>
                  </a>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Email Address</span>
                  <a href={`mailto:${selectedLead.email}`} className="font-bold text-white hover:text-purple-300 flex items-center gap-1 mt-0.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">{selectedLead.email || 'N/A'}</span>
                  </a>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Inquiry Type</span>
                  <span className="font-bold text-cyan-300 capitalize">{selectedLead.type}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Received On</span>
                  <span className="text-slate-300">
                    {new Date(selectedLead.created_at).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] mb-1">Service Inquired</span>
                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-white font-semibold">
                  {selectedLead.service || 'General Growth Consultation'}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px] mb-1">Client Requirements & Notes</span>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-200 leading-relaxed max-h-36 overflow-y-auto">
                  {selectedLead.details || 'No additional notes provided by client.'}
                </div>
              </div>

              {selectedLead.referrer_name && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  <div className="font-bold">Referral Partner Information:</div>
                  <div className="mt-1">Name: {selectedLead.referrer_name}</div>
                  <div>Phone: {selectedLead.referrer_phone}</div>
                </div>
              )}

              {/* Status Update Dropdown */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Update Pipeline Stage</label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value as Lead['status'])}
                  className="w-full px-3 py-2 rounded-xl bg-[#080c1a] border border-purple-500/40 text-white font-semibold"
                >
                  <option value="new">✦ New Inquiry (Uncontacted)</option>
                  <option value="contacted">In Discussion / Proposal Sent</option>
                  <option value="converted">Deal Converted & Onboarded</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Fast Outreach Actions */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi ${selectedLead.name}, thank you for reaching out to BrandYuga regarding ${selectedLead.service || 'your e-commerce requirements'}. We are ready to assist you in scaling your business.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-center font-bold flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Message</span>
                </a>

                <a
                  href={`tel:${selectedLead.phone}`}
                  className="py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-center font-bold flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span>Direct Call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: MANUAL ADD LEAD                                                 */}
      {/* ========================================================================= */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0c1022] border border-purple-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-4">Log New Client Lead / Inquiry</h3>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  placeholder="e.g. Rahul Verma"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="text"
                  required
                  value={newLeadForm.phone}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={newLeadForm.email}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  placeholder="rahul@brand.com"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Inquiry Type</label>
                <select
                  value={newLeadForm.type}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, type: e.target.value as Lead['type'] })}
                  className="w-full px-3 py-2 rounded-xl bg-[#080c1a] border border-white/10 text-white"
                >
                  <option value="trial">1-Month Free Trial Request</option>
                  <option value="contact">General Contact Message</option>
                  <option value="referral">Partner Referral</option>
                  <option value="quick_consult">Phone Walk-in / Quick Consult</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Interested Service</label>
                <input
                  type="text"
                  value={newLeadForm.service}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value })}
                  placeholder="Amazon, Shopify, Creative Shoot..."
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Notes / Scope Summary</label>
                <textarea
                  rows={3}
                  value={newLeadForm.details}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, details: e.target.value })}
                  placeholder="Client background, product category, budget..."
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: EDIT SERVICE MODAL                                               */}
      {/* ========================================================================= */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0c1022] border border-purple-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-3">Edit Service: {editingService.title}</h3>

            <form onSubmit={handleSaveEditedService} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Hindi Punchline / Tagline</label>
                <input
                  type="text"
                  value={editingService.hindi_tagline || ''}
                  onChange={(e) => setEditingService({ ...editingService, hindi_tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Category</label>
                <select
                  value={editingService.category}
                  onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-[#080c1a] border border-white/10 text-white"
                >
                  <option value="core">Core Marketplace Scaling</option>
                  <option value="creative">Creative & Content</option>
                  <option value="marketing">Performance Marketing</option>
                  <option value="operations">Operations & Catalog</option>
                  <option value="legal">Legal & Compliance</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Features (Comma-separated)</label>
                <input
                  type="text"
                  value={editingService.features.join(', ')}
                  onChange={(e) => setEditingService({ 
                    ...editingService, 
                    features: e.target.value.split(',').map(f => f.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md"
                >
                  Update Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: ADD PROJECT MODAL                                                */}
      {/* ========================================================================= */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0c1022] border border-purple-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-4">Add New Portfolio Case Study</h3>

            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Brand Name / Project Title *</label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="e.g. ZenFit Activewear"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Category</label>
                <input
                  type="text"
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  placeholder="e.g. D2C Fashion & Apparel"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description / Growth Result</label>
                <textarea
                  rows={2}
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Scaled from 0 to 45 Lakhs/mo on Amazon with 4.8x ROAS..."
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={newProject.image_url}
                  onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Live Store URL</label>
                <input
                  type="text"
                  value={newProject.live_url}
                  onChange={(e) => setNewProject({ ...newProject, live_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                  placeholder="Shopify, Amazon, Meta Ads, 4x ROAS"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md"
                >
                  Publish Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: ADD BLOG POST MODAL                                              */}
      {/* ========================================================================= */}
      {showAddBlogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0c1022] border border-purple-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-3">Publish New Article to Hub</h3>

            <form onSubmit={handleCreateBlog} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={newBlogForm.title}
                  onChange={(e) => setNewBlogForm({ ...newBlogForm, title: e.target.value })}
                  placeholder="e.g. 5 Growth Levers for Amazon India in 2026"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={newBlogForm.category}
                    onChange={(e) => setNewBlogForm({ ...newBlogForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={newBlogForm.read_time}
                    onChange={(e) => setNewBlogForm({ ...newBlogForm, read_time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Short Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={newBlogForm.excerpt}
                  onChange={(e) => setNewBlogForm({ ...newBlogForm, excerpt: e.target.value })}
                  placeholder="A short punchy preview of the article..."
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Full Article Content (Markdown/Text) *</label>
                <textarea
                  rows={5}
                  required
                  value={newBlogForm.content}
                  onChange={(e) => setNewBlogForm({ ...newBlogForm, content: e.target.value })}
                  placeholder="Write the full content of the post here..."
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddBlogModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
