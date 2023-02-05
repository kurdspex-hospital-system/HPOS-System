import React from 'react'
import { useState } from 'react'
import Form from './Form'

import style from './SearchBar.module.css';

const SearchBar = (props) => {
  const [text, setText] = useState('');

  const onSubmitData = () => {
    props.onSubmit(text);
  }

  return (
    <Form id={style.form} className={'d-flex justify-content-center mb-3 mt-1 col-10 mx-auto ' + props.className} onSubmit={onSubmitData}>
        <input type="text" name="search" className="ps-3 form-control" value={text} onChange={(e) => setText(e.target.value)} placeholder="you can search for any thing" />
        <button className="btn btn-warning ms-0 px-4" type="submit">Search</button>
    </Form>
  )
}

export default SearchBar