import React, {useState} from 'react';
import { generateWhatsAppLink } from "../utils/generateLink";
export const Home = (props) => {
    const [calendarLink, setLink] = useState("");
    const onClick = () => {
        const url = generateWhatsAppLink();
        console.log('url => ', url)
        setLink(url)
    }
    return (
        <> 
            <h1>Hello vous</h1>
            <div onClick={onClick} style={{cursor: 'pointer'}}>
                click ici pour générer un lien
            </div>
            <span>{calendarLink}</span>
        </>
    )
}