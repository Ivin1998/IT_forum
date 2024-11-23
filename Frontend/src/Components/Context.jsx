import React, { createContext, useState } from 'react';

export const Contextreact = createContext();


const Context = ({children}) => {

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [category,setCategory] = useState([]);
  const [feeds, setFeeds] = useState("");
  const [search,setSearch] = useState('');

  const [deleted,setDeleted] = useState(false);

  return (
    <Contextreact.Provider value={{answer,setAnswer,question,setQuestion,deleted,setDeleted,category,setCategory,feeds, setFeeds, search,setSearch}}>
      {children}
    </Contextreact.Provider>
  )
}

export default Context;
