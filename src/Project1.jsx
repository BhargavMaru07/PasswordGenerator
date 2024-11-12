//rfce sort cut

import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./Project1.css"

function Project1() {

    let[length,setLength] = useState(8)
    let[numberAllow,setNumberAllow] = useState(false)
    let[characterAllow,setCharacterAllow] = useState(false)
    let[password,setPassword] = useState("")

    let passwordGenerate = useCallback(()=>{
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if(numberAllow) str += "0123456789";
        if(characterAllow) str += "`~!@#$%^&*(){}[]";

        for(let i = 0; i<length ; i++){
            let char = Math.floor(Math.random()*str.length)+1;

            pass += str.charAt(char)
        }

        setPassword(pass)

    },[numberAllow,characterAllow,length,setPassword])


    let reference = useRef(null)
    //copy password...
    //usecallbake no use aetle kariye k optimation mate 
    let passwordCopy = useCallback(()=>{
        reference.current?.select();  //akho password select thase.... // and ama apde ? no use karyo jethi jo input feild bharel hase to j select karse baki nai kare..
        // reference.current?.setSelectionRange(0,5); //ama range maj select thase bt bydefault copy akho passwird thase km k clipboard.writetext ma apde password statevariabler apyu so ...
        window.navigator.clipboard.writeText(password); //password ae state variabel che reference element no k jyathi copy karvanu che
    },[password])

    useEffect(()=>{
        passwordGenerate();
    },[length,characterAllow,numberAllow,setPassword])


  return (
    <>
    <div className='container'>
        <h1>Password Generator</h1>
        <div className='passwordField'>
            <input type="text" value={password}  readOnly ref={reference}  />{/* aa input ne reference lidhu che */}
            <button onClick={passwordCopy}>Copy</button>
        </div>
        <div className='dependences'>
            <div> <input type="range" min={8} max={20} value={length} onChange={(e)=>{setLength(e.target.value)}} id='range' />  
            <label htmlFor="range">Length : {length}</label></div>
            <div><input type="checkbox" defaultChecked={numberAllow} onChange={()=>{setNumberAllow(prev => !prev)}} id='number'/>
            <label htmlFor="number">Number</label></div>
            <div><input type="checkbox" defaultChecked={characterAllow} onChange={()=>{setCharacterAllow(prev => !prev)}} id='character'/>
            <label htmlFor="character">Special-Character</label></div>
            
        </div>
        <button className='submitbtn' onClick={()=>passwordGenerate()}>Generate</button>
    </div>
    </>
  )
}

export default Project1