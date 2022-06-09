import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';

const CustomNavLink = ({ to, title }) => {
   let resolved = useResolvedPath(to);
   let match = useMatch({ path: resolved.pathname, end: true });
  
   return (
      <NavLink to={to} style={{ marginRight: 20,color:  match ? '#1266f1' : 'black'}} className='nav-link' >
        <span className='ms-1 f-w-600'>{title}</span>
      </NavLink>
)
}

export default CustomNavLink