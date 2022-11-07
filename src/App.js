import * as React from 'react';

const App = () => {

  const initialStories = [
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

  const getAsyncStories = () => 
    new Promise((resolve) => 
      setTimeout(
        () => resolve({data: {stories: initialStories}}), 
        2000
      )
    )

//  const [searchTerm, setSearchTerm] = React.useState(localStorage.getItem('search'), 'React'); //これがhook. stateの管理に使う。関数コンポーネントで使える

  const [searchTerm, setSearchTerm] = React.useState( localStorage.getItem('search') || 'React'); //これがhook. stateの管理に使う。関数コンポーネントで使える
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  // reducer
  const storiesReducer = (state, action) => {
    switch(action.type) {
      case 'SET_STORIES':
        return action.playload
      case 'REMOVE_STORY':
        return state.filter(
          (story) => action.playload.objectID !== story.objectID
        );
      default:
        throw new Error();
    }
    // if(action.type === 'SET_STORIES') {
    //   return action.playload;
    // } else {
    //   throw new Error();
    // }
  }

  //APIで取得したデータを格納するstate
  // const [stories, setStories] = React.useState([]);
  
  // useStateではなく、useReducerでstateを管理
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer, // recuder
    [] // stateの初期値
  )

  React.useEffect(() => {
      setIsLoading(true);

    getAsyncStories()
      .then((result) => {
        // setStories(result.data.stories)

        dispatchStories({
          type: 'SET_STORIES',
          playload: result.data.stories,
        })
        setIsLoading(false);
      })
      .catch(() => setIsError(true))
  }, []) //空配列なので、side-effect(ここではdispatch実行)は初回のみ

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm) //side-effect
  }, [searchTerm])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value) // state更新
  }

  const handleRemoveStory = (item) => {
    // const newStories = stories.filter(
    //   //選択したitem以外のitemを抽出する
    //   (story) => item.objectID !== story.objectID
    // )

    //処理をreducerに任せる
    dispatchStories({
      type: 'REMOVE_STORY',
      playload: item,
    })
  }

  //concise body
  const searchStories = stories.filter( (story) =>  
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

    <InputWithLabel
      id='search'
      // label='Search'
      value={searchTerm}
      isFocused
      onInputChange={handleSearch}
    >
      <strong>Search:</strong>
    </InputWithLabel>

      {/* <Search search={searchTerm} onSearch={handleSearch}/> */}

      <hr />

      {isError && <p>Something went wrong...</p>}

      {isLoading ? (
        <p>Loading...</p>
      ):(
        <List list={searchStories} onRemoveItem={handleRemoveStory}/>
      )}

      <p>
        <strong>Output:</strong> {searchTerm}
      </p>
    </div>
  );
}

// const Search = (props) => (
//     // <div>
//     // React Fragments
//     <>
//       <label htmlFor="search">Search: </label>
      
//       {/* uncontrolled component */}
//       <input id="search" type="text" onChange={props.onSearch}></input>

//       {/* controlled component */}
//       {/* <input id="search" type="text" value={props.search} onChange={props.onSearch}/> */}
//     </>
//       // </div>
// );

const InputWithLabel = ({id, value, type='text', onInputChange, isFocused, children}) => {

  //A refを用意
  const inputRef = React.useRef();

  //C
  React.useEffect(() => {
    if (isFocused && inputRef.current) { //input.Ref.currentに参照しているinputタグが入っている

      //D
      inputRef.current.focus();

    }
  }, {isFocused})

  return(
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        //B inputRefをref attributeで紐づける
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        autoFocus={isFocused} 
        onChange={onInputChange}
      />
  </>

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

const List = ({list, onRemoveItem}) => ( 
    <ul>
      {list.map((item) => (
        <Item 
          key={item.objectID} 
          item={item} 
          onRemoveItem={onRemoveItem}/>
      ))}
    </ul>
)

const Item = ({item, onRemoveItem}) => {
  const handleRemoveItem = () => {
    onRemoveItem(item)
  }

  return (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.autohr}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={handleRemoveItem}>
        Dismiss
      </button>
    </span>
  </li>
  )
}

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
