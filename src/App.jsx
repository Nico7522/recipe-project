import axios from 'axios'
import './App.css'
import NavBar from './components/navbar'
import { QueryClient, useMutation, useQuery } from 'react-query'

function App() {
  const queryClient = new QueryClient()
  const mutation = useMutation(object => {
    return axios.post('http://localhost:8080/api/recipe', object)
  })

  const recipePost = useMutation({
    mutationFn: (recipe) => {return fetch('http://localhost:8080/api/recipe', recipe)}
  })
  const update = useMutation({
    mutationFn: (recipeToUpdate) => axios.put('http://localhost:8080/api/recipe/6', recipeToUpdate),
    onSuccess: updatedRecipe => {
      queryClient.setQueryData(['Recipes', {id : 7}], updatedRecipe.data)
      console.log(updatedRecipe)
    }
  })


 //Version avec import fonction 

  // const {isLoading, error, data } = GetAllRecipe()
  // if (isLoading) {
  //   return <p>Loading...</p>
  // };
  // if (error) {
  //   return <p>Somethinf went wrong...</p>
  // }


  // Version sans import 
  const { isLoading, error, data } = useQuery('fetchRecipes', () => 
    fetch('http://localhost:8080/api/recipe').then(res => 
       res.json()
    ))
  if (isLoading) {
    
    return <p>Loading...</p>
  };
  if (error) {
    return <p>Something went wrong...</p>
  }

  // Axios utilisation normal 
  // const [result, setResult] = useState(null)
  // useEffect(() => {
  //   axios.get('http://localhost:8080/api/recipe')
  //   .then(({data}) => {
  //     setResult(data)
  //     return data;
  //   })
  // }, [])

  const handleSubmitTest = (e) => {
    e.preventDefault()
    // const object = {name: 'testRssefffscpisse', description: 'test'}
    // update.mutate(object)
    recipe = {}
    recipePost.mutate(recipe)
  }

  return (
    <>
    <NavBar />
      <h1 className='text-center font mt-24'>RECIPE HOME</h1>

      
      <div className='m-auto text-center w-10/12 h-96 border-4 border-indigo-500/100'>
        ALL RECIPE
      


        <div className='mx-auto mt-5 w-10/12 border-4 border-indigo-500/100'>{data.results.map(r => (
          <h3 key={r.id}>{r.name}</h3>
        ))}</div>


        <div className='mx-auto mt-5 w-10/12 border-4 border-indigo-500/100'>RECIPE</div>
        <div className='mx-auto mt-5 w-10/12 border-4 border-indigo-500/100'>RECIPE</div>
      </div>

      <button onClick={(e) => handleSubmitTest(e)}>Submit</button>
    </>
  )
}

export default App
