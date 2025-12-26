import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Attendance() {
    return (
        <div 
            className="d-flex flex-column justify-content-center align-items-center min-vh-100"
            style={{
                backgroundImage: 'url(src/assets/ems-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="bg-dark bg-opacity-50 p-4 rounded">
                <h2 className="text-white text-center mb-4">Attendance</h2>
                
              
                <div className="card" style={{ width: '100%', maxWidth: '600px' }}>
                    <div className="card-body">
                        <h5 className="card-title">Attendance Form</h5>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Teacher ID</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Date</label>
                                <input type="date" className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Attendance;