import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
const [newArticle, setNewArticle] = useState({ 
    title: '', 
    content: '', 
    category: 'all', // Initialize to a default category
    authorData: { nameOfAuthor: '', email: '', profileImageUrl: '' }, 
    articleId: '', 
    dateOfCreation: new Date().toISOString(), 
    dateOfModification: new Date().toISOString(), 
    comments: [], 
    isArticleActive: true 
});


  const navigate = useNavigate();
  const { getToken } = useAuth();

  // Get all articles
  async function getArticles() {
    const token = await getToken();
    // Make authenticated request
    let res = await axios.get('http://localhost:4000/author-api/articles', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.data.message === 'articles') {
      setArticles(res.data.payload);
      setFilteredArticles(res.data.payload);

      // Extract unique categories
      const uniqueCategories = ['all', ...new Set(res.data.payload.map(article => article.category))];
      setCategories(uniqueCategories);
      setError('');
    } else {
      setError(res.data.message);
    }
  }

  // Handle article submission
  async function handleSubmit(e) {
    e.preventDefault();
    const token = await getToken();
    try {
      const res = await axios.post('http://localhost:3000/author-api/article', {
        ...newArticle,
        authorData: {
          nameOfAuthor: user?.firstName || 'Unknown',
          email: user?.emailAddresses[0]?.emailAddress || 'unknown@example.com',
          profileImageUrl: user?.imageUrl || ''
        },
        articleId: generateUniqueId(), // Assuming a function to generate unique IDs
        dateOfCreation: new Date().toISOString(),
        dateOfModification: new Date().toISOString(),
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data.message === 'article published') {
        setArticles([...articles, res.data.payload]); // Add new article to the list
        setFilteredArticles([...filteredArticles, res.data.payload]);
        setNewArticle({ title: '', content: '', category: '' }); // Reset form
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setError(err.message || "An error occurred");
    }
  }
  

  // Go to specific article by id
  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  // Filter articles when category changes
  function handleCategoryChange(e) {
    const category = e.target.value;
    setSelectedCategory(category);
    setFilteredArticles(
      category === 'all' ? articles : articles.filter(article => article.category === category)
    );
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className='container'>
      <div>
        {error.length !== 0 && <p className='display-4 text-center mt-5 text-danger'>{error}</p>}
        
        {/* Article Submission Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={newArticle.title}
            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Content"
            value={newArticle.content}
            onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
            required
          />
          <select
            value={newArticle.category}
            onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          <button type="submit">Post Article</button>
        </form>

        {/* Category Filter Dropdown */}
        <div className="mb-3">
          <label className="form-label">Filter by Category:</label>
          <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
          {filteredArticles.map((articleObj) => (
            <div className="col" key={articleObj.articleId}>
              <div className="card h-100">
                <div className="card-body">
                  <div className="author-details text-end">
                    <img src={articleObj.authorData.profileImageUrl} 
                      width='40px'
                      className='rounded-circle'
                      alt="" />
                    <p>
                      <small className='text-secondary'>
                        {articleObj.authorData.nameOfAuthor}
                      </small>
                    </p>
                  </div>
                  <h5 className="card-title">{articleObj.title}</h5>
                  <p className="card-text">
                    {articleObj.content.substring(0, 80) + "..."}
                  </p>
                  {/* Read more button */}
                  <button className='custom-btn btn-4' onClick={() => gotoArticleById(articleObj)}>
                    Read more
                  </button>
                </div>
                <div className="card-footer">
                  <small className='text-body-secondary'>
                    Last updated on {articleObj.dateOfModification}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;
