import React from 'react'
import {
  CInputGroup,
  CInputGroupText,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const SearchBar = () => {
  return (
    <div className="search-container">
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilSearch} />
        </CInputGroupText>
        <CFormInput
          type="text"
          placeholder="Search..."
          className="search-input"
        />
      </CInputGroup>
    </div>
  )
}

export default SearchBar
