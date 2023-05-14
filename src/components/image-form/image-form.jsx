export default function ImageForm(){
        const { register, handleSubmit } = useForm();
        const [picture, setPicture] = useState(null);
        const handleSubmitImage = (data) => {
          const formData = new FormData();
          setPicture(data.file[0]);
      
          formData.append("image", picture);
          console.log(data.file[0]);
          axios.patch("http://localhost:8080/api/recipe/63/updateimage", formData);
        
        return (
          <form onSubmit={handleSubmit(handleSubmitImage)}>
            <label htmlFor="file">Image</label>
            <input {...register("file")} type="file" id="picture" />
            <button type="submit">Upload your image</button>
          </form>
        );
      };
}