import { FormEvent, useState } from 'react'

function App() {
  const [value, setValue] = useState('0')
  const [message, setMessage] = useState<string | null>(null);

  const handleWriteFile = async () => {
    try {
    const response = await fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: value }),
    });

    if (response.ok) {
      setMessage('Dados enviados com sucesso!');
    } else {
      setMessage('Erro ao enviar dados.');
    }
  } catch (error) {
    setMessage('Erro na requisição.');
  }
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleWriteFile()
  }

  const handleValueUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <h1>Salve</h1>
        <label>Selecione um valor:</label>
        <select name="" id="" onChange={handleValueUpdate}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type='submit'>Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </>
  )
}

export default App
