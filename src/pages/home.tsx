import { useEffect, useState } from 'react';
import { Item } from '@/models/Item'; // Assuming you have this model created
import { Dialog } from '@headlessui/react'; // Modal component

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [formData, setFormData] = useState<Item>({ name: '', description: '', price: 0 });
  const [editing, setEditing] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchItems = async () => {
    const response = await fetch('/api/items');
    const data = await response.json();
    setItems(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await fetch(`/api/items`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: editing._id, ...formData }),
      });
    } else {
      await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    }
    setFormData({ name: '', description: '', price: 0 });
    setEditing(null);
    setIsModalOpen(false);
    fetchItems();
  };

  const handleEdit = (item: Item) => {
    setFormData(item);
    setEditing(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/items`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id }), // Ensure the correct ID is passed
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      await fetchItems(); // Refresh the items list
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item.');
    }
  };


  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 ">CRUD Application</h1>


      <button
  type="submit"
  className="float-right bg-indigo-600 px-4 py-2 text-sm font-semibold text-white rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-4"
  onClick={() => setIsModalOpen(true)}
>
  Add Item
</button>

      
   
<table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden mt-8">
<thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-400 text-white px-4 py-2 rounded-lg mr-2 shadow hover:bg-yellow-400 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id!)}
                  className="bg-red-400 text-white px-4 py-2 rounded-lg shadow hover:bg-red-400 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit Item */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-10">
        <div className="fixed inset-0 bg-black bg-opacity-30"></div>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg transform transition-all">
            <Dialog.Title className="text-2xl font-semibold mb-4 text-gray-800">{editing ? 'Edit Item' : 'Add Item'}</Dialog.Title>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full mb-6 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                >
                  {editing ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
