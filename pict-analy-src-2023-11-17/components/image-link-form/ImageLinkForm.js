import './image-link-form.css'
import React from 'react'

export default function ImageLinkForm({ onInputChange, onImageSubmit }) {
    return (
        <div>
            <p className='f3'>
                {"Paste your image's URL here:"}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                <button onClick={onImageSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-blue'>Detect</button>
                </div>
            </div>
        </div>
    )
}
