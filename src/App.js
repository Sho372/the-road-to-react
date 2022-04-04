import * as React from 'react';


function getTitle(title) {
  return title;
}

const App = () => {

  const stories = [
    {
      title: 'React',
      url: 'https://react.js.org/',
      autohr: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      autohr: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ]

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search/>

      <hr />

      <List list={stories}/>
    </div>
  );
}

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange}/>

      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  )
}

/*
  concise bodyのテンプレート
 'function', '{}', 'return'を省略

  1. ワンラインの場合
  const foo = (props) => expression 

  2. 複数行の場合
  const bar = (props) => (
    expression
    ...
  )

*/

const List = (props) => ( 
    <ul>
      {props.list.map((item) => (
        <Item key={item.objectID} item={item}/>
      ))}
    </ul>
)

const Item = (props) => (
  <li key={props.key}>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.autohr}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
)

//const List = () => { 
//  return(
//    <ul>
//      {list.map((item) => {
//        return(
//          <li key={item.objectID}>
//            <span>
//              <a href={item.url}>{item.title}</a>
//            </span>
//            <span>{item.autohr}</span>
//            <span>{item.num_comments}</span>
//            <span>{item.points}</span>
//          </li>
//        );
//      })}
//    </ul>
//  );
//}

export default App;
