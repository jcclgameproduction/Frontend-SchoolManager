import React from 'react'
import { Container, Content } from './style'
import { 
  FaBars, 
  FaUserAlt, 
  FaRegFileAlt,
} from 'react-icons/fa'

import SidebarItem from '../SidebarItem'
import { Link } from 'react-router-dom'

const Sidebar = ({ active }) => {

  const closeSidebar = () => {
    active(false)
  }

  return (
    <Container sidebar={active}>
      <FaBars onClick={closeSidebar} />  
      <Content>
        <Link className="link-offset-2 link-underline link-underline-opacity-0" to="../usersList"><SidebarItem Icon={FaUserAlt} Text="Gerenciar funcionários" /></Link>
        <Link className="link-offset-2 link-underline link-underline-opacity-0" to="../enrollmentRecordsManager"><SidebarItem Icon={FaRegFileAlt} Text="Gerenciar matrícula" /></Link>
       
      </Content>
    </Container>
  )
}

export default Sidebar