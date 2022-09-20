import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StyledList from './StyledList';

const PageList = () => {

  const [url, setUrl] = useState('');

  const pageList = [
    {
      title: '物資總覽',
      url: '/'
    },
    {
      title: '物資種類',
      url: '/supplykind'
    },
    {
      title: '3個月內過期物資',
      url: '/expired'
    },
    {
      title: '物資領取新增紀錄',
      url: '/record'
    },
    {
      title: '新增物資',
      url: '/addsupply'
    },
    {
      title: '領取物資',
      url: '/takesupply'
    },
  ]

  useEffect(() => {
    setUrl(window.location.pathname);
  }, [url])

  return (
    <StyledList key='pagelist'>
      {
        pageList.map((page, i) =>
          <Link key={`linkTo${page.url}`} to={page.url} 
            onClick={()=>setUrl(page.url)}
          >
            <StyledList.Item 
              style={{
                backgroundColor: 
                  url === page.url
                  ? '#3b3b3b' 
                  : 'white',
              }}
              key={`page${i}`}
            >
              <StyledList.Item.Meta
                className={
                  url === page.url 
                  && 'title-w' 
                }
                key={`pageMeta${i}`}
                title={page.title}
              />
            </StyledList.Item>
          </Link>
        )
      }
    </StyledList>
  )
}

export default PageList