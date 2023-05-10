import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import {} from 'react-hook-form'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { fetchUser} from '../../../API/connexion';
import * as yup from 'yup'
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/actions/user.action';


export default function Login() {
    const dispatch = useDispatch()
    const naviguation = useNavigate();
    const schema = yup.object().shape({
      email: yup.string().email('Must be a mail !').required('Mail required !'),
      password: yup.string().min(8, 'Password doesn\'t not match the requirement !').max(100).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password doesn\'t not match the requirement !' )
    })
    
    const  { handleSubmit, register, formState: {errors}, reset } = useForm({
      resolver: yupResolver(schema)
    });

    const {isLoading, isError, error, data, mutate} = useMutation({
      mutationFn:(userLog) => fetchUser(userLog),
      onMutate: (variables) => {return variables},
      onError: (error) => {return error},
      onSuccess: (data) => {return data.result},
    })
    const onLogin = (userLog) => {
      mutate(userLog)
      reset();
    }
    if (isLoading) {
    return <p className='mt-96 font text-3xl w-96 m-auto'>Wait...</p>
    }
    if (data) {
    console.log(data);
      dispatch(loginAction(data.result))
      naviguation('/recipes')
    }
  return (
    <form onSubmit={handleSubmit(onLogin)} className="text-center mt-96 m-auto w-80 border-sky-400 border-2 flex flex-col justify-center content-center">
      <div className='mt-2 flex flex-col justify-center content-center'>
        <label htmlFor="mail">Mail : </label>
        <input className='w-3/4 m-auto' {...register('email')}></input>
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className='mt-2 flex flex-col justify-center content-center' >
        <label htmlFor="password" >Password : </label>
        <input className='w-3/4 m-auto' {...register('password')}></input>
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit" className=' m-auto w-20 mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-1 px-2 border border-green-500 hover:border-transparent rounded'>Submit</button>
      {error?.response.status === 404 && <p className='mt-5 font text-2xl m-auto'>Wrong mail or password !</p>}
    </form>
    )
};