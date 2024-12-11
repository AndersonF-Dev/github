
import { useState } from 'react';
import gitlogo from '../assets/imag/github-mark-white.svg'
import Input from '../components/input';
import ItemRepo from '../components/itemRepo';

import { Container } from './styles';
import Button from '../components/Button';
import { api } from '../services/api';

function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {

    const {data} = await api.get(`repos/${currentRepo}`);
    if(data.id){
      const isExist = repos.find(repo => repo.id === data.id);

      if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return
      }
    }
    alert('Repositório não encontrado');
  }

  const handleRemoveRepo = (id) => {
    console.log('removendo redistro utilizando o filter', id);
    const filteredRepos = repos.filter((repo) => repo.id !== id);
    setRepos(filteredRepos);
  }



  return (
    <Container>
      <img src={gitlogo} width={72} height={72} alt="Logo github"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
      
  );
}

export default App;
