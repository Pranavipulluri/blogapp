import {useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '@clerk/clerk-react'

function Articles() {

  const [articles,setArticles]=useState([])
  const [error,setError]=useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate=useNavigate();
  const {getToken}=useAuth()
  
  //get all articles
  async function getArticles(){
    const token=await getToken()
    //make authenticated request
   let res=await axios.get('http://localhost:3000/author-api/articles',{
    headers:{
      Authorization:`Bearer ${token}`
    }
   })
   if(res.data.message==='articles'){
    setArticles(res.data.payload)
    setFilteredArticles(res.data.payload);

        // Extract unique categories
        const uniqueCategories = ['all', ...new Set(res.data.payload.map(article => article.category))];
        setCategories(uniqueCategories);
    setError('')
   }else{
    setError(res.data.message)
   }
  }
  console.log(error)

  //goto specific article by id
  function gotoArticleById(articleObj){
  navigate(`../${articleObj.articleId}`,{ state:articleObj})

  }
   // Filter articles when category changes
   function handleCategoryChange(e) {
    const category = e.target.value;
    setSelectedCategory(category);
    setFilteredArticles(
      category === 'all' ? articles : articles.filter(article => article.category === category)
    );
  }
  useEffect(()=>{
   getArticles()
  },[])
  console.log(articles)
  return (
    <div className='container'>
      <div>
      {error.length!==0&&<p className='display-4 text-center mt-5 text-danger'>{error}</p>}
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
          {
            filteredArticles.map((articleObj)=><div className="col" key={articleObj.articleId}>
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
                  {articleObj.content.substring(0,80)+"..."}
                </p>
                {/* read more button */}
                <button className='custom-btn btn-4' onClick={()=>gotoArticleById(articleObj)}>
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
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Articles