import React from 'react';

export default function ({loading, children}) {
  return (
    <div className={'loading__container'}>
      {
        loading  && <div className={'loading__box'}>
          <div className={'loading'}>
            <div><span/></div>
            <div><span/></div>
            <div><span/></div>
            <div><span/></div>
          </div>
        </div>
      }
      {
        children
      }
    </div>
  )
}
