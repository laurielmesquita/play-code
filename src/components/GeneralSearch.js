/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'
import { navigate } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

export default ({ pageCount }) => {
  return (
    <Location>
      {({ location }) => {
        let search = qs.parse(location.search.replace('?', ''))

        return (
          <input
            type="text"
            value={search.s || ''}
            placeholder="Buscar..."
            onChange={e => {
              let search = {}
              search.s = e.target.value
              search = qs.stringify(search)

              const url = location.href
                .replace(location.origin, '')
                .replace(location.search, '')

              navigate(`${url}?${search}`)
            }}
          />
        )
      }}
    </Location>
  )
}