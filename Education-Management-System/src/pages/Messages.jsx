import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Messages() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'teacher', name: 'Mr. Perera', message: 'Parent meeting tomorrow at 2 PM', time: '10:30 AM', date: '2024-01-15', isRead: true },
        { id: 2, sender: 'parent', name: 'Mrs. Silva', message: 'Can I get the homework for this week?', time: '9:15 AM', date: '2024-01-15', isRead: true },
        { id: 3, sender: 'teacher', name: 'Ms. Fernando', message: 'Sports day on Friday', time: 'Yesterday', date: '2024-01-14', isRead: false },
        { id: 4, sender: 'parent', name: 'Mr. Rajapaksa', message: 'My son will be absent tomorrow', time: 'Yesterday', date: '2024-01-14', isRead: true },
    ]);

    const [newMessage, setNewMessage] = useState('');
    const [selectedSender, setSelectedSender] = useState('teacher');
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'teachers', 'parents'

    const sendMessage = () => {
        if (newMessage.trim() === '') return;
        
        const newMsg = {
            id: messages.length + 1,
            sender: selectedSender,
            name: selectedSender === 'teacher' ? 'You (Teacher)' : 'You (Parent)',
            message: newMessage,
            time: 'Just now',
            date: new Date().toISOString().split('T')[0],
            isRead: true
        };
        
        setMessages([newMsg, ...messages]);
        setNewMessage('');
    };

    const filteredMessages = messages.filter(msg => {
        if (activeTab === 'all') return true;
        if (activeTab === 'teachers') return msg.sender === 'teacher';
        if (activeTab === 'parents') return msg.sender === 'parent';
        return true;
    });

    const unreadCount = messages.filter(msg => !msg.isRead).length;

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="text-primary">
                            <i className="bi bi-chat-dots me-2"></i>
                            Teacher-Parent Communication
                        </h2>
                        <span className="badge bg-danger rounded-pill">
                            {unreadCount} unread
                        </span>
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Left Sidebar - Contacts/Users */}
                <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
                    <div className="card h-100 shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Contacts</h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="list-group list-group-flush">
                                <button 
                                    className={`list-group-item list-group-item-action ${activeTab === 'all' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('all')}
                                >
                                    <i className="bi bi-people me-2"></i>
                                    All Messages
                                    <span className="badge bg-secondary float-end">{messages.length}</span>
                                </button>
                                <button 
                                    className={`list-group-item list-group-item-action ${activeTab === 'teachers' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('teachers')}
                                >
                                    <i className="bi bi-person-badge me-2"></i>
                                    Teachers
                                    <span className="badge bg-info float-end">
                                        {messages.filter(m => m.sender === 'teacher').length}
                                    </span>
                                </button>
                                <button 
                                    className={`list-group-item list-group-item-action ${activeTab === 'parents' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('parents')}
                                >
                                    <i className="bi bi-person-circle me-2"></i>
                                    Parents
                                    <span className="badge bg-success float-end">
                                        {messages.filter(m => m.sender === 'parent').length}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="col-md-8 col-lg-9">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-light d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-0">Messages</h5>
                                <small className="text-muted">
                                    {activeTab === 'all' ? 'All conversations' : 
                                     activeTab === 'teachers' ? 'Teachers only' : 'Parents only'}
                                </small>
                            </div>
                            <div className="btn-group">
                                <button 
                                    className={`btn btn-sm ${selectedSender === 'teacher' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setSelectedSender('teacher')}
                                >
                                    <i className="bi bi-person-badge me-1"></i> As Teacher
                                </button>
                                <button 
                                    className={`btn btn-sm ${selectedSender === 'parent' ? 'btn-success' : 'btn-outline-success'}`}
                                    onClick={() => setSelectedSender('parent')}
                                >
                                    <i className="bi bi-person-circle me-1"></i> As Parent
                                </button>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className="card-body p-3" style={{ height: '400px', overflowY: 'auto' }}>
                            {filteredMessages.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="bi bi-chat-square-text display-1 text-muted"></i>
                                    <p className="mt-3">No messages found</p>
                                </div>
                            ) : (
                                filteredMessages.map(msg => (
                                    <div 
                                        key={msg.id} 
                                        className={`mb-3 ${!msg.isRead ? 'unread-message' : ''}`}
                                    >
                                        <div className={`d-flex ${msg.sender === selectedSender ? 'justify-content-end' : ''}`}>
                                            <div 
                                                className={`p-3 rounded ${msg.sender === 'teacher' ? 'bg-primary text-white' : 'bg-light'} ${msg.sender === selectedSender ? 'text-end' : ''}`}
                                                style={{ maxWidth: '70%' }}
                                            >
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <strong>
                                                        {msg.sender === 'teacher' ? 
                                                            <i className="bi bi-person-badge me-1"></i> : 
                                                            <i className="bi bi-person-circle me-1"></i>
                                                        }
                                                        {msg.name}
                                                    </strong>
                                                    <small className="text-muted">{msg.time}</small>
                                                </div>
                                                <p className="mb-1">{msg.message}</p>
                                                <small className="text-muted d-block">{msg.date}</small>
                                                {!msg.isRead && (
                                                    <small className="badge bg-danger mt-1">New</small>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Message Input Area */}
                        <div className="card-footer">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={`Type your message as ${selectedSender === 'teacher' ? 'a Teacher' : 'a Parent'}...`}
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                />
                                <button 
                                    className="btn btn-primary" 
                                    onClick={sendMessage}
                                    disabled={!newMessage.trim()}
                                >
                                    <i className="bi bi-send me-1"></i> Send
                                </button>
                            </div>
                            <small className="text-muted mt-2 d-block">
                                <i className="bi bi-info-circle me-1"></i>
                                You are sending as {selectedSender === 'teacher' ? 'a Teacher' : 'a Parent'}
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Row */}
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card bg-info text-white">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title">Total Messages</h6>
                                    <h3 className="mb-0">{messages.length}</h3>
                                </div>
                                <i className="bi bi-chat-text display-4"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-success text-white">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title">From Teachers</h6>
                                    <h3 className="mb-0">{messages.filter(m => m.sender === 'teacher').length}</h3>
                                </div>
                                <i className="bi bi-person-badge display-4"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-warning text-white">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title">From Parents</h6>
                                    <h3 className="mb-0">{messages.filter(m => m.sender === 'parent').length}</h3>
                                </div>
                                <i className="bi bi-person-circle display-4"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add some custom CSS */}
            <style>
                {`
                    .unread-message {
                        background-color: rgba(25, 135, 84, 0.1);
                        border-radius: 8px;
                        padding: 5px;
                    }
                    .list-group-item.active {
                        background-color: #0d6efd;
                        border-color: #0d6efd;
                    }
                    .card-body::-webkit-scrollbar {
                        width: 6px;
                    }
                    .card-body::-webkit-scrollbar-track {
                        background: #f1f1f1;
                    }
                    .card-body::-webkit-scrollbar-thumb {
                        background: #888;
                        border-radius: 3px;
                    }
                `}
            </style>
        </div>
    );
}

export default Messages;