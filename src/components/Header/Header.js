/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

class Header extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>

          <div className='row'>
            <div className='col-sm'>
              <Link className={s.brand} to="/">
              
                <span className={s.brandTxt}>SMG FACE RECOGNITION</span>
              </Link>
            </div>
            <div className='col-sm' align='right'>            
              <div>
                <Link className={s.link}  style={{'marginRight':'10px'}} to="/enroll">
                <button type="button" className="btn btn-light">Enrolar</button>
                </Link>
                <Link className={s.link} to="/">
                <button type="button" className="btn btn-light">Validar</button>
                </Link>

                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
