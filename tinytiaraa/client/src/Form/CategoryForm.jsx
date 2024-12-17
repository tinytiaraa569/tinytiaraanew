import React from 'react'
import './Categoryfrom.css'

function CategoryForm({ handleSubmit, value, setValue }) {
    return (
        <div className='categoryform'>
            <div className='categoryformmain'>
                <form action="" onSubmit={handleSubmit}>

                    <input type="text" placeholder='Enter new category' value={value} onChange={(e) => { setValue(e.target.value) }} />

                    <div className='categoryfrombtnsection'>

                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CategoryForm
