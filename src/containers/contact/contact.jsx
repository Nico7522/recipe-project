import ContactForm from "../../components/contact/contact-from";
import Title from "../../components/title/title";

export default function Contact(){
    return(
        <div className="text-center md:mt-36">
            <Title text={'CONTACT'} className={"underline"}/>
            <ContactForm />
        </div>
    )
}