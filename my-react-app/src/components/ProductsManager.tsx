import { useState, useEffect, useCallback } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import type { Product, ProductFormDto } from '../types/product';
import {
  Package, Plus, Trash2, RefreshCw, AlertCircle, Loader2,
  CheckCircle2, Search, Pencil, X
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = ['Breakfast', 'Starters', 'Vegan', 'Main Dishes', 'Desserts', 'Drinks'];

const EMPTY_FORM: ProductFormDto = {
  name: '',
  description: '',
  price: 0,
  category: 'Breakfast',
  image: '',
  ingredients: '[]',
  dietary: '[]',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convert JSON array string → comma-separated display string */
function jsonToDisplay(jsonStr: string): string {
  if (!jsonStr) return '';
  try {
    const arr = JSON.parse(jsonStr);
    return Array.isArray(arr) ? arr.join(', ') : '';
  } catch {
    return '';
  }
}

/** Convert comma-separated display string → JSON array string */
function displayToJson(display: string): string {
  if (!display.trim()) return '[]';
  const items = display.split(',').map(s => s.trim()).filter(Boolean);
  return JSON.stringify(items);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProductRow({
  product,
  onEdit,
  onDelete,
  deleting,
}: {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
  deleting: boolean;
}) {
  return (
    <tr className="border-t border-gray-800 hover:bg-gray-800/40 transition-colors">
      <td className="p-3 text-gray-500 font-mono text-xs">#{product.id}</td>
      <td className="p-3">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
        ) : (
          <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-gray-500" />
          </div>
        )}
      </td>
      <td className="p-3 text-white font-semibold text-sm">{product.name}</td>
      <td className="p-3">
        <span className="px-2 py-0.5 rounded-full text-xs bg-blue-900/30 text-blue-300 whitespace-nowrap">
          {product.category}
        </span>
      </td>
      <td className="p-3 text-gray-400 text-xs max-w-[180px] truncate">{product.description || '—'}</td>
      <td className="p-3">
        <span className="text-amber-400 font-bold text-sm">{product.price.toFixed(2)} MDL</span>
      </td>
      <td className="p-3 text-gray-500 text-xs truncate max-w-[150px]" title={jsonToDisplay(product.ingredients)}>
        {jsonToDisplay(product.ingredients) || '—'}
      </td>
      <td className="p-3 text-gray-500 text-xs truncate max-w-[100px]" title={jsonToDisplay(product.dietary)}>
        {jsonToDisplay(product.dietary) || '—'}
      </td>
      <td className="p-3">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-blue-400 hover:bg-blue-900/30 border border-blue-800/50 hover:border-blue-600 transition-all text-xs cursor-pointer"
          >
            <Pencil className="w-3 h-3" /> Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            disabled={deleting}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-red-400 hover:bg-red-900/30 border border-red-800/50 hover:border-red-600 transition-all text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {deleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadStatus, setLoadStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [loadError, setLoadError] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState<ProductFormDto>(EMPTY_FORM);
  // Ingredients/dietary are shown as comma strings in form, converted to JSON on submit
  const [ingredientsDisplay, setIngredientsDisplay] = useState('');
  const [dietaryDisplay, setDietaryDisplay] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null); // null = create mode

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // ── Load ─────────────────────────────────────────────────────────────────────
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

  useEffect(() => { loadProducts(); }, [loadProducts]);

  // ── Enter edit mode ───────────────────────────────────────────────────────────
  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      category: product.category || 'Menu',
      image: product.image || '',
      ingredients: product.ingredients || '[]',
      dietary: product.dietary || '[]',
    });
    setIngredientsDisplay(jsonToDisplay(product.ingredients));
    setDietaryDisplay(jsonToDisplay(product.dietary));
    setSubmitStatus('idle');
    setSubmitError(null);
    
    // Smooth scroll to top where form is
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setIngredientsDisplay('');
    setDietaryDisplay('');
    setSubmitStatus('idle');
    setSubmitError(null);
  };

  // ── Submit (create or update) ─────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const payload: ProductFormDto = {
      ...form,
      price: Number(form.price),
      ingredients: displayToJson(ingredientsDisplay),
      dietary: displayToJson(dietaryDisplay),
    };

    setSubmitStatus('loading');
    setSubmitError(null);
    
    try {
      if (editingId !== null) {
        // Update
        await updateProduct(editingId, payload);
        // Optimistic UI update
        setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...payload, id: editingId } : p));
        setEditingId(null);
      } else {
        // Create
        const created = await createProduct(payload);
        setProducts(prev => [created, ...prev]);
      }
      
      setForm(EMPTY_FORM);
      setIngredientsDisplay('');
      setDietaryDisplay('');
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus('idle'), 2500);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to save product');
      setSubmitStatus('error');
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────────
  const handleDelete = async (id: number) => {
    if (!window.confirm(`Are you sure you want to delete product #${id}?`)) return;
    
    setDeletingId(id);
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      if (editingId === id) handleCancelEdit();
    } catch {
      alert("Failed to delete product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // ── Search & Filter ───────────────────────────────────────────────────────────
  const filteredProducts = products.filter(p => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  });

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">

      {/* ── Form Section ─────────────────────────────────────────────────────── */}
      <div id="product-form-section" className="bg-[#242424] rounded-2xl border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {editingId !== null ? (
              <Pencil className="w-5 h-5 text-amber-400" />
            ) : (
              <Plus className="w-5 h-5 text-blue-400" />
            )}
            <h3 className="text-xl font-bold text-white">
              {editingId !== null ? `Edit Product #${editingId}` : 'Add New Product'}
            </h3>
          </div>
          {editingId !== null && (
            <button
              onClick={handleCancelEdit}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700 text-sm transition-all cursor-pointer"
            >
              <X className="w-4 h-4" /> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name + Category + Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="product-name" className="block text-sm text-gray-400 mb-1.5">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                id="product-name" type="text" required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Grilled Salmon"
                className="w-full h-11 px-4 rounded-xl bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>
            <div>
              <label htmlFor="product-category" className="block text-sm text-gray-400 mb-1.5">Category</label>
              <div className="relative">
<Select
  value={form.category}
  onValueChange={(value) =>
    setForm(f => ({ ...f, category: value }))
  }
>
  <SelectTrigger className="w-full h-11 rounded-2xl bg-[#1a1a1a] border border-gray-700 text-white">
    <SelectValue placeholder="Select a category" />
  </SelectTrigger>

  <SelectContent className="rounded-2xl bg-[#1a1a1a] border border-gray-700 text-white">
    {CATEGORIES.map(c => (
      <SelectItem key={c} value={c}>
        {c}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="product-price" className="block text-sm text-gray-400 mb-1.5">
                Price (MDL) <span className="text-red-400">*</span>
              </label>
              <input
                id="product-price" type="number" required min={0} step={0.01}
                value={form.price === 0 ? '' : form.price}
                onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))}
                placeholder="0.00"
                className="w-full h-11 px-4 rounded-xl bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Row 2: Description */}
          <div>
            <label htmlFor="product-description" className="block text-sm text-gray-400 mb-1.5">Description</label>
            <textarea
              id="product-description" rows={2}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Short description of the dish..."
              className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
            />
          </div>

          {/* Row 3: Image */}
          <div>
            <label htmlFor="product-image" className="block text-sm text-gray-400 mb-1.5">Image URL</label>
            <div className="flex gap-3">
              <input
                id="product-image" type="text"
                value={form.image}
                onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                placeholder="/images/dish.webp or https://images.unsplash.com/..."
                className="flex-1 h-11 px-4 rounded-xl bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
              {form.image && (
                <img src={form.image} alt="preview" className="h-11 w-11 rounded-xl object-cover border border-gray-700 flex-shrink-0 bg-[#1a1a1a]" />
              )}
            </div>
          </div>

          {/* Row 4: Ingredients + Dietary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="product-ingredients" className="block text-sm text-gray-400 mb-1.5">
                Ingredients <span className="text-gray-500 text-xs">(comma-separated)</span>
              </label>
              <input
                id="product-ingredients" type="text"
                value={ingredientsDisplay}
                onChange={e => setIngredientsDisplay(e.target.value)}
                placeholder="e.g. salmon, asparagus, lemon"
                className="w-full h-11 px-4 rounded-xl bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>
            <div>
              <label htmlFor="product-dietary" className="block text-sm text-gray-400 mb-1.5">
                Dietary Tags <span className="text-gray-500 text-xs">(comma-separated)</span>
              </label>
              <input
                id="product-dietary" type="text"
                value={dietaryDisplay}
                onChange={e => setDietaryDisplay(e.target.value)}
                placeholder="e.g. vegan, gluten-free"
                className="w-full h-11 px-4 rounded-xl bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={submitStatus === 'loading'}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm text-white ${
                editingId !== null ? 'bg-amber-600 hover:bg-amber-500' : 'bg-blue-600 hover:bg-blue-500'
              }`}
            >
              {submitStatus === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : editingId !== null ? (
                <Pencil className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {submitStatus === 'loading'
                ? 'Processing…'
                : editingId !== null
                ? 'Save Changes'
                : 'Add Product'}
            </button>
            
            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                {editingId !== null ? 'Product updated successfully!' : 'Product added successfully!'}
              </div>
            )}
            {submitStatus === 'error' && submitError && (
              <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                <AlertCircle className="w-4 h-4" />
                {submitError}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* ── Products Table ────────────────────────────────────────────────────── */}
      <div className="bg-[#242424] rounded-2xl border border-gray-800 overflow-hidden shadow-lg">
        {/* Header + Search */}
        <div className="p-6 border-b border-gray-800 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-400" />
              <h3 className="text-xl font-bold text-white">Database Products</h3>
              {loadStatus === 'idle' && (
                <span className="ml-2 px-2.5 py-0.5 rounded-full bg-gray-700 text-gray-300 text-xs font-medium">
                  {filteredProducts.length}{filteredProducts.length !== products.length && ` of ${products.length}`} items
                </span>
              )}
            </div>
            <button
              onClick={loadProducts}
              disabled={loadStatus === 'loading'}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700 transition-all disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loadStatus === 'loading' ? 'animate-spin' : ''}`} />
              Refresh list
            </button>
          </div>

          <div className="flex items-center gap-3 bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-2.5 focus-within:border-blue-500 transition-colors">
            <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search products by name, category or description..."
              className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-gray-500 hover:text-white cursor-pointer transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* States */}
        {loadStatus === 'loading' && (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
            <p className="text-gray-400">Loading products from backend...</p>
          </div>
        )}
        
        {loadStatus === 'error' && loadError && (
          <div className="p-12 text-center">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 font-semibold mb-2 text-lg">Connection Error</p>
            <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">{loadError}</p>
            <button onClick={loadProducts} className="px-6 py-2.5 rounded-xl bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white text-sm transition-all cursor-pointer font-medium">
              Try Again
            </button>
          </div>
        )}
        
        {loadStatus === 'idle' && filteredProducts.length === 0 && (
          <div className="p-16 text-center">
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-300 font-medium text-lg mb-2">
              {searchTerm ? 'No search results found' : 'No products found'}
            </p>
            <p className="text-gray-500 text-sm">
              {searchTerm ? `No products match "${searchTerm}".` : 'The database is currently empty. Add your first product above.'}
            </p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-6 px-4 py-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Custom Table */}
        {loadStatus === 'idle' && filteredProducts.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1e1e1e]">
                <tr>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Image</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider min-w-[150px]">Name</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ingredients</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Dietary</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filteredProducts.map(product => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onEdit={handleEdit}
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
