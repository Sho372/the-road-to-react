import * as React from 'react';

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

//  const [searchTerm, setSearchTerm] = React.useState(localStorage.getItem('search'), 'React'); //これがhook. stateの管理に使う。関数コンポーネントで使える

  const [searchTerm, setSearchTerm] = React.useState( localStorage.getItem('search') || 'React'); //これがhook. stateの管理に使う。関数コンポーネントで使える

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm) //side-effect
  }, [searchTerm])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value) // state更新
  }

  //concise body
  const searchStories = stories.filter( (story) =>  
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch}/>

      <hr />

      <List list={searchStories}/>

      <p>
        <strong>Output:</strong> {searchTerm}
      </p>
    </div>
  );
}

const Search = (props) => (
    // <div>
    // React Fragments
    <>
      <label htmlFor="search">Search: </label>
      
      {/* uncontrolled component */}
      <input id="search" type="text" onChange={props.onSearch}></input>

      {/* controlled component */}
      {/* <input id="search" type="text" value={props.search} onChange={props.onSearch}/> */}
    </>
      // </div>
);

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
