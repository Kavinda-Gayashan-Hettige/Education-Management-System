import React, { useState } from 'react';

function AddCourseForm({ onAdd }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [durationMonths, setDurationMonths] = useState('');
    const [fee, setFee] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        const newCourse = {
            name,
            description,
            durationMonths: parseInt(durationMonths, 10),
            fee: parseFloat(fee)
        };
        
        onAdd(newCourse);
        
       
        setName('');
        setDescription('');
        setDurationMonths('');
        setFee('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row g-3">
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Course Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="col-md-4">
                    <input type="number" className="form-control" placeholder="Duration (Months)" value={durationMonths} onChange={(e) => setDurationMonths(e.target.value)} required min="1" />
                </div>
                <div className="col-md-4">
                    <input type="number" step="0.01" className="form-control" placeholder="Fee (Rs.)" value={fee} onChange={(e) => setFee(e.target.value)} required min="0" />
                </div>
                <div className="col-md-4">
                    <button type="submit" className="btn btn-success w-100">
                        Add Course (ADMIN Only)
                    </button>
                </div>
            </div>
        </form>
    );
}

export default AddCourseForm;