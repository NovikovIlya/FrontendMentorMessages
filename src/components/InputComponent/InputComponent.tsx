import React from 'react'
import styles from './InputComponent.module.css'

const InputComponent = ({text='Send'}) => {
  return (
    <div>
        <input placeholder='Enten text message'/>
        <div>
            <input placeholder='Your name'/>
            <button>{text}</button>
        </div>
        
    </div>
  )
}

export default InputComponent