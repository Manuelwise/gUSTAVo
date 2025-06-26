import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RequestForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [formData, setFormData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ });
 
  const onSubmit = (data) => {
    if (!data.fromMonth || !data.fromYear || !data.toMonth || !data.toYear) {
      setSubmitStatus('error');
      alert('Please select both month and year for From and To dates.');
      return;
    }
    const fromDate = `${data.fromYear}-${data.fromMonth}-01`;
    const toDate = `${data.toYear}-${data.toMonth}-01`;
    const finalData = { ...data, fromDate, toDate};
    setFormData(finalData); 
    setIsConfirming(true);  
  };

  console.log("formData:",formData);
  

  const confirmSubmit = async () => {
    setIsSubmitting(true);
    try {
        const response = await axios.post('http://localhost:5000/api/requests/request', formData);
        console.log(response.data);
        setSubmitStatus('success');
        await new Promise(resolve => setTimeout(resolve, 1000));
        reset();
    } catch (error) {
        setSubmitStatus('error');
        console.error(error);
    } finally {
        setIsSubmitting(false);
        setIsConfirming(false);
    }
};

  
  
  const months = [
    { value: '01', label: 'January' }, { value: '02', label: 'February' },
    { value: '03', label: 'March' }, { value: '04', label: 'April' },
    { value: '05', label: 'May' }, { value: '06', label: 'June' },
    { value: '07', label: 'July' }, { value: '08', label: 'August' },
    { value: '09', label: 'September' }, { value: '10', label: 'October' },
    { value: '11', label: 'November' }, { value: '12', label: 'December' }
  ];

  const years = Array.from({ length: 70 }, (_, i) => ({
    value: new Date().getFullYear() - i,
    label: new Date().getFullYear() - i
  }));

  return (
    <div className="min-h-screen py-8 flex items-center justify-center bg-gradient-to-br from-yellow-500 via-black to-white">
      <div className="max-w-2xl w-full bg-gray-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Request File Access</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Officer Name *</label>
            <input {...register('officerName', { required: 'This field is required' })} className="w-full p-2 border rounded" />
            {errors.officerName && <span className="text-red-500 text-sm">{errors.officerName.message}</span>}
          </div>

          <div>
            <label className="block mb-1">Email *</label>
            <input
              type="email"
              {...register('email', {
                required: 'This field is required',
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                  message: 'Invalid email address' }
              })}
              className="w-full p-2 border rounded"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block mb-1">Name of Supervisor *</label>
            <input {...register('supervisorName', { required: 'Supervisor Name is required' })} className="w-full p-2 border rounded" />
            {errors.supervisorName && <span className="text-red-500 text-sm">{errors.supervisorName.message}</span>}
          </div>

          <div>
            <label className="block mb-1">Department *</label>
            <select {...register('department', { required: 'This field is required' })} className="w-full p-2 border rounded">
              <option value="">Select Department</option>
              <option value="R&D">R&D</option>
              <option value="WORKS">Works</option>
              <option value="FINANCE">Finance</option>
              <option value="HUMAN RESOURCES">Human Resources</option>
              <option value="IT">IT</option>
              <option value="GEOLOGY">Geology</option>
              <option value="GEOPHYSICS">Geophysics</option>
              <option value="LEGAL">Legal</option>
              <option value="ENGINEERING">Engineering</option>
              <option value="CORPORATE FINANCE">Corporate Finance</option>
              <option value="SAFETY">Safety</option>
            </select>
            {errors.department && <span className="text-red-500 text-sm">{errors.department.message}</span>}
          </div>

          <div>
            <label className="block mb-1">Document Title *</label>
            <input {...register('documentTitle', { required: 'This field is required' })} className="w-full p-2 border rounded" />
            {errors.documentTitle && <span className="text-red-500 text-sm">{errors.documentTitle.message}</span>}
          </div>

          <div>
            <label className="block mb-1">Document Reference/ Additional Info</label>
            <textarea {...register('documentReference')} className="w-full p-2 border rounded h-32" />
          </div>

         <div>
             <label className="block mb-1">Document Type *</label>
             <select 
              {...register('documentType', { required: 'This field is required' })} 
              className="w-full p-2 border rounded"
            >
                 <option value="">Select Document Type</option>
                 <option value="original">Original Document</option>
                 <option value="scanned">Scanned Copy</option>
                 <option value="photocopy">Photocopy</option>
             </select>
             {errors.documentType && <span className="text-red-500 text-sm">{errors.documentType.message}</span>}
         </div>

          <div>
            {/* <label className="block mb-1">File Date *</label> */}
            <div className="space-y-2">
              <div className="flex space-x-2">
                <label className="block mb-1 w-10">From</label>
                <select {...register('fromMonth')} className="w-1/2 p-2 border rounded">
                  <option value="">Month</option>
                  {months.map(month => <option key={month.value} value={month.value}>{month.label}</option>)}
                </select>
                <select {...register('fromYear')} className="w-1/2 p-2 border rounded">
                  <option value="">Year</option>
                  {years.map(year => <option key={year.value} value={year.value}>{year.label}</option>)}
                </select>
              </div>
              <div className="flex space-x-2">
                <label className="block mb-1 w-10">To</label>
                <select {...register('toMonth')} className="w-1/2 p-2 border rounded">
                  <option value="">Month</option>
                  {months.map(month => <option key={month.value} value={month.value}>{month.label}</option>)}
                </select>
                <select {...register('toYear')} className="w-1/2 p-2 border rounded">
                  <option value="">Year</option>
                  {years.map(year => <option key={year.value} value={year.value}>{year.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1">Corporate Contact *</label>
            <div className="flex">
              <span className="p-2 bg-gray-200 border rounded-l">+233</span>
              <input
                {...register('corporateNumber', {
                  required: 'This field is required',
                  pattern: { value: /^\d{9}$/, message: 'Please enter exactly 9 digits after +233' }
                })}
                maxLength={9}
                className="w-full p-2 border rounded-r"
                placeholder="123456789"
              />
            </div>
            {errors.corporateNumber && <span className="text-red-500 text-sm">{errors.corporateNumber.message}</span>}
          </div>

          <div>
            <label className="block mb-1">Personal Contact</label>
            <div className="flex">
              <span className="p-2 bg-gray-200 border rounded-l">+233</span>
              <input
                {...register('personalNumber', {
                  
                  pattern: { value: /^\d{9}$/, message: 'Please enter exactly 9 digits after +233' }
                })}
                maxLength={9}
                className="w-full p-2 border rounded-r"
                placeholder="123456789"
              />
            </div>
            {errors.personalNumber && <span className="text-red-500 text-sm">{errors.personalNumber.message}</span>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Send Request
          </button>
        </form>

        {submitStatus === 'success' && <div className="text-green-600 text-center">Request submitted successfully!</div>}
        {submitStatus === 'error' && <div className="text-red-600 text-center">An error occurred. Please try again.</div>}
      </div>

      {isConfirming && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Request Details</h3>
            <div className="text-left space-y-2 text-sm border-t border-b py-4 mb-4">
              <p><strong>Officer Name:</strong> {formData.officerName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Supervisor Name:</strong> {formData.supervisorName}</p>
              <p><strong>Department:</strong> {formData.department}</p>
              <p><strong>Document Title:</strong> {formData.documentTitle}</p>
              <p><strong>Document Reference:</strong> {formData.documentReference || 'N/A'}</p>
              <p><strong>Document Type:</strong> {formData.documentType}</p>
              <p><strong>From</strong> {formData.fromDate}</p>
              <p><strong>To</strong> {formData.toDate}</p>
              <p><strong>Corporate Number:</strong> +233{formData.corporateNumber}</p>
              <p><strong>Personal Number:</strong> +233{formData.personalNumber}</p>
            </div>
            <button 
                onClick={confirmSubmit} 
                className={`bg-green-600 text-white px-4 py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} 
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Yes, Submit'}
            </button>
            <button 
                onClick={() => setIsConfirming(false)} 
                className="bg-red-600 text-white px-4 py-2 rounded ml-2"
            >
                Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestForm;
