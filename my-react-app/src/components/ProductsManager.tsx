import { useState, useEffect, useCallback } from 'react';
import { getProducts, createProduct, deleteProduct } from '../services/productService';
import type { Product, CreateProductDto } from '../types/product';
import { Package, Plus, Trash2, RefreshCw, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = CreateProductDto;
const EMPTY_FORM: FormState = { name: '', price: 0, description: '' };

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProductRow({
  product,
  onDelete,
  deleting,
}: {
  product: Product;
  onDelete: (id: number) => void;
  deleting: boolean;
}) {
  return (
    <tr className="border-t border-gray-800 hover:bg-gray-800/40 transition-colors">
      <td className="p-4 text-gray-400 font-mono text-sm">#{product.id}</td>
      <td className="p-4 text-white font-semibold">{product.name}</td>
      <td className="p-4 text-gray-300 text-sm max-w-xs truncate">{product.description}</td>
      <td className="p-4">
        <span className="text-amber-400 font-bold">{product.price.toFixed(2)} MDL</span>
      </td>
      <td className="p-4">
        <button
          id={`delete-product-${product.id}`}
          onClick={() => onDelete(product.id)}
          disabled={deleting}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-400 hover:bg-red-900/30 border border-red-800/50 hover:border-red-600 transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {deleting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Trash2 className="w-3.5 h-3.5" />
          )}
          Delete
        </button>
      </td>
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadStatus, setLoadStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [loadError, setLoadError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  // ── Load products ────────────────────────────────────────────────────────────
  const loadProducts = useCallback(async () => {
    setLoadStatus('loading');
    setLoadError(null);
    try {
      const data = await getProducts();
      setProducts(data);
      setLoadStatus('idle');
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Unknown error');
      setLoadStatus('error');
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // ── Submit new product ───────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setSubmitStatus('loading');
    setSubmitError(null);
    try {
      const created = await createProduct({
        name: form.name.trim(),
        price: Number(form.price),
        description: form.description.trim(),
      });
      setProducts(prev => [created, ...prev]);
      setForm(EMPTY_FORM);
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus('idle'), 2500);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to create product');
      setSubmitStatus('error');
    }
  };

  // ── Delete product ───────────────────────────────────────────────────────────
  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch {
      // silent — keep item in list so user sees it didn't delete
    } finally {
      setDeletingId(null);
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      {/* ── Add Product Form ─────────────────────────────────────────────────── */}
      <div className="bg-[#242424] rounded-2xl border border-gray-800 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Plus className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-bold text-white">Add Product to Database</h3>
        </div>

        <form id="add-product-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="product-name" className="block text-sm text-gray-400 mb-1.5">
                Product Name <span className="text-red-400">*</span>
              </label>
              <input
                id="product-name"
                type="text"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Grilled Salmon"
                className="w-full h-11 px-4 rounded-xl bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="product-price" className="block text-sm text-gray-400 mb-1.5">
                Price (MDL) <span className="text-red-400">*</span>
              </label>
              <input
                id="product-price"
                type="number"
                required
                min={0}
                step={0.01}
                value={form.price === 0 ? '' : form.price}
                onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))}
                placeholder="e.g. 185"
                className="w-full h-11 px-4 rounded-xl bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="product-description" className="block text-sm text-gray-400 mb-1.5">
                Description
              </label>
              <input
                id="product-description"
                type="text"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Short description..."
                className="w-full h-11 px-4 rounded-xl bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              id="submit-product-btn"
              type="submit"
              disabled={submitStatus === 'loading'}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
            >
              {submitStatus === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {submitStatus === 'loading' ? 'Adding…' : 'Add Product'}
            </button>

            {/* Feedback messages */}
            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Product added successfully!
              </div>
            )}
            {submitStatus === 'error' && submitError && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {submitError}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* ── Products List ────────────────────────────────────────────────────── */}
      <div className="bg-[#242424] rounded-2xl border border-gray-800 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Products in Database</h3>
            {loadStatus === 'idle' && (
              <span className="ml-2 px-2.5 py-0.5 rounded-full bg-gray-700 text-gray-300 text-xs font-medium">
                {products.length}
              </span>
            )}
          </div>
          <button
            id="refresh-products-btn"
            onClick={loadProducts}
            disabled={loadStatus === 'loading'}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loadStatus === 'loading' ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Loading skeleton */}
        {loadStatus === 'loading' && (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-3" />
            <p className="text-gray-400">Loading products from backend…</p>
          </div>
        )}

        {/* Error state */}
        {loadStatus === 'error' && loadError && (
          <div className="p-8 text-center">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
            <p className="text-red-400 font-semibold mb-1">Could not connect to backend</p>
            <p className="text-gray-500 text-sm mb-4">{loadError}</p>
            <button
              onClick={loadProducts}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm transition-all cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {loadStatus === 'idle' && products.length === 0 && (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No products in database yet.</p>
            <p className="text-gray-600 text-sm mt-1">Use the form above to add the first one.</p>
          </div>
        )}

        {/* Table */}
        {loadStatus === 'idle' && products.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/60">
                <tr>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">ID</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">Name</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">Description</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">Price</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onDelete={handleDelete}
                    deleting={deletingId === product.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
