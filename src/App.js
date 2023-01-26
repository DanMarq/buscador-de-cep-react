import {useState} from 'react'
import {FiSearch} from 'react-icons/fi'
import './style.css'

import api from './services/api'

function App() {

  //Functions
  const [input, setInput] = useState ('')
  const [cep, setCep] = useState ({})

  // Quando fazemos requisição em api
  // e como pode demorar, temos que fazer a função virar asicrona
  async function handleSearch () {

    if(input === '') {
      alert ('Preencha algum CEP')
      return;
    }

    try {
      
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
  
    } catch {
          alert('Ops, Erro ao buscar')
          setInput ('')
    }

  }

  const handleKeypress = e => {
        if (e.key === 'Enter') {
          handleSearch()
        }
  }


  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep..."
        value = {input}
        onChange = {(value) => setInput(value.target.value)}
        onKeyDown={handleKeypress}
         />
      
      <button className='buttonSearch' onClick={handleSearch}>
        <FiSearch size={25} color="#fff" />
      </button>

      </div>

      
      {Object.keys(cep).length > 0 && (

        <main className='main'>
            <h2>CEP: {cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
        </main>

      )}
      

    </div>//container
    
  );
}

export default App;
