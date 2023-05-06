import axios from 'axios'
import './App.css'
import NavBar from './components/navbar'
import { QueryClient, useMutation, useQuery } from 'react-query'
import { GetAllRecipe } from '../API/recipe'
import { useState } from 'react'


function App() {
  const [message, setMessage] = useState('');
  const queryClient = new QueryClient()
  const mutation = useMutation(object => {
    return axios.post('http://localhost:8080/api/recipe', object)
  })

  const recipePost = useMutation({

   mutationFn: (recipe) =>  fetch('http://localhost:8080/api/recipe',{method: 'POST',body :JSON.stringify(recipe),  headers: {
    "Content-type": "application/json; charset=UTF-8"
} }),
  onSuccess: (context, data, variable) => {
    context.status === 404 ? setMessage('Something went wrong') : "IS OK ! "
    setTimeout(() => {
      setMessage('')
    }, 2000);
  
  }
  
}
  
   
  )
  const update = useMutation('recipeToUpdate', {
    // mutationFn: (recipeToUpdate) => axios.put('http://localhost:8080/api/recipe/1', recipeToUpdate),
    // onSuccess: updatedRecipe => {
    //   queryClient.setQueryData(['Recipes', {id : 1}], updatedRecipe.data)
    //   console.log(updatedRecipe.data)
    // }

    mutationFn: (recipeToUpdate) => axios.put('http://localhost:8080/api/recipe/1', recipeToUpdate),
    onMutate: async (recipeToUpdate) => {
      await queryClient.cancelQueries(['Recipes', recipeToUpdate.id]);
      const previousRecipe = queryClient.getQueriesData(['Recipes', recipeToUpdate.id]);
      queryClient.setQueriesData(['Recipes', recipeToUpdate.id], recipeToUpdate);
      return { previousRecipe, recipeToUpdate }
    },
    onError: (err, recipeToUpdate, context) => {
     console.log('previousRecipe =>',previousRecipe);
     console.log('context =>', context);
      queryClient.setQueryData(
        ['Recipes', context.recipeToUpdate.id],
        context.previousRecipe
      )
      // console.log('error =>', err);
      // console.log('recipeToUpdate =>', recipeToUpdate);
      // console.log('context =>', context);
    },
 
    onSettled: (data, error, recipeToUpdate)  => {
      // console.log('data =>', data);
      // console.log('error =>', error);
      // console.log('variable =>', recipeToUpdate);
      queryClient.invalidateQueries(['Recipes', recipeToUpdate.id])
    },
  })


 //Version avec import fonction 

  const {isLoading, error, data } = GetAllRecipe()
  if (isLoading) {
    return <p>Loading...</p>
  };
  if (error) {
    return <p>Somethinf went wrong...</p>
  }


  // Version sans import 
  // const { isLoading, error, data } = useQuery('fetchRecipes', () => 
  //   fetch('http://localhost:8080/api/recipe').then(res => 
  //      res.json()
  //   ))
  // if (isLoading) {
    
  //   return <p>Loading...</p>
  // };
  // if (error) {
  //   return <p>Something went wrong...</p>
  // }

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
    const recipe = {
      name: "Soupessssssss5 de légumes 4",
      description: "Coupez les légumes...",
      ingredients: [{ id: 1, quantity: 200, unit: "grammes" }],
      tags: [{ id: 1 }],
      UserId: 1,
    };
    console.log(recipe);
    // recipePost.mutate(recipe)
    update.mutate({
      name: "tests2",
      description: "Coupez les légumes...",
      ingredients: [{ id: 1, quantity: 200, unit: "grammes" }],
      tags: [{ id: 1 }],
      UserId: 1,
    })
   
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
      <h1>{message}</h1>
    </>
  )
}

export default App
