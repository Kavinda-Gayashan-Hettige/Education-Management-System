import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Messages() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedSender, setSelectedSender] = useState('teacher');
    const [activeTab, setActiveTab] = useState('all');
    const [loading, setLoading] = useState(true);
    
   
    const scrollRef = useRef(null);

  
    useEffect(() => {
        fetchMessages();
    }, []);

    
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const fetchMessages = async () => {
        try {
            setLoading(true);
          
            const response = await axios.get('http://localhost:8080/api/messages');
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    };

   
    const sendMessage = async () => {
        if (newMessage.trim() === '') return;

        const messageData = {
            sender: selectedSender,
            name: selectedSender === 'teacher' ? 'You (Teacher)' : 'You (Parent)',
            message: newMessage,
            
        };

        try {
            const response = await axios.post('http://localhost:8080/api/messages', messageData);
            
         
            setMessages([...messages, response.data]);
            setNewMessage('');
        } catch (error) {
            alert("Message send කරන්න බැරි වුණා. නැවත උත්සාහ කරන්න.");
        }
    };

   
    const filteredMessages = messages.filter(msg => {
        if (activeTab === 'all') return true;
        return msg.sender === (activeTab === 'teachers' ? 'teacher' : 'parent');
    });

    return (
        <div className="container-fluid py-4 bg-light min-vh-100">
            <div className="container">
                {/* Header Section */}
                <div className="row mb-4">
                    <div className="col-12 d-flex justify-content-between align-items-center bg-white p-3 rounded shadow-sm">
                        <h3 className="text-primary mb-0">
                            <i className="bi bi-chat-left-dots-fill me-2"></i>
                            Communication Portal
                        </h3>
                        <div className="text-end">
                            <span className="badge bg-danger rounded-pill px-3 py-2">
                                {messages.filter(m => !m.isRead).length} New Messages
                            </span>
                        </div>
                    </div>
                </div>

                <div className="row g-3">
                    {/* Contacts/Tabs */}
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm overflow-hidden">
                            <div className="list-group list-group-flush">
                                {['all', 'teachers', 'parents'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`list-group-item list-group-item-action border-0 p-3 ${activeTab === tab ? 'bg-primary text-white' : ''}`}
                                    >
                                        <i className={`bi bi-${tab === 'all' ? 'collection' : tab === 'teachers' ? 'person-badge' : 'people'} me-2`}></i>
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Chat Window */}
                    <div className="col-md-8">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                                <h6 className="mb-0">Chat Feed</h6>
                                <div className="btn-group btn-group-sm">
                                    <button className={`btn ${selectedSender === 'teacher' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setSelectedSender('teacher')}>As Teacher</button>
                                    <button className={`btn ${selectedSender === 'parent' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setSelectedSender('parent')}>As Parent</button>
                                </div>
                            </div>

                            <div 
                                className="card-body bg-white" 
                                style={{ height: '450px', overflowY: 'auto' }}
                                ref={scrollRef}
                            >
                                {loading ? (
                                    <div className="text-center mt-5">
                                        <div className="spinner-border text-primary" role="status"></div>
                                        <p className="mt-2">Loading messages...</p>
                                    </div>
                                ) : filteredMessages.length === 0 ? (
                                    <div className="text-center mt-5 text-muted">No messages found.</div>
                                ) : (
                                    filteredMessages.map((msg) => (
                                        <div key={msg.id} className={`d-flex mb-3 ${msg.sender === selectedSender ? 'justify-content-end' : 'justify-content-start'}`}>
                                            <div 
                                                className={`p-3 rounded-3 shadow-sm ${msg.sender === selectedSender ? 'bg-primary text-white' : 'bg-light border'}`}
                                                style={{ maxWidth: '75%' }}
                                            >
                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                    <small className="fw-bold">{msg.name}</small>
                                                    <small className="ms-3 opacity-75" style={{ fontSize: '0.75rem' }}>{msg.time || 'Today'}</small>
                                                </div>
                                                <p className="mb-0">{msg.message}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="card-footer bg-white border-0 p-3">
                                <div className="input-group shadow-sm rounded-pill overflow-hidden">
                                    <input
                                        type="text"
                                        className="form-control border-0 px-4 py-2"
                                        placeholder="Type your message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    />
                                    <button className="btn btn-primary px-4" onClick={sendMessage} disabled={!newMessage.trim()}>
                                        <i className="bi bi-send-fill"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;