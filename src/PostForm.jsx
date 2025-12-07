import { useNavigate, Link } from 'react-router-dom'

const PostForm = ({ onAdded } = {}) => {
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const name = event.target.name.value
    const imageUrl = event.target.imageUrl.value

    if (!name.trim() || !imageUrl.trim()) {
        alert('Kérem töltse ki az összes mezőt.')
        return
    }

    const payload = { 
        id :null,
        name: name.trim(), 
        image_url: imageUrl.trim() 
    }

    try {
      const res = await fetch('https://pizza.sulla.hu/pizza', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      
      if (!res.ok) {
        let text = await res.text()
        throw new Error(text || 'Hiba a szervernél')
      }
      
      const newPost = await res.json()
      
      if (onAdded) {
          onAdded(newPost)
      }
      
      navigate('/')
      
    } catch (err) {
      alert(`Hiba történt: ${err.message || 'Ismeretlen hiba'}`)
    }
  } 

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Név</label>
        <input type="text" name="name" placeholder="Pizza neve" required />
      </div>
      <div className="form-row">
        <label>Kép URL</label>
        <input type="text" name="imageUrl" placeholder="https://...jpg" required />
      </div>
      <div className="form-actions">
        <Link to="/" className="btn btn-cancel">Vissza</Link>
        <button type="submit" className="btn btn-submit">Mentés</button>
      </div>
    </form>
  )
}

export default PostForm