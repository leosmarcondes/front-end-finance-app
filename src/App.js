import React, {useState, useEffect} from 'react'
import api from "./api"

const App = () => {
  const [transations, setTransations] = useState([])
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  })

  const fetchTransations = async () => {
    const response = await api.get('/transations/');
    setTransations(response.data)
  }

  useEffect(() => {
    fetchTransations();
  }, [])

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
    })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    await api.post('/transations/', formData); 
    fetchTransations();
    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: ''
    });
  }

  return(
    <div>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            Controle de Vendas
          </a>
        </div>
      </nav>
      <div className='container'>
        <form onSubmit={handleFormSubmit}>

          <div className='mb-3 mt-3'>
            <label htmlFor='amount' className='form-label'>Quantidade</label>
            <input type='text' className='form-control' id='amount' name='amount' onChange={handleInputChange} value={formData.amount}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='category' className='form-label'>Categoria</label>
            <input type='text' className='form-control' id='category' name='category' onChange={handleInputChange} value={formData.category}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>Descrição</label>
            <input type='text' className='form-control' id='description' name='description' onChange={handleInputChange} value={formData.description}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='date' className='form-label'>Data</label>
            <input type='text' className='form-control' id='date' name='date' onChange={handleInputChange} value={formData.date}/>
          </div>

          <div className='mb-3'>
            <label htmlFor='is_income' className='form-label me-1'>A faturar ?</label>
            <input type='checkbox' id='is_income' name='is_income' onChange={handleInputChange} value={formData.is_income}/>
          </div>

          <button type='submit' className='btn btn-primary mb-3'>
            Cadastrar
          </button>
        </form>

        <table className='table table-striped table-bordered table-hover'>
          <thead>
            <tr>
              <th>Quantidade</th>
              <th>Categoria</th>
              <th>Descrição</th>
              <th>Data</th>
              <th>A faturar ?</th>
            </tr>
          </thead>
          <tbody>
            {transations.map((transation) => (
              <tr key={transation.id}>
                <td>{transation.amount}</td>
                <td>{transation.category}</td>
                <td>{transation.description}</td>
                <td>{transation.date}</td>
                <td>{transation.is_income ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )

}

export default App;
