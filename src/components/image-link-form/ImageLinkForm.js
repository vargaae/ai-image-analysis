import './image-link-form.css'
import React from 'react'

export default function ImageLinkForm({ onInputChange, onImageSubmit }) {
    return (
        <div>
            <p className='f3'>
                {"Choose a demo image or Paste your image's URL here and it will analysis the picture with an AI model:"}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} placeholder='URL of an image' />
                <button onClick={onImageSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-blue'>Analyse</button>
                </div>
            </div>
        </div>
    )
}
