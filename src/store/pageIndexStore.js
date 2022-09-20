import { createContext, useContext, useReducer } from "react";

export const PageIndexContext = createContext();

export const usePageIndexStore = () => useContext(PageIndexContext);

export const pageIndexReducer = (pageIndex, action) => {
  switch (action.type) {
    case 0:
      return pageIndex = 0
    case 1:
      return pageIndex = 1
    case 2:
      return pageIndex = 2
    case 3:
      return pageIndex = 3
    case 4:
      return pageIndex = 4
    case 5:
      return pageIndex = 5 
    default:
      return pageIndex = 0
  }
}

export const PageIndexProvider = ({children}) => {

  const [pageIndex, dispatch] = useReducer(
    pageIndexReducer, {
      pageIndex: 0
    }
  );

  return (
    <PageIndexContext.Provider value={{
      pageIndex,
      dispatch 
    }}>
      {children}
    </PageIndexContext.Provider>
  )
}

/*
app.js
  
  const {pageIndex} = usePageIndexStore();
  
  const returnPage = (i) => {
    switch (i) {
      case 0:
        return <Supply />;
      case 1:
        return <Expired />
      case 2:
        return <Record />
      case 3:
        return <AddSupply />
      case 4:
        return <TakeSupply />
      case 5:
        return <SupplyKind />
      default:
        return <Supply />;
    }
  }

  pageList.js

  const {dispatch} = usePageIndexStore();
  onClick={() => dispatch({type: i})}

*/
