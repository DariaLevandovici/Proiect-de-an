import { useState } from 'react';
import { Briefcase, User, Mail, Phone, Upload, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router';

const positions = [
  {
    id: 'waiter',
    title: 'Waiter',
    description: 'Join our front-of-house team and deliver exceptional service',
    requirements: ['Excellent communication skills', 'Customer service experience', 'Team player']
  },
  {
    id: 'cook',
    title: 'Cook',
    description: 'Create amazing dishes in our professional kitchen',
    requirements: ['Culinary training or experience', 'Knowledge of food safety', 'Passion for cooking']
  },
  {
    id: 'manager',
    title: 'Manager',
    description: 'Lead our team and ensure smooth operations',
    requirements: ['Restaurant management experience', 'Leadership skills', 'Problem-solving ability']
  }
];

export function CareerPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    position: '',
    fullName: '',
    email: '',
    phone: '',
    cv: null as File | null,
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Application submitted successfully! We will contact you soon.');
    navigate('/');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cv: e.target.files[0] });
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Join Our Team</h1>
          <p className="text-gray-400 text-lg">Be part of the GastroFlow family</p>
        </div>

        {/* Available Positions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {positions.map(position => (
            <div
              key={position.id}
              className="bg-[#242424] rounded-2xl p-6 border border-gray-800 hover:border-blue-700 transition-all"
            >
              <Briefcase className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{position.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{position.description}</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 font-semibold">Requirements:</p>
                <ul className="space-y-1">
                  {position.requirements.map((req, idx) => (
                    <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <div className="bg-[#242424] rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-8">Application Form</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Position Selection */}
            <div>
              <label className="flex items-center gap-2 text-white mb-3">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <span>Position Applied For</span>
              </label>
              <select
                required
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-full border border-gray-700 focus:border-blue-600 outline-none"
              >
                <option value="">Select a position</option>
                {positions.map(pos => (
                  <option key={pos.id} value={pos.id}>{pos.title}</option>
                ))}
              </select>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-white mb-3">
                  <User className="w-5 h-5 text-blue-400" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-600 outline-none placeholder-gray-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-white mb-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-600 outline-none placeholder-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-white mb-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+373 XXX XXX XX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-600 outline-none placeholder-gray-500"
              />
            </div>

            {/* CV Upload */}
            <div>
              <label className="flex items-center gap-2 text-white mb-3">
                <Upload className="w-5 h-5 text-blue-400" />
                <span>Upload CV</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-600 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-700 file:text-white hover:file:bg-blue-600 file:cursor-pointer"
                />
              </div>
              {formData.cv && (
                <p className="text-sm text-green-400 mt-2">✓ {formData.cv.name}</p>
              )}
            </div>

            {/* Cover Message */}
            <div>
              <label className="flex items-center gap-2 text-white mb-3">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <span>Cover Letter / Message</span>
              </label>
              <textarea
                required
                rows={6}
                placeholder="Tell us why you'd be a great fit for our team..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-600 outline-none placeholder-gray-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-700 hover:bg-blue-600 text-white py-4 rounded-full font-bold transition-colors"
              >
                Submit Application
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-8 bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-full transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}