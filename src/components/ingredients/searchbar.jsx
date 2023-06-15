import { useState } from "react"
import { useForm } from "react-hook-form"
import Button from "../button"

export default function SearchBar({ingredient, handleIngredient}){
    
    const { register, handleSubmit, reset} = useForm()
    const handleSearch = ({ search }) => {
        handleIngredient(search)
    }
    return (
        <form onSubmit={handleSubmit(handleSearch)}>
            <label htmlFor="search">Search</label>
            <input {...register('search')} type="text" />
            <Button text={'Search'} />
        </form>
    )
}