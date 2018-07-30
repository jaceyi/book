import React from 'react';

export default function ({loading, children}) {
  return (
    <div className={'loading__container'}>
      {
        loading ?
          <div className={'loading'}>
            <div><span/></div>
            <div><span/></div>
            <div><span/></div>
            <div><span/></div>
          </div> : children
      }
    </div>
  )
}
