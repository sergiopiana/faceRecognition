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
                <span className={s.spacer}>·</span>
                <Link className={s.link} to="/enroll">
                <button type="button" class="btn btn-link">Enrolar</button>
                </Link>
                <span className={s.spacer}>·</span>
                <Link className={s.link} to="/">
                <button type="button" class="btn btn-link">Validar</button>
                </Link>
                <span className={s.spacer}>·</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
