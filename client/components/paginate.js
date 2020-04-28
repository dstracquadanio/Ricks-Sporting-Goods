import React from 'react'

const Paginate = ({itemsPerPage, totalItems, paginator, props}) => {
  let pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <div key={number}>
          <a
            defaultValue={1}
            onClick={() => {
              paginator(number)
            }}
          >
            {number}
          </a>
        </div>
      ))}
    </div>
  )
}

export default Paginate
