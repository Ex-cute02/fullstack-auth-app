import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const initialTopics = [
  {id: 1, title: "How to learn JavaScript?", content: "I'm new to programming and want to learn JavaScript. Any suggestions for beginners?", author: "John Doe", category: "Programming", replies: ["Start with freeCodeCamp!", "Try JavaScript.info website"]},
  {id: 2, title: "Best code editor for beginners", content: "Which code editor would you recommend for someone just starting with web development?", author: "Jane Smith", category: "Tools", replies: ["VS Code is great!", "Try Sublime Text", "Atom is also good", "I recommend VS Code too", "Notepad++ for simple editing"]},
  {id: 3, title: "Web development career advice", content: "Looking for advice on starting a career in web development. What skills should I focus on?", author: "Mike Johnson", category: "Career", replies: ["Learn HTML, CSS, JavaScript first", "Build projects for your portfolio", "Don't forget about responsive design", "Learn Git and version control", "Practice with real projects", "Join developer communities", "Consider learning React or Vue", "Backend skills are valuable too"]},
  {id: 4, title: "HTML vs CSS - What to learn first?", content: "Should I learn HTML first or can I start with CSS? What's the best learning path?", author: "Sarah Wilson", category: "Programming", replies: ["Definitely HTML first", "HTML is the foundation", "You need HTML to apply CSS", "Learn them together"]},
  {id: 5, title: "Free resources for learning programming", content: "Share your favorite free resources for learning to code! Let's help each other out.", author: "Alex Brown", category: "Resources", replies: ["freeCodeCamp.org", "Codecademy has free courses", "YouTube has great tutorials", "MDN Web Docs for reference", "W3Schools for basics", "Khan Academy", "Coursera has free courses", "edX platform", "GitHub has learning resources", "Stack Overflow for questions", "Reddit programming communities", "Dev.to for articles"]}
];

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('welcome');
  const [topics, setTopics] = useState(initialTopics);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: '', content: '' });
  const [replyText, setReplyText] = useState('');
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const addTopic = (e) => {
    e.preventDefault();
    const topic = {
      id: topics.length + 1,
      ...formData,
      author: user?.name || 'Anonymous',
      replies: []
    };
    setTopics([topic, ...topics]);
    setMessage('Topic created successfully!');
    setFormData({ title: '', category: '', content: '' });
    setTimeout(() => {
      setMessage('');
      setCurrentSection('topics');
    }, 2000);
  };

  const addReply = () => {
    if (replyText.trim()) {
      setTopics(topics.map(topic => 
        topic.id === selectedTopicId 
          ? {...topic, replies: [...topic.replies, replyText]}
          : topic
      ));
      setReplyText('');
    } else {
      alert('Please enter a reply!');
    }
  };

  const viewTopic = (topicId) => {
    setSelectedTopicId(topicId);
    setCurrentSection('topicView');
  };

  const selectedTopic = topics.find(t => t.id === selectedTopicId);

  return (
    <div style={{ minHeight: '100vh', padding: '20px', background: 'linear-gradient(135deg, rgb(245, 45, 45) 0%, rgb(200, 35, 35) 100%)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid #f0f0f0' }}>
          <div style={{ fontSize: '16px', color: 'rgb(245, 45, 45)', fontWeight: '600' }}>Welcome, {user?.name}!</div>
          <button onClick={handleLogout} style={{ backgroundColor: 'rgb(245, 45, 45)', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}>Logout</button>
        </div>

        <h1 style={{ color: 'rgb(245, 45, 45)', textAlign: 'center', paddingBottom: '10px', fontWeight: 'bold', fontSize: '48px', margin: '0 0 20px 0' }}>Discussion Forum</h1>
        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button onClick={() => setCurrentSection('welcome')} style={{ backgroundColor: 'rgb(245, 45, 45)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '5px', fontSize: '14px' }}>Welcome</button>
          <button onClick={() => setCurrentSection('topics')} style={{ backgroundColor: 'rgb(245, 45, 45)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '5px', fontSize: '14px' }}>All Topics</button>
          <button onClick={() => setCurrentSection('create')} style={{ backgroundColor: 'rgb(245, 45, 45)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '5px', fontSize: '14px' }}>Create Topic</button>
        </div>

        {currentSection === 'welcome' && (
          <div>
            <h2>Welcome to the Discussion Forum</h2>
            <p>Connect and discuss with other members!</p>
            <h3>Recent Topics</h3>
            {topics.slice(0, 2).map(topic => (
              <div key={topic.id} onClick={() => viewTopic(topic.id)} style={{ backgroundColor: '#f8f9fa', padding: '15px', margin: '10px 0', borderRadius: '5px', cursor: 'pointer' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{topic.title}</h3>
                <p style={{ margin: '5px 0', color: '#666' }}>{topic.content}</p>
                <div style={{ fontSize: '12px', color: '#888' }}>By: {topic.author} | Category: {topic.category} | {topic.replies.length} replies</div>
              </div>
            ))}
          </div>
        )}

        {currentSection === 'topics' && (
          <div>
            <h2>All Discussion Topics</h2>
            {topics.map(topic => (
              <div key={topic.id} onClick={() => viewTopic(topic.id)} style={{ backgroundColor: '#f8f9fa', padding: '15px', margin: '10px 0', borderRadius: '5px', cursor: 'pointer' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{topic.title}</h3>
                <p style={{ margin: '5px 0', color: '#666' }}>{topic.content}</p>
                <div style={{ fontSize: '12px', color: '#888' }}>By: {topic.author} | Category: {topic.category} | {topic.replies.length} replies</div>
              </div>
            ))}
          </div>
        )}

        {currentSection === 'create' && (
          <div>
            <h2>Create New Topic</h2>
            <form onSubmit={addTopic}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Topic Title:</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required placeholder="Enter your topic title" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category:</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}>
                  <option value="">Select Category</option>
                  <option value="Programming">Programming</option>
                  <option value="Tools">Tools</option>
                  <option value="Career">Career</option>
                  <option value="Resources">Resources</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Content:</label>
                <textarea value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required placeholder="Write your topic content here..." style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', height: '100px', resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ backgroundColor: 'rgb(245, 45, 45)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}>Create Topic</button>
            </form>
            {message && <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '4px', margin: '10px 0', border: '1px solid #c3e6cb', fontWeight: 'bold' }}>{message}</div>}
          </div>
        )}

        {currentSection === 'topicView' && selectedTopic && (
          <div>
            <button onClick={() => setCurrentSection('topics')} style={{ marginBottom: '20px', backgroundColor: 'rgb(245, 45, 45)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>← Back to Topics</button>
            <div style={{ backgroundColor: '#f8f9fa', padding: '15px', margin: '10px 0', borderRadius: '5px' }}>
              <h2>{selectedTopic.title}</h2>
              <div style={{ fontSize: '12px', color: '#888' }}>By: {selectedTopic.author} | Category: {selectedTopic.category}</div>
              <p style={{ margin: '15px 0', fontSize: '16px' }}>{selectedTopic.content}</p>
            </div>
            <div style={{ backgroundColor: '#f8f9fa', padding: '15px', margin: '10px 0', borderRadius: '5px' }}>
              <h3>Replies ({selectedTopic.replies.length})</h3>
              {selectedTopic.replies.map((reply, index) => (
                <div key={index} style={{ backgroundColor: 'white', padding: '10px', margin: '10px 0', borderRadius: '4px', borderLeft: '3px solid rgb(245, 45, 45)' }}>{reply}</div>
              ))}
              <h4>Add Your Reply:</h4>
              <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write your reply here..." style={{ width: '100%', height: '80px', margin: '10px 0', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
              <button onClick={addReply} style={{ backgroundColor: 'rgb(245, 45, 45)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Post Reply</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
